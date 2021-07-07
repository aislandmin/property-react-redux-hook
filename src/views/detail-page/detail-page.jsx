import { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./detail-page.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function DetailPage(props) {
  const [propertyDetail, setPropertyDetail] = useState(null);

  useEffect(() => {
    async function getPropertyDetail() {
      console.log(
        "Detail page useEffect getPropertyDetail.........",
        props.match
      );

      try {
        const resData = await axios.get(
          `https://api.realjaja.com/mh/queryHouByid?houid=${props.match.params.id}&ltype=0&userid=1`
        );
        console.log("Detail page get resData", resData);
        setPropertyDetail(resData?.data?.data);
      } catch (er) {
        console.log(er);
      }
    }
    getPropertyDetail();
  }, [props.match]);

  const imgs = propertyDetail?.pictures;

  if (propertyDetail === null) return null;

  return (
    <div className="details">
      <div className="details-container">
        <div className="detail-imgs" id="detail-imgs">
          <Carousel autoPlay={true} showThumbs={false}>
            {imgs.map((img, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${img})`,
                    height: "600px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              );
            })}
          </Carousel>
        </div>
        <div className="detail-address">{propertyDetail.fullAddress}</div>
        <hr />
        <div className="detail-description">
          {propertyDetail.remarks.client}
        </div>{" "}
        <hr />
      </div>
    </div>
  );
}

export default withRouter(DetailPage);
