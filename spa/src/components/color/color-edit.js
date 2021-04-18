import React, { useState, useEffect } from 'react'
import './color.css'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const ColorEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [color, setColor] = useState({nick:"", name:""})
    const editionMode = id !== undefined

    const doGetColorById = async () => {
        const response = await axios.get(`/api/colors/${id}`, color)
        setColor(response.data)
    }

    useEffect(() => {
        if(editionMode){
            doGetColorById()
        }
    }, [])

    const saveColor = async () => {
        const response = await axios.post(`/api/colors`, color)
        alert('Nova cor criada! Id=' + response.data.id)
        history.push('/colors')
    }

    const updateColor = async () => {
        const response = await axios.put(`/api/colors/${id}`, color)
        alert('Cor editada! Id=' + response.data.id)
        history.push('/colors')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editionMode){
            updateColor()
        } else {
            saveColor()
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
            <form onSubmit={handleSubmit} id="form-color">
                <div>Sigla
                    <input className="form-control" type="text" name="nick" onChange={handleChange} value={color.nick}></input>
                </div>
                <div>Nome
                    <input className="form-control" type="text" name="name" onChange={handleChange} value={color.name}></input>
                </div>
                <Button variant="success" className="button-save" type="submit">Salvar</Button>
            </form>
            <Link to="/colors">
                <p>Voltar</p>
            </Link>
        </center></div>
    )
}

export default ColorEdit