import React, { useEffect, useState } from 'react'
import './product.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

const ProductList = (props) => {
    const {searchStatus, setSearchStatus} = props
    const [products, setProducts] = useState({content: [], pageable: {pageNumber: 0}, totalPages: 0})
    const pageSize = 10
    const [idToDelete, setIdToDelete] = useState(null)

    const doGetProducts = async (page = 0, search = '') => {
        const response = await axios.get(`/api/products?search=${search}&page=${page}&size=${pageSize}`)
        setProducts(response.data)
        setSearchStatus({...searchStatus, page: page, search: search})
    }

    useEffect(() => {
        doGetProducts(searchStatus.page, searchStatus.search)
    }, [])


    const deleteProduct = async (id) => {
        await axios.delete(`/api/products/${id}`)
        if(products.content.length === 1 && products.totalElements > pageSize) {
            doGetProducts(searchStatus.page - 1, searchStatus.search)
        } else if (products.content.length === 1 && products.totalElements === 1) {
            doGetProducts(0, '')
        } else {
            doGetProducts(searchStatus.page, searchStatus.search)
        }
    }

    const handleDelete = (id) => {
        setIdToDelete(id)
    }

    const confirmDelete = () => {
        deleteProduct(idToDelete)
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

    const tableData = products.content.map(row => {
        return <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.description}</td>
            <td>{row.launch}</td>
            <td>{row.unitPrice}</td>
            <td>{row.standardColorVO.name}</td>
            <td>
                <Button className="button-delete" variant="secondary" onClick={(id) => handleDelete(row.id)}>Excluir</Button>
                <Link to={`/products/edit/${row.id}`}>
                    <Button>Editar</Button>
                </Link>  
            </td>
        </tr>
    })

    const requestPage = (page) => {
        if(page <= 0){
            page = 0
        }
        if (page >= products.totalPages){
            page = products.totalPages -1
        }
        setSearchStatus({...searchStatus, page: page})
        doGetProducts(page, searchStatus.search)
    }

    return (
        <div><center>
            {confirmDeleteModal()}
            <h2>Listagem de Produtos</h2>
            <hr></hr>
            <Link to="/products/new">
                <Button className="button-new">Novo Produto</Button>
            </Link>
            <div>
                <input type="text" name="search" placeholder="Termo de pesquisa" onChange={handleSearch} value={searchStatus.search}></input>
                <Button onClick={() => doGetProducts(0, searchStatus.search)}>Pesquisar</Button>
            </div>
            <table border="1" id="table-product">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Descrição</td>
                        <td>Lançamento</td>
                        <td>Preço Unitário</td>
                        <td>Cor Padrão</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            <div>
            <Button variant="secondary" disabled={products.pageable.pageNumber <= 0} onClick={() => requestPage(0)}>{'<<'}</Button>
            <Button variant="secondary" disabled={products.pageable.pageNumber <= 0} onClick={() => requestPage(products.pageable.pageNumber-1)}>{'<'}</Button>
            {products.pageable.pageNumber > 1 && <Button variant="secondary" onClick={() => requestPage(products.pageable.pageNumber-2)}>{products.pageable.pageNumber-1}</Button>}
            {products.pageable.pageNumber > 0 && <Button variant="secondary" onClick={() => requestPage(products.pageable.pageNumber-1)}>{products.pageable.pageNumber}</Button>}
            <Button variant="primary" onClick={() => requestPage(products.pageable.pageNumber)}>{products.pageable.pageNumber + 1}</Button>
            {products.pageable.pageNumber < products.totalPages - 1 && <Button variant="secondary" onClick={() => requestPage(products.pageable.pageNumber+1)}>{products.pageable.pageNumber+2}</Button>}
            {products.pageable.pageNumber < products.totalPages - 2 && <Button variant="secondary" onClick={() => requestPage(products.pageable.pageNumber+2)}>{products.pageable.pageNumber+3}</Button>}
            <Button variant="secondary" disabled={products.pageable.pageNumber >= products.totalPages - 1} onClick={() => requestPage(products.pageable.pageNumber+1)}>{'>'}</Button>
            <Button variant="secondary" disabled={products.pageable.pageNumber >= products.totalPages - 1} onClick={() => requestPage(products.totalPages - 1)}>{'>>'}</Button>
        </div>
        </center></div>
    )
}

export default ProductList
