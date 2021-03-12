import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const ProductEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [product, setProduct] = useState({description:"", launch: new Date(), unitPrice:0.00})
    const editionMode = id !== undefined

    const doGetProductById = async () => {
        const response = await axios.get(`/api/products/${id}`, product)
        setProduct(response.data)
    }

    useEffect(() => {
        if(editionMode){
            doGetProductById()
        }
    }, [])

    const saveProduct = async () => {
        const response = await axios.post(`/api/products`, product)
        alert('Novo produto criado! Id=' + response.data.id)
        history.push('/products')
    }

    const updateProduct = async () => {
        const response = await axios.put(`/api/products/${id}`, product)
        alert('Produto editado! Id=' + response.data.id)
        history.push('/products')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editionMode){
            updateProduct()
        } else {
            saveProduct()
        }
    }

    const handleChange = (event) => {
        const newProduct = {...product, [event.target.name]: event.target.value}
        setProduct(newProduct)
    }

    return (
        <div><center>
            <h2>{editionMode ? 'Edição ' : 'Criação '}de Produto</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <div>Descrição:
                    <input type="text" name="description" onChange={handleChange} value={product.description}></input>
                </div>
                <div>Lançamento:
                    <input type="date" name="launch" onChange={handleChange} value={product.launch}></input>
                </div>
                <div>Preço Unitário:
                    <input type="number" name="unitPrice" onChange={handleChange} value={product.unitPrice}></input>
                </div>
                <button>Salvar</button>
            </form>
            <Link to="/products">
                <a>Voltar</a>
            </Link>
        </center></div>
    )
}

export default ProductEdit

