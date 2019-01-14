import React from "react";
import { InputText } from 'primereact/inputtext';

export default class MongoCrud extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            registro : {
                nome: "",
                email:"",
                telefone:""
            },

            registros:[]
        }
    }

    atualizaValor = (campo, valor) => {

        const { registro } = this.state;
        registro[campo] = valor;
        this.setState({registro})

    }

    limparFormulario = () => {
        const { registro } = this.state;
        registro.nome = "";
        registro.email = "";
        registro.telefone = ""

        this.setState({registro})
    }

    salvarDados = () => {
        
        if (!this.validarDados()) {
            return
        }

        const { registro } = this.state;
        const { registros } = this.state;

        let cadastro = {
            nome:registro.nome,
            email:registro.email,
            telefone:registro.telefone,
        }

        registros.push(cadastro)
        this.setState({registros})
        console.log(registros)

        

        this.limparFormulario();

        //console.log(this.state.registros)

    }

    validarDados = () => {

        const { registro } = this.state;

        if (registro.nome === "") {
            alert("Digite um nome")
            return false;
        }

        if (registro.email === "") {
            alert("Digite um email")
            return false;
        }

        if (registro.telefone === "") {
            alert("Digite um telefone")
            return false;
        }

        return true;
    }

    render() {
        return(
            <div className="container">
                    <div className="row">
                        <h1 className="col-md-12">CADASTRO DE CLIENTES</h1>
                    
                        <Input label="Nome" campo="nome" 
                            valor={this.state.registro.nome} 
                            atualizaValor={this.atualizaValor} />

                        <Input label="Email" campo="email" 
                            valor={this.state.registro.email} 
                            atualizaValor={this.atualizaValor} />

                        <Input label="Telefone" campo="telefone" 
                            valor={this.state.registro.telefone} 
                            atualizaValor={this.atualizaValor} />

                        <div className="form-group col-md-12">
                            
                            <button type="button" className="btn btn-primary" onClick={
                                this.salvarDados
                            }>Salvar</button>
                            
                            <button type="button" className="btn btn-info" onClick={
                                this.limparFormulario
                            }>Limpar</button>


                        </div>

                    </div>
                    
            </div>
        );
    }

}

const Input = ({label, valor, campo, atualizaValor}) => {
    return (
        <div className="form-group col-md-6">
             <label>{label}</label>
             <input type="text" value={valor} className="form-control" placeholder={label} onChange={
                 (e) => {
                     atualizaValor(campo, e.target.value)
                 }
             } />
         </div>
    )
}