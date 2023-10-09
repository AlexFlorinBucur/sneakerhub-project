import classes from "./OrderHistory.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../UI/Spinner";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const orders = useSelector((state) => state.order.orders);
  const isLoading = useSelector((state) => state.order.isLoading);
  const error = useSelector((state) => state.order.error);

  return (
    <>
      {isLoading && <Spinner />}
      {error && toast.error(error)}
      {!isLoading && (
        <table>
          <thead className={classes["order-thead"]}>
            <tr>
              <th className={classes["order-ref-head"]}>Order reference</th>
              <th className={classes["order-data-head"]}>Date</th>
              <th className={classes["order-data-head"]}>Total</th>
              <th className={classes["order-data-head"]}>Status</th>
              <th className={classes["order-data-head"]}>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderName}>
                <td className={classes["order-item"]}>{order.orderName}</td>
                <td className={classes["order-item"]}>{order.orderDate}</td>
                <td className={classes["order-item"]}>{order.totalAmount} $</td>
                <td className={classes["order-item"]}>{order.status}</td>
                <td className={classes["order-item"]}>
                  <Link to={`order/${order.orderName}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderHistory;
