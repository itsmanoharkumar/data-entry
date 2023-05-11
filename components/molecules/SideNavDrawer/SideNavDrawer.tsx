import SideNav from "@/components/atoms/SideNav";
import { Drawer } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSideNavOpen, setIsSideNavOpen } from "@/store/appSlice";
import Toolbar from "@mui/material/Toolbar";
import { DRAWER_WIDTH } from "@/utils/constants";

interface Props {}

export default function SideNavDrawer() {
  const isSideNavOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(setIsSideNavOpen(false));
  };

  return (
    <Drawer
      variant={"temporary"}
      anchor={"left"}
      open={isSideNavOpen}
      onClose={onCloseHandler}
      onClick={onCloseHandler}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <SideNav />
    </Drawer>
  );
}
