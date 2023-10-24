import React, { useState, useEffect } from "react";
import classes from "./Slider.module.css";
import { Link } from "react-router-dom";
import { slideImages } from "../../components/Navigation/Placeholders";

const slide = (action, activeSlide, setActiveSlide) => {
  const totalSlides = slideImages.length;

  if (action === "next") {
    if (activeSlide < totalSlides - 1) {
      setActiveSlide((previousState) => previousState + 1);
    } else {
      setActiveSlide(0);
    }
  } else if (action === "prev") {
    if (activeSlide === 0) {
      setActiveSlide(totalSlides - 1);
    } else {
      setActiveSlide((previousState) => previousState - 1);
    }
  }
};

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      slide("next", activeSlide, setActiveSlide);
    }, 7000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [activeSlide]);

  return (
    <div className={classes.slider}>
      <div className={classes.slides}>
        {slideImages.map((slide, index) => {
          return (
            <div
              {...(index === activeSlide
                ? { className: `${classes.slide} ${classes.active}` }
                : { className: classes.slide })}
              key={index}
            >
              <picture>
                <source srcSet={slide.imageWebp} type="image/webp" />
                <source srcSet={slide.imageMin} type="image/jpg" />
                <img src={slide.imageMin} alt={slide.information} />
              </picture>
              <span className={classes["caption"]}>
                <h1 className={classes["slider-title"]}>{slide.header}</h1>
                <div className={classes["title-link"]}>
                  <h3>{slide.information}</h3>
                  <Link to={slide.link} title={slide.header}>
                    <span>{slide.linkText}</span>
                  </Link>
                </div>
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={`${classes.arrow} ${classes.next}`}
        onClick={() => slide("next", activeSlide, setActiveSlide)}
      ></div>
      <div
        className={`${classes.arrow} ${classes.prev}`}
        onClick={() => slide("prev", activeSlide, setActiveSlide)}
      ></div>
    </div>
  );
};

export default Slider;
