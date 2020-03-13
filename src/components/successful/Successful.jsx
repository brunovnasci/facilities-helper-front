import React from 'react';
import Button from '../button/Button';

import history from '../../services/history';

import './Successful.css';

export default () => {

    const pushMenu = () => {
        history.push("home");
    }

    return(
        <div className="loading-body">
            <div className="centralizar-h"></div>
            <div className="centralizar-v">
                <div className="centralizar-v-children-mod"></div>
                <div>
                    <form onSubmit={() => pushMenu()}>
                        <h4 className="response">Alerta criado!</h4>
                        <Button color="green" placeholder="Voltar ao menu"/>
                    </form>
                </div>
                <div className="centralizar-v-children-mod"></div>
            </div>
            <div className="centralizar-h"></div>
        </div>
    );
}