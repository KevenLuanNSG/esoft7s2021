import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const BookList = () => {
        const [books, setBooks] = useState([]);

        const doGetBooks = async () => {
            const response = await axios.get("/api/books")
            setBooks(response.data)
        }

        useEffect(() => {
            doGetBooks();
        },[])


        const deleteBook = async (id) => {
            await axios.delete(`/api/books/${id}`)
            doGetBooks()
        }

        const handleDelete = (id) => {
            if(window.confirm("Deseja excluir?")) {
                deleteBook(id)
            }
        }

        const tableData = books.map(row => {
            return <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.author}</td>
                <td>{row.numberOfPages}</td>
                <td>
                    <button onClick={(id) => handleDelete(row.id)}>Excluir</button>
                    <Link to={`/books/edit/${row.id}`}>
                        <button>Editar</button>
                    </Link>  
                </td>
            </tr>
        })

        return (
            <div><center>
                <h2>Listagem de Livros</h2>
                <hr></hr>
                <Link to="/books/new">
                    <button>Novo Livro</button>
                </Link>
                <table border="1">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Título</td>
                            <td>Autor</td>
                            <td>Páginas</td>
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

export default BookList
