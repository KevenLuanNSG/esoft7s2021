import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookEdit from './components/book/book-edit'
import BookList from './components/book/book-list'
import LandingPage from './components/landing/landing-page'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import ColorMain from './components/color/color-main'
import ProductMain from './components/product/product-main'
import PublishingCompanyMain from './components/publishing-company/publishing-company-main'
import ExerciseTypeaheadMain from './components/typeahead-exercise/typeahead-exercise-main';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/books" component={BookList}></Route>
          <Route path="/books/edit/:id" component={BookEdit}></Route>
          <Route path="/books/new" component={BookEdit}></Route>
          <Route path="/colors" component={ColorMain}></Route>
          <Route path="/products" component={ProductMain}></Route>
          <Route path="/publishing-companies" component={PublishingCompanyMain}></Route>
          <Route path="/exercise-typeahead" component={ExerciseTypeaheadMain}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
