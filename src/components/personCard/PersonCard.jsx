import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './PersonCard.css';

export default (props) => {

    const[person, setPerson] = useState(null);
    const[isLoaded, setIsLoaded] = useState(false);
    const[erro, setErro] = useState(null);

    useEffect(() => {
        async function getPerson(){
            try {
                const respose = await api.get("/person/"+props.id, {headers: {'Authorization': localStorage.getItem("token")}});
                setPerson(respose.data);
                setIsLoaded(true);
            } catch (error) {
                setErro(error);
                setIsLoaded(true);
            }
        }
        getPerson();
    }, [props.id]);

    const returnCard = () => {
        if(isLoaded){
            if(!erro){
                return(
                    <>
                        <h4>Quem nos alertou:</h4>
                        <div className="info">
                            <h4>Nome: {person.nome + ' ' + person.sobrenome}</h4>
                            <h4>Email: {person.email}</h4>
                        </div>
                    </>
                );
            }else{
                return(
                    <h4>Nao foi possivel localizar o usuario! :(</h4>
                );
            }
        }else{
            return(
                <h4>Carregando!</h4>
            );
        }
    }

    return(
        <div className="person">
            {returnCard()}
        </div>
    );
}