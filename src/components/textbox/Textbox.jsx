import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Textbox.css'; 

export default (props) => {
    return(
        <div className="textbox">
            <input type={props.type} onChange={(e) => props.onChange(e)} className="text" id={props.id} placeholder={props.placeholder} required={props.required}/>    
            <FontAwesomeIcon icon={props.icon} className="textbox-child" />
        </div>
    );
}