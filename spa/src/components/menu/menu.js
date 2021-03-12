import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {

  return (
    <div>
      <ul>
          <Link to="/">
              <li>Landing Page</li>
          </Link>
          <Link to="/colors">
              <li>Cores</li>
          </Link>
          <Link to="/books">
              <li>Livros</li>
          </Link>
          <Link to="/products">
              <li>Produtos</li>
          </Link>
          <Link to="/publishing-companies">
              <li>Editoras</li>
          </Link>
      </ul>
      <hr></hr>
    </div>
  )
}

export default Menu