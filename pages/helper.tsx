import { useEffect, useState } from "react";
import qs from "qs";
import QueryString from "qs";
interface Props {}

export default function Helper({}: Props) {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [queryString, setQueryString] = useState("");
  const [objResult, setObjResult] = useState("");
  useEffect(() => {
    let temp: any = qs.parse(queryString);
    temp = JSON.stringify(temp, null, 2);
    setObjResult(temp);
  }, [queryString]);

  useEffect(() => {
    if (value) {
      try {
        const quotedJsonString = value
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
          .replace(/'/g, '"');
        const parsedObject = JSON.parse(quotedJsonString);
        const query1 = qs.stringify(parsedObject, { encode: false });
        setQuery(query1);
      } catch (e) {
        setQuery("Invalid value");
      }
    }
  }, [value]);
  return (
    <div>
      <div>
        <div className={"text-blue-950 font-bold text-3xl mb-3"}>QS Helper</div>

        <div className={"flex flex-wrap"}>
          <div>
            <div className={"text-blue-900 font-semibold text-xl mb-3"}>
              Object to QS
            </div>
            <textarea
              rows={8}
              className={"border border-gray-400 rounded w-[400px] p-2"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className={"mt-4"}>Result</div>
            <div
              className={
                "mt-1 whitespace-pre border border-gray-400 rounded p-2 min-h-[100px]"
              }
            >
              {query}
            </div>
          </div>
          <div className={"ml-3"}>
            <div className={"text-blue-900 font-semibold text-xl mb-3 "}>
              QS to object
            </div>
            <textarea
              rows={8}
              className={"border border-gray-400 rounded w-[400px] p-2"}
              value={queryString}
              onChange={(e) => setQueryString(e.target.value)}
            />
            <div className={"mt-4"}>Result</div>
            <div
              className={
                "mt-1 whitespace-pre border border-gray-400 rounded p-2 min-h-[100px]"
              }
            >
              {objResult}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
