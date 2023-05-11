import { useState } from "react";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import { saveKomboCategory } from "@/service/characterApi";
import { Button, TextField } from "@mui/material";

interface Props {}

export default function KomboCategory({}: Props) {
  const [csvData, setCsvData] = useState<any>("Upload data to view");
  const [KomboCategoryNameKey, setKomboCategoryNameKey] =
    useState<string>("name");

  async function onSaveHandler() {
    const dataList: any[] = [];
    if (csvData && csvData.length > 0 && KomboCategoryNameKey) {
      csvData.forEach((item: any) => {
        const data = {
          data: {
            name: item[KomboCategoryNameKey],
          },
        };
        dataList.push(data);
      });
    }
    if (dataList?.length > 0) {
      for (const dataListElement of dataList) {
        const response = await saveKomboCategory(dataListElement);
        console.log(response);
      }
    }
  }

  return (
    <div>
      <div className={"text-lg font-semibold mb-4"}>
        Mortal Kombat 11 Ultimate - KomboCategory
      </div>
      <div className={"flex flex-wrap"}>
        <div className={"w-[400px] border-[1px] p-4 rounded ml-2"}>
          <CsvFileReader onComplete={setCsvData} />
        </div>
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded"}>
          <div className={"font-medium my-4"}>Configuration</div>
          <TextField
            value={KomboCategoryNameKey}
            label="KomboCategory Key Name"
            variant="outlined"
            onChange={(e) => {
              setKomboCategoryNameKey(e.target.value);
            }}
            fullWidth={true}
          />
        </div>
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded mt-1"}>
          <div className={"font-medium my-4"}>Post Data</div>
          <div>
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
    </div>
  );
}
