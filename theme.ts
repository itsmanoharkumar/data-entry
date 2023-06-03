import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.

export function getTheme({ enableDarkMode }: { enableDarkMode: boolean }) {
  return createTheme({
    palette: {
      mode: enableDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
    },
  });
}
