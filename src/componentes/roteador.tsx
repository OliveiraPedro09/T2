import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";
import Dashboard from "./dashboard";
import Footer from "./footer";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Dashboard'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao 
            seletorView={this.selecionarView} 
            tema="purple lighten-4" 
            botoes={['Dashboard', 'Clientes', 'Cadastrar Cliente', 'Relatórios', 'Configurações']} 
        />
        
        if (this.state.tela === 'Dashboard') {
            return (
                <>
                    {barraNavegacao}
                    <Dashboard tema="purple lighten-4" />
                    <Footer />
                </>
            )
        } else if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="purple lighten-4" />
                    <Footer />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Cliente') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple lighten-4" />
                    <Footer />
                </>
            )
        } else if (this.state.tela === 'Relatórios') {
            return (
                <>
                    {barraNavegacao}
                    {this.renderRelatorios()}
                    <Footer />
                </>
            )
        } else if (this.state.tela === 'Configurações') {
            return (
                <>
                    {barraNavegacao}
                    {this.renderConfiguracoes()}
                    <Footer />
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    <Dashboard tema="purple lighten-4" />
                    <Footer />
                </>
            )
        }
    }

    renderRelatorios() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4 className="center-align">Relatórios</h4>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m6 l4">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    <i className="material-icons left">people</i>
                                    Total de Clientes
                                </span>
                                <h3 className="center-align purple-text">150</h3>
                                <p className="center-align grey-text">Clientes cadastrados</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col s12 m6 l4">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    <i className="material-icons left">trending_up</i>
                                    Novos Este Mês
                                </span>
                                <h3 className="center-align green-text">25</h3>
                                <p className="center-align grey-text">Cadastros recentes</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col s12 m6 l4">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    <i className="material-icons left">location_city</i>
                                    Cidades
                                </span>
                                <h3 className="center-align blue-text">12</h3>
                                <p className="center-align grey-text">Cidades atendidas</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Relatórios Disponíveis</span>
                                <div className="collection">
                                    <a className="collection-item waves-effect">
                                        <i className="material-icons left">assessment</i>
                                        Relatório Geral de Clientes
                                        <span className="secondary-content">
                                            <i className="material-icons">file_download</i>
                                        </span>
                                    </a>
                                    <a className="collection-item waves-effect">
                                        <i className="material-icons left">timeline</i>
                                        Clientes por Período
                                        <span className="secondary-content">
                                            <i className="material-icons">file_download</i>
                                        </span>
                                    </a>
                                    <a className="collection-item waves-effect">
                                        <i className="material-icons left">place</i>
                                        Clientes por Localização
                                        <span className="secondary-content">
                                            <i className="material-icons">file_download</i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderConfiguracoes() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4 className="center-align">Configurações</h4>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    <i className="material-icons left">palette</i>
                                    Aparência
                                </span>
                                <div className="row">
                                    <div className="col s12">
                                        <label>Tema da Aplicação</label>
                                        <select className="browser-default">
                                            <option value="" disabled selected>Escolha um tema</option>
                                            <option value="purple">Roxo (Atual)</option>
                                            <option value="blue">Azul</option>
                                            <option value="green">Verde</option>
                                            <option value="red">Vermelho</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    <i className="material-icons left">storage</i>
                                    Dados
                                </span>
                                <div className="row">
                                    <div className="col s12">
                                        <a className="btn waves-effect waves-light purple lighten-4 purple-text text-darken-3 full-width">
                                            <i className="material-icons left">backup</i>
                                            Fazer Backup
                                        </a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <a className="btn waves-effect waves-light orange lighten-4 orange-text text-darken-3 full-width">
                                            <i className="material-icons left">restore</i>
                                            Restaurar Backup
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                    <i className="material-icons left">info</i>
                                    Informações do Sistema
                                </span>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <p><strong>Versão:</strong> 1.0.0</p>
                                        <p><strong>Desenvolvido por:</strong> Equipe WB</p>
                                    </div>
                                    <div className="col s12 m6">
                                        <p><strong>Última atualização:</strong> 27/06/2025</p>
                                        <p><strong>Tecnologias:</strong> React + MaterializeCSS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}