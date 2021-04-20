import React, { useEffect, useState } from 'react'
import './publishing-company.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { DebounceInput } from 'react-debounce-input'

const PublishingCompanyList = (props) => {
    const {searchStatus, setSearchStatus} = props
    const [publishingCompanies, setPublishingCompanies] = useState({content: [], pageable: {pageNumber: 0}, totalPages: 0})
    const pageSize = 10
    const [idToDelete, setIdToDelete] = useState(null)

    const doGetPublishingCompanies = async (page = 0, search = '') => {
        const response = await axios.get(`/api/publishing-companies?search=${search}&page=${page}&size=${pageSize}`)
        setPublishingCompanies(response.data)
        setSearchStatus({...searchStatus, page: page, search: search})
    }

    useEffect(() => {
        doGetPublishingCompanies(searchStatus.page, searchStatus.search)
    }, [searchStatus.search])


    const deletePublishingCompany = async (id) => {
        await axios.delete(`/api/publishing-companies/${id}`)
        if(publishingCompanies.content.length === 1 && publishingCompanies.totalElements > pageSize) {
            doGetPublishingCompanies(searchStatus.page - 1, searchStatus.search)
        } else if (publishingCompanies.content.length === 1 && publishingCompanies.totalElements === 1) {
            doGetPublishingCompanies(0, '')
        } else {
            doGetPublishingCompanies(searchStatus.page, searchStatus.search)
        }
    }

    const handleDelete = (id) => {
        setIdToDelete(id)
    }

    const confirmDelete = () => {
        deletePublishingCompany(idToDelete)
        setIdToDelete(null)
    }

    const abortDelete = () => {
        setIdToDelete(null)
    }

    const confirmDeleteModal = () => {
        return (
            <Modal show={idToDelete != null} onHide={abortDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir o registro?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={abortDelete}>Cancelar</Button>
                    <Button variant="primary" onClick={confirmDelete}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const handleSearch = async (event) => {
        setSearchStatus({...searchStatus, page: 0, search: event.target.value})
    }

    const tableData = publishingCompanies.content.map(row => {
        return <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.fundation}</td>
            <td>{row.averageBilling}</td>
            <td>
                <Button className="button-delete" variant="secondary" onClick={(id) => handleDelete(row.id)}>Excluir</Button>
                <Link to={`/publishing-companies/edit/${row.id}`}>
                    <Button>Editar</Button>
                </Link>  
            </td>
        </tr>
    })

    const requestPage = (page) => {
        if(page <= 0){
            page = 0
        }
        if (page >= publishingCompanies.totalPages){
            page = publishingCompanies.totalPages -1
        }
        setSearchStatus({...searchStatus, page: page})
        doGetPublishingCompanies(page, searchStatus.search)
    }

    return (
        <div><center>
            {confirmDeleteModal()}
            <h2>Listagem de Editoras</h2>
            <hr></hr>
            <Link to="/publishing-companies/new">
                <Button className="button-new">Nova Editora</Button>
            </Link>
            <div>
                <DebounceInput 
                    type="text"
                    name="search"
                    placeholder="Termo de Pesquisa"
                    debounceTimeout={500} 
                    onChange={handleSearch}
                    value={searchStatus.search}
                />
                <Button onClick={() => doGetPublishingCompanies(0, searchStatus.search)}>Pesquisar</Button>
            </div>
            <table border="1" id="table-publishing-company">
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
            <div>
            <Button variant="secondary" disabled={publishingCompanies.pageable.pageNumber <= 0} onClick={() => requestPage(0)}>{'<<'}</Button>
            <Button variant="secondary" disabled={publishingCompanies.pageable.pageNumber <= 0} onClick={() => requestPage(publishingCompanies.pageable.pageNumber-1)}>{'<'}</Button>
            {publishingCompanies.pageable.pageNumber > 1 && <Button variant="secondary" onClick={() => requestPage(publishingCompanies.pageable.pageNumber-2)}>{publishingCompanies.pageable.pageNumber-1}</Button>}
            {publishingCompanies.pageable.pageNumber > 0 && <Button variant="secondary" onClick={() => requestPage(publishingCompanies.pageable.pageNumber-1)}>{publishingCompanies.pageable.pageNumber}</Button>}
            <Button variant="primary" onClick={() => requestPage(publishingCompanies.pageable.pageNumber)}>{publishingCompanies.pageable.pageNumber + 1}</Button>
            {publishingCompanies.pageable.pageNumber < publishingCompanies.totalPages - 1 && <Button variant="secondary" onClick={() => requestPage(publishingCompanies.pageable.pageNumber+1)}>{publishingCompanies.pageable.pageNumber+2}</Button>}
            {publishingCompanies.pageable.pageNumber < publishingCompanies.totalPages - 2 && <Button variant="secondary" onClick={() => requestPage(publishingCompanies.pageable.pageNumber+2)}>{publishingCompanies.pageable.pageNumber+3}</Button>}
            <Button variant="secondary" disabled={publishingCompanies.pageable.pageNumber >= publishingCompanies.totalPages - 1} onClick={() => requestPage(publishingCompanies.pageable.pageNumber+1)}>{'>'}</Button>
            <Button variant="secondary" disabled={publishingCompanies.pageable.pageNumber >= publishingCompanies.totalPages - 1} onClick={() => requestPage(publishingCompanies.totalPages - 1)}>{'>>'}</Button>
        </div>
        </center></div>
    )
}

export default PublishingCompanyList
