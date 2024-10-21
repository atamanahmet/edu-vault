import React from "react";
import * as Calc from "./Calculator.jsx";

function List() {
  return (
    <ul>
      <li>{Calc.add(1, 4)}</li>
      <li>{Calc.subtract(1, 4)}</li>
      <li>{Calc.multiply(1, 4)}</li>
      <li>{Calc.divide(1, 4)}</li>
    </ul>
  );
}
export default List;
