import React, { useEffect, useState } from 'react';

import Card from '../../components/alertCard/AlertCard';
import TitleCard from '../../components/titleCard/TitleCard';
import Loading from '../../components/loading/Loading';

import api from '../../services/api';
import history from '../../services/history';

export default () => {

    const [alerts, setAlets] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [erro, setErro] = useState([]);

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            history.push("");
        }
        const getPersonAlerts = async () => {
            try {
                const response = await api.get("/alert/person", {headers: {'Authorization': localStorage.getItem("token")}});
                setAlets(response.data);
                setIsLoaded(true);
            } catch (error) {
                setIsLoaded(true);
                setErro(error);
            }
        }
        getPersonAlerts();
    },[]);

    return(
        <div>
            {!isLoaded ? <Loading /> : 
                alerts.length !== 0 ? alerts.map( (alert) => 
                    <Card alert={alert} key={alert.id}/>
                ) : <TitleCard title="Ops! Você não possui alertas!"/>
            }
        </div>
    );
}