import React from 'react';

import './WelcomeCard.css';

export default (props) => {
    return(
        <div className="welcome-card">
            <h1 className="welcome-text">Olá {props.person.nome+" "+props.person.sobrenome}!</h1>
        </div>
    );
}