import React, { useState } from 'react'; 
import Textbox from '../textbox/Textbox';
import Button from '../button/Button';

import { faUser, faUnlockAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';


import history from '../../services/history';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [erro, setErro] = useState([]);
    const arrayError = [];

    const verificarCamposConfirm = () => {
        if(email !== confirmEmail){
            arrayError.push("email nao bate");
        }

        if(senha !== confirmSenha){
            arrayError.push("senha nao bate");
        }
    }

    const clicarRegister = async (e) => {
        e.preventDefault();

        if(arrayError.length === 0){
            
            verificarCamposConfirm();
            if(arrayError.length === 0){
                try {
                    const response = await api.post("/person/PERSON", {nome, sobrenome, email, senha});
                    if(response.data){
                        history.push("");
                    }
                } catch (error) {
                    arrayError.push(error.response.data.error);
                    setErro(arrayError);
                }
            }else{
                setErro(arrayError);
            }
        }else{
            setErro(arrayError);
        }
    }
    
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnChangeConfirmEmail = (e) => {
        setConfirmEmail(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setSenha(e.target.value);
    }

    const handleOnChangeConfirPassword = (e) => {
        setConfirmSenha(e.target.value);
    }

    const handleOnChangeNome = (e) => {
        setNome(e.target.value);
    }

    const handleOnChangeSobrenome = (e) => {
        setSobrenome(e.target.value);
    }

    return(
        <div className="form-body">
            <form className="form-div" onSubmit={(e) => clicarRegister(e)}>
                <Textbox icon={faUser} onChange={handleOnChangeNome} placeholder="Nome" id="nome" required type="text"/>
                <Textbox icon={faUser} onChange={handleOnChangeSobrenome} placeholder="Sobrenome" id="sobrenome" required type="text"/>
                <Textbox icon={faEnvelope} onChange={handleOnChangeEmail} placeholder="Email" id="email" required type="email"/>
                <Textbox icon={faEnvelope} onChange={handleOnChangeConfirmEmail} placeholder="Confirmar email" id="confirmEmail" required type="email"/>
                <Textbox icon={faUnlockAlt} onChange={handleOnChangePassword} placeholder="Senha" id="pswd" required type="password"/>
                <Textbox icon={faUnlockAlt} onChange={handleOnChangeConfirPassword} placeholder="Confirmar senha" id="confirmPswd" required type="password" />
                {erro.length === 0 ? "" : 
                    erro.map((erroName, index) =>{
                        return <p key={index}>{erroName}</p>
                    })
                }
                <Button placeholder="Registrar" color="green"/>

                <Link to="/" className="link">Já possui uma conta? Faça o login!</Link>
            </form>
        </div>
    );
}