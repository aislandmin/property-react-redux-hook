import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./property-list.module.scss";

export default class PropertyListIterm extends Component {
  render() {
    const itemData = this.props.itemData;
    const itemImageUrl = itemData.pictures[0] || "";
    ///console.log("itemData.pictures[0]:", itemImageUrl);
    return (
      <li className={styles["property-list-item"]}>
        <div className={styles["property-item-img-container"]}>
          <Link to={"/detail/" + itemData.identifier}>
            <div
              style={{ backgroundImage: `url(${itemImageUrl})` }}
              className={styles["property-item-img"]}
            >
              {" "}
            </div>
          </Link>
        </div>

        <div className={styles["property-item-text"]}>
          {this.props.itemData.fullAddress}
        </div>
      </li>
    );
  }
}
