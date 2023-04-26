import { useState } from "react";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import { saveCharacter, saveCharacterVariation } from "@/service/characterApi";

interface Props {}

export default function Character({}: Props) {
  const [csvData, setCsvData] = useState<any>("Upload data to view");
  // const [characterNameKey, setCharacterNameKey] = useState<string>("");
  const [characterVariationNameKey, setCharacterVariationNameKey] =
    useState<string>("");
  const [characterIdKey, setCharacterIdKey] = useState<string>("");

  async function onSaveHandler() {
    const dataList: any[] = [];
    if (csvData && csvData.length > 0 && characterVariationNameKey) {
      csvData.forEach((item: any) => {
        const data = {
          data: {
            name: item[characterVariationNameKey],
            mk_character: item[characterIdKey],
          },
        };
        dataList.push(data);
      });
    }
    if (dataList?.length > 0) {
      for (const dataListElement of dataList) {
        try {
          const response = await saveCharacterVariation(dataListElement);
          console.log(response?.data);
        } catch (e: any) {
          console.log(e?.message);
        }
      }
    }
  }

  return (
    <div>
      <div className={"text-lg font-semibold mb-4"}>
        Mortal Kombat 11 Ultimate - Character Variation
      </div>
      <div className={"flex flex-wrap"}>
        <div className={"w-[400px] border-[1px] p-4 rounded ml-2"}>
          <CsvFileReader onComplete={setCsvData} />
        </div>
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded"}>
          <div className={"font-medium mt-4"}>Configuration</div>
          <div>
            <div>Enter Character Variation Key Name</div>
            <input
              className={"border-[1px] p-2 rounded w-full mt-2"}
              type="text"
              value={characterVariationNameKey}
              onChange={(e) => {
                setCharacterVariationNameKey(e.target.value);
              }}
            />
          </div>
          <div className={"mt-3"}>
            <div>Enter Character Id Key Name</div>
            <input
              className={"border-[1px] p-2 rounded w-full mt-2"}
              type="text"
              value={characterIdKey}
              onChange={(e) => {
                setCharacterIdKey(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded mt-1"}>
          <div className={"font-medium my-4"}>Post Data</div>
          <div>
            <button
              className={"p-2 rounded border w-[300px] border-gray-300"}
              onClick={onSaveHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
