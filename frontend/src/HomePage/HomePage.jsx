import React from "react";
import "./HomePage.css";
import AboutUs from "./AboutUs"
import Title from "./Title";

function HomePage(){
    
    return (
        <>
            <div>
                <Title/>
            </div>
            <div>
                <AboutUs/>
            </div>
        </>
    );
};

export default HomePage;