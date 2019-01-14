import React from "react";
import ReactDOM from "react-dom";
import MongoCrud from "./mongo/Crud";

const Titulo = ({titulo}) => {
    return(
        <h1>{titulo}</h1>
    )
}

const Index = () => {
  return (<MongoCrud />);
};

ReactDOM.render(<Index />, document.getElementById("index"));