import React from 'react';
import TopButton from '../topbutton/TopButton';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import history from '../../services/history';
import './TopBar.css';

export default (props) => {

    const logout = () => {
        localStorage.removeItem("token");
        history.push("/");
    }

    const goBack = () => {
        history.goBack();
    }

    return(
        <div className="top">
            <TopButton onClick={goBack} icon={faLongArrowAltLeft}/>
            <div className="top-center-element">{props.nomePagina}</div>
            <TopButton onClick={logout} icon={faSignOutAlt} />
        </div>
    );
}