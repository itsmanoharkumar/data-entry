import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "@mui/material/styles";

interface Props {
  readonly?: boolean;
  data: string;
  onChange?: (data: string | undefined) => void;
}

export default function MonacoEditor({
  readonly = true,
  data,
  onChange,
}: Props) {
  const theme = useTheme();
  const [editorTheme, setEditorTheme] = useState("light");

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      setEditorTheme("vs-dark");
    } else {
      setEditorTheme("light");
    }
  }, [theme.palette.mode]);

  return (
    <Editor
      options={{
        readOnly: readonly,
      }}
      theme={editorTheme}
      height="40vh"
      defaultLanguage="json"
      value={data}
      onChange={onChange}
    />
  );
}
