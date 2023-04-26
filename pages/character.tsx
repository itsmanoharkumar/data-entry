import { useEffect, useState } from "react";
import Papa from "papaparse";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import { getAllCharacter } from "@/service/characterApi";

interface Props {}

export default function Character({}: Props) {
  const [csvData, setCsvData] = useState<any>("Upload data to view");
  const [characterNameKey, setCharacterNameKey] = useState<string>("");

  async function onSaveHandler() {
    // const data = {
    //   characterNameKey,
    //   csvData,
    // };
    const data = await getAllCharacter();
    console.log(data);
  }

  return (
    <div>
      <div className={"text-lg font-semibold mb-4"}>Enter Mortal Kombat</div>
      <div className={"flex flex-wrap"}>
        <div className={"w-[400px] border-[1px] p-4 rounded ml-2"}>
          <CsvFileReader onComplete={setCsvData} />
        </div>
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded"}>
          <div className={"font-medium mt-4"}>Configuration</div>
          <div>
            <div>Enter Character Key Name</div>
            <input
              className={"border-[1px] p-2 rounded w-full mt-2"}
              type="text"
              value={characterNameKey}
              onChange={(e) => {
                setCharacterNameKey(e.target.value);
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
