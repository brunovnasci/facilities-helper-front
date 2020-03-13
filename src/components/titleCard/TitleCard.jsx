import React from 'react';

import './TitleCard.css';

export default (props) => {
    return(
        <div className="titlecard-body">
            <h4>{props.title}</h4>
        </div>
    );
}