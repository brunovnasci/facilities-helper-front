import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../alertCard/AlertCard';
import WelcomeCard from '../welcomeCard/WelcomeCard';

import api from '../../services/api';
import history from '../../services/history';

export default () => {

    const [person, setPerson] = useState({});
    const [alerts, setAlets] = useState(null);
    const [isCleaner, setIsCleaner] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [erro, setErro] = useState([]);

    const getAllAlerts = async () => {
        try {
            const response = await api.get("/alert", {headers: {'Authorization': localStorage.getItem("token")}});
            setAlets(response.data);
        } catch (error) {
            setErro(error.response.data.error);
            console.log(erro);
        }
    }

    const returnCardDenuncia = () => {
        return(<Link to="/create">Clique para alertar!</Link>);
    }

    useEffect( () => {
        if(!localStorage.getItem("token")){
            history.push("");
        }

        async function getPersonData() {
            try {
                const response = await api.get("/person", {headers: {'Authorization': localStorage.getItem("token")}});
                setPerson(response.data);
                if(response.data.role === "CLEANER"){
                    setIsCleaner(true);
                }
                setIsLoaded(true);
            } catch (error) {
                localStorage.removeItem("token");
                history.push("");
            }
        }
        getPersonData();
        if(isCleaner){
            // eslint-disable-next-line
            getAllAlerts();
        }
        // eslint-disable-next-line
    }, [isCleaner]);

    const returnAlerts = () =>{
        return !alerts ? <h1>carregando alertas!</h1> : alerts.map( (alert) => 
            <Card alert={alert} key={alert.id}/>
        )
    }

    return(
        <div>
            {isLoaded ? <WelcomeCard person={person} /> : <h1>carregando!</h1>}
            {isCleaner ? returnAlerts() : returnCardDenuncia()}
        </div>
    );
}