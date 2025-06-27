/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import BarraBusca from "./barraBusca";
import ModalEdicaoCliente from "./modalEdicaoCliente";

type Cliente = {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    cidade: string;
    ativo: boolean;
}

type Filtros = {
    cidade: string;
    ativo: boolean | null;
}

type props = {
    tema: string
}

type state = {
    clientes: Cliente[];
    clientesFiltrados: Cliente[];
    clienteSelecionado: Cliente | null;
    modalAberto: boolean;
    clienteEditando: Cliente | null;
}

export default class ListaCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            clientes: [
                { id: 1, nome: "João", sobrenome: "Silva", telefone: "(11) 99999-9999", email: "joao@email.com", cidade: "São Paulo", ativo: true },
                { id: 2, nome: "Maria", sobrenome: "Santos", telefone: "(11) 88888-8888", email: "maria@email.com", cidade: "Rio de Janeiro", ativo: true },
                { id: 3, nome: "Pedro", sobrenome: "Oliveira", telefone: "(11) 77777-7777", email: "pedro@email.com", cidade: "Belo Horizonte", ativo: false },
                { id: 4, nome: "Ana", sobrenome: "Costa", telefone: "(11) 66666-6666", email: "ana@email.com", cidade: "São Paulo", ativo: true },
                { id: 5, nome: "Carlos", sobrenome: "Ferreira", telefone: "(11) 55555-5555", email: "carlos@email.com", cidade: "Brasília", ativo: true },
                { id: 6, nome: "Beatriz", sobrenome: "Lima", telefone: "(11) 44444-4444", email: "beatriz@email.com", cidade: "Salvador", ativo: false },
                { id: 7, nome: "Rafael", sobrenome: "Mendes", telefone: "(11) 33333-3333", email: "rafael@email.com", cidade: "São Paulo", ativo: true },
                { id: 8, nome: "Lucia", sobrenome: "Rocha", telefone: "(11) 22222-2222", email: "lucia@email.com", cidade: "Rio de Janeiro", ativo: true }
            ],
            clientesFiltrados: [],
            clienteSelecionado: null,
            modalAberto: false,
            clienteEditando: null
        };
        this.selecionarCliente = this.selecionarCliente.bind(this);
        this.removerCliente = this.removerCliente.bind(this);
        this.buscarClientes = this.buscarClientes.bind(this);
        this.abrirModalEdicao = this.abrirModalEdicao.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.salvarEdicao = this.salvarEdicao.bind(this);
    }

    componentDidMount() {
        this.setState({ clientesFiltrados: this.state.clientes });
    }

    selecionarCliente(cliente: Cliente) {
        this.setState({ clienteSelecionado: cliente });
    }

    removerCliente(id: number) {
        const novosClientes = this.state.clientes.filter(cliente => cliente.id !== id);
        const novosFiltrados = this.state.clientesFiltrados.filter(cliente => cliente.id !== id);
        this.setState({ 
            clientes: novosClientes,
            clientesFiltrados: novosFiltrados,
            clienteSelecionado: null 
        });
    }

    buscarClientes(termo: string, filtros: Filtros) {
        let clientesFiltrados = this.state.clientes;
        
        // Filtro por termo de busca
        if (termo.trim() !== '') {
            clientesFiltrados = clientesFiltrados.filter(cliente => 
                cliente.nome.toLowerCase().includes(termo.toLowerCase()) ||
                cliente.sobrenome.toLowerCase().includes(termo.toLowerCase()) ||
                cliente.email.toLowerCase().includes(termo.toLowerCase()) ||
                cliente.telefone.includes(termo)
            );
        }
        
        // Filtro por cidade
        if (filtros.cidade && filtros.cidade !== '') {
            clientesFiltrados = clientesFiltrados.filter(cliente => 
                cliente.cidade === filtros.cidade
            );
        }
        
        // Filtro por status
        if (filtros.ativo !== null) {
            clientesFiltrados = clientesFiltrados.filter(cliente => 
                cliente.ativo === filtros.ativo
            );
        }
        
        this.setState({ clientesFiltrados });
    }

    abrirModalEdicao(cliente: Cliente) {
        this.setState({ 
            clienteEditando: cliente,
            modalAberto: true 
        });
    }

    fecharModal() {
        this.setState({ 
            modalAberto: false,
            clienteEditando: null 
        });
    }

    salvarEdicao(clienteEditado: Cliente) {
        const clientesAtualizados = this.state.clientes.map(cliente => 
            cliente.id === clienteEditado.id ? clienteEditado : cliente
        );
        
        const filtradosAtualizados = this.state.clientesFiltrados.map(cliente => 
            cliente.id === clienteEditado.id ? clienteEditado : cliente
        );
        
        this.setState({ 
            clientes: clientesAtualizados,
            clientesFiltrados: filtradosAtualizados,
            clienteSelecionado: clienteEditado
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4 className="center-align">Lista de Clientes</h4>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12">
                        <BarraBusca tema={this.props.tema} onBuscar={this.buscarClientes} />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m8">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    Clientes Cadastrados 
                                    <span className="badge purple white-text">{this.state.clientesFiltrados.length}</span>
                                </span>
                                <div className="collection">
                                    {this.state.clientesFiltrados.length > 0 ? (
                                        this.state.clientesFiltrados.map(cliente => (
                                            <a 
                                                key={cliente.id}
                                                className={`collection-item ${this.state.clienteSelecionado?.id === cliente.id ? 'active ' + this.props.tema : ''}`}
                                                onClick={() => this.selecionarCliente(cliente)}
                                            >
                                                <div>
                                                    <div className="row valign-wrapper" style={{margin: '0'}}>
                                                        <div className="col s2">
                                                            <i className={`material-icons circle ${cliente.ativo ? 'green' : 'grey'} white-text`}>
                                                                {cliente.ativo ? 'check' : 'block'}
                                                            </i>
                                                        </div>
                                                        <div className="col s8">
                                                            <strong>{cliente.nome} {cliente.sobrenome}</strong>
                                                            <br />
                                                            <span className="grey-text">{cliente.email}</span>
                                                            <br />
                                                            <span className="grey-text">{cliente.cidade}</span>
                                                        </div>
                                                        <div className="col s2">
                                                            <a 
                                                                className="secondary-content red-text"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    this.removerCliente(cliente.id);
                                                                }}
                                                            >
                                                                <i className="material-icons">delete</i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <div className="collection-item center-align">
                                            <i className="material-icons large grey-text">search_off</i>
                                            <p className="grey-text">Nenhum cliente encontrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col s12 m4">
                        {this.state.clienteSelecionado ? (
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">
                                        Detalhes do Cliente
                                        <span className={`new badge ${this.state.clienteSelecionado.ativo ? 'green' : 'red'}`} data-badge-caption="">
                                            {this.state.clienteSelecionado.ativo ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </span>
                                    <div className="section">
                                        <p><strong>Nome:</strong> {this.state.clienteSelecionado.nome}</p>
                                        <p><strong>Sobrenome:</strong> {this.state.clienteSelecionado.sobrenome}</p>
                                        <p><strong>Telefone:</strong> {this.state.clienteSelecionado.telefone}</p>
                                        <p><strong>Email:</strong> {this.state.clienteSelecionado.email}</p>
                                        <p><strong>Cidade:</strong> {this.state.clienteSelecionado.cidade}</p>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <button 
                                        className={`btn waves-effect waves-light ${this.props.tema}`} 
                                        onClick={() => this.state.clienteSelecionado && this.abrirModalEdicao(this.state.clienteSelecionado)}
                                    >
                                        <i className="material-icons left">edit</i>Editar
                                    </button>
                                    <button 
                                        className="btn waves-effect waves-light red"
                                        onClick={() => this.removerCliente(this.state.clienteSelecionado!.id)}
                                        style={{marginLeft: '10px'}}
                                    >
                                        <i className="material-icons left">delete</i>Excluir
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title grey-text">Selecione um Cliente</span>
                                    <div className="center-align" style={{padding: '20px 0'}}>
                                        <i className="material-icons large grey-text">person_outline</i>
                                        <p className="grey-text">Clique em um cliente na lista para ver os detalhes.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {this.state.modalAberto && this.state.clienteEditando && (
                    <ModalEdicaoCliente 
                        cliente={this.state.clienteEditando}
                        onFechar={this.fecharModal}
                        onSalvar={this.salvarEdicao}
                        tema={this.props.tema}
                        isOpen={this.state.modalAberto}
                    />
                )}
            </div>
        )
    }
}