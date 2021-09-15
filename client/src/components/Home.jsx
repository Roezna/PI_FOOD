import Nav from "./Nav"
import Cards from "./Cards";
import {useDispatch} from "react-redux";
import  {getRecipes} from '../actions/index'
import {useEffect} from "react";
import '../styles/Home.css'

export default function Home(){

    const dispatch = useDispatch()

     useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])

    return(
        <div className='home'>
            <Nav />
            <Cards/>
        
        </div>
    )
}
