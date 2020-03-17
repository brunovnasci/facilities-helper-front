import React, { useEffect,useState } from 'react';
import history from '../../services/history';
import AlertInfo from '../../components/alertinfo/AlertInfo';
import Loading from '../../components/loading/Loading';

import './ViewAlert.css';

import api from '../../services/api';

export default (props) => {

    const [alert, setAlert] = useState(null);
    const [erro, setErro] = useState(null);
    const [isloaded, setIsLoaded] = useState(false);
    const [person, setPerson] = useState({});
    const [isCleaner, setIsCleaner] = useState(false);

    const paramId = props.match.params.id;

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        min = (min < 10 ? '0' : '') + a.getMinutes();
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
                getPersonData();
            } catch (error) {
                setErro(error);
                setIsLoaded(true); 
            }
        }

        async function getPersonData() {
            try {
                const response = await api.get("/person", {headers: {'Authorization': localStorage.getItem("token")}});
                setPerson(response.data);
                if(response.data.role === "CLEANER"){
                    setIsCleaner(true);
                    setIsLoaded(true); 
                }else{
                    setIsLoaded(true);
                }
            } catch (error) {
                localStorage.removeItem("token");
                history.push("");
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
            return(<Loading />);
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
            <AlertInfo alert={alert} isCleaner={isCleaner} person={person} timeConverter={timeConverter} modificarStatusAlerta={modificarStatusAlerta}/>
        );
    }

    return(
        <div className="alert-body">
            {verifyError()}
        </div>
        
    );
}