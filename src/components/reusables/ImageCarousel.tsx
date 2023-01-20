import { Paper, styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "../../styles/components/imageCarousel.scss";

interface IImageCarouselProps {
  imgUrl: string[];
}

export const ImageCarousel = (props: IImageCarouselProps) => {
  let carouselHTML = props.imgUrl.map((img, i) => {
    return (
      <Paper square key={i}>
        <img
          className="carouselImg"
          src={require(`../../assets/${img}`)}
          alt={`../../assets/${img}`}
        />
      </Paper>
    );
  });

  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "70vw",
    },
  }));

  return (
    <section className="carouselContainer">
      <Root>
        <Carousel sx={{ width: "100%", height: "100%" }}>
          {carouselHTML}
        </Carousel>
      </Root>
    </section>
  );
};
