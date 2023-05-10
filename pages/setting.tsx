import { useState } from "react";
import axios from "axios";
import {
  selectServerAuthToken,
  selectServerBaseUrl,
  setServerAuthToken,
  setServerBaseUrl,
} from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

export default function Setting() {
  const dispatch = useDispatch();
  const serverBaseUrl = useSelector(selectServerBaseUrl);
  const serverAuthToken = useSelector(selectServerAuthToken);
  const [baseUrl, setBaseUrl] = useState<string>(serverBaseUrl);
  const [authToken, setAuthToken] = useState<string>(serverAuthToken);

  function onSaveHandler() {
    axios.defaults.baseURL = baseUrl;
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    dispatch(setServerBaseUrl(baseUrl));
    dispatch(setServerAuthToken(authToken));
  }

  return (
    <div>
      <div
        className={
          "w-full border-solid border-gray-300 border-[1px] p-4 rounded"
        }
      >
        <div className={"font-medium mt-4 text-2xl"}>Configuration</div>
        <div className={"mt-4"}>
          <div>Enter Base URL</div>
          <input
            className={"border-[1px] p-2 rounded w-full mt-2"}
            type="text"
            value={baseUrl}
            onChange={(e) => {
              setBaseUrl(e.target.value);
            }}
          />
        </div>
        <div className={"mt-4"}>
          <div>Enter Auth Token</div>
          <input
            className={"border-[1px] p-2 rounded w-full mt-2"}
            type="text"
            value={authToken}
            onChange={(e) => {
              setAuthToken(e.target.value);
            }}
          />
        </div>
        <div className={"mt-4 flex justify-end"}>
          <Button variant="contained" onClick={onSaveHandler}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
