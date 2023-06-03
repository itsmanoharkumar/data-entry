import { Box } from "@mui/material";

interface Props {}

export default function Footer({}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          height: "8px",
          backgroundColor: "primary.main",
        }}
      ></Box>
    </Box>
  );
}
