import { cartActions } from "../store/cart";

export const fetchCartData = async (dispatch, method, isLogOut = false) => {
  let cartItems = JSON.parse(localStorage.getItem("items"));
  let totalAmount = localStorage.getItem("totalAmount");
  let userId = localStorage.getItem("userId");

  const getCartForCurrAcc = `?orderBy="uniqueId"&equalTo="${userId}"`;

  const resFromDBForCurrAcc = await fetch(
    "https://react-shoes-project-default-rtdb.firebaseio.com/cartPending.json" +
      getCartForCurrAcc
  );
  const dataForCurrAcc = await resFromDBForCurrAcc.json();

  const keyWithUniqueId = Object.keys(dataForCurrAcc).find(
    (key) => dataForCurrAcc[key].uniqueId === userId
  );

  if (cartItems?.length === 0 || !cartItems) {
    cartItems = dataForCurrAcc[keyWithUniqueId]
      ? dataForCurrAcc[keyWithUniqueId].orderedItems
      : [];
    totalAmount = dataForCurrAcc[keyWithUniqueId]
      ? dataForCurrAcc[keyWithUniqueId].totalAmount
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

    // method can be DELETE too: because before logout if we dont have items in cart and the server have items for current account we fetch first time items from server, then we put in local storage, then we come to this IF statement and we have method DELETE.

    // resFromDBForNextAction
    await fetch(
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
