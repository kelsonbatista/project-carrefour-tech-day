import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ad01 from "../../assets/images/ad01.png";
import ad02 from "../../assets/images/ad02.png";
import ad03 from "../../assets/images/ad03.png";
import ad04 from "../../assets/images/ad04.png";
import ad05 from "../../assets/images/ad05.png";
import ad06 from "../../assets/images/ad06.png";
import "./styles.css";

const ProductsCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel
      className="carousel"
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={0}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={3000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div>
        <img className="carousel__ad" src={ad01} alt="Oferta 1" />
      </div>
      <div>
        <img className="carousel__ad" src={ad02} alt="Oferta 2" />
      </div>
      <div>
        <img className="carousel__ad" src={ad03} alt="Oferta 3" />
      </div>
      <div>
        <img className="carousel__ad" src={ad04} alt="Oferta 4" />
      </div>
      <div>
        <img className="carousel__ad" src={ad05} alt="Oferta 5" />
      </div>
      <div>
        <img className="carousel__ad" src={ad06} alt="Oferta 6" />
      </div>
    </Carousel>
  );
};

export default ProductsCarousel;
