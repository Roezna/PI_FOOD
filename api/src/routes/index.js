const { Router } = require('express');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios').default;
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

router.get('/recipes',(req,res) => {

  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${req.query.name}`)
  .then(data => {
      res.send(data.data)
  })
  .catch(err => {
      console.log(err)
  })
  
})

router.get('/recipes/:id',(req,res) => {

    const {id} = req.params

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?id=${id}&apiKey=${API_KEY}`)
    .then(data => {
        console.log(data.data)
    })
    .catch(err => {
        console.log(err)
    })

})

module.exports = router;
