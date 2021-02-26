import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CorList = () => {
        const [cores, setCores] = useState([]);

        const doGetCores = async () => {
            const response = await axios.get("/api/cores")
            setCores(response.data)
        }

        useEffect(() => {
            doGetCores();
        },[])


        const doExcluirCor = async (id) => {
            await axios.delete(`/api/cores/${id}`)
            doGetCores()
        }

        const handleExcluir = (id) => {
            if(window.confirm("Deseja excluir?")) {
                doExcluirCor(id)
            }
        }

        const tableData = cores.map(row => {
            return <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.sigla}</td>
                <td>{row.nome}</td>
                <td>
                    <button onClick={(id) => handleExcluir(row.id)}>Excluir</button>
                    <button>Editar</button>    
                </td>
            </tr>
        })

        return (
            <div><center>
                <h2>Listagem de Cores</h2>
                <hr></hr>
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

export default CorList
