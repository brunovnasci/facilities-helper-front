import React from 'react';

import './PersonCard.css';

export default (props) => {

    return(
        <div className="person">
            <h4>Quem nos alertou:</h4>
            <div className="info">
                <h4>Nome: {props.person.nome + ' ' + props.person.sobrenome}</h4>
                <h4>Email: {props.person.email}</h4>
            </div>
        </div>
    );
}