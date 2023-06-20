const { Router } = require('express');
const { Recipe, Diet } = require('../db')



const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { name, summary, score, healthScore, steps, dietTypes } = req.body
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            steps,
        })

        let dietTypesRecipeDb = await Diet.findAll({
            where: {name: dietTypes}
        })
        newRecipe.addDiet(dietTypesRecipeDb)
        res.status(200).send(newRecipe)  
    } catch (error) {
        next(error)
    };
});


// router.delete('/:id', async (req, res, next) => {
//     try {
//         const recipeId = req.params.id;
//         await Recipe.destroy({
//             where: { id: recipeId }
//         });

//         res.status(200).send('Recipe deleted successfully');
//     } catch (error) {
//         next(error);
//     }
// });

// router.put('/:id', async (req, res, next) => {
//     try {
//         const recipeId = req.params.id;
//         const { name, summary, score, healthScore, steps, dietTypes } = req.body;

//         const updatedRecipe = await Recipe.update(
//             {
//                 name,
//                 summary,
//                 score,
//                 healthScore,
//                 steps,
//             },
//             {
//                 where: { id: recipeId },
//             }
//         );

//         let dietTypesRecipeDb = await Diet.findAll({
//             where: { name: dietTypes }
//         });
//         const recipe = await Recipe.findByPk(recipeId);
//         recipe.setDiets(dietTypesRecipeDb);

//         if (updatedRecipe[0] === 0) {
//             // Si no se encontró la receta
//             return res.status(404).send('Recipe not found');
//         }

//         res.status(200).send('Recipe updated successfully');
//     } catch (error) {
//         next(error);
//     }
// });





module.exports = router;