import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NumberPicker.css';

export default (props) => {
    return(
        <div className="number-picker">
            <input type="number" min="1" max="2" onChange={(e) => props.onChange(e)} className="picker" placeholder={props.placeholder} required/>    
            <FontAwesomeIcon icon={props.icon} className="picker-child" />
        </div>
    );
}