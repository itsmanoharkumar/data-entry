import Link from "next/link";
import { useRouter } from "next/router";
import NavButton from "@/components/atoms/NavButton";

interface Props {}

export default function SideNav({}: Props) {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <div className={"h-full w-full p-2"}>
      <div className={"flex flex-col"}>
        <NavButton currentPath={currentPath} pathname={"/"} name={"Home"} />
        <NavButton
          currentPath={currentPath}
          pathname={"/character"}
          name={"Character"}
        />
        <NavButton
          currentPath={currentPath}
          pathname={"/characterVariation"}
          name={"Character Variation"}
        />
        <NavButton
          currentPath={currentPath}
          pathname={"/inputCommands"}
          name={"Input Commands"}
        />
      </div>
    </div>
  );
}
