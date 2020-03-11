import React from 'react';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import history from '../../services/history';

export default () => {
    const logout = () => {
        history.goBack();
    }

    return(
        <button onClick={logout} className="top-element">
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </button>
    );
}