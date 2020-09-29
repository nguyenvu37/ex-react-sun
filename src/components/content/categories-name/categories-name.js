import React from "react";

const categories = [
  {
    id: 1,
    name: "appliances",
    types: ["dishwasher", "fan"],
    isBlock: false,
  },
  {
    id: 2,
    name: "audio",
    types: ["headphones", "homeaudio"],
    isBlock: false,
  },
];

function CategoriesName(props) {
  const { onFilterCategories, onFilterTypes } = props;

  function handleFilterCategories(name) {
    if (onFilterCategories) {
      onFilterCategories(name);
    }
  }

  function handleFilterTypes(type) {
    if (onFilterTypes) {
      onFilterTypes(type);
    }
  }

  return (
    <section className="categories__wrapper">
      <div className="categories__wrapper__title">Show results for</div>
      <div className="categories__wrapper__content">
        <div className="categories__wrapper__content__item">
          <div className="appliances item-name">
            {categories.map((item) => {
              return (
                <div className="appliancies__btn" key={item.id}>
                  <button
                    onClick={() => {
                      handleFilterCategories(item.name);
                      item.isBlock = !item.isBlock;
                    }}
                  >
                    <i className="fa fa-angle-right"></i>
                    {item.name}
                  </button>
                  {item.isBlock
                    ? item.types.map((type, index) => {
                        return (
                          <div
                            className={`appliances__item item-categories`}
                            key={index}
                            value={item.name}
                          >
                            <button
                              type="button"
                              onClick={() => handleFilterTypes(type)}
                            >
                              <i className="fa fa-angle-right"></i>
                              {type}
                            </button>
                          </div>
                        );
                      })
                    : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesName;
