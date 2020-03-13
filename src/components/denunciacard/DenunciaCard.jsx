import React from 'react';
import Button from '../button/Button';

import history from '../../services/history';

import './DenunciaCard.css';

export default () => {

    const pushCreate = () => {
        history.push("/create");
    }

    return(
        <div className="denuncia-body">
            <h4>Este é um espaço para nós, Zuppers, alertar problemas que encontramos em nosso prédio. Ajude-nos a manter o nosso ambiente o melhor possível.</h4>
            <Button onClick={pushCreate} placeholder="Clique para alertar!" color="blue"/>
        </div>
    );
}