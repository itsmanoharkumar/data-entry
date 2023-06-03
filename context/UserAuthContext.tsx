import axios from "axios";
import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { setAuthState, setAuthUser } from "@/store/authSlice";

export default function UserAuthContext({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [cookies, , deleteCookies] = useCookies(["authToken"]);
  const { getCurrentUser } = useCurrentUser();

  async function getCurrentUserHandler() {
    try {
      const response = await getCurrentUser();
      dispatch(setAuthState(true));
      dispatch(setAuthUser(response));
    } catch (e) {
      dispatch(setAuthState(false));
      dispatch(setAuthUser(null));
      deleteCookies("authToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }
  useEffect(() => {
    if (cookies.authToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.authToken}`;
      getCurrentUserHandler();
    }
  }, [cookies]);

  return <>{children}</>;
}
