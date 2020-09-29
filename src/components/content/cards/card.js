import React from "react";
import convertArrRate from "../../../common/convertArrRate";

function Card(props) {
  const { products } = props;

  const items = products.map((product, index) => {
    let type = product.type;
    if (product.type === "streamingmedia") {
      type = "streaming media";
    }

    const rate = convertArrRate(product.rate);

    return (
      <div className="card" key={index + 1}>
        <div className="card__item">
          <div className="card__item__picture">
            <img src={require(`../../../assests/img/${product.img}`)} alt="" />
          </div>
          <div className="card__item__desc">
            <h4>{product.name}</h4>
            <p>{type}</p>
            <div className="card__item__desc__info">
              <div className="card__item__desc__info__star">
                {rate.map((star, index) => {
                  return <i className={`${star} fa-star`} key={index + 1}></i>;
                })}
              </div>
              <div className="card__item__desc__info__price">
                <span className="price">${product.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <section className="cards">{items}</section>;
}

export default Card;
