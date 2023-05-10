import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
// @ts-ignore
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  // @ts-ignore
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // Import Tailwind styles
        "@import":
          'url("tailwindcss/base.css"); url("tailwindcss/components.css"); url("tailwindcss/utilities.css");',
      },
    },
  },
});

export default theme;
