import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    tema: string;
    onBuscar: (termo: string, filtros: Filtros) => void;
}

type Filtros = {
    cidade: string;
    ativo: boolean | null;
}

type state = {
    termoBusca: string;
    filtros: Filtros;
    mostrarFiltros: boolean;
}

export default class BarraBusca extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            termoBusca: '',
            filtros: {
                cidade: '',
                ativo: null
            },
            mostrarFiltros: false
        };
        this.handleBusca = this.handleBusca.bind(this);
        this.handleFiltroChange = this.handleFiltroChange.bind(this);
        this.limparFiltros = this.limparFiltros.bind(this);
        this.toggleFiltros = this.toggleFiltros.bind(this);
    }

    handleBusca(event: React.ChangeEvent<HTMLInputElement>) {
        const termo = event.target.value;
        this.setState({ termoBusca: termo });
        this.props.onBuscar(termo, this.state.filtros);
    }

    handleFiltroChange(campo: keyof Filtros, valor: any) {
        const novosFiltros = { ...this.state.filtros, [campo]: valor };
        this.setState({ filtros: novosFiltros });
        this.props.onBuscar(this.state.termoBusca, novosFiltros);
    }

    limparFiltros() {
        const filtrosLimpos = { cidade: '', ativo: null };
        this.setState({ 
            termoBusca: '',
            filtros: filtrosLimpos 
        });
        this.props.onBuscar('', filtrosLimpos);
    }

    toggleFiltros() {
        this.setState({ mostrarFiltros: !this.state.mostrarFiltros });
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col s12 m8">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input 
                                    id="busca" 
                                    type="text" 
                                    className="validate"
                                    value={this.state.termoBusca}
                                    onChange={this.handleBusca}
                                />
                                <label htmlFor="busca" className={this.state.termoBusca ? 'active' : ''}>
                                    Buscar por nome, email ou telefone
                                </label>
                            </div>
                        </div>
                        <div className="col s12 m4 center-align">
                            <button 
                                className={`btn waves-effect waves-light ${this.props.tema}`}
                                onClick={this.toggleFiltros}
                                style={{marginTop: '20px'}}
                            >
                                <i className="material-icons left">filter_list</i>
                                Filtros
                            </button>
                            <button 
                                className="btn waves-effect waves-light grey"
                                onClick={this.limparFiltros}
                                style={{marginTop: '20px', marginLeft: '10px'}}
                            >
                                <i className="material-icons left">clear</i>
                                Limpar
                            </button>
                        </div>
                    </div>
                    
                    {this.state.mostrarFiltros && (
                        <div className="row">
                            <div className="col s12">
                                <div className="divider" style={{marginBottom: '20px'}}></div>
                                <h6>Filtros Avançados</h6>
                            </div>
                            <div className="col s12 m6">
                                <div className="input-field">
                                    <select 
                                        className="browser-default"
                                        value={this.state.filtros.cidade}
                                        onChange={(e) => this.handleFiltroChange('cidade', e.target.value)}
                                    >
                                        <option value="">Todas as cidades</option>
                                        <option value="São Paulo">São Paulo</option>
                                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                                        <option value="Belo Horizonte">Belo Horizonte</option>
                                        <option value="Brasília">Brasília</option>
                                        <option value="Salvador">Salvador</option>
                                    </select>
                                    <label>Filtrar por cidade</label>
                                </div>
                            </div>
                            <div className="col s12 m6">
                                <div className="input-field">
                                    <select 
                                        className="browser-default"
                                        value={this.state.filtros.ativo === null ? '' : this.state.filtros.ativo.toString()}
                                        onChange={(e) => {
                                            const valor = e.target.value === '' ? null : e.target.value === 'true';
                                            this.handleFiltroChange('ativo', valor);
                                        }}
                                    >
                                        <option value="">Todos os status</option>
                                        <option value="true">Ativos</option>
                                        <option value="false">Inativos</option>
                                    </select>
                                    <label>Status do cliente</label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
