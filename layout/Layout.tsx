import { ReactNode } from "react";
import TopHeader from "@/components/atoms/TopHeader";
import Footer from "@/components/atoms/Footer";
import SideNav from "@/components/atoms/SideNav";
interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className={"w-full min-h-screen overflow-hidden flex flex-col"}>
      <div
        className={
          "h-[64px] w-full border-0 border-b-[1px] border-gray-200 border-solid"
        }
      >
        <TopHeader />
      </div>
      <div className={"flex flex-auto items-stretch overflow-hidden"}>
        <div className={"w-[200px] min-w-[200px] border-[1px]"}>
          <SideNav />
        </div>
        <div className={"overflow-auto p-2 h-[calc(100vh_-_64px)]"}>
          {children}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
