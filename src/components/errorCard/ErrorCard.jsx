import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import './ErrorCard.css';

export default (props) => {
    
    return(
        <div className="error-body">
            <h4><FontAwesomeIcon icon={faExclamationTriangle} /> {props.error}</h4>
        </div>
    );
}