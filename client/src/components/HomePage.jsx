import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietTypeFilter, aplhabeticalSort, scoreSort } from '../actions';
import Recipe from './Recipe';
import { Link } from 'react-router-dom'
import Paged from './Paged';
import SearchBar from './SearchBar';
import './home.css'


let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    
    const [order, setOrder] = useState('')
    
    
    const [page, setPage] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    
    const quantityRecipesPage = page * recipesPage;
    const firstRecipePage = quantityRecipesPage - recipesPage;
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);
    
    const paged = function(pageNumber) {
        setPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setPage(1);
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietTypeFilter(e.target.value))
        setPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(aplhabeticalSort(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(scoreSort(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    return(
        <div className="home">
            <h1 className="initialMsg">Comencemos</h1>
            <div>
                <button className="refreshButton" onClick={handleClick}>Actualiza</button>
                <Link to="/recipe">
                    <button className="addButton">Agrega una nueva Receta</button>
                </Link>
            </div>
            <div className="select">
                <label className="filters">Ordena:</label>
                <select className="select" name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alfabéticamente</option>
                    <option value="atoz">A / Z</option>
                    <option value="ztoa">Z / A</option>
                </select>
                <select className="select" name="numerical" onChange={e => handleScoreSort(e)}>
                    <option disabled selected>Puntaje</option>
                    <option value="asc">Min / Max</option>
                    <option value="desc">Max / Min</option>
                </select>
                <label className="filters">Tipos de dietas:</label>
                <select className="select" name="diets" onChange={e => handleDietTypeFilter(e)}>
                    <option disabled selected>Elige...</option>
                    <option value="gluten free">Libre de Gluten</option>
                    <option value="ketogenic">Ceto</option>
                    <option value="vegetarian">Vegetariana</option>
                    <option value="lacto vegetarian">Lactovegetariana</option>
                    <option value="ovo vegetarian">Ovovegetariana</option>
                    <option value="lacto ovo vegetarian">Ovolactovegetariana</option>
                    <option value="vegan">Vegana</option>
                    <option value="pescetarian">Pescetariana</option>
                    <option value="paleolithic">Paleolitica</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Baja en FODMAP</option>
                    <option value="whole 30">Todo en 30</option>
                    <option value="dairy free">Libre de lacteos</option>
                </select>
            </div>

            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>
           
            <SearchBar/>

            <div className="allrecipes">
            {
                showRecipesPage?.map(e => {
                    return (
                        <div className="eachRecipe" key={prevId++}>
                            <Link className="linkRecetas" to={`home/${e.id}`}>
                                <Recipe
                                    image={e.image ? 
                                        e.image :
                                        'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'}
                                    name={e.name}                             
                                    dietTypes={e.dietTypes} />
                            </Link>
                        </div>
                    )
                })
            }
            </div>            
            
            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

        </div>






    )
}