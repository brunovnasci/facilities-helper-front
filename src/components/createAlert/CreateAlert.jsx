import React from 'react';
import { useState } from 'react';

import { faBuilding, faVenusMars,faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Textbox from '../textbox/Textbox';
import Button from '../button/Button';
import NumberPicker from '../numberpicker/NumberPicker';
import Combobox from '../combobox/Combox';

import api from '../../services/api';
import history from '../../services/history';

export default () => {

    const [andar, setAndar] = useState("");
    const [generoBanheiro, setGeneroBanheiro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState([]);

    const handleOnChangeAndar = (e) => {
        setAndar(e.target.value);
        console.log(e.target.value);
    }

    const handleOnChangeSexo = (e) => {
        setGeneroBanheiro(e.target.value);
        console.log(e.target.value);
    }

    const handleOnChangeMensagem = (e) => {
        setMensagem(e.target.value);
    }

    const clicarRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/alert", {andar, generoBanheiro, mensagem}, {headers: {'Authorization': localStorage.getItem("token")}});
            if(response.status === 200){
                alert("Alerta criado com sucesso");
                history.push("/home");
            }
        } catch (error) {
            setErro(error);
        }
    }

    return(
        <form className="form-div" onSubmit={(e) => clicarRegister(e)}>
            <NumberPicker icon={faBuilding} onChange={handleOnChangeAndar} placeholder="Andar" id="Andar"/>
            <Combobox itens={["","Masculino", "Feminino"]} onChange={handleOnChangeSexo} icon={faVenusMars}/>
            <Textbox icon={faCommentAlt} onChange={handleOnChangeMensagem} placeholder="Mensagem" id="msg" required />
            <Button placeholder="Criar"/>
            {!erro ? "Algo de errado!" : ""}
        </form>
    );
}