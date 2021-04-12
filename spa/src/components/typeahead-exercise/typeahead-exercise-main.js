import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'

const ExerciseTypeaheadMain = () => {
    const [product, setProduct] = useState({description:"", launch: new Date(), unitPrice:0.00, standardColorVO: {id: "", name: ""}})
    const [searchedProducts, setSearchedProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Save Product: '  + product.description)
    }

    const doSearchProducts = async (search) => {
        setIsLoading(true)
        const response = await axios.get(`/api/products?search=${search}`)
        setSearchedProducts(response.data.content)
        setIsLoading(false)
    }

    const setProductSelected = (product) => {
        setProduct(product[0])
        console.log('Select Product: '  + product[0].description)

    }

    return (
        <div><center>
            <h2>Typeahead de Produto</h2>
            <hr></hr>
            <form onSubmit={handleSubmit} id="form-product">
                <div>Produto
                    <AsyncTypeahead
                        id="id"
                        filterBy={() => true}
                        isLoading={isLoading}
                        labelKey={(product) => `${product.description}`}
                        onSearch={doSearchProducts}
                        options={searchedProducts}
                        onChange={setProductSelected}
                        positionFixed={false}
                    />
                </div>
                <Button variant="success" style={{marginTop: '5px'}} type="submit">Salvar</Button>
            </form>
            <Link to="/products">
                <a>Voltar</a>
            </Link>
        </center></div>
    )
}

export default ExerciseTypeaheadMain