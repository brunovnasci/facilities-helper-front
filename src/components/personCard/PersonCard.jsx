import React, { useState, useEffect } from 'react';

import api from '../../services/api';

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
                console.log(person);
                return(
                    <>
                    <h3>Nome: {person.nome + ' ' + person.sobrenome}</h3>
                    <h3>Email: {person.email}</h3>
                    </>
                );
            }else{
                return(
                    <h2>Nao foi possivel localizar o usuario! :(</h2>
                );
            }
        }else{
            return(
                <h1>Carregando!</h1>
            );
        }
    }

    return(
        <div>
            <h2>Quem nos alertou:</h2>
            {returnCard()}
        </div>
    );
}