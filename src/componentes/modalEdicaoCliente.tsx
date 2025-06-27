import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

type Cliente = {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    cidade: string;
    ativo: boolean;
}

type props = {
    cliente: Cliente | null;
    tema: string;
    onSalvar: (cliente: Cliente) => void;
    onFechar: () => void;
    isOpen: boolean;
}

type state = {
    cliente: Cliente;
    errors: { [key: string]: string };
}

export default class ModalEdicaoCliente extends Component<props, state> {
    private modalRef: React.RefObject<HTMLDivElement>;

    constructor(props: props) {
        super(props);
        this.modalRef = React.createRef();
        this.state = {
            cliente: {
                id: 0,
                nome: '',
                sobrenome: '',
                telefone: '',
                email: '',
                cidade: '',
                ativo: true
            },
            errors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarFormulario = this.validarFormulario.bind(this);
    }

    componentDidMount() {
        if (this.modalRef.current) {
            M.Modal.init(this.modalRef.current);
        }
    }

    componentDidUpdate(prevProps: props) {
        if (this.props.cliente && this.props.cliente !== prevProps.cliente) {
            this.setState({ cliente: { ...this.props.cliente } });
        }
        
        if (this.props.isOpen && !prevProps.isOpen && this.modalRef.current) {
            const modal = M.Modal.getInstance(this.modalRef.current);
            modal.open();
        } else if (!this.props.isOpen && prevProps.isOpen && this.modalRef.current) {
            const modal = M.Modal.getInstance(this.modalRef.current);
            modal.close();
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = event.target;
        let finalValue: any = value;
        
        if (type === 'checkbox') {
            finalValue = (event.target as HTMLInputElement).checked;
        }
        
        this.setState({ 
            cliente: { ...this.state.cliente, [name]: finalValue },
            errors: { ...this.state.errors, [name]: '' }
        });
    }

    validarFormulario(): boolean {
        const errors: { [key: string]: string } = {};
        
        if (!this.state.cliente.nome.trim()) {
            errors.nome = 'Nome é obrigatório';
        }
        
        if (!this.state.cliente.sobrenome.trim()) {
            errors.sobrenome = 'Sobrenome é obrigatório';
        }
        
        if (!this.state.cliente.email.trim()) {
            errors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(this.state.cliente.email)) {
            errors.email = 'Email inválido';
        }
        
        if (!this.state.cliente.telefone.trim()) {
            errors.telefone = 'Telefone é obrigatório';
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        if (this.validarFormulario()) {
            this.props.onSalvar(this.state.cliente);
            this.props.onFechar();
        }
    }

    render() {
        if (!this.props.cliente) return null;

        return (
            <div 
                ref={this.modalRef}
                id="modalEdicaoCliente" 
                className="modal modal-fixed-footer"
            >
                <div className="modal-content">
                    <h4>
                        <i className="material-icons left">edit</i>
                        Editar Cliente
                    </h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12 m6">
                                <input 
                                    id="modalNome" 
                                    name="nome"
                                    type="text" 
                                    className={`validate ${this.state.errors.nome ? 'invalid' : ''}`}
                                    value={this.state.cliente.nome}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor="modalNome" className={this.state.cliente.nome ? 'active' : ''}>Nome *</label>
                                {this.state.errors.nome && (
                                    <span className="helper-text red-text">{this.state.errors.nome}</span>
                                )}
                            </div>
                            <div className="input-field col s12 m6">
                                <input 
                                    id="modalSobrenome" 
                                    name="sobrenome"
                                    type="text" 
                                    className={`validate ${this.state.errors.sobrenome ? 'invalid' : ''}`}
                                    value={this.state.cliente.sobrenome}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor="modalSobrenome" className={this.state.cliente.sobrenome ? 'active' : ''}>Sobrenome *</label>
                                {this.state.errors.sobrenome && (
                                    <span className="helper-text red-text">{this.state.errors.sobrenome}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s12 m6">
                                <input 
                                    id="modalTelefone" 
                                    name="telefone"
                                    type="text" 
                                    className={`validate ${this.state.errors.telefone ? 'invalid' : ''}`}
                                    value={this.state.cliente.telefone}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor="modalTelefone" className={this.state.cliente.telefone ? 'active' : ''}>Telefone *</label>
                                {this.state.errors.telefone && (
                                    <span className="helper-text red-text">{this.state.errors.telefone}</span>
                                )}
                            </div>
                            <div className="input-field col s12 m6">
                                <input 
                                    id="modalEmail" 
                                    name="email"
                                    type="email" 
                                    className={`validate ${this.state.errors.email ? 'invalid' : ''}`}
                                    value={this.state.cliente.email}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor="modalEmail" className={this.state.cliente.email ? 'active' : ''}>Email *</label>
                                {this.state.errors.email && (
                                    <span className="helper-text red-text">{this.state.errors.email}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s12 m8">
                                <select 
                                    name="cidade"
                                    className="browser-default"
                                    value={this.state.cliente.cidade}
                                    onChange={this.handleInputChange}
                                >
                                    <option value="">Selecione uma cidade</option>
                                    <option value="São Paulo">São Paulo</option>
                                    <option value="Rio de Janeiro">Rio de Janeiro</option>
                                    <option value="Belo Horizonte">Belo Horizonte</option>
                                    <option value="Brasília">Brasília</option>
                                    <option value="Salvador">Salvador</option>
                                </select>
                            </div>
                            <div className="col s12 m4">
                                <p>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name="ativo"
                                            checked={this.state.cliente.ativo}
                                            onChange={this.handleInputChange}
                                        />
                                        <span>Cliente Ativo</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button 
                        type="button"
                        className="modal-close waves-effect waves-grey btn-flat"
                        onClick={this.props.onFechar}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="button"
                        className={`waves-effect waves-light btn ${this.props.tema}`}
                        onClick={this.handleSubmit}
                    >
                        <i className="material-icons left">save</i>
                        Salvar
                    </button>
                </div>
            </div>
        )
    }
}
