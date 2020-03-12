import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (props) => {

    return(
        <button onClick={props.onClick} className="top-element">
            <FontAwesomeIcon icon={props.icon} />
        </button>
    );
}