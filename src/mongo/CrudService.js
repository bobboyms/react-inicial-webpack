import React from "react";
import { v4 } from 'uuid';
import axios from 'axios';

export default class MongoCrudService extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            
            cadastrando:true,
            itemSelecionado:null,

            registro : {
                _id:"",
                nome: "",
                email:"",
                telefone:""
            },

            registros:[]
        }
    }

    atualizaValor = (campo, valor) => {

        console.log(campo + " " + valor)

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
                _id:v4(),
                nome:registro.nome,
                email:registro.email,
                telefone:registro.telefone,
            }

            //salva o objeto cadastro no servidor
            axios.post('http://127.0.0.1:5000/inserir/', cadastro)
            .then(res => {
                console.log(res);
                console.log(res.data.resultado);
                alert(res.data.resultado)
            })

                        
            registros.push(cadastro)
            this.setState({registros})
            //console.log(registros)
        } else {

            const { registro } = this.state;

            let item = this.state.itemSelecionado;
            item.nome = registro.nome;
            item.email = registro.email;
            item.telefone = registro.telefone;

            this.setState({item})
            console.log("editando")

            let atualizar = {
                filtro:{
                    _id: registro._id
                },
                novo_valor: {
                    nome : registro.nome,
                    email : registro.email,
                    telefone : registro.telefone,
                }
            }

            //atualiza o objeto cadastro no servidor
            axios.post('http://127.0.0.1:5000/atualizar/', atualizar)
            .then(res => {
                console.log(res);
                console.log(res.data.resultado);
                alert(res.data.resultado)
            })
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
            return registro._id !== item._id
        })

        this.setState({registros})
        
        //salva o objeto cadastro no servidor
        axios.post('http://127.0.0.1:5000/excluir/', {_id:item._id})
        .then(res => {
            console.log(res);
            console.log(res.data.resultado);
            alert(res.data.resultado)
        })

        //this.atualizarDadosTable();
        
    }

    selecionar = (item) => {

        this.state.itemSelecionado = item;

        let registro = {
            id:item._id,
            nome:item.nome,
            email:item.email,
            telefone:item.telefone
        }

        this.state.cadastrando = false;
        this.setState({registro})
        
    }

    //mostra todos os dados cadastrados no banco na tabela
    componentDidMount() {
        this.atualizarDadosTable()
    }

    atualizarDadosTable() {
        axios.post('http://127.0.0.1:5000/buscar/', {})
            .then(res => {
                let registros = res.data;
                this.setState({registros})
            })
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
                <th scope="row">{valor._id}</th>
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