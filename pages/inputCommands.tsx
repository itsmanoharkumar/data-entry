import { useState } from "react";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import {
  saveCharacter,
  saveCharacterVariation,
  saveInputCommands,
} from "@/service/characterApi";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const MKKeyComboSubcategoryMap: any = {
  Basic: "1",
  "Jumping Attacks": "2",
  "Hop Attacks": "3",
  "Getup Attacks": "4",
  "Flawless Block Attacks": "5",
  Throws: "6",
  "Roll Escapes": "7",
  "Air Escape": "8",
  "Kombo Attacks": "9",
  "Special Moves": "10",
  "Fatal Blow": "11",
  Fatalities: "12",
  Friendship: "13",
  Brutalities: "14",
  Abilities: "15",
};

export default function InputCommands({}: Props) {
  const [csvData, setCsvData] = useState<any>("Upload data to view");
  const [characterNameKey, setCharacterNameKey] = useState<string>("");
  const [characterVariationNameKey, setCharacterVariationNameKey] =
    useState<string>("");
  const [characterIdKey, setCharacterIdKey] = useState<string>("");

  async function onSaveHandler() {
    const dataList: any[] = [];
    if (csvData && csvData.length > 0) {
      csvData.forEach((item: any) => {
        const frameDataId = uuidv4();
        const moveDataId = uuidv4();

        const data = {
          data: {
            name: item.name,
            inputCommands: item.inputCommands,
            frameData: {
              id: frameDataId,
              startUp: item.startUp || null,
              active: item.active || null,
              recovery: item.recovery || null,
              cancel: item.cancel || null,
              hitAdv: item.hitAdv || null,
              blockAdv: item.blockAdv || null,
              fBlockAdv: item.fBlockAdv || null,
            },
            moveData: {
              id: moveDataId,
              blockDamage: item.blockDamage || null,
              damage: item.damage || null,
              fBlockDamage: item.fBlockDamage || null,
              moveType: item.moveType || null,
              specialNotes: item.specialNotes,
              notes: item.notes,
            },
            mk_key_combo_subcategory:
              MKKeyComboSubcategoryMap[item?.subCategory],
            hasAmplify: ["true"].includes(item.hasAmplify?.toLowerCase()),
            isEquipped: ["true"].includes(item.isEquipped?.toLowerCase()),
            isCancellable: ["true"].includes(item.isCancellable?.toLowerCase()),
            mk_character_variation: item.mk_character_variation,
          },
        };
        dataList.push(data);
      });
    }
    if (dataList?.length > 0) {
      for (const dataListElement of dataList) {
        try {
          const response = await saveInputCommands(dataListElement);
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
        <div className={"ml-2 w-[400px] border-[1px] p-4 rounded hidden"}>
          <div className={"font-medium mt-4"}>Configuration</div>
          <div>
            <div>Enter Character Variation Key Name</div>
            <input
              disabled
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
