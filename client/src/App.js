import './styles/App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>

    </div>
  );
}

export default App;
