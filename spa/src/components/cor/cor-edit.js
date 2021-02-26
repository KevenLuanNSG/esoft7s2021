import React, { useState } from 'react';
import axios from 'axios'

const CorEdit = () => {
    const [cor, setCor] = useState({sigla:"", nome:""})

    const doPost = async () => {
        const response = await axios.post("/api/cores", cor)
        alert('Nova cor criada! Id=' + response.data)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        doPost()
    }

    const handleChange = (event) => {
        console.log(event.target.name + '=' + event.target.value)
        const novaCor = {...cor, [event.target.name]: event.target.value, [event.target.name]: event.target.value}
        console.log(novaCor)
        setCor(novaCor)
        console.log(novaCor)
    }

    return (
        <div><center>
            <h2>Edição de Cor</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <div>Sigla:
                    <input type="text" name="sigla" onChange={handleChange}></input>
                </div>
                <div>Nome:
                    <input type="text" name="nome" onChange={handleChange}></input>
                </div>
                <button>Enviar</button>
            </form>
        </center></div>
    )
}

export default CorEdit;

