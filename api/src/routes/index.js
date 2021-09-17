const { Router } = require('express');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios').default;
const {conn} = require('../db.js')
const { Recipe, Type_diet} = conn.models;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* [ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
[ ] GET /types:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
[ ] POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos */

router.get('/recipes',async (req,res) => {
try{

    const query = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=6&addRecipeInformation=true&apiKey=${API_KEY}`)

    res.send(query.data.results)

/*     if(req.query.name){
       
        let busqueda = []
        
        query.data.results.forEach((elemento, id)=>{

            if(elemento.title.includes(req.query.name)){
                busqueda.push(elemento)
            }

        })

        res.send(busqueda)

    }

    else{
      res.send(query.data.results)
    }   */

}
catch{
      res.send('error')
  }
  
})

 router.get('/recipes/:id',async (req,res) => {

try{     
    const query = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${API_KEY}`)
    res.send(query.data)  
}
catch{
    res.send('Error')
}

}) 

router.get('/types', async (req,res) => {

    try{
        const query = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)
        if(type === query.data.diets){
            res.send(query.data)
        }
    }
    catch{
        res.send('Error')
    }
   
})

router.post('/recipe', async (req,res) => {

    const {name,resume,reputation,level_health,steps,diets} = req.body


        await Recipe.create({
        name: name,
        resume: resume,
        reputation : reputation,
        level_health : level_health,
        steps : steps,
        diets : diets
    })

    await res.send('se cargo piola')

})

module.exports = router;
