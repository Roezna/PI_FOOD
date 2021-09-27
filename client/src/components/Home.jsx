import Nav from "./Nav"
import Cards from "./Cards";
import {useDispatch, useSelector} from "react-redux";
import  {getRecipes, loading} from '../actions/index'
import {useEffect} from "react";
import '../styles/Home.css'

export default function Home(){

    const dispatch = useDispatch()
    const all = useSelector(state => state.allRecipes)
    const load = useSelector(state => state.loading)

     useEffect(() => {
        if(all.length){
         return
        }
        else{
            dispatch(loading())
           dispatch(getRecipes(true))
           
        }
    },[all,dispatch])

    return(
        <div className={load ? 'carga' : 'home'}>
            
         <Nav place={true} />
         {load && <div className='loading'><p className='logito'><i>MORE...</i></p></div>}
         {!load && <Cards/>}   
        
        </div>
    )
}
