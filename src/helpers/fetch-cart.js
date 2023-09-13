import { cartActions } from "../store/cart";

export const fetchCartData = async (dispatch, method, isLogOut = false) => {
  let cartItems = JSON.parse(localStorage.getItem("items"));
  let totalAmount = localStorage.getItem("totalAmount");
  let userId = localStorage.getItem("userId");

  const response2 = await fetch(
    "https://react-shoes-project-default-rtdb.firebaseio.com/cartPending.json"
  );
  const data2 = await response2.json();
  const keyWithUniqueId = Object.keys(data2).find(
    (key) => data2[key].uniqueId === userId
  );

  if (cartItems?.length === 0 || !cartItems) {
    cartItems = data2[keyWithUniqueId]
      ? data2[keyWithUniqueId].orderedItems
      : [];
    totalAmount = data2[keyWithUniqueId]
      ? data2[keyWithUniqueId].totalAmount
      : [];
    if (!isLogOut) {
      localStorage.setItem("items", JSON.stringify(cartItems));
      localStorage.setItem("totalAmount", totalAmount);
      dispatch(cartActions.updateCart({ items: cartItems, totalAmount }));
    }
  }

  if (cartItems?.length !== 0) {
    // Facem cererea "PUT" pentru a actualiza datele vechi de pe server.
    // Facem cererea "POST" pentru a posta datele pe server daca nu avem setate unele.
    const response3 = await fetch(
      `https://react-shoes-project-default-rtdb.firebaseio.com/cartPending/${
        keyWithUniqueId ? keyWithUniqueId : ""
      }.json`,
      {
        method: keyWithUniqueId ? method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderedItems: cartItems,
          uniqueId: userId,
          totalAmount,
        }),
      }
    );
  }
};
