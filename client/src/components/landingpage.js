
import styled from "styled-components";

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

export const WelcomeMsg = styled.h1`
  display: flex;
  padding: 7px;
  color: #31994f;
  font-style: italic;
  font-weight: 700;
  text-shadow: 6px 4px 5px rgba(0, 0, 0, 0.43);
  font-size: 70px; /* Cambio: Aumenta el tamaño de la fuente */
  animation: moveText 2s ease-in-out infinite; /* Nueva: Aplica una animación llamada "moveText" */

  @keyframes moveText {
    0% {
      transform: translateX(0); /* Nueva: Posición inicial */
    }
    50% {
      transform: translateX(20px); /* Nueva: Posición intermedia */
    }
    100% {
      transform: translateX(0); /* Nueva: Posición final */
    }
  }
`;


export const HomeButton = styled.button`
  color: rgb(231, 218, 218);
  background-color: rgb(20,75,20);
  font-size: 17px;
  text-align: center;
  padding: 10px 25px;
  margin: 15px;
  border-radius: 50px;
  box-shadow: 3px 3px 5px 1px rgb(112, 44, 44);
  cursor: pointer;
  

  &:hover {
    color: #ce5249;
    background-color: rgb(231, 218, 218);
  }
`;