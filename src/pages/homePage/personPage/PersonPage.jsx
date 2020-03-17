import React from 'react';

import WelcomeCard from '../../../components/welcomeCard/WelcomeCard';
import RedirectCard from '../../../components/redirectcard/RedirectCard';

import history from '../../../services/history';

export default (props) => {
    
    const textDenuncia = "Este é um espaço para nós, Zuppers, alertar problemas que encontramos em nosso prédio. Ajude-nos a manter o nosso ambiente o melhor possível.";
    const pushCreate = () => {
        history.push("/create");
    }

    const textMyAlerts = "É Possivel ver todos os alertas que voce ja criou!";
    const pushMyAlerts = () => {
        history.push("/myalerts");
    }
    
    return(
        <>
            <WelcomeCard person={props.person} />
            <RedirectCard push={pushCreate} text={textDenuncia} placeholder="Clique para alertar!"/>
            <RedirectCard push={pushMyAlerts} text={textMyAlerts} placeholder="Clique para ver!"/>
        </>
    );
}