import React, { useEffect, useState } from "react";

function CategoriesBrand(props) {
  const { dataBrands, onChangeBrand } = props;
  const [dataBrand, setDataBrand] = useState([]);

  useEffect(() => {
    setDataBrand([...dataBrands]);
  }, [dataBrands]);

  const handleBrand = (e, id) => {
    let checkedBrand = e.target.checked;
    let dataCheckedBrands = dataBrand.map((item) => {
      if (item.id === id) {
        item.select = checkedBrand;
      }
      return item;
    });
    let dataCheckedBrand = dataCheckedBrands.filter(
      (item) => item.select === true
    );
    let typeString = dataCheckedBrand.map((item) => item.key);
    setDataBrand(dataCheckedBrands);
    onChangeBrand(typeString);
  };

  return (
    <div className="facet__item">
      <div className="facet__item__title">Brand</div>
      <div className="facet__item__list list-brand">
        {dataBrand.map((item, index) => {
          return (
            <div className="facet__item__list__name" key={index + 100}>
              <input
                type="checkbox"
                checked={item.select}
                id={index + 100}
                onChange={(e) => handleBrand(e, item.id)}
              />
              <label htmlFor={index + 100}>{item.key}</label>
              <span className="facet-count">({item.value})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesBrand;
