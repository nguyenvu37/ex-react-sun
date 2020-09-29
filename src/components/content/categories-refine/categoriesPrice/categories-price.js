import React, { useEffect, useRef, useState } from "react";
import getValuePrices from "../../../../common/getValuePrice";

function CategoriesPrice(props) {
  const { rangePrice, onChangeRangePrice } = props;

  const [price, setPrice] = useState([]);

  const reftextFrom = useRef(null);
  const reftextTo = useRef(null);

  const [isValueInput, setIsvalueInput] = useState(false);

  useEffect(() => {
    const arrPrice = getValuePrices([...rangePrice]);
    if (arrPrice) {
      setPrice(arrPrice);
    }
  }, [rangePrice]);

  const handleDataFromPrice = (range) => {
    reftextFrom.current.value = range.min;
    reftextTo.current.value = range.max;
    let arrPrice = [{ ...range }];
    setPrice(arrPrice);
    setIsvalueInput(!isValueInput);
    onChangeRangePrice(arrPrice);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const arrPrice = getValuePrices([...rangePrice]);
    let range = {};

    console.log("isValueInput", isValueInput);

    if (isValueInput === false) {
      range = {
        min: parseFloat(reftextFrom.current.value),
        max: parseFloat(reftextTo.current.value),
      };
      setPrice([{ ...range }]);
      setIsvalueInput(!isValueInput);
      onChangeRangePrice([{ ...range }]);
    } else {
      reftextFrom.current.value = "";
      reftextTo.current.value = "";
      setIsvalueInput(!isValueInput);
      setPrice([...arrPrice]);
      onChangeRangePrice([...arrPrice]);
    }
  };
  return (
    <div className="facet__item">
      <div className="facet__item__title">Prices</div>
      <div className="facet__item__list">
        {price.map((item, index) => {
          return (
            <div className="facet__item__list__price" key={index}>
              <div
                onClick={() =>
                  handleDataFromPrice({ min: item.min, max: item.max })
                }
              >
                <i className="fas fa-dollar-sign"></i>
                <span className="facet-price">
                  {parseFloat(item.min).toFixed(2)} -{" "}
                  {parseFloat(item.max).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <form className="facet__item__form-price">
        <div className="form-price__value">
          <label>
            <i className="fas fa-dollar-sign"></i>
            <input type="number" className="range-input" ref={reftextFrom} />
          </label>
          <span className="separator">to</span>
          <label>
            <i className="fas fa-dollar-sign"></i>
            <input type="number" className="range-input" ref={reftextTo} />
          </label>
        </div>
        <div className="form-price__btn">
          <button type="submit" onClick={(e) => handleForm(e)}>
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoriesPrice;
