import React from "react";
import { useEffect } from "react";
import Snackbars from "../../components/feedback/Snackbar";
import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes";

export default (props) => {
    return (
        <>
            <PageMyRecipes />
            <Snackbars />
        </>
    );
};