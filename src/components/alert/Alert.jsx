import React, { useEffect,useState } from 'react';
import history from '../../services/history';
import PersonCard from '../personCard/PersonCard';

import './Alert.css';

import api from '../../services/api';

export default (props) => {

    const [alert, setAlert] = useState(null);
    const [erro, setErro] = useState(null);
    const [isloaded, setIsLoaded] = useState(false);

    const paramId = props.match.params.id;

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        // var sec = a.getSeconds();
        var time = date + '/' + month + '/' + year + ' às ' + hour + ':' + min;
        return time;
      }

    useEffect(() =>{
        if(!localStorage.getItem("token")){
            history.push("");
        }
    
        async function getAlert(){
            try {
                const response = await api.get("/alert/"+paramId, {headers: {'Authorization': localStorage.getItem("token")}});
                setAlert(response.data);  
                setIsLoaded(true); 
            } catch (error) {
                setErro(error);
                setIsLoaded(true); 
            }
        }
        getAlert();
    }, [paramId]);

    const verifyError = () => {
        if(isloaded){
            if(erro!=null){
                return(<h1>Alerta nao foi achado!</h1>);
            }else{
                return returnAlert();
            }
        }else{
            return(<h1>carregando</h1>);
        }
        
    }

    const modificarStatusAlerta = async () => {
        try {
            const response = await api.put("/alert/"+alert.id+"/"+!alert.estaFeita,{}, {headers: {'Authorization': localStorage.getItem("token")}});
            setAlert(response.data); 
        } catch (error) {
            setErro(error);
        }
    }

    const returnAlert = () => {
        return(
            <>
                <h1>Mensagem: {alert.mensagem}</h1>
                <h2>Andar: {alert.andar}</h2>
                <h2>Banheiro {alert.generoBanheiro}</h2>
                <h3>Criado em {timeConverter(alert.dataDeCriacao)}</h3>
                <h3>{alert.estaFeita ? "Alerta foi atendido: "+timeConverter(alert.dataDeConclusao) : "Alerta nao foi atendido"}</h3>
                <button onClick={modificarStatusAlerta}>{alert.estaFeita ? "Marcar como nao atendido" : "Marcar como atendido"}</button>
                <br />
                <PersonCard id={alert.person}/>
            </>
        );
    }

    return(
        <div>
            {verifyError()}
        </div>
        
    );
}