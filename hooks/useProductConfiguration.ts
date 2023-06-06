import { useEffect, useState } from "react";
import { getProductConfigurationApi } from "@/service/productConfigurationService";

interface ProductConfiguration {
  id: number;
  attributes: {
    name: string;
    tag: string;
    apiUrl: string;
    authToken: string;
  };
}

export default function useProductConfiguration(id: string) {
  const [productConfiguration, setProductConfiguration] =
    useState<ProductConfiguration | null>(null);

  useEffect(() => {
    async function asyncFunction() {
      try {
        const response = await getProductConfigurationApi(Number(id));
        debugger;
        setProductConfiguration(response?.data);
      } catch (error: any) {
        console.log(error?.response?.statusText);
      }
    }
    asyncFunction();
  }, [id]);

  return [productConfiguration];
}
