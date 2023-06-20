import React from "react";
import { Link } from 'react-router-dom';
import { LandingContainer, WelcomeMsg, HomeButton } from "./landingpage.js";

export default function LandingPage() {
    return (
        <LandingContainer>
            <WelcomeMsg>Mira nuestras recetas</WelcomeMsg>
            <Link to='/home' id="click">
                <HomeButton>Ingresa</HomeButton>
            </Link>

        </LandingContainer>
    )
}
