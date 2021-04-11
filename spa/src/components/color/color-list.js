import React, { useEffect, useState } from 'react'
import './color.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

const ColorList = (props) => {
    const {searchStatus, setSearchStatus} = props
    const [colors, setColors] = useState({content: [], pageable: {pageNumber: 0}, totalPages: 0})
    const pageSize = 10
    const [idToDelete, setIdToDelete] = useState(null)

    const doGetColors = async (page = 0, search = '') => {
        const response = await axios.get(`/api/colors?search=${search}&page=${page}&size=${pageSize}`)
        setColors(response.data)
        setSearchStatus({...searchStatus, page: page, search: search})
    }

    useEffect(() => {
        doGetColors(searchStatus.page, searchStatus.search)
    }, [])


    const deleteColor = async (id) => {
        await axios.delete(`/api/colors/${id}`)
        if(colors.content.length === 1 && colors.totalElements > pageSize) {
            doGetColors(searchStatus.page - 1, searchStatus.search)
        } else if (colors.content.length === 1 && colors.totalElements === 1) {
            doGetColors(0, '')
        } else {
            doGetColors(searchStatus.page, searchStatus.search)
        }
    }

    const handleDelete = (id) => {
        setIdToDelete(id)
    }

    const confirmDelete = () => {
        deleteColor(idToDelete)
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

    const tableData = colors.content.map(row => {
        return <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.nick}</td>
            <td>{row.name}</td>
            <td>
                <Button style={{marginRight: '2px'}} variant="secondary" onClick={(id) => handleDelete(row.id)}>Excluir</Button>
                <Link to={`/colors/edit/${row.id}`}>
                    <Button>Editar</Button>
                </Link>  
            </td>
        </tr>
    })

    const requestPage = (page) => {
        if(page <= 0){
            page = 0
        }
        if (page >= colors.totalPages){
            page = colors.totalPages -1
        }
        setSearchStatus({...searchStatus, page: page})
        doGetColors(page, searchStatus.search)
    }

    return (
        <div><center>
            {confirmDeleteModal()}
            <h2>Listagem de Cores</h2>
            <hr></hr>
            <Link to="/colors/new">
                <Button style={{marginBottom: '5px'}}>Nova Cor</Button>
            </Link>
            <div>
                <input type="text" name="search" placeholder="Termo de pesquisa" onChange={handleSearch} value={searchStatus.search}></input>
                <Button onClick={() => doGetColors(0, searchStatus.search)}>Pesquisar</Button>
            </div>
            <table border="1" id="table-color">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Sigla</td>
                        <td>Nome</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            <div>
            <Button variant="secondary" disabled={colors.pageable.pageNumber <= 0} onClick={() => requestPage(0)}>{'<<'}</Button>
            <Button variant="secondary" disabled={colors.pageable.pageNumber <= 0} onClick={() => requestPage(colors.pageable.pageNumber-1)}>{'<'}</Button>
            {colors.pageable.pageNumber > 1 && <Button variant="secondary" onClick={() => requestPage(colors.pageable.pageNumber-2)}>{colors.pageable.pageNumber-1}</Button>}
            {colors.pageable.pageNumber > 0 && <Button variant="secondary" onClick={() => requestPage(colors.pageable.pageNumber-1)}>{colors.pageable.pageNumber}</Button>}
            <Button variant="primary" onClick={() => requestPage(colors.pageable.pageNumber)}>{colors.pageable.pageNumber + 1}</Button>
            {colors.pageable.pageNumber < colors.totalPages - 1 && <Button variant="secondary" onClick={() => requestPage(colors.pageable.pageNumber+1)}>{colors.pageable.pageNumber+2}</Button>}
            {colors.pageable.pageNumber < colors.totalPages - 2 && <Button variant="secondary" onClick={() => requestPage(colors.pageable.pageNumber+2)}>{colors.pageable.pageNumber+3}</Button>}
            <Button variant="secondary" disabled={colors.pageable.pageNumber >= colors.totalPages - 1} onClick={() => requestPage(colors.pageable.pageNumber+1)}>{'>'}</Button>
            <Button variant="secondary" disabled={colors.pageable.pageNumber >= colors.totalPages - 1} onClick={() => requestPage(colors.totalPages - 1)}>{'>>'}</Button>
        </div>
        </center></div>
    )
}

export default ColorList