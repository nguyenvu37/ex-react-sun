import React, { useState } from "react";
import Content from "./content/content";
import HeaderComponent from "./header/header";

function ProductList() {
  const [keywordSearch, setKeywordSearch] = useState("");
  const onChangeKeywords = (keywords) => {
    setKeywordSearch(keywords);
  };
  return (
    <div className="product-list">
      <HeaderComponent onChangeKeywords={onChangeKeywords} />
      <Content keywordSearch={keywordSearch} />
    </div>
  );
}

export default ProductList;
