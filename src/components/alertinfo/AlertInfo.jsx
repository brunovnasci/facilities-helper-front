import React from 'react';
import PersonCard from '../personCard/PersonCard';

import './AlertInfo.css';

export default (props) => {

    return(
        <>
            <div className="alertinfo-body">
                <div className="group">
                    <h4>{props.alert.andar}</h4>
                    <h4>{props.alert.comodo}</h4>
                </div>
                <h4>Mensagem:</h4>
                <div className="alert-message">
                    <h4>{props.alert.mensagem}</h4>
                </div>
                <h4>Criado em {props.timeConverter(props.alert.dataDeCriacao)}</h4>
                <h4>Status:</h4>
                <div className="alert-message">
                    <h4>{props.alert.estaFeita ? "Foi atendido "+props.timeConverter(props.alert.dataDeConclusao) : "Não foi atendido"}</h4>
                </div>
                {!props.isCleaner ? "" : <button className="altstatus-button" onClick={props.modificarStatusAlerta}>{props.alert.estaFeita ? "Marcar como não atendido" : "Marcar como atendido"}</button>}
                
            </div>
            <PersonCard person={props.alert.person}/>
        </>
    );
}