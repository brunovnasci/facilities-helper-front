import React from 'react';

import Card from '../../../components/alertCard/AlertCard';
import TitleCard from '../../../components/titleCard/TitleCard';
import WelcomeCard from '../../../components/welcomeCard/WelcomeCard';

export default (props) => {
    return(
        <>
            <WelcomeCard person={props.person} />
            <div>
                {props.alerts.length !== 0 ? props.alerts.map( (alert) => 
                    <Card alert={alert} key={alert.id}/>
                ) : <TitleCard title="Ops! Ainda não há alertas!"/>}
            </div>
        </>
    );
}