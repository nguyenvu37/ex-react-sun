import React, { useRef } from "react";
import Card from "./cards/card";
import Pagination from "./pagination/pagination";

function Items(props) {
  const { products, totalRows, onSortData } = props;
  const optionRef = useRef("");

  const handleSelect = () => {
    let option = "";
    switch (optionRef.current.value) {
      case "price asc":
        option = "asc";
        break;
      case "price desc":
        option = "desc";
        break;
      default:
        option = "";
    }
    onSortData(option);
  };

  return (
    <div className="items">
      <section className="results__topbar">
        <div className="results__topbar__stats">
          <div className="results__topbar__stats__quantity">{totalRows}</div>
          <span>found in 1ms</span>
        </div>
        <div className="results__topbar__sort">
          <label>Sort by</label>
          <div className="results__topbar__sort__selector">
            <select
              className="sort__by__selector"
              ref={optionRef}
              onChange={() => handleSelect()}
            >
              <option value="featured">Featured</option>
              <option value="price asc">Price asc.</option>
              <option value="price desc">Price desc.</option>
            </select>
          </div>
        </div>
      </section>
      <Card products={products} />
      <Pagination
        pagination={props.pagination}
        totalRows={props.totalRows}
        onPageChange={props.onPageChange}
      />
    </div>
  );
}

export default Items;
