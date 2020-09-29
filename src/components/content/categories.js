import React from "react";
import CategoriesName from "./categories-name/categories-name";
import CategoriesRefine from "./categories-refine/categories-refine";

function Categories(props) {
  const {
    onFilterCategories,
    onFilterTypes,
    dataTypes,
    onChangeType,
    dataBrands,
    onChangeBrand,
    dataRate,
    onChangeRate,
    rangePrice,
    onChangeRangePrice,
    onClearFilter,
  } = props;

  const handleClearFilter = () => {
    onClearFilter();
  };
  return (
    <div className="categories">
      <div id="clear-filter">
        <button type="button" onClick={handleClearFilter}>
          <i className="fas fa-eraser"></i>
          Clear all filters
        </button>
      </div>
      <CategoriesName
        onFilterCategories={onFilterCategories}
        onFilterTypes={onFilterTypes}
      />
      <CategoriesRefine
        dataTypes={dataTypes}
        dataBrands={dataBrands}
        dataRate={dataRate}
        onChangeType={onChangeType}
        onChangeBrand={onChangeBrand}
        onChangeRate={onChangeRate}
        rangePrice={rangePrice}
        onChangeRangePrice={onChangeRangePrice}
      />
    </div>
  );
}

export default Categories;
