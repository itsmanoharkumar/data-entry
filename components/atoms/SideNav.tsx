import { useRouter } from "next/router";
import NavButton from "@/components/atoms/NavButton";
import { NAV_ROUTES } from "@/utils/constants";

interface Props {}

export default function SideNav() {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <div className={"h-full w-full p-2"}>
      <div className={"flex flex-col"}>
        {NAV_ROUTES.map((item) => {
          return (
            <NavButton
              key={item.name}
              currentPath={currentPath}
              pathname={item.path}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
