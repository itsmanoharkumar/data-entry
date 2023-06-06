export async function saveData(axiosInstance: any, apiPath: any, data: any) {
  debugger;
  const response = await axiosInstance?.post(apiPath, data);
  return response.data;
}
