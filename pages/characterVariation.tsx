import { useState } from "react";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import { saveCharacterVariation } from "@/service/characterApi";
import { Button, TextField } from "@mui/material";

interface Props {}

export default function CharacterVariation({}: Props) {
  const [csvData, setCsvData] = useState<any>("Upload data to view");
  // const [characterNameKey, setCharacterNameKey] = useState<string>("");
  const [characterVariationNameKey, setCharacterVariationNameKey] =
    useState<string>("variationName");
  const [characterIdKey, setCharacterIdKey] = useState<string>("characterId");

  async function onSaveHandler() {
    const dataList: any[] = [];
    if (csvData && csvData.length > 0 && characterVariationNameKey) {
      csvData.forEach((item: any) => {
        const data = {
          data: {
            name: item[characterVariationNameKey],
            character: item[characterIdKey],
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
          <div className={"font-medium my-4"}>Configuration</div>
          <TextField
            value={characterVariationNameKey}
            label="Character Variation Key Name"
            variant="outlined"
            onChange={(e) => {
              setCharacterVariationNameKey(e.target.value);
            }}
            fullWidth={true}
          />
          <TextField
            className={"mt-4"}
            value={characterIdKey}
            label="Character Id Key Name"
            variant="outlined"
            onChange={(e) => {
              setCharacterIdKey(e.target.value);
            }}
            fullWidth={true}
          />
        </div>
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded mt-1"}>
          <div className={"font-medium my-4"}>Post Data</div>
          <Button
            variant={"contained"}
            className={"p-2 rounded border w-[300px] border-gray-300"}
            onClick={onSaveHandler}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
