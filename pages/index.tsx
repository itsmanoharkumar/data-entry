import Image from "next/image";
import dataEntryHeroImage from "@/images/dataEntryHeroImage.jpg";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  return (
    <main className={`flex items-center justify-center w-full h-full`}>
      <div className={"w-[70%] lg:w-[40%]"}>
        <Image src={dataEntryHeroImage} alt={"Welcome to Data Entry"} />
      </div>
    </main>
  );
}
