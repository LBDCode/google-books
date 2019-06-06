import React from "react";

export function Container({ fluid, children }) {
  return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export function Row({ fluid, children }) {
  return <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export function Col({ size, order, children }) {
  var cls= size.split(" ").map(size => "col-" + size).join(" ");
  if(order) {
    cls += " " + order;
  }
  return (
    <div
      className={cls}
    >
      {children}
    </div>
  );
}
