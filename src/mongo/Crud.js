import React from "react";
import { v4 } from 'uuid';


export default class MongoCrud extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            
            cadastrando:true,
            itemSelecionado:null,

            registro : {
                id:0,
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
        this.state.cadastrando = true;
    }

    salvarDados = () => {
        
        if (!this.validarDados()) {
            return
        }

        if (this.state.cadastrando) {
            
            const { registro } = this.state;
            const { registros } = this.state;

            let cadastro = {
                id:v4(),
                nome:registro.nome,
                email:registro.email,
                telefone:registro.telefone,
            }

            registros.push(cadastro)
            this.setState({registros})
            console.log(registros)
        } else {

            const { registro } = this.state;

            let item = this.state.itemSelecionado;
            item.nome = registro.nome;
            item.email = registro.email;
            item.telefone = registro.telefone;

            this.setState({item})
            console.log("editando")
        }

        
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

    excluir = (item) => {

        let rs = this.state.registros;

        let registros = rs.filter((registro) => { 
            return registro.id !== item.id
        })

        this.setState({registros})
        console.log(this.state)

    }

    selecionar = (item) => {

        this.state.itemSelecionado = item;

        let registro = {
            id:item.id,
            nome:item.nome,
            email:item.email,
            telefone:item.telefone
        }

        this.state.cadastrando = false;
        this.setState({registro})
        
    }

    render() {
        return(
            <div className="container">
                    <div className="row">
                        <h1 className="col-md-12">CADASTRO DE CLIENTES</h1>
                        <div className="form-group col-md-12">
                            
                            <button type="button" className="btn btn-primary" onClick={
                                this.salvarDados
                            }>Salvar</button>
                            
                            <button type="button" className="btn btn-info" onClick={
                                this.limparFormulario
                            }>Limpar</button>

                        </div>

                        <Input label="Nome" campo="nome" 
                            valor={this.state.registro.nome} 
                            atualizaValor={this.atualizaValor} />

                        <Input label="Email" campo="email" 
                            valor={this.state.registro.email} 
                            atualizaValor={this.atualizaValor} />

                        <Input label="Telefone" campo="telefone" 
                            valor={this.state.registro.telefone} 
                            atualizaValor={this.atualizaValor} />
                        
                        <Tabela valores={this.state.registros} 
                                excluir={this.excluir}
                                selecionar={this.selecionar}/>

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

const Tabela = ({valores, excluir, selecionar}) => {

    let dados = valores.map((valor, index) => {
        return(
            <tr key={index}>
                <th scope="row">{valor.id}</th>
                <td>{valor.nome}</td>
                <td>{valor.email}</td>
                <td>{valor.telefone}</td>
                <td>
                    <button className="btn btn-outline-danger" onClick={
                        () => {
                            excluir(valor)
                        }
                    }>
                        excluir
                    </button>
                    <button className="btn btn-outline-warning" onClick={() =>{
                        selecionar(valor)
                    }}>
                        selecionar
                    </button>
                </td>
            </tr>
        );
    });

    return (
            <div className="form-group col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados}
                    </tbody>
                </table>
            </div>
    )
}