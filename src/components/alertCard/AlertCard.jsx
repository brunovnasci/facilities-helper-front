import React from 'react';
import history from '../../services/history';

import './AlertCard.css';

export default (props) => {

    const detalhesAlert = () => {
        history.push("/alert/"+props.alert.id);
    }

    return(
        <div className="card-body" id-alert ={props.alert.id}>
            <h1 className={props.alert.estaFeita ? "alerta-feito" : ""}>Andar {props.alert.andar}</h1>
            <h1 className={props.alert.estaFeita ? "alerta-feito" : ""}>Banheiro {props.alert.generoBanheiro}</h1>
            <div className="card-alert-footer">
                <div>{props.alert.estaFeita ? "Feita" : "A fazer"}</div>
                <button onClick={detalhesAlert}>Ver detalhes</button> 
            </div>       
            </div>
    );
}