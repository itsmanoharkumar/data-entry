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
import { v4 as uuidv4 } from "uuid";

const MKKeyComboSubcategoryMap: any = {
  Basic: "1",
  "Jumping Attacks": "2",
  "Hop Attacks": "3",
  "Getup Attacks": "4",
  "Flawless Block Attacks": "5",
  Throws: "6",
  "Roll Escapes": "7",
  "Air Escape": "8",
  "Kombo Attacks": "9",
  "Special Moves": "10",
  "Fatal Blow": "11",
  Fatalities: "12",
  Friendship: "13",
  Brutalities: "14",
  Abilities: "15",
};
let validateComboCategory = (data: any[]) => {
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

function validateCharacterVariationData(data: any[]) {
  const requiredFields = ["name", "characterId"];
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

function validateCharacterData(data: any[]) {
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
}

function validateComboSubCategory(data: any[]) {
  const requiredFields = ["name", "categoryId"];
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

function validateCombo(data: any[]) {
  const requiredFields = ["name", "inputCommands"];
  const columnNames = [
    "name",
    "category",
    "subCategory",
    "inputCommands",
    "moveType",
    "damage",
    "blockDamage",
    "fBlockDamage",
    "startUp",
    "active",
    "recovery",
    "cancel",
    "hitAdv",
    "blockAdv",
    "fBlockAdv",
    "isCancellable",
    "hasAmplify",
    "isEquipped",
    "specialNotes",
    "notes",
    "mk_character",
  ];
  let isValid = true;
  const firstRow = data[0];
  if (firstRow) {
    const keys = Object.keys(firstRow);
    if (keys.length !== columnNames.length) {
      isValid = false;
    }
    keys.forEach((key) => {
      if (!columnNames.includes(key)) {
        isValid = false;
      }
    });
  }
  if (!isValid) {
    return false;
  }
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
  CHARACTERS = "/mkcharacters",
  COMBO_CATEGORY = "/mkcombocats",
  COMBO_SUBCATEGORY = "/mkcombosubcats",
  COMBO = "/mkcombos",
}

const apiRoutesMapData = [
  {
    label: "Characters",
    value: API_ROUTES.CHARACTERS,
    validate: validateCharacterData,
  },
  {
    label: "Combo Category",
    value: API_ROUTES.COMBO_CATEGORY,
    validate: validateComboCategory,
  },
  {
    label: "Combo SubCategory",
    value: API_ROUTES.COMBO_SUBCATEGORY,
    validate: validateComboSubCategory,
  },
  {
    label: "Combo",
    value: API_ROUTES.COMBO,
    validate: validateCombo,
  },
];

export default function GGTheGamingGuide() {
  const [baseUrl, setBaseUrl] = useState<string | null>("");
  const [authToken, setAuthToken] = useState<string | null>("");
  const [productConfiguration] = useProductConfiguration("2");
  const [selectedApiRoute, setSelectedApiRoute] = useState(API_ROUTES.COMBO);
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

  async function saveCharacters() {
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
  async function saveComboCategory() {
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

  async function saveComboSubCategory() {
    const errorList: any[] = [];
    const successList: any[] = [];
    const dataList: any[] = [];
    csvData?.forEach((item: any) => {
      const data = {
        data: {
          name: item?.name?.trim(),
          category: +item?.categoryId,
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
  async function saveCombo() {
    const errorList: any[] = [];
    const successList: any[] = [];
    const dataList: any[] = [];
    const frameDataId = uuidv4();
    const moveDataId = uuidv4();
    csvData?.forEach((item: any) => {
      const data = {
        data: {
          name: item.name,
          combo: item.inputCommands,
          frameData: {
            id: frameDataId,
            startUp: item.startUp || null,
            active: item.active || null,
            recovery: item.recovery || null,
            cancel: item.cancel || null,
            hitAdv: item.hitAdv || null,
            blockAdv: item.blockAdv || null,
            fBlockAdv: item.fBlockAdv || null,
          },
          moveData: {
            id: moveDataId,
            blockDamage: item.blockDamage || null,
            damage: item.damage || null,
            fBlockDamage: item.fBlockDamage || null,
            moveType: item.moveType || null,
            specialNotes: item.specialNotes,
            notes: item.notes,
          },
          subcategory: MKKeyComboSubcategoryMap[item?.subCategory],
          hasAmplify: ["true"].includes(item.hasAmplify?.toLowerCase()),
          isEquipped: ["true"].includes(item.isEquipped?.toLowerCase()),
          isCancellable: ["true"].includes(item.isCancellable?.toLowerCase()),
          character: item.mk_character,
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
              if (selectedApiRoute === API_ROUTES.CHARACTERS) {
                ({ errorList, successList, dataList } = await saveCharacters());
                handleErrorSuccessData(errorList, successList, dataList);
              }
              if (selectedApiRoute === API_ROUTES.COMBO_CATEGORY) {
                ({ errorList, successList, dataList } =
                  await saveComboCategory());
                handleErrorSuccessData(errorList, successList, dataList);
              }
              if (selectedApiRoute === API_ROUTES.COMBO_SUBCATEGORY) {
                ({ errorList, successList, dataList } =
                  await saveComboSubCategory());
                handleErrorSuccessData(errorList, successList, dataList);
              }
              if (selectedApiRoute === API_ROUTES.COMBO) {
                ({ errorList, successList, dataList } = await saveCombo());
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
        <title>GG The Gaming Guide</title>
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
            GG The Gaming Guide
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
