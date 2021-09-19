import Nav from "./Nav"
import Cards from "./Cards";
import {useDispatch, useSelector} from "react-redux";
import  {getRecipes} from '../actions/index'
import {useEffect} from "react";
import '../styles/Home.css'

export default function Home(){

    const dispatch = useDispatch()
    const all = useSelector(state => state.allRecipes)

     useEffect(() => {
        if(all.length){
         return
        }
        else{
           dispatch(getRecipes(true))
        }
    },[all,dispatch])

    return(
        <div className='home'>
            <Nav place={true} />
            <Cards/>
        
        </div>
    )
}
