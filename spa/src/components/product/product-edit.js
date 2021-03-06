import React, { useState, useEffect } from 'react'
import './product.css'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'

const ProductEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [product, setProduct] = useState({description:"", launch: new Date(), unitPrice:0.00, standardColorVO: {id: "", name: ""}})
    const [searchedColors, setSearchedColors] = useState([])
    const [color, setColor] = useState([])
    const editionMode = id !== undefined 
    const [isLoading, setIsLoading] = useState(false)

    const doGetProductById = async () => {
        const response = await axios.get(`/api/products/${id}`, product)
        setProduct(response.data)
        setColor([response.data.standardColorVO])
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

    const doSearchColors = async (search) => {
        setIsLoading(true)
        const response = await axios.get(`/api/colors?search=${search}`)
        setSearchedColors(response.data.content)
        setIsLoading(false)
    }

    const setColorSelected = (color) => {
        setColor(color)
        if(color.length > 0) {
            const newProduct = {...product, 
                standardColor: color[0],
                standardColorVO: {id: color[0].id, name: color[0].name},
                standardColorId: color[0].id,
                standardColorName: color[0].name}
            setProduct(newProduct)
        }
    }

    return (
        <div><center>
            <h2>{editionMode ? 'Edição ' : 'Criação '}de Produto</h2>
            <hr></hr>
            <form onSubmit={handleSubmit} id="form-product">
                <div>Descrição
                    <input id="teste" className="form-control" type="text" name="description" onChange={handleChange} value={product.description}></input>
                </div>
                <div>Lançamento
                    <input className="form-control" type="date" name="launch" onChange={handleChange} value={product.launch}></input>
                </div>
                <div>Preço Unitário
                    <input className="form-control" type="number" name="unitPrice" onChange={handleChange} value={product.unitPrice}></input>
                </div>
                <div>Cor
                    <AsyncTypeahead
                        id="id"
                        filterBy={() => true}
                        isLoading={isLoading}
                        labelKey={(color) => `${color.name ? color.name : ''}`}
                        onSearch={doSearchColors}
                        options={searchedColors}
                        onChange={setColorSelected}
                        positionFixed={false}
                        selected={color}
                        minLength={1}
                    />
                </div>
                <Button variant="success" className="button-save" type="submit">Salvar</Button>
            </form>
            <Link to="/products">
                <p>Voltar</p>
            </Link>
        </center></div>
    )
}

export default ProductEdit