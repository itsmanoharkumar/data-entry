import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSideNavOpen, setIsSideNavOpen } from "@/store/appSlice";

interface Props {}

export default function TopHeader() {
  const dispatch = useDispatch();
  const isSideNavOpen = useSelector(selectIsSideNavOpen);

  function onClickHandler() {
    dispatch(setIsSideNavOpen(!isSideNavOpen));
  }

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onClickHandler}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Data Entry Helper
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
