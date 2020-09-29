import React, { useEffect, useState } from "react";

function CategoriesType(props) {
  const { dataTypes, onChangeType } = props;
  const [dataType, setDataType] = useState([]);

  useEffect(() => {
    setDataType([...dataTypes]);
  }, [dataTypes]);

  function handleType(e, id) {
    let checked = e.target.checked;
    let dataCheckeds = dataType.map((item) => {
      if (item.id === id) {
        item.select = checked;
      }
      return item;
    });
    let dataChecked = dataCheckeds.filter((item) => item.select === true);
    let typeString = dataChecked.map((item) => item.key);

    setDataType(dataCheckeds);
    onChangeType(typeString);
  }

  return (
    <div className="facet__item">
      <div className="facet__item__title">Type</div>
      <div className="facet__item__list list-type">
        {dataType.map((item, index) => {
          return (
            <div className="facet__item__list__name" key={index}>
              <input
                type="checkbox"
                checked={item.select}
                id={index}
                onChange={(e) => handleType(e, item.id)}
              />
              <label htmlFor={index}>{item.key}</label>
              <span className="facet-count">({item.value})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesType;
