import { useState } from "react";
import axios from "axios";
import styles from "./property-search.module.scss";
import { connect } from "react-redux";
import { updateList } from "../../../../redux/list-slice";
import { updateShowOptions } from "../../../../redux/show-option-slice";

function PropertySearch(props) {
  const [type, setType] = useState("All Types");

  async function processSearchByFilter(type) {
    console.log("processSearchByFilter... ", type);

    let houCondition = {
      sortBy: "listingCreatedTimestamp",
      descOrAsc: 0,
      latitude: 43.6529,
      longitude: -79.3849,
      radius: 812,
      lowestPrice: 200,
    };

    if (type === "For Rent") {
      houCondition.listingType = "Lease";
    } else if (type === "For Sale") {
      houCondition.listingType = "Sale";
    }

    try {
      const resData = await axios({
        url: "https://api.realjaja.com/mh/queryHouCondition",
        method: "POST",
        data: {
          houCondition,
          page: 1,
          rows: 54,
          userid: 0,
          ltype: 0,
        },
      });
      console.log("ListPage  resData: ", resData);
      props.updateList(resData?.data?.data);
    } catch (er) {
      console.log(
        "Get error from https://api.realjaja.com/mh/queryHouCondition"
      );
    }
  }

  function handleTypeClick(type) {
    console.log("handleTypeChange......", type);

    setType(type);
    console.log("after setType.....", type);

    props.updateShowOptions(false);

    processSearchByFilter(type);
  }

  function handleFilterClick(event) {
    console.log("handleFilterClick......");
    props.updateShowOptions(!props.showOptions);
  }

  return (
    <div className={styles["properties-search"]}>
      <div className={styles["searchs-container"]}>
        <div id="search-filter-container">
          <button
            className={styles["search-filter"]}
            onClick={handleFilterClick}
          >
            <span className={styles["options-title"]}>
              {type === "All Types" ? "Listing Types" : type}
            </span>
            <div className={styles["options-downarrow"]}>&#10095;</div>
          </button>
          <ul
            className={styles["options-three"]}
            id="options-three"
            style={{ display: props.showOptions ? "block" : "none" }}
          >
            <li
              className={styles["options-item"]}
              onClick={() => {
                handleTypeClick("All Types");
              }}
            >
              All Types
            </li>
            <li
              className={styles["options-item"]}
              onClick={() => {
                handleTypeClick("For Rent");
              }}
            >
              For Rent
            </li>
            <li
              className={styles["options-item"]}
              onClick={() => handleTypeClick("For Sale")}
            >
              For Sale
            </li>
          </ul>{" "}
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    const { showOptions } = state;
    return { showOptions };
  },
  { updateList, updateShowOptions }
)(PropertySearch);
