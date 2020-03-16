import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import Textbox from '../textbox/Textbox';
import Button from '../button/Button';
import Loading from '../loading/Loading';

import history from '../../services/history';
import api from '../../services/api';
import './LoginForm.css';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState([]);
    const [isLogging, setIsLogging] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const arrayError = [];

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
        <>
        {isLogging ? (!isLogged ? <Loading /> : history.push("/home")) : 
            <div className="form-body">
                <form className="form-div" onSubmit={(e) => clicarNoLogin(e)}>
                    <Textbox icon={faUser} onChange={handleOnChangeEmail} placeholder="Email" id="email" required type="email"/>
                    <Textbox icon={faUnlockAlt} onChange={handleOnChangePassword} placeholder="Senha" id="pswd" required type="password"/>
                    <Button placeholder="Login" color="green"/>
                    {erro.length === 0 ? "" : 
                        erro.map((erroName, index) =>{
                            return <p key={index}>{erroName}</p>
                        })
                    }
                    <Link to="/register" className="link">Registre-se agora!</Link>
                </form>
            </div>
        }
        </>
    );
}

export default withRouter(Login);