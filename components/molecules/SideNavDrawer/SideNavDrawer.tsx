import SideNav from "@/components/atoms/SideNav";
import { SwipeableDrawer } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSideNavOpen, setIsSideNavOpen } from "@/store/appSlice";

interface Props {}

export default function SideNavDrawer() {
  const isSideNavOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(setIsSideNavOpen(false));
  };

  const onOpenHandler = () => {
    dispatch(setIsSideNavOpen(true));
  };

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={isSideNavOpen}
      onClose={onCloseHandler}
      onOpen={onOpenHandler}
    >
      <SideNav />
    </SwipeableDrawer>
  );
}
