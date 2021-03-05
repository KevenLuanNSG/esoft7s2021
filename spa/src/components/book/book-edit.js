import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const BookEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [book, setBook] = useState({title:"", author:"", numberOfPages:0})
    const editionMode = id !== undefined

    const doGetBookById = async () => {
        const response = await axios.get(`/api/books/${id}`, book)
        setBook(response.data)
    }

    useEffect(() => {
        if(editionMode){
            doGetBookById()
        }
    }, [])

    const saveBook = async () => {
        const response = await axios.post(`/api/books`, book)
        alert('Novo livro criado! Id=' + response.data)
        history.push('/books')
    }

    const updateBook = async () => {
        const response = await axios.put(`/api/books/${id}`, book)
        alert('Livro editado! Id=' + response.data)
        history.push('/books')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editionMode){
            updateBook()
        } else {
            saveBook()
        }
    }

    const handleChange = (event) => {
        const newBook = {...book, [event.target.name]: event.target.value}
        setBook(newBook)
    }

    return (
        <div><center>
            <h2>{editionMode ? 'Edição ' : 'Criação '}de Livro</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <div>Título:
                    <input type="text" name="title" onChange={handleChange} value={book.title}></input>
                </div>
                <div>Autor:
                    <input type="text" name="author" onChange={handleChange} value={book.author}></input>
                </div>
                <div>Quantidade de páginas:
                    <input type="number" name="numberOfPages" onChange={handleChange} value={book.numberOfPages}></input>
                </div>
                <button>Salvar</button>
            </form>
        </center></div>
    )
}

export default BookEdit;

