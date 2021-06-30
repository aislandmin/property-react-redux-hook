import { Component } from "react";
import axios from "axios";
import styles from "./property-search.module.scss";
import { connect } from "react-redux";
import { updateList } from "../../../../redux/list-slice";
import { updateShowOptions } from "../../../../redux/show-option-slice";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "All Types",
      // isShowOptions: false,
    };
  }
  componentDidMount() {
    document.addEventListener("click", this.handleHideMenu);
  }

  handleHideMenu = () => {
    this.setState({ isShowOptions: false });
  };

  processSearchByFilter = async () => {
    console.log("processSearchByFilter......");

    let houCondition = {
      sortBy: "listingCreatedTimestamp",
      descOrAsc: 0,
      latitude: 43.6529,
      longitude: -79.3849,
      radius: 812,
      lowestPrice: 200,
    };

    if (this.state.type === "For Rent") {
      houCondition.listingType = "Lease";
    } else if (this.state.type === "For Sale") {
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
      console.log("ListPage componentDidMount resData: ", resData);
      //this.props.setPropertyList(resData?.data?.data);
      this.props.updateList(resData?.data?.data);
    } catch (er) {
      console.log(
        "Get error from https://api.realjaja.com/mh/queryHouCondition"
      );
    }
  };

  handleTypeClick = (type) => {
    console.log("handleTypeChange Type=: ", type);
    this.setState({ type });
    // if (event.target.outerText === "All Types") {
    //   document.getElementById("options-title").innerHTML = "Listing Types";
    // } else {
    //   document.getElementById("options-title").innerHTML =
    //     event.target.outerText;
    // }
    // this.setState({ isShowOptions: false });
    this.props.updateShowOptions(false);
    //document.getElementById("options-three").style.display = "none";

    this.processSearchByFilter();
  };

  handleFilterClick = (event) => {
    // event.nativeEvent.stopImmediatePropagation();
    // this.setState((state) => ({ isShowOptions: !state.isShowOptions }));
    this.props.updateShowOptions(!this.props.showOptions);
    //document.getElementById("options-three").style.display = "block";
  };

  render() {
    return (
      <div className={styles["properties-search"]}>
        <div className={styles["searchs-container"]}>
          <div
            className={styles["search-filter-container"]}
            id="search-filter-container"
          >
            <button
              className={styles["search-filter"]}
              onClick={this.handleFilterClick}
            >
              <span className={styles["options-title"]} id="options-title">
                {this.state.type}
              </span>
              <div className={styles["options-downarrow"]}>&#10095;</div>
            </button>
            {/* <select value={this.state.type} onChange={this.handleTypeChange}>
            <option value="All Types">All Types</option>
            <option value="For Rent">For Rent</option>
            <option value="For Sale">For Sale</option>
          </select> */}
            <ul
              className={styles["options-three"]}
              id="options-three"
              style={{ display: this.props.showOptions ? "block" : "none" }}
            >
              <li
                className={styles["options-item"]}
                onClick={() => {
                  this.handleTypeClick("All Types");
                }}
              >
                All Types
              </li>
              <li
                className={styles["options-item"]}
                value="For Rent"
                onClick={() => {
                  this.handleTypeClick("For Rent");
                }}
              >
                For Rent
              </li>
              <li
                className={styles["options-item"]}
                value="For Sale"
                onClick={() => {
                  this.handleTypeClick("For Sale");
                }}
              >
                For Sale
              </li>
            </ul>
          </div>
          {/* <button
            className={styles["search-item"]}
            value="Search"
            onClick={this.handleSearchClick}
          >
            Search
          </button> */}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { showOptions } = state;
    return { showOptions };
  },
  { updateList, updateShowOptions }
)(PropertySearch);
