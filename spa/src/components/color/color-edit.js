import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ColorEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [color, setColor] = useState({nick:"", name:""})
    const editionMode = id !== undefined

    const doGetById = async () => {
        const response = await axios.get(`/api/colors/${id}`, color)
        setColor(response.data)
    }

    useEffect(() => {
        if(editionMode){
            doGetById()
        }
    }, [])

    const doPost = async () => {
        const response = await axios.post(`/api/colors`, color)
        alert('Nova cor criada! Id=' + response.data)
        history.push('/colors')
    }

    const doPut = async () => {
        const response = await axios.put(`/api/colors/${id}`, color)
        alert('Cor editada! Id=' + response.data)
        history.push('/colors')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editionMode){
            doPut()
        } else {
            doPost()
        }
    }

    const handleChange = (event) => {
        const newColor = {...color, [event.target.name]: event.target.value}
        setColor(newColor)
    }

    return (
        <div><center>
            <h2>{editionMode ? 'Edição ' : 'Criação '}de Cor</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <div>Sigla:
                    <input type="text" name="nick" onChange={handleChange} value={color.nick}></input>
                </div>
                <div>Nome:
                    <input type="text" name="name" onChange={handleChange} value={color.name}></input>
                </div>
                <button>Enviar</button>
            </form>
            <Link to="/colors">
                    <a>Voltar</a>
            </Link>
        </center></div>
    )
}

export default ColorEdit

