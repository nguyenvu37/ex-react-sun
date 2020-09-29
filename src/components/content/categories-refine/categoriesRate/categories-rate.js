import React from "react";
import convertArrRate from "../../../../common/convertArrRate";

function CategoriesRate(props) {
  const { dataRate, onChangeRate } = props;
  let itemRate = dataRate.map((rate) => convertArrRate(rate.key));

  const handleChangeRating = (data) => {
    onChangeRate(data);
  };

  return (
    <div className="facet__item">
      <div className="facet__item__title">Ratings</div>
      <div className="facet__item__list">
        {itemRate.map((item, index) => {
          return (
            <div className="facet__item__list__rating" key={index}>
              <div
                className="facet__item__list__rating__star"
                onClick={() => handleChangeRating(dataRate[index].key)}
              >
                {item.map((r, i) => {
                  return <i className={`${r} fa-star`} key={i}></i>;
                })}
              </div>
              <div className="facet__item__list__rating__count">
                &amp; Up
                <span className="facet-count">{dataRate[index].value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesRate;
