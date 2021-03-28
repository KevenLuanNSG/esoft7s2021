import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Menu from '../menu/menu'

const PublishingCompanyList = () => {
        const [publishingCompanies, setPublishingCompanies] = useState([])

        const doGetPublishingCompanies = async () => {
            const response = await axios.get("/api/publishing-companies")
            setPublishingCompanies(response.data)
        }

        useEffect(() => {
            doGetPublishingCompanies()
        },[])


        const deletePublishingCompany = async (id) => {
            await axios.delete(`/api/publishing-companies/${id}`)
            doGetPublishingCompanies()
        }

        const handleDelete = (id) => {
            if(window.confirm("Deseja excluir?")) {
                deletePublishingCompany(id)
            }
        }

        const tableData = publishingCompanies.map(row => {
            return <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.fundation}</td>
                <td>{row.averageBilling}</td>
                <td>
                    <button onClick={(id) => handleDelete(row.id)}>Excluir</button>
                    <Link to={`/publishing-companies/edit/${row.id}`}>
                        <button>Editar</button>
                    </Link>  
                </td>
            </tr>
        })

        return (
            <div><Menu></Menu><center>
                <h2>Listagem de Editoras</h2>
                <hr></hr>
                <Link to="/publishing-companies/new">
                    <button>Nova Editora</button>
                </Link>
                <table border="1">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nome</td>
                            <td>Fundação</td>
                            <td>Faturamento</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </center></div>
        )
}

export default PublishingCompanyList
