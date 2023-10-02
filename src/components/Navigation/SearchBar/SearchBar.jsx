import React, { useEffect, useState, useRef } from "react";
import Modal from "../../UI/Modal";
import Drawer from "../../UI/Drawer";
import classes from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, fetchSneakers } from "../../../store/sneakers";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = ({ onCloseModal, show }) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector((state) => state.sneakerData.searchResults);

  const getRequestedArticles = (event) => {
    event.preventDefault();
    navigate(`/search/${enteredFilter}`);
    onCloseModal();
    setEnteredFilter("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter.trim().length !== 0) {
        dispatch(fetchSneakers(null, null, enteredFilter));
      }
    }, 700);

    return () => {
      if (enteredFilter.length === 0) {
        dispatch(cartActions.resetSearchResults());
      }
      clearTimeout(timer);
    };
  }, [enteredFilter]);

  return (
    <Modal onClose={onCloseModal} show={show}>
      <Drawer
        onCloseModal={onCloseModal}
        show={show}
        cssClass={classes["search-bar"]}
        animationClassEnter={classes.ModalOpen}
        animationClassExit={classes.ModalClosed}
      >
        <form onSubmit={getRequestedArticles}>
          <input
            type="text"
            value={enteredFilter}
            onChange={(e) => setEnteredFilter(e.target.value)}
            className={classes["search-input"]}
            placeholder="What are you looking for?"
          />
        </form>
        {searchResults.length !== 0 && enteredFilter.length !== 0 && (
          <ul className={classes["result-search"]}>
            {searchResults.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/shopping/${item.gender}/${item.id}`}
                  onClick={() => {
                    onCloseModal();
                    setEnteredFilter("");
                    dispatch(cartActions.resetSearchResults());
                  }}
                >
                  <p className={classes["result"]}>{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Drawer>
    </Modal>
  );
};

export default SearchBar;
