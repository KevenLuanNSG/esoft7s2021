import './App.css'
import ColorEdit from './components/color/color-edit'
import ColorList from './components/color/color-list'
import BookEdit from './components/book/book-edit'
import BookList from './components/book/book-list'
import LandingPage from './components/landing/landing-page'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import PublishingCompanyList from './components/publishing-company/publishing-company-list'
import PublishingCompanyEdit from './components/publishing-company/publishing-company-edit'
import ProductMain from './components/product/product-main'

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/colors" component={ColorList}></Route>
          <Route path="/colors/edit/:id" component={ColorEdit}></Route>
          <Route path="/colors/new" component={ColorEdit}></Route>
          <Route exact path="/books" component={BookList}></Route>
          <Route path="/books/edit/:id" component={BookEdit}></Route>
          <Route path="/books/new" component={BookEdit}></Route>
          <Route exact path="/products" component={ProductMain}></Route>
          <Route path="/products/edit/:id" component={ProductMain}></Route>
          <Route path="/products/new" component={ProductMain}></Route>
          <Route exact path="/publishing-companies" component={PublishingCompanyList}></Route>
          <Route path="/publishing-companies/edit/:id" component={PublishingCompanyEdit}></Route>
          <Route path="/publishing-companies/new" component={PublishingCompanyEdit}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
