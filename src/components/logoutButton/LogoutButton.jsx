import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import history from '../../services/history';

export default () => {

    const logout = () => {
        localStorage.removeItem("token");
        history.push("/");
    }

    return(
        <button onClick={logout} className="top-element">
            <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
    );
}