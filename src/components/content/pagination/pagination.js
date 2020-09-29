import React from "react";
import getArrayFromTotalPage from "../../../common/convertArrayPages";

function Pagination(props) {
  const { pagination, onPageChange, totalRows } = props;
  const { _limit, _page } = pagination;
  const totalPages = Math.ceil(parseInt(totalRows) / _limit);

  const numberPages = getArrayFromTotalPage(totalPages);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  const pages = numberPages.map((item) => {
    let activePage = "";
    if (_page === item + 1) {
      activePage = "active";
    }

    return (
      <li className="pagination__item" key={item}>
        <button
          className={`pagination__item__link ${activePage}`}
          onClick={() => handlePageChange(item + 1)}
        >
          {item + 1}
        </button>
      </li>
    );
  });

  return (
    <section className="pagination">
      <ul>
        <li className="pagination__item">
          <button
            className="pagination__item__link"
            disabled={_page <= 1 ? true : false}
            onClick={() => handlePageChange(_page - 1)}
          >
            <i className="fa fa-angle-left"></i>
            Previous page
          </button>
        </li>
        {pages}
        <li className="pagination__item">
          <button
            className="pagination__item__link"
            disabled={_page >= totalPages ? true : false}
            onClick={() => handlePageChange(_page + 1)}
          >
            Next page
            <i className="fa fa-angle-right"></i>
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Pagination;
