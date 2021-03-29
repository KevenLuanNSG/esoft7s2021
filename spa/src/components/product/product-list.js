import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = (props) => {
        const {searchStatus, setSearchStatus} = props
        const [products, setProducts] = useState({content: [], pageable: {pageNumber: 0}, totalPages: 0})
        const pageSize = 10

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
            doGetProducts(searchStatus.page)
        }

        const handleDelete = (id) => {
            if(window.confirm("Deseja excluir?")) {
                deleteProduct(id)
            }
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
                <td>
                    <button onClick={(id) => handleDelete(row.id)}>Excluir</button>
                    <Link to={`/products/edit/${row.id}`}>
                        <button>Editar</button>
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
        }

        return (
            <div><center>
                <h2>Listagem de Produtos</h2>
                <hr></hr>
                <Link to="/products/new">
                    <button>Novo Produto</button>
                </Link>
                <div>
                    <input type="text" name="search" placeholder="Termo de pesquisa" onChange={handleSearch} value={searchStatus.search}></input>
                    <button onClick={() => doGetProducts(0, searchStatus.search)}>Pesquisar</button>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Descrição</td>
                            <td>Lançamento</td>
                            <td>Preço Unitário</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
                <div>
                <button disabled={products.pageable.pageNumber <= 0} onClick={() => requestPage(0)}>{'<<'}</button>    
                <button disabled={products.pageable.pageNumber <= 0} onClick={() => requestPage(products.pageable.pageNumber-1)}>{'<'}</button>
                {products.pageable.pageNumber > 1 && <button onClick={() => requestPage(products.pageable.pageNumber-2)}>{products.pageable.pageNumber-1}</button>}
                {products.pageable.pageNumber > 0 && <button onClick={() => requestPage(products.pageable.pageNumber-1)}>{products.pageable.pageNumber}</button>}
                <button onClick={() => requestPage(products.pageable.pageNumber)} style={{backgroundColor: '#4477ff'}}>{products.pageable.pageNumber + 1}</button>
                {products.pageable.pageNumber < products.totalPages - 1 && <button onClick={() => requestPage(products.pageable.pageNumber+1)}>{products.pageable.pageNumber+2}</button>}
                {products.pageable.pageNumber < products.totalPages - 2 && <button onClick={() => requestPage(products.pageable.pageNumber+2)}>{products.pageable.pageNumber+3}</button>}
                <button disabled={products.pageable.pageNumber >= products.totalPages - 1} onClick={() => requestPage(products.pageable.pageNumber+1)}>{'>'}</button>
                <button disabled={products.pageable.pageNumber >= products.totalPages - 1} onClick={() => requestPage(products.totalPages - 1)}>{'>>'}</button>
            </div>
            </center></div>
        )
}

export default ProductList
