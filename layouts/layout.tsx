// components/layout.js

import Footer from "@/components/molecules/Footer";
import ResponsiveAppBar from "@/components/molecules/ResponsiveAppBar";
import { selectThemeMode } from "@/store/appSlice";
import { getTheme } from "@/theme";
import { THEME_MODE } from "@/types/types";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useSelector(selectThemeMode);
  const theme = useMemo(() => {
    const enableDarkMode = themeMode
      ? themeMode === THEME_MODE.DARK
      : prefersDarkMode;
    return getTheme({
      enableDarkMode,
    } as any);
  }, [prefersDarkMode, themeMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Grid minHeight={"100vh"} sx={{ overflow: "auto" }} container>
          <Grid
            xs={12}
            sx={{
              minHeight: "calc(100vh)",
              pt: "64px",
            }}
          >
            <Container
              maxWidth={"xl"}
              sx={{
                p: 2,
              }}
            >
              {children}
            </Container>
          </Grid>
          <Grid minWidth={"100%"}>
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
