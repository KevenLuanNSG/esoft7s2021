import './App.css';
// import SomarComponent from './components/somar-component';
// import HelloComponent from './components/hello-component';
// import ContadorComponent from './components/contador-component';
// import ContadorBasico from './components/contador-basico';
// import AirConditioner from './components/air-conditioner';
import ColorEdit from './components/color/color-edit'
import ColorList from './components/color/color-list'
import LandingPage from './components/landing/landing-page'
import ReactDOM from 'react-dom'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
/*
function somar(v1, v2) {
  return v1 + v2;
}
*/

/*
const somar = function (v1, v2) {
  return v1 + v2;
}
*/

//const somar = (v1, v2) => v1 + v2;

// const somar = (v1, v2) => {
//   return v1 + v2;
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
  );
}

export default App;
