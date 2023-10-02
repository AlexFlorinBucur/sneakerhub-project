import React, { useState, useEffect } from "react";
import classes from "./Slider.module.css";
import { Link } from "react-router-dom";
import { slideImages } from "../../components/Navigation/Placeholders";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = slideImages.length;

  function slide(action) {
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
  }

  useEffect(() => {
    const intervalId = setTimeout(() => {
      slide("next");
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
              // EXPLICATIE
              // className={`${classes.slide}
              // ${index === activeSlide ? classes.active : "1"}
              // ${index === activeSlide + 1 ? classes.next : "2"}
              // ${index === activeSlide - 1 ? classes.prev : "3"}
              // ${
              //   activeSlide === 0 && index === totalSlides - 1
              //     ? classes.prev
              //     : "4"
              // }
              // ${
              //   activeSlide === totalSlides - 1 && index === 0
              //     ? classes.next
              //     : "5"
              // }

              // Simplificare
              //   className={`${classes.slide}
              // ${index === activeSlide ? classes.active : "1"}
              // `}

              // Simplificare 2
              {...(index === activeSlide
                ? { className: `${classes.slide} ${classes.active}` }
                : { className: classes.slide })}
              key={index}
            >
              <img src={slide.image} alt="" />
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
        onClick={() => slide("next")}
      ></div>
      <div
        className={`${classes.arrow} ${classes.prev}`}
        onClick={() => slide("prev")}
      ></div>
    </div>
  );
};

export default Slider;
