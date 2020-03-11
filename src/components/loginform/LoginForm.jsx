import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Textbox from '../textbox/Textbox';
import Button from '../button/Button';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import history from '../../services/history';
import api from '../../services/api';
import './LoginForm.css';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState([]);
    const arrayError = [];

    useEffect(() => {
        if(localStorage.getItem("token")){
            history.push("/home");
        }
    });

    const clicarNoLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('person/jwt', {email, senha});
            localStorage.setItem("token", response.data.accessJwt);
            history.push("/home");
        } catch (error) {
            arrayError.push(error.response.data.error);
            setErro(arrayError);
        }
    }
    
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setSenha(e.target.value);
    }

    return(
        <form className="form-div" onSubmit={(e) => clicarNoLogin(e)}>
            <Textbox icon={faUser} onChange={handleOnChangeEmail} placeholder="Email" id="email" required type="email"/>
            <Textbox icon={faUnlockAlt} onChange={handleOnChangePassword} placeholder="Senha" id="pswd" required type="password"/>
            <Button placeholder="Login"/>
            {erro.length === 0 ? "" : 
                erro.map((erroName, index) =>{
                    return <p key={index}>{erroName}</p>
                })
            }
            <Link to="/register">Registrar</Link>
        </form>
    );
}

export default withRouter(Login);