import '../styles/Home.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { search, getRecipes} from '../actions/index'

export default function Nav({place}){

    const [busqueda, setBusqueda] = useState('')
    const dispatch = useDispatch();
 

    useEffect(()=>{
        if(place === false){
            return
        }
        if(busqueda !== ''){
            dispatch(search(busqueda))
            return
        }
        if(busqueda === ''){ 
               return;
        }

    },[busqueda])


    const handleChange = (e) => {
        if(e.target.value === ''){
            dispatch(search(''))
            setBusqueda(e.target.value) 
            return
        }
        setBusqueda(e.target.value) 

    }
    const home = () => {
        return
    }


return(
    <div className="navbar">
            <div className='routes'>
                <Link  to="/home" onClick = {() => home()} className='navLink'>Home</Link>
                <Link  to="/about" className='navLink'>About</Link>
                <Link  to="/recipe" className='navLink'>Create recipe</Link>
            </div>
            <div className='logo'>
                <i id='name'>MORE</i>
            </div>
            {place && <div className='buscador'>
                <span className='indicador'>Search</span>
                <input type="text" className='input'  value={busqueda} onChange={(e) => handleChange(e)} placeholder="recipe..."/>
            </div>}
    </div>
)

}
