import React from "react";
//import Axios from 'axios';

export default function List(props) {
  return (
    <>
      <div className="col-md-4  float-left">
        <h3 className="table ">Article </h3>

        {props.data.data &&
          props.data.data.map((item, index) => {
            return (
              <ul
                className="pagination"
                key={index}
                onClick={(e) => props.onClick(e, item)}
              >
                <li className="btn btn-primary w-50">{item.author}</li>
              </ul>
            );
          })}
      </div>
    </>
  );
}
