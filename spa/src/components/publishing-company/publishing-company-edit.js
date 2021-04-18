import React, { useState, useEffect } from 'react'
import './publishing-company.css'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const PublishingCompanyEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [publishingCompany, setPublishingCompany] = useState({name:"", fundation: new Date(), averageBilling:0.00})
    const editionMode = id !== undefined

    const doGetPublishingCompanyById = async () => {
        const response = await axios.get(`/api/publishing-companies/${id}`, publishingCompany)
        setPublishingCompany(response.data)
    }

    useEffect(() => {
        if(editionMode){
            doGetPublishingCompanyById()
        }
    }, [])

    const savePublishingCompany = async () => {
        const response = await axios.post(`/api/publishing-companies`, publishingCompany)
        alert('Nova editora criada! Id=' + response.data.id)
        history.push('/publishing-companies')
    }

    const updatePublishingCompany = async () => {
        const response = await axios.put(`/api/publishing-companies/${id}`, publishingCompany)
        alert('Editora editada! Id=' + response.data.id)
        history.push('/publishing-companies')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editionMode){
            updatePublishingCompany()
        } else {
            savePublishingCompany()
        }
    }

    const handleChange = (event) => {
        const newPublishingCompany = {...publishingCompany, [event.target.name]: event.target.value}
        setPublishingCompany(newPublishingCompany)
    }

    return (
        <div><center>
            <h2>{editionMode ? 'Edição ' : 'Criação '}de Editora</h2>
            <hr></hr>
            <form onSubmit={handleSubmit} id="form-publishing-company">
                <div>Nome
                    <input className="form-control" type="text" name="name" onChange={handleChange} value={publishingCompany.name}></input>
                </div>
                <div>Fundação
                    <input className="form-control" type="date" name="fundation" onChange={handleChange} value={publishingCompany.fundation}></input>
                </div>
                <div>Faturamento
                    <input className="form-control" type="number" name="averageBilling" onChange={handleChange} value={publishingCompany.averageBilling}></input>
                </div>
                <Button variant="success" className="button-save" type="submit">Salvar</Button>
            </form>
            <Link to="/publishing-companies">
                <p>Voltar</p>
            </Link>
        </center></div>
    )
}

export default PublishingCompanyEdit