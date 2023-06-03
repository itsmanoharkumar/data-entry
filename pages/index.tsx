import Grid from "@mui/material/Unstable_Grid2";
import Link from "@/components/atoms/Link";
import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ggImage from "@/images/ggthegamingguide.jpg";
import keyCombo from "@/images/keycombo.jpg";

const PRODUCT_LIST = [
  {
    id: 1,
    name: "GGTheGamingGuide",
    routeId: "/gg-the-gaming-guide",
    image: ggImage,
  },
  {
    name: "KeyCombo",
    id: 2,
    routeId: "/key-combo",
    image: keyCombo,
  },
];

export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        {PRODUCT_LIST.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={6} lg={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    height: "200px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    className={"object-cover w-full h-full"}
                    src={product.image}
                    alt={product.name}
                  />
                </Box>
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
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={product.routeId}>
                  <Button variant={"contained"}>Enter Data</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
