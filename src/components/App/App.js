import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Planets from '../Planets';
import { Films, Residents } from '../PlanetDetails';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/'>
          <Planets />
        </Route>
        <Route exact path='/planets/:planetId/films'>
          <Films />
        </Route>
      </Router>
    </div>
  );
}

export default App;
