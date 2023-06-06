import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Chip } from "@mui/material";
import Papa from "papaparse";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "@mui/material/styles";

interface Props {
  selectedApiRoute: string;
  onComplete: (data: any) => void;
}

export default function CsvFileReader({ onComplete, selectedApiRoute }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<string>("");
  const [value, setValue] = useState(null);
  const [fileName, setFileName] = useState("");
  const theme = useTheme();
  const [editorTheme, setEditorTheme] = useState("light");

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      setEditorTheme("vs-dark");
    } else {
      setEditorTheme("light");
    }
  }, [theme.palette.mode]);

  useEffect(() => {
    clearAllData();
  }, [selectedApiRoute]);

  function clearAllData() {
    setData("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Button variant="contained" component="label">
          Upload CSV File
          <input
            ref={fileInputRef}
            hidden
            accept=".csv"
            type="file"
            key={selectedApiRoute}
            onChange={(event) => {
              if (event.target.files) {
                setFileName(event.target.files[0]?.name);
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
      </Grid>
      <Grid xs={12}>
        {fileName && (
          <Chip
            color={"success"}
            label={fileName}
            onDelete={() => {
              clearAllData();
            }}
          />
        )}
      </Grid>
      <div className={"w-full p-2 mt-2 rounded"}>
        <div className={"font-medium"}>Parsed Data</div>
        <Editor
          theme={editorTheme}
          height="40vh"
          defaultLanguage="json"
          value={data}
          onChange={(value) => {
            let jsonData: any;
            try {
              jsonData = JSON.parse(value || "");
            } catch (e) {
              return;
            }
            onComplete(jsonData);
          }}
        />
      </div>
    </Grid>
  );
}
