import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  const pathname = window.location.pathname.split('/')

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Nav activeKey={`/${pathname[1]}`}>
          <Nav.Link href="/">Landing Page</Nav.Link>
          <Nav.Link href="/colors">Cores</Nav.Link>
          <Nav.Link href="/products">Produtos</Nav.Link>
          <Nav.Link href="/publishing-companies">Editoras</Nav.Link>
          <Nav.Link href="/books">Livros</Nav.Link>
          <Nav.Link href="/exercise-typeahead">Typeahead</Nav.Link>
        </Nav>
      </Navbar>

      {/* Fast */}
      {/* <ul>
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
      </ul> */}
    </div>
  )
}

export default Menu