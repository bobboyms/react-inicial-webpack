import React from "react";
import ReactDOM from "react-dom";
import MongoCrud from "./mongo/Crud";
import MongoCrudService from "./mongo/CrudService";


const Titulo = ({titulo}) => {
    return(
        <h1>{titulo}</h1>
    )
}

const Index = () => {
  return (<MongoCrudService />);
};

ReactDOM.render(<Index />, document.getElementById("index"));