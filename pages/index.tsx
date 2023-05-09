import Image from "next/image";
import dataEntryHeroImage from "@/images/dataEntryHeroImage.jpg";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");

  function onSaveHandler() {
    axios.defaults.baseURL = baseUrl;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${authToken}`;
  }

  return (
    <main className={`flex items-center justify-center w-full h-full`}>
      <div className={"w-[70%] lg:w-[40%]"}>
        <div>
          <div className={"w-full border-[1px] p-4 rounded"}>
            <div className={"font-medium mt-4 text-2xl"}>Configuration</div>
            <div className={'mt-4'}>
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
            <div className={'mt-4'}>
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
            <div className={'mt-4'}>
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
        </div>
        <Image src={dataEntryHeroImage} alt={"Welcome to Data Entry"} />
      </div>
    </main>
  );
}
