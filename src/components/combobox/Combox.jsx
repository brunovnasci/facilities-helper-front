import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Combox.css';

export default (props) => {
    
    return(
        <div className="combo">
            <select className="select" required onChange={(e) => props.onChange(e)}>
                {props.itens.map((item, index) =>{
                    return <option key={index} value={item} className="combo-item">{item}</option>
                })}
            </select>
            <FontAwesomeIcon icon={props.icon} className="textbox-child" />
        </div>
    );
}