import { Component } from "react";
import PropertyListIterm from "./property-list-iterm";
import styles from "./property-list.module.scss";
import { connect } from "react-redux";

class PropertyList extends Component {
  render() {
    // const propListData = this.props.listData;
    const propListData = this.props.list;
    return (
      <div className={styles["properties"]}>
        <ul className={styles["property-list"]}>
          {propListData.map((item, index) => {
            return <PropertyListIterm itemData={item} key={index} />;
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  const { list } = state;
  return { list };
})(PropertyList);
