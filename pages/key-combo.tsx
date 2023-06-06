import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import useProductConfiguration from "@/hooks/useProductConfiguration";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import CsvFileReader from "@/components/atoms/CsvFileReader";
import Head from "next/head";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { saveData } from "@/service/service";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAxiosInstance,
  setServerAuthToken,
  setServerBaseUrl,
} from "@/store/appSlice";
import MonacoEditor from "@/components/atoms/MonacoEditor";

let validateProduct = (data: any[]) => {
  const requiredFields = ["name"];
  let isValid = true;
  data.forEach((item) => {
    requiredFields.forEach((field) => {
      if (!item[field]) {
        isValid = false;
      }
    });
  });
  return isValid;
};

function validateShortcut(data: any[]) {
  const requiredFields = [
    "shortText",
    "macKeyCombo",
    "windowsKeyCombo",
    "productId",
    "shortcutCategoryId",
  ];
  let isValid = true;
  data.forEach((item) => {
    requiredFields.forEach((field) => {
      if (!item[field]) {
        isValid = false;
      }
    });
  });
  return isValid;
}

function validateShortcutCategory(data: any[]) {
  const requiredFields = ["name", "productId"];
  let isValid = true;
  data.forEach((item) => {
    requiredFields.forEach((field) => {
      if (!item[field]) {
        isValid = false;
      }
    });
  });
  return isValid;
}

enum API_ROUTES {
  SHORTCUT_CATEGORIES = "/shortcut-categories",
  SHORTCUTS = "/shortcuts",
  PRODUCTS = "/products",
}

const apiRoutesMapData = [
  {
    label: "Shortcut Categories",
    value: API_ROUTES.SHORTCUT_CATEGORIES,
    validate: validateShortcutCategory,
  },
  {
    label: "Shortcuts",
    value: API_ROUTES.SHORTCUTS,
    validate: validateShortcut,
  },
  {
    label: "Product",
    value: API_ROUTES.PRODUCTS,
    validate: validateProduct,
  },
];

export default function KeyCombo() {
  const [baseUrl, setBaseUrl] = useState<string | null>("");
  const [authToken, setAuthToken] = useState<string | null>("");
  const [productConfiguration] = useProductConfiguration("1");
  const [selectedApiRoute, setSelectedApiRoute] = useState("/shortcuts");
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [isDataValidated, setIsDataValidated] = useState(false);
  const axiosInstance = useSelector(selectAxiosInstance);
  const dispatch = useDispatch();
  const [errorList, setErrorList] = useState<any[]>([]);
  const [successList, setSuccessList] = useState<any[]>([]);
  const [errorTextData, setErrorTextData] = useState("");
  const [successTextData, setSuccessTextData] = useState("");

  useEffect(() => {
    try {
      if (errorList?.length > 0) {
        const data = JSON.stringify(errorList, null, 2);
        setErrorTextData(data);
      }
    } catch (e) {
      //
    }

    try {
      if (successList?.length > 0) {
        const data = JSON.stringify(successList, null, 2);
        setSuccessTextData(data);
      }
    } catch (e) {
      //
    }
  }, [successList, errorList]);

  useEffect(() => {
    if (productConfiguration) {
      setBaseUrl(productConfiguration?.attributes?.apiUrl);
      setAuthToken(productConfiguration?.attributes?.authToken);
    }
  }, [productConfiguration]);

  useEffect(() => {
    console.log(csvData);
  }, [csvData]);

  useEffect(() => {
    dispatch(setServerBaseUrl(baseUrl));
    dispatch(setServerAuthToken(authToken));
  }, [baseUrl, authToken]);

  function handleErrorSuccessData(
    errorList: any[],
    successList: any[],
    dataList: any[]
  ) {
    setErrorList(errorList);
    setSuccessList(successList);
    if (successList?.length === dataList?.length) {
      enqueueSnackbar("All Data saved successfully", {
        variant: "success",
      });
    } else if (errorList?.length === dataList?.length) {
      enqueueSnackbar("All Data failed to save", {
        variant: "error",
      });
    } else {
      if (successList?.length > 0) {
        enqueueSnackbar(`${successList?.length} Data saved successfully`, {
          variant: "success",
        });
      }
      if (errorList?.length > 0) {
        enqueueSnackbar(`${errorList?.length} Data failed to save`, {
          variant: "error",
        });
      }
    }
  }

  async function saveProduct() {
    const errorList: any[] = [];
    const successList: any[] = [];
    const dataList: any[] = [];
    csvData?.forEach((item: any) => {
      const data = {
        data: {
          name: item?.name?.trim(),
        },
      };
      dataList.push(data);
    });
    if (dataList?.length > 0) {
      for (const dataListElement of dataList) {
        try {
          const response = await saveData(
            axiosInstance,
            selectedApiRoute,
            dataListElement
          );
          successList.push(dataListElement);
        } catch (e: any) {
          errorList.push({
            data: dataListElement,
            error: e?.response?.data?.error?.details?.errors,
          });
        }
      }
    }
    return { errorList, successList, dataList };
  }
  async function saveShortcutCategory() {
    const errorList: any[] = [];
    const successList: any[] = [];
    const dataList: any[] = [];
    csvData?.forEach((item: any) => {
      const data = {
        data: {
          name: item?.name?.toLowerCase(),
          product: +item?.productId,
        },
      };
      dataList.push(data);
    });
    if (dataList?.length > 0) {
      for (const dataListElement of dataList) {
        try {
          const response = await saveData(
            axiosInstance,
            selectedApiRoute,
            dataListElement
          );
          successList.push(response?.data);
        } catch (e: any) {
          errorList.push({
            data: dataListElement,
            error: e?.response?.data?.error?.details?.errors,
          });
        }
      }
    }
    return { errorList, successList, dataList };
  }

  async function saveShortcut() {
    const errorList: any[] = [];
    const successList: any[] = [];
    const dataList: any[] = [];
    csvData?.forEach((item: any) => {
      const data = {
        data: {
          shortText: item?.shortText?.trim(),
          macKeyCombo: item?.macKeyCombo?.trim()?.replace(" ", " "),
          windowsKeyCombo: item?.windowsKeyCombo?.trim()?.replace(" ", " "),
          product: +item?.productId?.trim(),
          shortcut_category: [+item?.shortcutCategoryId?.trim()],
        },
      };
      dataList.push(data);
    });
    if (dataList?.length > 0) {
      for (const dataListElement of dataList) {
        try {
          const response = await saveData(
            axiosInstance,
            selectedApiRoute,
            dataListElement
          );
          successList.push(response?.data);
        } catch (e: any) {
          errorList.push({
            data: dataListElement,
            error: e?.response?.data?.error?.details?.errors,
          });
        }
      }
    }
    return { errorList, successList, dataList };
  }

  async function onSendDataToStrapi() {
    if (csvData && csvData?.length > 0) {
      const snackBarId = enqueueSnackbar("Sending data...", {
        variant: "info",
      });
      for (const item of apiRoutesMapData) {
        if (item.value === selectedApiRoute) {
          if (item?.validate) {
            const isValid = item.validate(csvData);
            if (isValid) {
              let errorList: any[], successList: any[], dataList: any[];
              if (selectedApiRoute === API_ROUTES.PRODUCTS) {
                ({ errorList, successList, dataList } = await saveProduct());
                handleErrorSuccessData(errorList, successList, dataList);
              }
              if (selectedApiRoute === API_ROUTES.SHORTCUTS) {
                ({ errorList, successList, dataList } = await saveShortcut());
                handleErrorSuccessData(errorList, successList, dataList);
              }
              if (selectedApiRoute === API_ROUTES.SHORTCUT_CATEGORIES) {
                ({ errorList, successList, dataList } =
                  await saveShortcutCategory());
                handleErrorSuccessData(errorList, successList, dataList);
              }
            } else {
              enqueueSnackbar("Data is invalid", {
                variant: "error",
              });
            }
          }
        }
      }
      closeSnackbar(snackBarId);
    }
  }

  function onValidateHandler() {
    const snackBarId = enqueueSnackbar("Validating...", {
      variant: "info",
    });
    let isValid = false;
    if (csvData && csvData?.length > 0) {
      apiRoutesMapData.forEach((item) => {
        if (item.value === selectedApiRoute) {
          if (item?.validate) {
            isValid = item.validate(csvData);
          }
        }
      });
    } else {
      isValid = false;
    }
    closeSnackbar(snackBarId);
    if (isValid) {
      enqueueSnackbar("Data is valid", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Data is invalid", {
        variant: "error",
      });
    }
    setIsDataValidated(isValid);
  }
  function clearAllData() {
    setCsvData(null);
    setIsDataValidated(false);
    setErrorList([]);
    setSuccessList([]);
    setErrorTextData("");
    setSuccessTextData("");
  }

  useEffect(() => {
    clearAllData();
  }, [selectedApiRoute]);

  function downloadFile(filename: string, data: any[]) {
    // download errorList to file
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <>
      <Head>
        <title>Key Combo</title>
      </Head>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography
            className={
              "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            }
            sx={{
              textTransform: "none",
              fontWeight: 900,
              mb: 4,
            }}
            variant={"h4"}
          >
            KeyCombo
          </Typography>
        </Grid>
        <Grid xs={6}>
          <ToggleButtonGroup
            exclusive={true}
            color="primary"
            value={selectedApiRoute}
            onChange={(event: any) => {
              setSelectedApiRoute(event.target.value);
              clearAllData();
            }}
          >
            {apiRoutesMapData.map((item) => {
              return (
                <ToggleButton key={item.label} value={item.value}>
                  {item.label}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
        <Grid xs={6}>
          <Button onClick={clearAllData}>Clear All</Button>
        </Grid>
        <Grid xs={6}>
          <TextField
            size={"small"}
            label={"Base URL"}
            fullWidth
            value={baseUrl}
            disabled
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            size={"small"}
            label={"API URL"}
            fullWidth
            value={selectedApiRoute}
            disabled
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            size={"small"}
            label={"Auth Token"}
            fullWidth
            value={authToken}
            disabled
          />
        </Grid>
        <Grid xs={6}>
          <CsvFileReader
            selectedApiRoute={selectedApiRoute}
            onComplete={setCsvData}
          />
        </Grid>
        <Grid xs={6} container spacing={2}>
          <Grid>
            {csvData && (
              <Button variant={"contained"} onClick={onValidateHandler}>
                Validate
              </Button>
            )}
          </Grid>
          <Grid>
            {isDataValidated && csvData && (
              <Button variant={"contained"} onClick={onSendDataToStrapi}>
                Send To Strapi
              </Button>
            )}
          </Grid>
          <Grid>
            {errorTextData && (
              <Button
                variant={"contained"}
                onClick={() => {
                  downloadFile("errorList", errorList);
                }}
              >
                Download Error data
              </Button>
            )}
          </Grid>
          <Grid>
            {successTextData && (
              <Button
                variant={"contained"}
                onClick={() => {
                  downloadFile("successList", successList);
                }}
              >
                Download Success data
              </Button>
            )}
          </Grid>
        </Grid>
        {successTextData && (
          <Grid xs={6}>
            <div className={"w-full p-2 mt-2 rounded"}>
              <div className={"font-medium"}>Success Data</div>
              <MonacoEditor data={successTextData} />
            </div>
          </Grid>
        )}
        {errorTextData && (
          <Grid xs={6}>
            <div className={"w-full p-2 mt-2 rounded"}>
              <div className={"font-medium"}>Error Data</div>
              <MonacoEditor data={errorTextData} />
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
}
