import React from 'react';
import history from '../../services/history';

import Button from '../button/Button';

import './AlertCard.css';

export default (props) => {

    const detalhesAlert = () => {
        history.push("/alert/"+props.alert.id);
    }

    return(
        <div className={`card-body ${props.alert.estaFeita ? 'feito' : ''}`}  id-alert={props.alert.id}>
            <h1 className={props.alert.estaFeita ? "alerta-feito" : ""}>{props.alert.andar}</h1>
            <h1 className={props.alert.estaFeita ? "alerta-feito" : ""}>{props.alert.generoBanheiro}</h1>
            <div className="card-alert-footer">
                <div>{props.alert.estaFeita ? <p>Feita</p> : <p>A fazer</p>}</div>
                <Button onClick={detalhesAlert} placeholder="Ver detalhes" color="blue"/>
            </div>       
        </div>
    );
}