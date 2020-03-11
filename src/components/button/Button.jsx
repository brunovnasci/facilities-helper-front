import React from 'react';

import './Button.css';

export default (props) => {
    
    return(
        <input type="submit" className="button-body" value={props.placeholder}/>
    );
    
}