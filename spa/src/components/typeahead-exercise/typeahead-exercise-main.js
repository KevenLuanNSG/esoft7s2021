import React, { useState, useEffect } from 'react'
import './typeahead-exercise-main.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import Menu from '../menu/menu'

const ExerciseTypeaheadMain = () => {
    const [product, setProduct] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])
    const [availableProducts,setAvailableProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
    }, [])

    const doSearchProducts = async (search) => {
        setIsLoading(true)
        const response = await axios.get(`/api/products?search=${search}`)
        setSearchedProducts(response.data.content)
        setIsLoading(false)
    }

    const handleRemoveProduct = (id) => {
        setAvailableProducts(availableProducts.filter((p) => p.id !== id))
    }

    const handleAddProduct = () => {
        if(availableProducts.find((p) => p.id == product[0].id)) {
            alert('Produto já adicionado a lista')
        } else {
        setAvailableProducts([...availableProducts, product[0]])
        }
    }

    const tableData = availableProducts.map(row => {
        return <tr key={row.id}>
            <td>{row.description}</td>
            <td><center>
                <Button variant="primary" onClick={() => handleRemoveProduct(row.id)}>X</Button>
            </center></td>
        </tr>;
    })

    return (
        <div><Menu></Menu><center>
            <h2>Typeahead de Produto</h2>
            <hr></hr>
            <div>Produto
                <AsyncTypeahead
                    id="id"
                    filterBy={() => true}
                    isLoading={isLoading}
                    labelKey={(product) => `${product.description}`}
                    onSearch={doSearchProducts}
                    options={searchedProducts}
                    onChange={setProduct}
                    selected={product}
                    positionFixed={false}
                />
            </div>
            <Button variant="success" 
                    className="button-add-product"
                    type="submit" 
                    onClick={handleAddProduct} 
                    disabled={product.length == 0}>Adicionar</Button>
            <table border="1" id="table-product-typeahead">
                <thead>
                    <tr>
                        <td>Descrição</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            <Link to="/">
                <p>Voltar</p>
            </Link>
        </center></div>
    )
}

export default ExerciseTypeaheadMain