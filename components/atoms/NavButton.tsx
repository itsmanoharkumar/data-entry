import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  currentPath: string;
  pathname: string;
  name: string;
}

export default function NavButton({ currentPath, pathname, name }: Props) {
  return (
    <div
      className={
        "w-full border-[1px] rounded pl-2 mt-2 h-[40px]" +
        `${currentPath === pathname ? " bg-gray-200" : ""}`
      }
    >
      <Link className={"w-full block"} href={pathname}>
        {name}
      </Link>
    </div>
  );
}
