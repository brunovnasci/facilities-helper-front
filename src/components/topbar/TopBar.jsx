import React from 'react';
import LogoutButton from '../logoutButton/LogoutButton';
import GoBackButton from '../goBackButton/GoBackButton';

import './TopBar.css';

export default (props) => {
    return(
        <div className="top">
            <GoBackButton />
            <div className="top-center-element">{props.nomePagina}</div>
            <LogoutButton />
        </div>
    );
}