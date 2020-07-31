const responsiveSettings = [
  {
    breakpoint: 1366,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
    },
  },
];

const carouselSettings = {
  arrows: false,
  draggable: false,
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: responsiveSettings,
  touchThreshold: 3,
  centerPadding: (window.innerWidth > 720 && '54px') || '39px',
};

export default carouselSettings;
