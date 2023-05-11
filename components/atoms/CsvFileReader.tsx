import Papa from "papaparse";
import { useState } from "react";
import { Button } from "@mui/material";

interface Props {
  onComplete: (data: any) => void;
}

export default function CsvFileReader({ onComplete }: Props) {
  const [data, setData] = useState<string>("");
  return (
    <div className={""}>
      <div className={"font-medium mb-2"}>Upload CSV File</div>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept=".csv"
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              Papa.parse(event.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                  try {
                    setData(JSON.stringify(results.data, null, 2));
                  } catch (e) {
                    setData("Invalid CSV file");
                  }
                  onComplete(results.data);
                },
              });
            }
          }}
        />
      </Button>
      {/*<input*/}
      {/*  type="file"*/}
      {/*  accept=".csv"*/}
      {/*  onChange={(event) => {*/}
      {/*    if (event.target.files) {*/}
      {/*      Papa.parse(event.target.files[0], {*/}
      {/*        header: true,*/}
      {/*        skipEmptyLines: true,*/}
      {/*        complete: function (results) {*/}
      {/*          try {*/}
      {/*            setData(JSON.stringify(results.data, null, 2));*/}
      {/*          } catch (e) {*/}
      {/*            setData("Invalid CSV file");*/}
      {/*          }*/}
      {/*          onComplete(results.data);*/}
      {/*        },*/}
      {/*      });*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}
      <div
        className={
          "h-[400px] overflow-auto w-full p-2 mt-2 rounded bg-gray-100"
        }
      >
        <div className={"font-medium"}>Parsed Data</div>
        {data && <div className={"whitespace-pre"}>{data}</div>}
      </div>
    </div>
  );
}
