import { getCurrentUserApi } from "@/service/authentication";
import { setAuthState, setAuthUser } from "@/store/authSlice";
import axios from "axios";
import { ReactNode } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

export default function UserAuthContext({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["authToken"]);
  delete axios.defaults.headers.common["Authorization"];
  if (cookies.authToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookies.authToken}`;
    getCurrentUserApi().then((res) => {
      dispatch(setAuthState(true));
      dispatch(setAuthUser(res));
    });
  } else {
    dispatch(setAuthState(false));
    dispatch(setAuthUser(null));
  }
  return <>{children}</>;
}
