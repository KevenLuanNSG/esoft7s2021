import React, { useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Menu from '../menu/menu'
import ProductList from './product-list'
import ProductEdit from './product-edit'


const ProductMain = () => {
    const location = useLocation()
    const [searchStatus, setSearchStatus] = useState({page: 0, search: ''})

    useEffect(() => {
      
    }, [searchStatus])

    return (
        <div><Menu></Menu><center>
          <Switch>
            <Route exact path="/products">
              <ProductList searchStatus={searchStatus} setSearchStatus={setSearchStatus}></ProductList>
            </Route>
            <Route exact path="/products/new" component={ProductEdit}></Route>
            <Route exact path="/products/edit/:id" component={ProductEdit}></Route>
          </Switch>
        </center></div>
    )
}

export default ProductMain

