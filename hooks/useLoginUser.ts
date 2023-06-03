import { loginApi, LoginRequestPayload } from "@/service/authentication";
import { useSnackbar } from "notistack";

export function useLoginUser() {
  const { enqueueSnackbar } = useSnackbar();

  async function loginUser(payload: LoginRequestPayload) {
    try {
      if (!payload?.identifier) {
        enqueueSnackbar("Please enter email or username", {
          variant: "warning",
        });
        return;
      }
      if (!payload?.password) {
        enqueueSnackbar("Please enter password", { variant: "warning" });
        return;
      }
      const response = await loginApi(payload);
      enqueueSnackbar("Success", { variant: "success" });
      return response;
    } catch (e: any) {
      let errorMessage = "Failed to login";
      if (e.response?.status === 400) {
        console.log(e.response?.data.error.message);
        if (e.response?.data?.error?.message?.includes("must be unique")) {
          errorMessage = "You already have an account";
        }
        if (e.response?.data?.error?.message?.includes("must be a valid")) {
          errorMessage = "Invalid Email";
        }
      }
      if (process.env.NODE_ENV === "development") {
        enqueueSnackbar(e.response?.data?.error?.message || errorMessage, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    }
  }

  return {
    loginUser,
  };
}
