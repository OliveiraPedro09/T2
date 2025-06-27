import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    tema: string
}

type state = {
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    endereco: string;
    cidade: string;
    cep: string;
    cpf: string;
    dataNascimento: string;
    errors: { [key: string]: string };
}

export default class FormularioCadastroCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            nome: '',
            sobrenome: '',
            telefone: '',
            email: '',
            endereco: '',
            cidade: '',
            cep: '',
            cpf: '',
            dataNascimento: '',
            errors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.limparFormulario = this.limparFormulario.bind(this);
        this.validarFormulario = this.validarFormulario.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ 
            [name]: value,
            errors: { ...this.state.errors, [name]: '' }
        } as any);
    }

    validarFormulario(): boolean {
        const errors: { [key: string]: string } = {};
        
        if (!this.state.nome.trim()) {
            errors.nome = 'Nome é obrigatório';
        }
        
        if (!this.state.sobrenome.trim()) {
            errors.sobrenome = 'Sobrenome é obrigatório';
        }
        
        if (!this.state.email.trim()) {
            errors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            errors.email = 'Email inválido';
        }
        
        if (!this.state.telefone.trim()) {
            errors.telefone = 'Telefone é obrigatório';
        }
        
        if (!this.state.cpf.trim()) {
            errors.cpf = 'CPF é obrigatório';
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        if (this.validarFormulario()) {
            console.log('Cliente cadastrado:', this.state);
            alert('Cliente cadastrado com sucesso!');
            this.limparFormulario();
        }
    }

    limparFormulario() {
        this.setState({
            nome: '',
            sobrenome: '',
            telefone: '',
            email: '',
            endereco: '',
            cidade: '',
            cep: '',
            cpf: '',
            dataNascimento: '',
            errors: {}
        });
    }
    
    render() {
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        let estiloBotaoSecundario = `btn waves-effect waves-light grey lighten-1`;
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4 className="center-align">Cadastro de Cliente</h4>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m10 l8 offset-m1 offset-l2">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Dados Pessoais</span>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12 m6">
                                            <input 
                                                id="nome" 
                                                name="nome"
                                                type="text" 
                                                className={`validate ${this.state.errors.nome ? 'invalid' : ''}`}
                                                value={this.state.nome}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="nome" className={this.state.nome ? 'active' : ''}>Nome *</label>
                                            {this.state.errors.nome && (
                                                <span className="helper-text red-text">{this.state.errors.nome}</span>
                                            )}
                                        </div>
                                        <div className="input-field col s12 m6">
                                            <input 
                                                id="sobrenome" 
                                                name="sobrenome"
                                                type="text" 
                                                className={`validate ${this.state.errors.sobrenome ? 'invalid' : ''}`}
                                                value={this.state.sobrenome}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="sobrenome" className={this.state.sobrenome ? 'active' : ''}>Sobrenome *</label>
                                            {this.state.errors.sobrenome && (
                                                <span className="helper-text red-text">{this.state.errors.sobrenome}</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="input-field col s12 m6">
                                            <input 
                                                id="cpf" 
                                                name="cpf"
                                                type="text" 
                                                className={`validate ${this.state.errors.cpf ? 'invalid' : ''}`}
                                                value={this.state.cpf}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="cpf" className={this.state.cpf ? 'active' : ''}>CPF *</label>
                                            {this.state.errors.cpf && (
                                                <span className="helper-text red-text">{this.state.errors.cpf}</span>
                                            )}
                                        </div>
                                        <div className="input-field col s12 m6">
                                            <input 
                                                id="dataNascimento" 
                                                name="dataNascimento"
                                                type="date" 
                                                className="validate"
                                                value={this.state.dataNascimento}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="dataNascimento" className={this.state.dataNascimento ? 'active' : ''}>Data de Nascimento</label>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="input-field col s12 m6">
                                            <input 
                                                id="telefone" 
                                                name="telefone"
                                                type="text" 
                                                className={`validate ${this.state.errors.telefone ? 'invalid' : ''}`}
                                                value={this.state.telefone}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="telefone" className={this.state.telefone ? 'active' : ''}>Telefone *</label>
                                            {this.state.errors.telefone && (
                                                <span className="helper-text red-text">{this.state.errors.telefone}</span>
                                            )}
                                        </div>
                                        <div className="input-field col s12 m6">
                                            <input 
                                                id="email" 
                                                name="email"
                                                type="email" 
                                                className={`validate ${this.state.errors.email ? 'invalid' : ''}`}
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="email" className={this.state.email ? 'active' : ''}>Email *</label>
                                            {this.state.errors.email && (
                                                <span className="helper-text red-text">{this.state.errors.email}</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="divider" style={{margin: '20px 0'}}></div>
                                    <h6>Endereço</h6>
                                    
                                    <div className="row">
                                        <div className="input-field col s12 m8">
                                            <input 
                                                id="endereco" 
                                                name="endereco"
                                                type="text" 
                                                className="validate"
                                                value={this.state.endereco}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="endereco" className={this.state.endereco ? 'active' : ''}>Endereço</label>
                                        </div>
                                        <div className="input-field col s12 m4">
                                            <input 
                                                id="cep" 
                                                name="cep"
                                                type="text" 
                                                className="validate"
                                                value={this.state.cep}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="cep" className={this.state.cep ? 'active' : ''}>CEP</label>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                id="cidade" 
                                                name="cidade"
                                                type="text" 
                                                className="validate"
                                                value={this.state.cidade}
                                                onChange={this.handleInputChange}
                                            />
                                            <label htmlFor="cidade" className={this.state.cidade ? 'active' : ''}>Cidade</label>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col s12 center-align">
                                            <p className="grey-text">* Campos obrigatórios</p>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col s12 center-align">
                                            <button className={estiloBotao} type="submit">
                                                <i className="material-icons left">save</i>Cadastrar Cliente
                                            </button>
                                            <button 
                                                className={estiloBotaoSecundario} 
                                                type="button"
                                                onClick={this.limparFormulario}
                                                style={{marginLeft: '10px'}}
                                            >
                                                <i className="material-icons left">clear</i>Limpar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}