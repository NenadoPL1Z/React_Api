import React, { useState, useEffect } from "react";
import "./itemList.css";
import Spinner from "../loading/spinner";

function ItemList({ getData, onItemSelected, renderItem, count }) {
  const [itemList, updateList] = useState("");

  useEffect(() => {
    getData().then((data) => {
      updateList(data);
    });
  }, []);

  function renderItems(arr) {
    return arr.map((item, index) => {
      const label = renderItem(item);
      return (
        <li key={index} className="list-group-item" onClick={() => onItemSelected(index + count)}>
          {label}
        </li>
      );
    });
  }

  if (!itemList) {
    return <Spinner />;
  }

  return (
    <ul id="mb-50" className="item-list list-group">
      {renderItems(itemList)}
    </ul>
  );
}

export default ItemList;
