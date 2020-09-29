import React, { lazy, Suspense } from "react";
import "./sass/style.scss";
import Waiting from "./common/waiting";

const ProductList = lazy(() => import("./components/main"));
function App() {
  return (
    <Suspense
      fallback={
        <Waiting
          custome={{ position: "relative", top: "300px", left: "50%" }}
        />
      }
    >
      <ProductList />
    </Suspense>
  );
}

export default App;
