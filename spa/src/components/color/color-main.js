import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from '../menu/menu'
import ColorList from './color-list'
import ColorEdit from './color-edit'


const ColorMain = () => {
  const [searchStatus, setSearchStatus] = useState({page: 0, search: ''})

  useEffect(() => {
    
  }, [searchStatus])

  return (
    <div><Menu></Menu><center>
      <Switch>
        <Route exact path="/colors">
          <ColorList searchStatus={searchStatus} setSearchStatus={setSearchStatus}></ColorList>
        </Route>
        <Route exact path="/colors/new" component={ColorEdit}></Route>
        <Route exact path="/colors/edit/:id" component={ColorEdit}></Route>
      </Switch>
    </center></div>
  )
}

export default ColorMain