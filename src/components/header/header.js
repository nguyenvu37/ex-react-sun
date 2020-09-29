import React, { useRef } from "react";

function HeaderComponent(props) {
  const { onChangeKeywords } = props;
  const keywords = useRef(null);

  const handleSearch = () => {
    let keyword = keywords.current.value;
    onChangeKeywords(keyword);
  };
  return (
    <div className="header">
      <div className="logo">
        <a href="index.html" className="logo__img">
          <img src={require("../../assests/img/logo.png")} width="40" alt="" />
        </a>
        <a href="index.html" className="logo__title">
          amazing
        </a>
      </div>
      <div className="search">
        <form>
          <input
            placeholder="Search a product"
            type="text"
            ref={keywords}
            onChange={() => handleSearch()}
          />
          <button type="button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default HeaderComponent;
