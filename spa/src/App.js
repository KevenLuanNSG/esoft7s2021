import './App.css'
// import SomarComponent from './components/somar-component'
// import HelloComponent from './components/hello-component'
// import ContadorComponent from './components/contador-component'
// import ContadorBasico from './components/contador-basico'
// import AirConditioner from './components/air-conditioner'
import ColorEdit from './components/color/color-edit'
import ColorList from './components/color/color-list'
import BookEdit from './components/book/book-edit'
import BookList from './components/book/book-list'
import LandingPage from './components/landing/landing-page'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import ProductList from './components/product/product-list'
import ProductEdit from './components/product/product-edit'
import PublishingCompanyList from './components/publishing-company/publishing-company-list'
import PublishingCompanyEdit from './components/publishing-company/publishing-company-edit'
import ProductMain from './components/product/product-main'
/*
function somar(v1, v2) {
  return v1 + v2
}
*/

/*
const somar = function (v1, v2) {
  return v1 + v2
}
*/

//const somar = (v1, v2) => v1 + v2

// const somar = (v1, v2) => {
//   return v1 + v2
// }


function App() {
  // const resultado = somar(100,150)

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage></LandingPage>
          </Route>
          <Route exact path="/colors">
            <ColorList></ColorList>
          </Route>
          <Route path="/colors/edit/:id">
            <ColorEdit></ColorEdit>
          </Route>
          <Route path="/colors/new">
            <ColorEdit></ColorEdit>
          </Route>
          <Route exact path="/books">
            <BookList></BookList>
          </Route>
          <Route path="/books/edit/:id">
            <BookEdit></BookEdit>
          </Route>
          <Route path="/books/new">
            <BookEdit></BookEdit>
          </Route>
          <Route exact path="/products">
            <ProductMain></ProductMain>
          </Route>
          <Route path="/products/edit/:id">
            <ProductMain></ProductMain>
          </Route>
          <Route path="/products/new">
            <ProductMain></ProductMain>
          </Route>
          <Route exact path="/publishing-companies">
            <PublishingCompanyList></PublishingCompanyList>
          </Route>
          <Route path="/publishing-companies/edit/:id">
            <PublishingCompanyEdit></PublishingCompanyEdit>
          </Route>
          <Route path="/publishing-companies/new">
            <PublishingCompanyEdit></PublishingCompanyEdit>
          </Route>
        </Switch>
      </Router>

      {/* <AirConditioner></AirConditioner> */}
      {/* <ContadorBasico></ContadorBasico> */}
      {/* <div>{resultado}</div> */}
      {/* <SomarComponent v1={1000} v2={2200}></SomarComponent> */}
      {/* <HelloComponent></HelloComponent> */}
      {/* <ContadorComponent valorMinimo={10} valorMaximo={15}></ContadorComponent>
      <ContadorComponent valorMinimo={0} valorMaximo={10}></ContadorComponent> */}
    </div>
  )
}

export default App
