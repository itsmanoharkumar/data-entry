import { IMAGE_SIZE } from "@/types/enums";
import { StrapiImageData } from "@/types/types";
import cookie from "cookie";

export class CustomError extends Error {
  status = 500;
}

function extractErrorPaths(error: any) {
  const required: any[] = [];
  const unique: any[] = [];

  function extractPathsRecursive(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (item.path) {
          if (item.message.includes("is required")) {
            required.push(...item?.path);
          }
          if (item.message.includes("must be unique")) {
            unique.push(...item?.path);
          }
        }
        extractPathsRecursive(item);
      });
    } else if (typeof obj === "object" && obj !== null) {
      for (let key in obj) {
        extractPathsRecursive(obj[key]);
      }
    }
  }

  if (error && error.details && error.details.errors) {
    extractPathsRecursive(error.details.errors);
  }

  return {
    required,
    unique,
  };
}

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function handleNetworkError(networkError: any) {
  const response = networkError?.response;
  const data = response?.data;
  const status = response?.status;
  const error = new CustomError();
  error.stack = networkError?.stack;
  error.status = status;
  if (status === 400) {
    error.name = data?.error?.name;
    const { required, unique } = extractErrorPaths(data?.error);
    const requiredKeys = required?.join(", ");
    const uniqueKeys = unique?.join(", ");
    const requiredKeyErrorText =
      requiredKeys.length > 0 ? `Please enter ${requiredKeys}.` : "";
    const uniqueKeyErrorText =
      uniqueKeys.length > 0 ? `${uniqueKeys} already exist` : "";
    error.message = `${requiredKeyErrorText} ${uniqueKeyErrorText}`;
  } else {
    error.name = networkError?.name;
    error.message = `Internal Server Error`;
  }
  console.log(networkError);
  return error;
}

export function extractImageData(
  imageData: StrapiImageData,
  imageSize: IMAGE_SIZE
): { width: number; height: number; src: string } {
  const formatData = imageData?.attributes?.formats[imageSize];
  const { width, height, url } = formatData || {};
  let src = url;
  if (url?.startsWith("/")) {
    src = url
      .replace("/", process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/")
      .replace("api/", "");
  }
  return {
    width,
    height,
    src,
  };
}
