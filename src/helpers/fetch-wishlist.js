import { sneakerActions } from "../store/sneakers";

export const fetchWishlist =
  (isLogout = false) =>
  async (dispatch) => {
    let userId = localStorage.getItem("userId");
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    const wishData = {
      wishlist,
      uniqueId: userId,
    };

    try {
      const getWishDataForCurrAcc = `?orderBy="uniqueId"&equalTo="${userId}"`;

      const response = await fetch(
        "https://react-shoes-project-default-rtdb.firebaseio.com/wishlist.json" +
          getWishDataForCurrAcc
      );

      const dataForCurrAcc = await response.json();

      if (!response.ok || dataForCurrAcc.error) {
        throw new Error("Something went wrong!");
      }

      const keyWithUniqueId = Object.keys(dataForCurrAcc).find(
        (key) => dataForCurrAcc[key].uniqueId === userId
      );

      if (!isLogout) {
        const wishlistData = keyWithUniqueId
          ? dataForCurrAcc[keyWithUniqueId].wishlist || []
          : [];

        dispatch(sneakerActions.updateWishData(wishlistData));
      }

      if (isLogout) {
        // setUpData
        await fetch(
          `https://react-shoes-project-default-rtdb.firebaseio.com/wishlist/${
            keyWithUniqueId ? keyWithUniqueId : ""
          }.json`,
          {
            method: keyWithUniqueId ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(wishData),
          }
        );
        dispatch(sneakerActions.updateWishData([]));
      }
    } catch (err) {
      console.log(err);
    }
  };
