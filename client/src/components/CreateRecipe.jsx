import Nav from "./Nav"
import Footer from "./Footer"
import '../styles/CreateRecipe.css'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createRecipe, getTypes } from "../actions";
import { useRef } from "react"
import { useEffect } from "react"
import { Redirect } from "react-router"

export default function CreateRecipe() {

    const dispatch = useDispatch();
    const status = useSelector(state => state.status);
    const types = useSelector(state => state.types)

    useEffect(()=>{
        if(types === null){
            dispatch(getTypes())
        }
    },[dispatch,types])

    const [values, setValues] = useState({
        name: '',
        resume: '',
        spoonScore: 0,
        healthScore: 0,
        preStep: '',
        steps: [],
        diets: [],
        previewImage: '',
        image : ''
    })

    const [errors, setErrors] = useState({
        
        diets : null,
        image : null,
        resume : null,
        name : null,
        score : null
    })

    const [valStep, setValStep] = useState(false)

    const [redirect, setRedirect] = useState(false);
    const [validate, setValidate] = useState(false)

    useEffect(() => {     
        if(status !== ''){
            setRedirect(true)
        }
    },[status,dispatch])

    useEffect(()=>{

        if(values.name !== '' && values.resume !== '' && values.diets.length > 0 && values.image !== ''){
            setValidate(true)
        }
        else{
            setValidate(false)
        }
        
        if(values.diets.length < 1){
            setErrors({
                ...errors,
                diets : true
        })
    }else{
        setErrors({
            ...errors,
            diets : false
    })
    }

    },[values])  


    const inputRef = useRef();


    const handleClick = async (e) => {

        e.preventDefault();


        if (values.diets.includes(e.target.name)) {
            e.target.className = 'off';
            e.target.value = ''


            let index = values.diets.findIndex(elemento => elemento === e.target.name)

            values.diets.splice(index, 1)

             setValues({
                ...values,
                diets: values.diets
            })

        }
        else {
            

            e.target.className = 'on';
            e.target.value = '✓'
            setValues({
                ...values,
                diets: [...values.diets, e.target.name]
            })

        }


    }

    const handleChange = async (e) => {
        e.preventDefault();

        if(e.target.name === 'spoonScore' || e.target.name === 'healthScore'){
                if(e.target.value > 100 || e.target.value < 0){
                    setErrors({
                        ...errors,
                        score : true
                    })
                    setValues({
                        ...values,
                        [e.target.name] : 0
                    })
                    return
                    
                }
                else{
                    setErrors({
                        ...errors,
                        score : false
                    })
                    setValues({
                        ...values,
                        [e.target.name] : parseInt(e.target.value)
                    })
                    return
                }
        }

        if(e.target.value === ''){
            setValues({
                ...values,
                [e.target.name]: ''
            })
            if(e.target.name === 'name' || e.target.name === 'resume'){
            setErrors({
                ...errors,
                [e.target.name] : true
            })

        }
        }
        else{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        if(e.target.name === 'name' || e.target.name === 'resume'){
        setErrors({
            ...errors,
            [e.target.name] : false
        })
    }
    }
}

    const addStep = (e) => {
        e.preventDefault();
        if (values.preStep !== '') {
            setValues({
                ...values,
                steps: [...values.steps, values.preStep + '&%'],
                preStep: ''
            })
            setValStep(false)
       
        }
        else{
            setValStep(true)
        }
    }

    const cleanSteps = (e) => {

        values.steps.splice(e.target.name, 1)

        setValues({
            ...values,
            steps :  values.steps
        })

    }


    const loadFile = (e) => {

        if(e.target.files[0]){

            setErrors({
                ...errors,
                image : false
            })
       
        const reader = new FileReader();
        
        reader.onload = function () {
            
            setValues({
                ...values,
                previewImage: reader.result,
                image : inputRef.current.files[0]
            })
            
        }
        
        reader.readAsDataURL(e.target.files[0]);
        }
        else{
            setValues({
                ...values,
                previewImage: ''
            })
            setErrors({
                ...errors,
                image : true
            })
        }

    }


    const handleSubmit = async (e) => {
         e.preventDefault()

         setErrors({
             name : errors.name === true || errors.name === null ? true : false,
             resume : errors.resume === true || errors.resume === null ? true : false,
             diets : errors.diets === true || errors.diets === null ? true : false,
             image : errors.image === true || errors.image === null ? true : false,           
             score : errors.score === true ? true : false,
         })


         if(validate === true){
            await dispatch(createRecipe(values))
            setValues({
                ...values,
                name: '',
                resume: '',
                spoonScore: 0,
                healthScore: 0,
                preStep: '',
                steps: [],
                previewImage: '',
                image : ''
            })
        }
         else{
  
            return;
         }
             
    }

    return (
        <div id='createRecipe'><Nav place={false} />
        {redirect && <Redirect to='/recipeDetail?recipe=new'/>}
            <div className='formulario'>
                <form  className='form'>
                    <span id='titleCreate'>Create Recipe</span>
                    <div className='firstData'>
                        <div className='division'>
                            <div className='childText'>
                                <div className='order'>
                                    <label htmlFor="" className='inputTitle' >Name</label>
                                    <textarea name="name" className="text" onChange={(e) => handleChange(e)} cols="0" rows="2"></textarea>
                                    {errors.name && <label className='setErrors'>Enter recipe name</label>}
                                </div>
                                <div className='order'>
                                    <label htmlFor="" className='inputTitle'>Resume</label>
                                    <textarea name="resume" className="text" onChange={(e) => handleChange(e)} cols="30" rows="2"></textarea>
                                    {errors.resume && <label className='setErrors'>Enter recipe resume</label>}
                                </div>

                            </div>
                            <div className='childText'>
                                <div className='order'>
                                    <label htmlFor="" className='inputTitle'>Spoonacular score</label>
                                    <input type="number" name='spoonScore' onChange={(e) => handleChange(e)} className='score' />
                               </div>
                                <div className='order'>
                                    <label htmlFor="" className='inputTitle'>Health score</label>
                                    <input type="number" name='healthScore' onChange={(e) => handleChange(e)} className='score' />
                                </div>
                                {errors.score &&  <label className='setErrors'>enter puntuation between 0 and 100 (otherwise it will be 0)</label>}
                            </div>
                        </div>
                        <div className='stepAndTypes'>
                            <div className='addSteps'>

                                <label htmlFor="" className='inputTitle'>Steps</label>
                                <textarea name="preStep" value={values.preStep} onChange={(e) => handleChange(e)} className="text stepsCreate" cols="30" rows="3"></textarea>
                                <button onClick={(e) => addStep(e)}>add Step</button>
                                {valStep && <label className='setErrors'>Enter valid step</label>}
                                <div className='file'>
                                    <label htmlFor="" className='inputTitle'>Select image</label>
                                    <input type="file" name='previewImage' ref={inputRef} id="file" className='image' accept="image/*" onChange={(e) => loadFile(e)} />
                                    {errors.image && <label className='setErrors'>Select an image</label>}
                                </div>
                            </div>
                            <div className='typesDiet'>
                                <label htmlFor="" className='inputTitle'>Type of diet</label>
                                <div id='orderTypes'>
                                    {types &&  types.map((tipo, indice) => {
                                        return <div className={indice + ' multipleTypes'} key={tipo.name}>
                                            <input type="button" name={tipo.name} onClick={(e) => handleClick(e)} /><label htmlFor="" > {tipo.name}</label>
                                        </div>
                                    }) }    
                                    {errors.diets && <label className='setErrors'>Select at least one type of diet</label>}
                                </div>
                            </div>
                        </div>

                    </div>

                        <div>
                            <button onClick={(e) => handleSubmit(e)} className='crear'>Create</button>
                        </div>

                </form>

                <div className='preview'>
                    <div className='divPreviewTitle'>
                    {values.name !== '' &&
                      <span className='previewTitle'>{values.name}</span>
                      }
                    </div>
                    <div className='previewImage'>
                        <img src={values.previewImage} alt="" id='output' />
                    </div>
                    <div className='previewTypeAndScore'>
                        <div className='previewfila'>
                        {values.diets.length > 0 &&  <p className='subtitle'>Type <span className='middle'>of</span> diet</p>}
                        <div className='previewTypesDiets'>
                                {values.diets.length > 0 && values.diets.map((elemento) => {
                                    return <div key={elemento}><span className='dietsD' ><i>{elemento},</i></span></div>
                                })}
                            </div>
                        </div>
                        <div className='previewfila'>
                        
                           {values.healthScore !== 0 && <span className='previewSubtitle'>Health <span className='middle'>score:</span> {values.healthScore}</span>}
                            {values.spoonScore !== 0 && <span className='previewSubtitle'> Spoonacular <span className='middle'>score:</span> {values.spoonScore}</span>}
                        </div>
                    </div>

                    <div className='previewResume'>
                        {values.resume !== '' && <p className='subtitle'>Re<span className='color'>su</span>me</p>}
                        <span className='previewText'>{values.resume}</span>
                    </div>
                    <div className='previewResume'>
                       {values.steps.length > 0 && <p className='subtitle'>Step <span className='middle'> by </span> Step</p>}
                        {values.steps.length > 0 && values.steps.map((steps, indice) => {

                            return <div key={indice} className='listSteps'>
                                <span className='previewText'>{(indice+1) + ') ' + steps.replace('&%','')}</span> <button className='eliminarStep' name={indice} onClick={(e) => cleanSteps(e)}>x</button>
                            </div>

                        })}
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}
