import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import useProductConfiguration from "@/hooks/useProductConfiguration";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function KeyCombo() {
  const [baseUrl, setBaseUrl] = useState<string | null>("");
  const [authToken, setAuthToken] = useState<string | null>("");
  const productConfiguration = useProductConfiguration(1);
  const [apiRoute, setApiRoute] = useState("");

  useEffect(() => {
    if (productConfiguration) {
      setBaseUrl(productConfiguration?.attributes?.apiUrl);
      setAuthToken(productConfiguration?.attributes?.authToken);
    }
  }, [productConfiguration]);

  console.log(productConfiguration);
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography
            className={
              "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            }
            sx={{
              textTransform: "none",
              fontWeight: 900,
            }}
            variant={"h4"}
          >
            KeyCombo
          </Typography>
        </Grid>
        <Grid xs={6}>
          <TextField label={"Base URL"} fullWidth value={baseUrl} disabled />
        </Grid>
        <Grid xs={6}>
          <TextField label={"API URL"} fullWidth value={apiRoute} disabled />
        </Grid>
        <Grid xs={8}>
          <TextField
            label={"Auth Token"}
            fullWidth
            value={authToken}
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
}
