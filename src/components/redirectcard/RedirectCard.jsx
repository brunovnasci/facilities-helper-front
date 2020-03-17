import React from 'react';
import Button from '../button/Button';


import './RedirectCard.css';

export default (props) => {
    return(
        <div className="redirect-body">
            <h4>{props.text}</h4>
            <Button onClick={props.push} placeholder={props.placeholder} color="blue"/>
        </div>
    );
}