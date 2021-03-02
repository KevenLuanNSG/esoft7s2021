import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const ColorList = () => {
        const [colors, setColors] = useState([]);

        const doGetColors = async () => {
            const response = await axios.get("/api/colors")
            setColors(response.data)
        }

        useEffect(() => {
            doGetColors();
        },[])


        const deleteColor = async (id) => {
            await axios.delete(`/api/colors/${id}`)
            doGetColors()
        }

        const handleDelete = (id) => {
            if(window.confirm("Deseja excluir?")) {
                deleteColor(id)
            }
        }

        const tableData = colors.map(row => {
            return <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.nick}</td>
                <td>{row.name}</td>
                <td>
                    <button onClick={(id) => handleDelete(row.id)}>Excluir</button>
                    <Link to={`/colors/edit/${row.id}`}>
                        <button>Editar</button>
                    </Link>  
                </td>
            </tr>
        })

        return (
            <div><center>
                <h2>Listagem de Cores</h2>
                <hr></hr>
                <Link to="/colors/new">
                    <button>Nova Cor</button>
                </Link>
                <table border="1">
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
            </center></div>
        )
}

export default ColorList
