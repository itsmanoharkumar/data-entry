import { ReactNode } from "react";
import TopHeader from "@/components/atoms/TopHeader";
import Footer from "@/components/atoms/Footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className={"w-full min-h-screen overflow-hidden flex flex-col"}>
      <TopHeader />
      <div className={"flex flex-auto items-stretch overflow-hidden w-full"}>
        <div
          className={
            "overflow-auto p-2 h-[calc(100vh_-_64px)] w-full mt-[64px]"
          }
        >
          {children}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
