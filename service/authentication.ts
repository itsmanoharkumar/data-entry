import { API_ROUTES } from "@/helpers/constants";
import { handleNetworkError } from "@/helpers/helper";
import axios, { AxiosResponse } from "axios";

export interface RegisterRequestPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequestPayload {
  identifier: string;
  password: string;
}

export interface RegisterResponsePayload {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export async function registerApi(
  payload: RegisterRequestPayload
): Promise<RegisterResponsePayload> {
  const response: AxiosResponse = await axios.post(
    API_ROUTES.register,
    payload
  );
  return response.data;
}

interface LoginResponsePayload {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export async function loginApi(
  payload: LoginRequestPayload
): Promise<LoginResponsePayload> {
  try {
    const response: AxiosResponse = await axios.post(API_ROUTES.login, payload);
    return response.data;
  } catch (e: any) {
    throw handleNetworkError(e);
  }
}

export async function getCurrentUserApi() {
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.me);
    return response.data;
  } catch (e: any) {
    throw handleNetworkError(e);
  }
}
