import React, { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import CleanerPage from './cleanerPage/CleanerPage';
import PersonPage from './personPage/PersonPage';

import api from '../../services/api';
import history from '../../services/history';

import './HomePage.css';

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

    return(
        <div className="home-body">
            {
            isLoaded ? 
                (isCleaner ? <CleanerPage person={person} alerts={alerts} /> : <PersonPage person={person} />)
            :<Loading />
            }
        </div>
    );
}