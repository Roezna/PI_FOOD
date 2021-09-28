import '../styles/Home.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loading, search} from '../actions/index'
import { getRecipes } from '../actions/index'

export default function Nav({place}){

    const [busqueda, setBusqueda] = useState('')
    
    const [error, setError] = useState('')

    const dispatch = useDispatch();
 
    const handleClick = (e) => {

        
        e.preventDefault()

            if(busqueda === ''){
                setError('Ingrese un valor de búsqueda')
                return
            }
            dispatch(loading())
            dispatch(search(busqueda))
        }

        const handleChange = (e) => {
            e.preventDefault()
            
            setError('')

            setBusqueda(e.target.value)
        }

    const home = () => {
        dispatch(getRecipes(false))
    }


return(
    <div className="navbar">
            <div className='routes'>
                <Link  to="/home" onClick = {() => home()} className='navLink'>Home</Link>
                <Link  to="/recipe" className='navLink'>Create recipe</Link>
            </div>
            <div className='logo'>
                <i id='name'>MORE</i>
            </div>
            <div className='buscador'>
            {place && <div className='direccion'>
            {error !== '' && <span className='errorLabel'>{error}</span>}     
                <input type="text" className={`input ${error !== '' && 'error'}`} value={busqueda} onChange={(e) => handleChange(e)}  placeholder="recipe..."/>
                <button className='indicador' onClick={(e) => handleClick(e)}>Search</button>
                
                </div>
                }
            </div>
            </div>
)

}
