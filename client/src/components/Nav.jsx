import '../styles/Home.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { search } from '../actions/index'

export default function Nav(){

    const [busqueda, setBusqueda] = useState('')
    const dispatch = useDispatch();

      
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(search(busqueda))
    }

return(
    <div className="navbar">
            <div className='routes'>
                <Link  to="/home" className='navLink'>Home</Link>
                <Link  to="/about" className='navLink'>About</Link>
                <Link  to="/recipe" className='navLink'>Create recipe</Link>
            </div>
            <div className='logo'>
                <i id='name'>MORE</i>
            </div>
            <div className='buscador'>
                <input type="text" className='input'  value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="recipe..."/>
                <button type="submit" className='button' onClick={(e) => handleSubmit(e)}>Search</button>
            </div>
    </div>
)

}
