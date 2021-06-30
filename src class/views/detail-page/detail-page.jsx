import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./detail-page.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyDetail: null,
    };
  }

  async componentDidMount() {
    console.log("Detail page componentDidMount.........");
    console.log(this.props.match);
    try {
      const resData = await axios.get(
        `https://api.realjaja.com/mh/queryHouByid?houid=${this.props.match.params.id}&ltype=0&userid=1`
      );
      console.log("Detail page get resData", resData);
      this.setState({ propertyDetail: resData?.data?.data });
    } catch (er) {
      console.log(er);
    }
    // this.imgIndex = 0;
    // this.timerId = setInterval(() => this.handleSwitchImgs(), 3000);
  }

  // handleSwitchImgs() {
  //   const imgs = this.state.propertyDetail?.pictures;
  //   if (imgs == null || imgs.length === 0) return;
  //   document.getElementById("detail-imgs").style.backgroundImage = `url(${
  //     imgs[this.imgIndex]
  //   })`;
  //   console.log(imgs[this.imgIndex]);
  //   this.imgIndex++;
  //   this.imgIndex %= imgs.length;
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // }

  render() {
    const propertyDetail = this.state.propertyDetail;
    const imgs = propertyDetail?.pictures;

    if (propertyDetail == null) return null;

    return (
      <div className="details">
        <div className="details-container">
          <div className="detail-imgs" id="detail-imgs">
            <Carousel autoPlay={true}>
              {imgs.map((img, index) => {
                return (
                  <div
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
}

export default withRouter(DetailPage);
