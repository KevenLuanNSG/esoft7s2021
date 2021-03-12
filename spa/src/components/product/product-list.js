import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Menu from '../menu/menu'

const ProductList = () => {
        const [products, setProducts] = useState([])

        const doGetProducts = async () => {
            const response = await axios.get("/api/products")
            setProducts(response.data)
        }

        useEffect(() => {
            doGetProducts()
        },[])


        const deleteProduct = async (id) => {
            await axios.delete(`/api/products/${id}`)
            doGetProducts()
        }

        const handleDelete = (id) => {
            if(window.confirm("Deseja excluir?")) {
                deleteProduct(id)
            }
        }

        const tableData = products.map(row => {
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

        return (
            <div><Menu></Menu><center>
                <h2>Listagem de Produtos</h2>
                <hr></hr>
                <Link to="/products/new">
                    <button>Novo Produto</button>
                </Link>
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
            </center></div>
        )
}

export default ProductList
