import { useState } from "react";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import { saveInputCommands } from "@/service/characterApi";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

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

  async function onSaveHandler() {
    const dataList: any[] = [];
    if (csvData && csvData.length > 0) {
      csvData.forEach((item: any) => {
        const frameDataId = uuidv4();
        const moveDataId = uuidv4();

        const data = {
          data: {
            name: item.name,
            combo: item.inputCommands,
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
            subcategory: MKKeyComboSubcategoryMap[item?.subCategory],
            hasAmplify: ["true"].includes(item.hasAmplify?.toLowerCase()),
            isEquipped: ["true"].includes(item.isEquipped?.toLowerCase()),
            isCancellable: ["true"].includes(item.isCancellable?.toLowerCase()),
            character_variation: item.mk_character_variation,
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
