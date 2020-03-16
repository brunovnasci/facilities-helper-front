import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import Textbox from '../textbox/Textbox';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import ErrorCard from '../errorCard/ErrorCard';

import history from '../../services/history';
import api from '../../services/api';
import './LoginForm.css';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const [isLogging, setIsLogging] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("token")){
            history.push("/home");
        }
    });

    const clicarNoLogin = async (e) => {
        e.preventDefault();
        setIsLogging(true);
        try {
            const response = await api.post('person/jwt', {email, senha});
            setIsLogged(true);
            localStorage.setItem("token", response.data.accessJwt);
        } catch (error) {
            setIsLogged(false);
            setIsLogging(false);
            setErro(error.response.data.error);
        }
    }
    
    const handleOnChangeEmail = (e) => {
        setErro(null);
        setEmail(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setErro(null);
        setSenha(e.target.value);
    }

    return(
        <>
        {erro ? <ErrorCard error={erro} /> : ""}
        {isLogging ? (!isLogged ? <Loading /> : history.push("/home")) : 
            <div className="form-body">
                <form className="form-div" onSubmit={(e) => clicarNoLogin(e)}>
                    <Textbox value={email} icon={faUser} onChange={handleOnChangeEmail} placeholder="Email" id="email" required type="email"/>
                    <Textbox value={senha} icon={faUnlockAlt} onChange={handleOnChangePassword} placeholder="Senha" id="pswd" required type="password"/>
                    <Button placeholder="Login" color="green"/>
                    <Link to="/register" className="link">Registre-se agora!</Link>
                </form>
            </div>
        }
        </>
    );
}

export default withRouter(Login);