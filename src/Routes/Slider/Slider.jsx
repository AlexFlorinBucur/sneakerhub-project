import React from "react";
import { useState } from "react";
import styles from "./Slider.module.css";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  let totalSlides;

  const slideImages = [
    {
      image: "/src/assets/image-carousel-1.jpg",
    },
    {
      image: "/src/assets/image-carousel-2.jpg",
    },
    {
      image: "/src/assets/image-carousel-3.jpg",
    },
  ];

  totalSlides = slideImages.length;

  function slide(action) {
    console.log(action, activeSlide, totalSlides - 1);

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

  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        {slideImages.map((slide, index) => {
          console.log(slide);
          return (
            <div
              className={`${styles.slide} 
              ${index === activeSlide ? styles.active : ""} 
              ${index === activeSlide + 1 ? styles.next : ""} 
              ${index === activeSlide - 1 ? styles.prev : ""} 
              
              ${
                activeSlide === 0 && index === totalSlides - 1
                  ? styles.prev
                  : ""
              }
              ${
                activeSlide === totalSlides - 1 && index === 0
                  ? styles.next
                  : ""
              }
              `}
              key={index}
            >
              <img src={slide.image} alt="" />
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => slide("next")}
      ></div>
      <div
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => slide("prev")}
      ></div>
    </div>
  );
};

export default Slider;
