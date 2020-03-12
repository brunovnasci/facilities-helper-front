import React, { useState, useEffect } from 'react';
import Card from '../alertCard/AlertCard';
import WelcomeCard from '../welcomeCard/WelcomeCard';
import DenunciaCard from '../denunciacard/DenunciaCard';
import Loading from '../loading/Loading';

import api from '../../services/api';
import history from '../../services/history';

import './Home.css';

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
            setIsLoaded(true);
        } catch (error) {
            setErro(error.response.data.error);
            console.log(erro);
            setIsLoaded(true);
        }
    }

    const returnCardDenuncia = () => {
        return(
            <>
                <WelcomeCard person={person} />
                <DenunciaCard />
            </>
        );
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
                    getAllAlerts();
                }else{
                    setIsLoaded(true);
                }
            } catch (error) {
                localStorage.removeItem("token");
                history.push("");
            }
        }
        getPersonData();
        // eslint-disable-next-line
    }, []);

    const returnAlerts = () =>{
        return(
            <>
                <WelcomeCard person={person} />
                <div>
                    {!alerts ? <h1>carregando alertas!</h1> : alerts.map( (alert) => 
                        <Card alert={alert} key={alert.id}/>
                    )}
                </div>
            </>
        );
    }

    return(
        <div className="home-body">
            {isLoaded ? isCleaner ? returnAlerts() : returnCardDenuncia() : <Loading />}
        </div>
    );
}