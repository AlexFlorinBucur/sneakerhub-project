import React from "react";
import classes from "./Sneakers.module.css";
import { BiExpandVertical } from "react-icons/bi";
import { placeholders } from "./Placeholders";
import { AiOutlineArrowRight } from "react-icons/ai";

const Sneakers = () => {
  return (
    <section className={classes["section-products"]}>
      <div className={classes.sneakers}>
        <div className={classes["sneaker-gender"]}>SNEAKERS MEN</div>
        <div className={classes["search-filters"]}>
          {placeholders.filters.map(({ filterName }) => (
            <div className={classes["filter-cat"]} key={filterName}>
              <span>{filterName}</span>
              <BiExpandVertical />
            </div>
          ))}
        </div>
        <div className={classes["filter-list"]}>
          <ul>
            <li>
              <AiOutlineArrowRight />
              <a href="#">
                Jordan <span>(70)</span>
              </a>
            </li>
            <li>
              <AiOutlineArrowRight />
              <a href="#">
                Nike <span>(15)</span>
              </a>
            </li>
            <li>
              <AiOutlineArrowRight />
              <a href="#">
                Adidas <span>(70)</span>
              </a>
            </li>
            <li>
              <AiOutlineArrowRight />
              <a href="#">
                Adidas <span>(70)</span>
              </a>
            </li>
            <li>
              <AiOutlineArrowRight />
              <a href="#">
                Balenciaga <span>(70)</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={classes["simple-line"]}></div>
        <div className={classes["sneaker-products"]}>
          <ul>
            <li className={classes.sneaker}>
              <p className={classes["brand-name"]}>Air jordan</p>
              <img
                src="https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png"
                alt=""
              />
              <div className={classes["sneaker-name-size"]}>
                <p>Air Jordan 1 Retro High OG 'Shadow' 2018</p>
                <p>
                  Available: 3.5, 4, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
                  11.5,12.5
                </p>
              </div>
              <p className={classes["sneaker-price"]}>160 $</p>
            </li>
            <li className={classes.sneaker} onClick={() => console.log("pl")}>
              <p className={classes["brand-name"]}>Air jordan</p>
              <img
                src="https://image.goat.com/375/attachments/product_template_pictures/images/020/806/444/original/507844_00.png.png"
                alt=""
              />
              <div className={classes["sneaker-name-size"]}>
                <p>Air Jordan 4 Retro OG GS 'Bred' 2019</p>
                <p>
                  Available: 3.5, 4, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
                  11.5,12.5
                </p>
              </div>
              <p className={classes["sneaker-price"]}>160 $</p>
            </li>
            <li className={classes.sneaker}>
              <p className={classes["brand-name"]}>Air jordan</p>
              <img
                src="https://image.goat.com/375/attachments/product_template_pictures/images/008/654/900/original/52015_00.png.png"
                alt=""
              />
              <div className={classes["sneaker-name-size"]}>
                <p>Air Jordan 11 Retro 'Space Jam' 2016</p>
                <p>
                  Available: 3.5, 4, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
                  11.5,12.5
                </p>
              </div>
              <p className={classes["sneaker-price"]}>160 $</p>
            </li>
            <li className={classes.sneaker}>
              <p className={classes["brand-name"]}>Nike</p>
              <img
                src="https://image.goat.com/375/attachments/product_template_pictures/images/020/627/570/original/491891_00.png.png"
                alt=""
              />
              <div className={classes["sneaker-name-size"]}>
                <p>Air Max 97 'On Air: Neon Seoul'</p>
                <p>
                  Available: 3.5, 4, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
                  11.5,12.5
                </p>
              </div>
              <p className={classes["sneaker-price"]}>200 $</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sneakers;
