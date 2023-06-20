import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from "../actions/index";
import "./addrecipe.css";

function validate(input) {
  const errors = {};
  if (!input.name) errors.name = "Escribe el nombre de la receta";
  if (!input.summary) errors.summary = "Comenta tu receta";
  if (input.score < 1 || input.score > 100)
    errors.score = "Entre 1 y 100";
  if (input.healthScore < 1 || input.healthScore > 100)
    errors.healthScore = "Entre 1 y 100";
  if (!input.steps.length) errors.steps = "Tu receta paso a paso";
  if (!input.dietTypes.length) errors.dietTypes = "¿A que tipo de dieta pertenece?";
  return errors;
}

export default function AddRecipe() {
  const dispatch = useDispatch();
  const dietTypes = useSelector((state) => state.dietTypes);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    score: "",
    healthScore: "",
    steps: "",
    dietTypes: [],
  });

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    const validations = validate({ ...input, [name]: value });
    setErrors(validations);
  };

  const handleCheckBox = (e) => {
    const { value } = e.target;
    const newArray = input.dietTypes.includes(value)
      ? input.dietTypes.filter((type) => type !== value)
      : [...input.dietTypes, value];

    setInput((prevInput) => ({
      ...prevInput,
      dietTypes: newArray,
    }));

    const validations = validate({ ...input, dietTypes: newArray });
    setErrors(validations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Debes completar la información requerida");
    } else if (
      !input.name &&
      !input.summary &&
      !input.score &&
      !input.healthScore &&
      !input.steps &&
      input.dietTypes.length === 0
    ) {
      alert("Termina el formulario");
    } else {
      dispatch(addRecipe(input));
      alert("Receta Guardada!");
      setInput({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        dietTypes: [],
      });
      history.push("/home");
    }
  };

  return (
    <div className="addRecipe">
      <h1 className="msg">Elabora tu propia Receta!!!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="prettierForm">
            <div className="nameInput">
              <label className="msgs">Name:</label>
              <input
                className="inputs"
                name="name"
                type="text"
                value={input.name}
                onChange={handleChange}
              />
              {errors.name && 
                <span className="errors">{errors.name}</span>}
</div>
<div className="nameInput">
<label className="msgs">Summary:</label>
<textarea
             name="summary"
             type="text"
             rows="4"
             cols="30"
             value={input.summary}
             onChange={handleChange}
           />
{errors.summary && <span className="errors">{errors.summary}</span>}
</div>
<div className="nameInput">
<label className="msgs">Score:</label>
<input
             name="score"
             type="number"
             value={input.score}
             onChange={handleChange}
           />
{errors.score && <span className="errors">{errors.score}</span>}
</div>
<div className="nameInput">
<label className="msgs">Health Score:</label>
<input
             name="healthScore"
             type="number"
             value={input.healthScore}
             onChange={handleChange}
           />
{errors.healthScore && (
<span className="errors">{errors.healthScore}</span>
)}
</div>
<div className="nameInput">
<label className="msgs">Steps:</label>
<textarea
             name="steps"
             type="text"
             rows="4"
             cols="40"
             value={input.steps}
             onChange={handleChange}
           />
{errors.steps && <span className="errors">{errors.steps}</span>}
</div>
</div>
<div className="checkSelect">
<label className="msgs">Diet Types:</label>
{dietTypes.map((d) => (
<div key={d} className="checks">
<label className="dietTypes">{d}</label>
<input
               className="checks"
               type="checkbox"
               name={d}
               value={d}
               checked={input.dietTypes.includes(d)}
               onChange={handleCheckBox}
             />
</div>
))}
{errors.dietTypes && (
<span className="errors">{errors.dietTypes}</span>
)}
</div>
</div>
<button className="submitButton" type="submit">
Agrega la receta
</button>
<Link to="/home">
<button className="goBackButton">Regresa</button>
</Link>
</form>
</div>
);
}