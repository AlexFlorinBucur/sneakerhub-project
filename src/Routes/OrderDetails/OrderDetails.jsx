import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./OrderDetails.module.css";

const OrderDetails = () => {
  const params = useParams();
  const orders = useSelector((state) => state.order.orders);
  const currentOrderName = orders.find(
    (order) => order.orderName === params.orderName
  );

  const hasOrdersAvailable = orders.length !== 0 && currentOrderName;

  return (
    <>
      {hasOrdersAvailable ? (
        <div className={classes["order-data-info"]}>
          <div>
            <div className={classes["info-container"]}>
              <h2>Delivery Information</h2>
              <div>
                <strong>Name: </strong>
                <span>{`${currentOrderName.deliveryAdress.firstName} ${currentOrderName.deliveryAdress.lastName}`}</span>
              </div>
              <div>
                <strong>Delivery adress: </strong>
                <span>{`${currentOrderName.deliveryAdress.city}, ${currentOrderName.deliveryAdress.street}`}</span>
              </div>
              <div>
                <strong>Date of order: </strong>
                <span>{currentOrderName.orderDate}</span>
              </div>
              <div>
                <strong>Delivery status: </strong>
                <span>{currentOrderName.status}</span>
              </div>
            </div>
            <div className={classes["info-container"]}>
              <h2>Products</h2>
              <ul>
                {currentOrderName.orderedItems.map(
                  ({ id, size, image, amount, name, price }) => (
                    <li key={id + size + amount}>
                      <div className={classes["purchased-items"]}>
                        <div>
                          <img src={image} />
                        </div>
                        <div>{`${name} - SIZE ${size}`}</div>
                        <div>{`$${price.toFixed(2)} (x${amount})`}</div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div>
            <div className={classes["info-container"]}>
              <h2>Total</h2>
              {currentOrderName.voucher ? (
                <div className={classes["info-price"]}>
                  <span>Voucher:</span>
                  <strong>-{currentOrderName.voucher.voucherValue}%</strong>
                </div>
              ) : (
                <></>
              )}
              <div className={classes["info-price"]}>
                <span>Product price:</span>
                <strong>${currentOrderName.totalAmount.toFixed(2)}</strong>
              </div>
              <div className={classes["info-price"]}>
                <span>Delivery price:</span>
                <strong>${currentOrderName.deliveryPrice.toFixed(2)}</strong>
              </div>

              <div className={classes["info-price"]}>
                <strong>Total price:</strong>
                <strong>
                  $
                  {(
                    currentOrderName.totalAmount +
                    currentOrderName.deliveryPrice
                  ).toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes["order-empty"]}>
          There is no current order with that number for this account!
        </div>
      )}
    </>
  );
};

export default OrderDetails;
