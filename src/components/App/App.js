import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Planets from '../Planets';
import { Details, Films, Residents } from '../PlanetDetails';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Planets />
        </Route>
        <Route exact path='/planets/:planetName/details'>
          <Details />
        </Route>
        <Route exact path='/films'>
          <Films />
        </Route>
        <Route exact path='/residents'>
          <Residents />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
