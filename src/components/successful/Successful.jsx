import React from 'react';
import Button from '../button/Button';

import './Successful.css';

export default (props) => {

    return(
        <div className="loading-body">
            <div className="centralizar-h"></div>
            <div className="centralizar-v">
                <div className="centralizar-v-children-mod"></div>
                <div>
                    <form onSubmit={() => props.push()}>
                        <h4 className="response">{props.title}</h4>
                        <Button color="green" placeholder={props.titlebtn}/>
                    </form>
                </div>
                <div className="centralizar-v-children-mod"></div>
            </div>
            <div className="centralizar-h"></div>
        </div>
    );
}