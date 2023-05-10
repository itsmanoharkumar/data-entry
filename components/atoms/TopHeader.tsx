import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { setIsSideNavOpen } from "@/store/appSlice";

interface Props {}

export default function TopHeader() {
  const dispatch = useDispatch();
  function onClickHandler() {
    dispatch(setIsSideNavOpen(true));
  }

  return (
    <AppBar position="static">
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
