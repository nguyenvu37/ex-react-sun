import React, { useState, useEffect } from "react";
import callApi from "../../common/callApi";
import Categories from "./categories";
import Items from "./items";
import queryString from "query-string";
import Waiting from "../../common/waiting";
import getArrDataFilters from "../../common/getArrFromFilterKey";
import getArrDataFilterTypeChange from "../../common/getArrFromFilterCheckbox";
import getArrDataFilterKeyCheckbox from "../../common/getArrFronFilterKeyCheckbox";
import getArrDataFromFeatureClear from "../../common/getArrFromFetureClear";

function Content(props) {
  const { keywordSearch } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    _limit: 8,
    _page: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 8,
    _page: 1,
  }); // Filter data brand, type by categories

  const [totalRows, setTotalRows] = useState(1); // Get total of products filtered
  const [filterTotalRows, setFilterTotalRows] = useState({}); // Get key of categories clicked
  const [dataType, setDataType] = useState([]); // Filter data by key of checkbox type checked
  const [dataTypeChangePage, setDataTypeChangePage] = useState([]); // Get checkbox data when changing pages
  const [typeFilter, setTypeFilter] = useState({
    _limit: 8,
    _page: 1,
  }); // Filter data by checkbox checked
  const [typeFilterTotalRows, setTypeFilterTotalRows] = useState({
    type: [],
    brand: [],
    rate: [],
  }); // Get key of checkbox checked

  const [dataBrands, setDataBrands] = useState([]); // Filter data by key of checkbox brand checked
  const [dataBrandChangePage, setDataBrandChangePage] = useState([]); // Get checkbox data when changing pages

  const [dataRate, setDataRate] = useState([]); // Filter data by key of rating clicked
  const [dataRateChangePage, setDataRateChangePage] = useState([]); // Get rating data when changing pages

  const [rangePrice, setRangePrice] = useState([]);

  useEffect(() => {
    const paramString = queryString.stringify(filters);
    const paramTotalRows = queryString.stringify(filterTotalRows);

    const fetchData = async () => {
      await callApi(`products?${paramString}`, "get", null).then((res) => {
        if (res && res.data && res.status === 200) {
          setProducts([...res.data]);
          setLoading(false);
        } else {
          setProducts([]);
          setLoading(true);
        }
      });
    };

    const fetTotalRows = async () => {
      await callApi(`products?${paramTotalRows}`, "get", null).then((res) => {
        if (res && res.data && res.status === 200) {
          let data = [...res.data];

          // Get datatype filter
          let arrTypes = getArrDataFilters(
            data,
            dataTypeChangePage,
            "type"
          ).sort((a, b) => b.value - a.value);

          // Get dataBrand filter
          let arrBrands = getArrDataFilters(
            data,
            dataBrandChangePage,
            "brand"
          ).sort((a, b) => b.value - a.value);

          // Get dataRating filter
          let arrRating = getArrDataFilters(
            data,
            dataRateChangePage,
            "rate"
          ).reverse();

          setDataType(arrTypes);
          setDataBrands(arrBrands);
          setDataRate(arrRating);
          setTotalRows(data.length);
        } else setTotalRows(1);
      });
    };

    fetchData();
    fetTotalRows();
  }, [
    filters,
    filterTotalRows,
    dataTypeChangePage,
    dataBrandChangePage,
    dataRateChangePage,
  ]);

  useEffect(() => {
    const paramString = queryString.stringify(typeFilter);
    const paramTotalRows = queryString.stringify(typeFilterTotalRows);

    const fetchData = async () => {
      await callApi(`products?${paramString}`, "get", null).then((res) => {
        if (res && res.data && res.status === 200) {
          setProducts([...res.data]);
          setLoading(false);
        } else {
          setProducts([]);
          setLoading(true);
        }
      });
    };

    const fetTotalRows = async () => {
      await callApi(`products?${paramTotalRows}`, "get", null).then((res) => {
        if (res && res.data && res.status === 200) {
          let data = [...res.data];
          let arrPrices = data.map((item) => item.price).sort((a, b) => a - b);

          if (
            typeFilterTotalRows.type.length === 0 &&
            typeFilterTotalRows.brand.length === 0 &&
            typeFilterTotalRows.rate.length === 0
          ) {
            let arrTypes = getArrDataFromFeatureClear(
              data,
              dataTypeChangePage,
              "type"
            ).sort((a, b) => b.value - a.value);

            let arrBrands = getArrDataFromFeatureClear(
              data,
              dataBrandChangePage,
              "brand"
            ).sort((a, b) => b.value - a.value);

            let arrRating = getArrDataFromFeatureClear(
              data,
              dataRateChangePage,
              "rate"
            );

            setDataType([...arrTypes]);
            setDataBrands([...arrBrands]);
            setDataRate([...arrRating]);
          }

          if (
            typeFilterTotalRows.type.length !== 0 &&
            typeFilterTotalRows.brand.length === 0 &&
            typeFilterTotalRows.rate.length === 0
          ) {
            let arrTypes = dataTypeChangePage.sort((a, b) => b.value - a.value);

            let arrBrands = getArrDataFilterTypeChange(
              data,
              dataBrandChangePage,
              "brand"
            ).sort((a, b) => b.value - a.value);

            let arrRating = getArrDataFilterTypeChange(
              data,
              dataRateChangePage,
              "rate"
            );

            setDataType([...arrTypes]);
            setDataBrands([...arrBrands]);
            setDataRate([...arrRating]);
          }

          if (
            typeFilterTotalRows.brand.length !== 0 &&
            typeFilterTotalRows.type.length === 0 &&
            typeFilterTotalRows.rate.length === 0
          ) {
            let arrBrands = dataBrandChangePage.sort(
              (a, b) => b.value - a.value
            );
            let arrTypes = getArrDataFilterTypeChange(
              data,
              dataTypeChangePage,
              "type"
            ).sort((a, b) => b.value - a.value);

            let arrRating = getArrDataFilterTypeChange(
              data,
              dataRateChangePage,
              "rate"
            ).reverse();

            setDataType([...arrTypes]);
            setDataBrands([...arrBrands]);
            setDataRate([...arrRating]);
          }

          if (
            typeFilterTotalRows.rate.length !== 0 &&
            typeFilterTotalRows.brand.length === 0 &&
            typeFilterTotalRows.type.length === 0
          ) {
            let arrTypes = getArrDataFilterTypeChange(
              data,
              dataTypeChangePage,
              "type"
            ).sort((a, b) => b.value - a.value);

            let arrBrands = getArrDataFilterTypeChange(
              data,
              dataBrandChangePage,
              "brand"
            ).sort((a, b) => b.value - a.value);

            let arrRating = dataRateChangePage;

            setDataType([...arrTypes]);
            setDataBrands([...arrBrands]);
            setDataRate([...arrRating]);
          }

          if (
            typeFilterTotalRows.type.length !== 0 &&
            typeFilterTotalRows.brand.length !== 0
          ) {
            let arrTypes = getArrDataFilterKeyCheckbox(
              data,
              dataTypeChangePage,
              "type"
            ).sort((a, b) => b.value - a.value);

            let arrBrands = getArrDataFilterKeyCheckbox(
              data,
              dataBrandChangePage,
              "brand"
            ).sort((a, b) => b.value - a.value);

            let arrRating = getArrDataFilterKeyCheckbox(
              data,
              dataRateChangePage,
              "rate"
            );

            setDataType([...arrTypes]);
            setDataBrands([...arrBrands]);
            setDataRate([...arrRating]);
          }

          setRangePrice(arrPrices);
          setTotalRows(data.length);
        } else setTotalRows(1);
      });
    };

    fetchData();
    fetTotalRows();
  }, [
    typeFilter,
    typeFilterTotalRows,
    dataTypeChangePage,
    dataBrandChangePage,
    dataRateChangePage,
    keywordSearch,
  ]);

  useEffect(() => {
    onChangeKeyWords(keywordSearch);
  }, [keywordSearch]);

  function onChangeKeyWords(keywords) {
    setTypeFilter({
      ...typeFilter,
      q: keywords,
    });

    setTypeFilterTotalRows({
      ...typeFilterTotalRows,
      q: keywords,
    });

    setPagination({
      ...pagination,
      _page: 1,
    });
  }

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });

    setFilterTotalRows({
      ...filterTotalRows,
      _page: newPage,
    });

    setTypeFilter({
      ...typeFilter,
      _page: newPage,
    });

    setTypeFilterTotalRows({
      ...typeFilterTotalRows,
      _page: newPage,
    });

    setPagination({
      ...pagination,
      _page: newPage,
    });

    setFilterTotalRows({ ...filterTotalRows });
    setTypeFilterTotalRows({ ...typeFilterTotalRows });
    setDataTypeChangePage([...dataType]);
    setDataBrandChangePage([...dataBrands]);
    setDataRateChangePage([...dataRate]);
    // setRangePrice([...rangePrice]);
  }

  function onFilterCategories(name) {
    setFilters({
      _limit: 8,
      _page: 1,
      category: name,
    });

    setFilterTotalRows({
      category: name,
    });

    setPagination({
      ...pagination,
      _page: 1,
    });
  }

  function onFilterTypes(type) {
    setFilters({
      _limit: 8,
      _page: 1,
      typeCategory: type,
    });

    setFilterTotalRows({
      typeCategory: type,
    });

    setPagination({
      ...pagination,
      _page: 1,
    });
  }

  function onChangeType(data) {
    setTypeFilter({
      ...typeFilter,
      type: [...data],
    });

    setTypeFilterTotalRows({
      ...typeFilterTotalRows,
      type: [...data],
    });

    setPagination({
      ...pagination,
      _page: 1,
    });

    setDataTypeChangePage([...dataType]);
    setDataBrandChangePage([...dataBrands]);
    setDataRateChangePage([...dataRate]);
    setRangePrice([...rangePrice]);
  }

  function onChangeBrand(data) {
    setTypeFilter({
      ...typeFilter,
      brand: [...data],
    });

    setTypeFilterTotalRows({
      ...typeFilterTotalRows,
      brand: [...data],
    });

    setPagination({
      ...pagination,
      _page: 1,
    });

    setDataTypeChangePage([...dataType]);
    setDataBrandChangePage([...dataBrands]);
    setDataRateChangePage([...dataRate]);
    setRangePrice([...rangePrice]);
  }

  function onChangeRangePrice(range) {
    setFilters({
      ...filters,
      price_gte: range[0].min,
      price_lte: range[0].max,
    });
    setFilterTotalRows({
      ...filterTotalRows,
      price_gte: range[0].min,
      price_lte: range[0].max,
    });
    setPagination({
      ...pagination,
      _page: 1,
    });
  }

  function onChangeRate(data) {
    setTypeFilter({
      ...typeFilter,
      rate: [...data],
    });

    setTypeFilterTotalRows({
      ...typeFilterTotalRows,
      rate: [...data],
    });

    setPagination({
      ...pagination,
      _page: 1,
    });

    setDataTypeChangePage([...dataType]);
    setDataBrandChangePage([...dataBrands]);
    setDataRateChangePage([...dataRate]);
  }

  function onSortData(data) {
    let sort = "";
    if (data !== "") {
      sort = "price";
    } else sort = "";
    setTypeFilter({
      ...typeFilter,
      _sort: sort,
      _order: data,
    });

    setTypeFilterTotalRows({
      ...typeFilterTotalRows,
      _sort: sort,
      _order: data,
    });

    setPagination({
      ...pagination,
      _page: 1,
    });
  }

  function onClearFilter() {
    window.location.reload();
  }

  if (loading) {
    return (
      <Waiting
        custome={{
          position: "relative",
          top: "300px",
          left: "50%",
          width: "40%",
        }}
      />
    );
  } else {
    return (
      <div className="content">
        <aside>
          <Categories
            onFilterCategories={onFilterCategories}
            onFilterTypes={onFilterTypes}
            dataTypes={dataType}
            dataBrands={dataBrands}
            dataRate={dataRate}
            onChangeType={onChangeType}
            onChangeBrand={onChangeBrand}
            onChangeRate={onChangeRate}
            rangePrice={rangePrice}
            onChangeRangePrice={onChangeRangePrice}
            onClearFilter={onClearFilter}
          />
        </aside>
        <article>
          <Items
            loading={loading}
            products={products}
            pagination={pagination}
            totalRows={totalRows}
            onPageChange={handlePageChange}
            onSortData={onSortData}
          />
        </article>
      </div>
    );
  }
}

export default Content;
