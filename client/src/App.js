import './styles/App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import Recipe from './components/Recipe';
import CreateRecipe from './components/CreateRecipe';
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
      <Route exact path='/recipeDetail'>
        <Recipe />
      </Route>
      <Route exact path='/recipe'>
        <CreateRecipe />
      </Route>

    </div>
  );
}

export default App;
