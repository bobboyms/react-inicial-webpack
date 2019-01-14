import React from "react";
import ReactDOM from "react-dom";
//import "./style.scss"

const Titulo = ({titulo}) => {
    return(
        <h1>{titulo}</h1>
    )
}

const Index = ({nome}) => {
  return (
    <div>
        <Titulo titulo="Aprendendo React"/>
        <p>{nome}</p>
    </div>);
};

ReactDOM.render(<Index nome="thiago" />, document.getElementById("index"));