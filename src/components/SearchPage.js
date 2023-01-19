import React from "react";
import classes from "./SearchPage.module.css";
import ErrorIcon from "./ErrorIcon.svg";
import axios from "axios";
import { useState } from "react";

const SearchPage = () => {
  const [sentItems, setSentItems] = useState([]);
  const [receivedItems, setReceivedItems] = useState([]);
  const [error, setError] = useState(false);

  const getUserItems = (event) => {
    const userItems = event.target.value.split("\n");
    setSentItems(userItems);
  };

  const sendAndGetData = async () => {
    if (sentItems.length === 0) return;
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer Vdhgor7ChDlFoNm7JezbOpwicH2RRT2s`,
        },
      };

      const body = {
        searchArticles: sentItems,
      };

      const result = await axios.post(
        "https://germsp.ru/test-search-products",
        body,
        config
      );
      setReceivedItems(result.data);
      console.log(result);
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  };

  return (
    <React.Fragment>
      <div className={classes.appContainer}>
        <h2 className={classes.mainHeader}>Товары</h2>
        {error && (
          <div className={classes.errorArea}>
            <img src={ErrorIcon} alt="icon" className={classes.iconError} />
            <span className={classes.errorText}>
              Внутренняя ошибка сервера. Попробуйте снова.
            </span>
          </div>
        )}
        <textarea
          className={classes.searchInput}
          onChange={getUserItems}
          name="Text1"
          cols="50"
          rows="6"
        ></textarea>
        <button
          className={classes.searchBtn}
          type="button"
          onClick={sendAndGetData}
        >
          Поиск
        </button>

        {receivedItems.length !== 0 && (
          <div className={classes.itemsContainer}>
            <div className={classes.itemsHeadingsArea}>
              <span className={classes.itemHead}>№</span>
              <span className={`${classes.itemHead} ${classes.itemHeadID}`}>
                ID
              </span>
              <span
                className={`${classes.itemHead} ${classes.itemHeadArticle}`}
              >
                Артикул
              </span>
              <span className={`${classes.itemHead} ${classes.itemHeadName}`}>
                Название
              </span>
              <span className={`${classes.itemHead} ${classes.itemHeadBrand}`}>
                бренд
              </span>
              <span className={`${classes.itemHead} ${classes.itemHeadPrice}`}>
                цена, RUB
              </span>
              <span className={classes.itemHead}>количество</span>
            </div>

            {receivedItems.map((ele, index) => (
              <div key={index} className={classes.wholeItem}>
                <span className={classes.itemText}>{index + 1}</span>
                <span className={classes.itemText}>{ele.id}</span>
                <span
                  className={`${classes.itemText} ${classes.itemTextArticle}`}
                >
                  {ele.article}
                </span>
                <span className={`${classes.itemText} ${classes.itemTextName}`}>
                  {ele.name}
                </span>
                <span
                  className={`${classes.itemText} ${classes.itemTextBrand}`}
                >
                  {ele.brand.name}
                </span>
                <span
                  className={`${classes.itemText} ${classes.itemTextBrand}`}
                >
                  {ele.price}
                </span>
                <span className={classes.itemText}>{ele.quantity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
