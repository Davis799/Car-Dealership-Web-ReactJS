import React from "react";

const Helmet = (props) => {
  document.title = "CFG Tanzania - " + props.title;
  return <div className=" w-auto">{props.children}</div>;
};

export default Helmet;
