import React from 'react';

import './Loading.css';

export default () => {
    return(
        <div className="loading-body">
            <div className="centralizar-h"></div>
            <div className="centralizar-v">
                <div className="centralizar-v-children"></div>
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
                <div className="centralizar-v-children"></div>
            </div>
            <div className="centralizar-h"></div>
        </div>
    );
}