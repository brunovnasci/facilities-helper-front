import React from 'react';
import { useState } from 'react';

import { faBuilding, faLocationArrow,faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Textbox from '../textbox/Textbox';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import Combobox from '../combobox/Combox';
import Successful from '../successful/Successful';

import api from '../../services/api';
import history from '../../services/history';

import './CreateAlert.css';

export default () => {

    const [andar, setAndar] = useState("");
    const [generoBanheiro, setGeneroBanheiro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const handleOnChangeAndar = (e) => {
        setAndar(e.target.value);
        console.log(e.target.value);
    }

    const handleOnChangePlaces = (e) => {
        setGeneroBanheiro(e.target.value);
        console.log(e.target.value);
    }

    const handleOnChangeMensagem = (e) => {
        setMensagem(e.target.value);
    }

    const clicarRegister = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const response = await api.post("/alert", {andar, generoBanheiro, mensagem}, {headers: {'Authorization': localStorage.getItem("token")}});
            if(response.status === 200){
                setIsCreated(true);
            }
        } catch (error) {
            setErro(error);
        }
    }

    const pushMenu = (props) => {
        history.push("home");
    }

    let places = ["Banheiro masculino", "Banheiro feminino"];
    let andarItems = ["Terreo", "Primeiro andar"];

    return(
        <div className="create-body">
            {isCreating ? (!isCreated ? <Loading /> : <Successful push={pushMenu} title="Alerta criado!" titlebtn="Voltar ao menu" />)  :  
                <form className="form-div" onSubmit={(e) => clicarRegister(e)}>
                    <Combobox itens={andarItems} onChange={handleOnChangeAndar} icon={faBuilding} placeholder="Andar"/>
                    <Combobox itens={places} onChange={handleOnChangePlaces} icon={faLocationArrow} placeholder="Local"/>
                    <Textbox icon={faCommentAlt} onChange={handleOnChangeMensagem} placeholder="Mensagem" id="msg" required />
                    <Button placeholder="Criar" color="green"/>
                    {!erro ? "Algo de errado!" : ""}
                </form>
            }
        </div>
    );
}