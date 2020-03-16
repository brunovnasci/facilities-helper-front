import React, { useState } from 'react'; 

import { faUser, faUnlockAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Textbox from '../textbox/Textbox';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import ErrorCard from '../errorCard/ErrorCard';

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
    const [isLogging, setIsLogging] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

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
        setIsLogging(true);

        if(arrayError.length === 0){
            verificarCamposConfirm();
            if(arrayError.length === 0){
                try {
                    const response = await api.post("/person/PERSON", {nome, sobrenome, email, senha});
                    if(response.data){
                        setIsLogged(true);
                    }
                } catch (error) {
                    setIsLogged(false);
                    setIsLogging(false);
                    arrayError.push(error.response.data.error);
                    setErro(arrayError);
                }
            }else{
                setIsLogged(false);
                setIsLogging(false);
                setErro(arrayError);
            }
        }else{
            setIsLogged(false);
            setIsLogging(false);
            setErro(arrayError);
        }
    }
    
    const handleOnChangeEmail = (e) => {
        setErro([]);
        setEmail(e.target.value);
    }

    const handleOnChangeConfirmEmail = (e) => {
        setErro([]);
        setConfirmEmail(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setErro([]);
        setSenha(e.target.value);
    }

    const handleOnChangeConfirPassword = (e) => {
        setErro([]);
        setConfirmSenha(e.target.value);
    }

    const handleOnChangeNome = (e) => {
        setErro([]);
        setNome(e.target.value);
    }

    const handleOnChangeSobrenome = (e) => {
        setErro([]);
        setSobrenome(e.target.value);
    }

    return(
        <>
        {erro.length != 0 ? erro.map((erroTitle, index) => {
           return <ErrorCard key={index} error={erroTitle}/>
        }) : ""}
        {isLogging ? (!isLogged ? <Loading /> : history.push("")) : 
            <div className="form-body">
                <form className="form-div" onSubmit={(e) => clicarRegister(e)}>
                    <Textbox value={nome} icon={faUser} onChange={handleOnChangeNome} placeholder="Nome" id="nome" required type="text"/>
                    <Textbox value={sobrenome} icon={faUser} onChange={handleOnChangeSobrenome} placeholder="Sobrenome" id="sobrenome" required type="text"/>
                    <Textbox value={email} icon={faEnvelope} onChange={handleOnChangeEmail} placeholder="Email" id="email" required type="email"/>
                    <Textbox value={confirmEmail} icon={faEnvelope} onChange={handleOnChangeConfirmEmail} placeholder="Confirmar email" id="confirmEmail" required type="email"/>
                    <Textbox value={senha} icon={faUnlockAlt} onChange={handleOnChangePassword} placeholder="Senha" id="pswd" required type="password"/>
                    <Textbox value={confirmSenha} icon={faUnlockAlt} onChange={handleOnChangeConfirPassword} placeholder="Confirmar senha" id="confirmPswd" required type="password" />
                    <Button placeholder="Registrar" color="green"/>

                    <Link to="/" className="link">Já possui uma conta? Faça o login!</Link>
                </form>
            </div>
        }
        </>
    );
}