import Link from "@/components/atoms/Link";
import { useLoginUser } from "@/hooks/useLoginUser";
import SignInImage from "@/images/sign-in.svg";
import { selectAuthState } from "@/store/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["authToken"]);
  const navigate = useRouter();
  const authState = useSelector(selectAuthState);
  const { loginUser } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  if (authState) {
    navigate.replace("/");
  }

  async function handleLogin() {
    const response = await loginUser({ identifier: usernameOrEmail, password });
    if (response?.jwt) {
      setCookie("authToken", response.jwt, { path: "/" });
    }
  }

  return (
    <Container maxWidth={"xl"}>
      <Grid container my={10} justifyContent={"center"} spacing={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ mb: 1.5 }} variant="h3" component="div">
            Log In
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Unlock Efficiency and Take Command of Your Digital Experience
          </Typography>
          <Stack spacing={2}>
            <TextField
              autoFocus={true}
              label="Email or Username"
              variant="outlined"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disableFocusRipple={true}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onKeyDownCapture={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Log In
            </Button>
          </Stack>
          <div className="flex justify-between pt-2">
            <Link href={"/signup"}>
              <Button variant="text" color="inherit">
                Create Account
              </Button>
            </Link>
            <Link href={"/resetPassword"}>
              <Button variant="text" color="primary">
                Forgot Password?
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid
          sx={{
            display: { xs: "none", sm: "flex", md: "flex" },
          }}
          sm={6}
          p={2}
          justifyContent={"center"}
          display={"flex"}
        >
          <Image src={SignInImage} alt="SignIn" className={"w-full"} />
        </Grid>
      </Grid>
    </Container>
  );
}
