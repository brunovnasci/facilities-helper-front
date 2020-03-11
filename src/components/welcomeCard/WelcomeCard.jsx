import React from 'react';

export default (props) => {
    return(
        <h1>Ola {props.person.nome+" "+props.person.sobrenome}!</h1>
    );
}