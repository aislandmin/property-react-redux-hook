import PropertyListIterm from "./property-list-iterm";
import styles from "./property-list.module.scss";
import { connect } from "react-redux";

function PropertyList(props) {
  const propListData = props.list;
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

export default connect((state) => {
  const { list } = state;
  return { list };
})(PropertyList);
