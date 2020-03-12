import React, { useEffect,useState } from 'react';
import history from '../../services/history';
import AlertInfo from '../alertinfo/AlertInfo';
import Loading from '../loading/Loading';

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
            <AlertInfo alert={alert} timeConverter={timeConverter} modificarStatusAlerta={modificarStatusAlerta}/>
        );
    }

    return(
        <div className="alert-body">
            {verifyError()}
        </div>
        
    );
}