import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from '../menu/menu'
import PublishingCompanyList from './publishing-company-list'
import PublishingCompanyEdit from './publishing-company-edit'


const PublishingCompanyMain = () => {
  const [searchStatus, setSearchStatus] = useState({page: 0, search: ''})

  useEffect(() => {
    
  }, [searchStatus])

  return (
    <div><Menu></Menu><center>
      <Switch>
        <Route exact path="/publishing-companies">
          <PublishingCompanyList searchStatus={searchStatus} setSearchStatus={setSearchStatus}></PublishingCompanyList>
        </Route>
        <Route exact path="/publishing-companies/new" component={PublishingCompanyEdit}></Route>
        <Route exact path="/publishing-companies/edit/:id" component={PublishingCompanyEdit}></Route>
      </Switch>
    </center></div>
  )
}

export default PublishingCompanyMain