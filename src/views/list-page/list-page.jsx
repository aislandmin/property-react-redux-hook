import { useEffect } from "react";
import axios from "axios";
import PropertyList from "./components/property-list/property-list";
import PropertySearch from "./components/property-search/property-search";
import { connect } from "react-redux";
import { updateList } from "../../redux/list-slice";
import { updateShowOptions } from "../../redux/show-option-slice";

function ListPage(props) {
  useEffect(() => {
    async function getPropertiesList() {
      try {
        const resData = await axios({
          url: "https://api.realjaja.com/mh/queryHouCondition",
          method: "POST",
          data: {
            houCondition: {
              sortBy: "listingCreatedTimestamp",
              descOrAsc: 0,
              latitude: 43.6529,
              longitude: -79.3849,
              radius: 812,
              lowestPrice: 200,
            },
            page: 1,
            rows: 54,
            userid: 0,
            ltype: 0,
          },
        });
        console.log("ListPage componentDidMount resData: ", resData);

        props.updateList(resData?.data?.data);
      } catch (er) {
        console.log(
          "Get error from https://api.realjaja.com/mh/queryHouCondition",
          er
        );
      }
    }

    getPropertiesList();
  }, []);

  return (
    <div
      onClick={(event) => {
        const dropdownDiv = document.getElementById("search-filter-container");
        console.log(
          "event.target",
          event.target,
          dropdownDiv.contains(event.target)
        );
        if (!dropdownDiv.contains(event.target)) {
          props.updateShowOptions(false);
        }
      }}
    >
      <PropertySearch />
      <PropertyList />
    </div>
  );
}

export default connect(null, { updateList, updateShowOptions })(ListPage);
