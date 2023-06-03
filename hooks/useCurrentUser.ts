import { getCurrentUserApi } from "@/service/authentication";
import { useSnackbar } from "notistack";

export function useCurrentUser() {
  const { enqueueSnackbar } = useSnackbar();

  async function getCurrentUser() {
    const response = await getCurrentUserApi();
    enqueueSnackbar("Success", { variant: "success" });
    return response;
  }

  return {
    getCurrentUser,
  };
}
