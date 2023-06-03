import axios from "axios";

export async function getProductConfigurationApi(id: number) {
  const response = await axios.get("/product-configurations/" + id);
  return response.data;
}
