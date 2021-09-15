import { Link } from "react-router-dom"
import '../styles/Landing.css'
export default function Landing(){

    return(
        <div className='container'>
 
            <div className='welcome'>
                <h2 className='title'>Welcome to <i className='name'>MORE</i></h2>
                <p className='description'>
                In "<b>M</b>y <b>O</b>nline <b>R</b>ecipes <b>E</b>asy" you can find different recipes, 
                different types of diet, different ingredients and <i><b>more</b></i> ... Let's go!</p>
            </div>
            <div>
            <button className='goTo'>
                <Link to="/home" className='link'>Home</Link>
            </button>
            </div>
        </div>
    )

}