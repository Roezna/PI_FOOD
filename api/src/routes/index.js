const { Router, response } = require('express');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios').default;
const {conn} = require('../db.js')
const { Recipe, Type_diet, recipe_diet} = conn.models;
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const {Op} = require ("sequelize");
const fs = require('fs');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename : (req, file, cb) => {
        cb(null, 'MORE-' + Date.now() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskStorage,
}).single('image')


router.get('/recipes',async (req,res) => {

      if(req.query.name){
        
    const recipes = []
 
    const querySearch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=50&query=${req.query.name}&addRecipeInformation=true&apiKey=${API_KEY}`)
 
     const searchDb = await Recipe.findAll({where : {title :{[Op.iLike] : `%${req.query.name}%`}}})
  

         searchDb.map(elemento =>{
                recipes.push(elemento.dataValues)
            })  
            

        querySearch.data.results.forEach(elemento => {
            recipes.push(elemento)
        }) 

        if(recipes.length > 0){
            res.json(recipes)
        }
        else{
            res.json('error')
        }
       
     }

    else{

        const response = []
        
        const query = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`)
            query.data.results.map(elemento => response.push(elemento))

        const queryDb = await Recipe.findAll();
        queryDb.map(elemento => response.push(elemento.dataValues))
        
        res.send(response)
       

}
  
})

 router.get('/recipes/:id',async (req,res) => {
    
    
        const searchDb = await Recipe.findByPk(req.params.id)
    

    if(searchDb){
        res.json(searchDb)
    }
    else{
        const searchAPI = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${API_KEY}`)
        res.json(searchAPI.data)
    }


}) 

router.get('/types', async (req,res) => {

    const typeDiet = await Type_diet.findAll()

    console.log(typeDiet)

            res.json(typeDiet)
        
       
})

router.post('/recipe', fileUpload ,async (req,res) => {
    const {diets,healthScore,name,resume,spoonScore,steps} = req.body

    let stepsArray = steps.split('&%')
    let id = uuidv4();
    let dietsArray = diets.split(',')

    const converting = fs.readFileSync(path.join(__dirname + '/../images/' + req.file.filename))
   
    fs.writeFileSync(path.join(__dirname, '../dbimages/' + id + '.png'), converting)

    const data =  `http://localhost:3001/${id}.png`
   
  let carga =  await Recipe.create({
        id : id,
        title: name,
        summary: resume,
        spoonacularScore : spoonScore,
        healthScore : healthScore,
        steps : stepsArray,
        diets : dietsArray,
        image : data
    })

    fs.unlinkSync(path.join(__dirname + '/../images/' + req.file.filename))

     await dietsArray.forEach(async(elemento)=>{

        let diet = await Type_diet.findOne({where: {name : elemento}})
 
        await carga.addType_diet([diet])


     })


    let isCreated = await Recipe.findByPk(id)

    if(isCreated){
      
     res.json({
            message : 'The recipe has been created successfully',
            data : isCreated
        }) 

     }
     else{
        res.json({message: 'There was an error creating the recipe, try again'})
     }

})

module.exports = router;
