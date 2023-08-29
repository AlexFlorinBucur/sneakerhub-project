import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  sneakersData: [],
  isLoading: false,
  error: null,
  activeFilters: {},
};

// Create a slice for the reducer
const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {
    setSneakersData(state, action) {
      state.sneakersData = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setActiveFilters(state, action) {
      state.activeFilters = {
        ...state.activeFilters,
        ...action.payload,
      };
    },
    removeActiveFilter(state, action) {
      const filterKey = action.payload;
      delete state.activeFilters[filterKey];
    },
    resetActiveFilters(state) {
      state.activeFilters = {};
    },
  },
});

export const cartActions = sneakersSlice.actions;

export default sneakersSlice.reducer;

// create a thunk function
export const fetchSneakers = (params, query) => async (dispatch) => {
  dispatch(cartActions.setIsLoading(true));
  dispatch(cartActions.setError(null));
  dispatch(cartActions.setActiveFilters({}));

  try {
    const response = await fetch(
      "https://react-shoes-project-default-rtdb.firebaseio.com/sneakers.json"
    );

    const data = await response.json();

    if (!response.ok || data == null) {
      throw new Error("Something went wrong!");
    }

    const transformedData = data
      .map((sneakerData) => {
        return {
          id: sneakerData.id,
          sneakerImage: sneakerData.main_picture_url,
          brandName: sneakerData.brand_name,
          name: sneakerData.name,
          sizeRange: sneakerData.size_range,
          retailPrice: sneakerData.retail_price_cents / 100,
          storyHtml: sneakerData.story_html,
          details: sneakerData.details,
          releaseDateUnix: sneakerData.release_date_unix,
          sku: sneakerData.sku,
          designer: sneakerData.designer,
          nickname: sneakerData.nickname,
          color: sneakerData.color,
          upperMaterial: sneakerData.upper_material,
          category: sneakerData.category,
          gender: sneakerData.gender[0],
        };
      })
      .filter((sneaker) => {
        // Filtrare comună bazată pe params
        return params.id
          ? sneaker.id === Number(params.id) && sneaker.gender === params.gender
          : sneaker.gender === params.gender;
      });

    // bonus filter
    if (query) {
      const valueObj = {};
      for (const key of query.keys()) {
        valueObj[key] = query.get(key);
        dispatch(cartActions.setActiveFilters(valueObj));
      }
      const filteredData = transformedData.filter((sneaker) => {
        if (sneaker.gender !== params.gender) {
          return false;
        }

        // Verificam daca obiectul valueObj contine cheia "brands" si daca brandul corespunde
        if ("brands" in valueObj && sneaker.brandName !== valueObj.brands) {
          return false;
        }

        // Verificam daca obiectul valueObj contine cheia "categories" si daca categoria corespunde
        if (
          "categories" in valueObj &&
          !sneaker.category.includes(valueObj.categories)
        ) {
          return false;
        }

        // Verificam daca obiectul valueObj contine cheia "price" si daca pretul se incadreaza in intervalul specificat
        if ("price" in valueObj) {
          const priceRange = valueObj.price.split("-").map(Number);
          const minPrice = priceRange[0];
          const maxPrice = priceRange[1];
          const sneakerPrice = sneaker.retailPrice;

          if (sneakerPrice < minPrice || sneakerPrice > maxPrice) {
            return false;
          }
        }

        // Verificăm dacă obiectul valueObj conține cheia "size" și dacă mărimea este specificată în array-ul size_range al sneaker-ului
        if (
          "size" in valueObj &&
          !sneaker.sizeRange.includes(Number(valueObj.size))
        ) {
          return false;
        }

        // Returnam true daca obiectul trece toate verificarile
        return true;
      });
      dispatch(cartActions.setSneakersData(filteredData));
    } else {
      dispatch(cartActions.setSneakersData(transformedData));
    }
  } catch (err) {
    dispatch(cartActions.setError(err.message));
  }

  dispatch(cartActions.setIsLoading(false));
};
