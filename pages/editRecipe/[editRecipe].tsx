import Snackbars from "../../components/feedback/Snackbar";
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import Form from "../../components/MyRecipes/Form";


export default (props) => {
    const router = useRouter()
    const { idRecipe } = router.query
    const recipeData = useSelector((state) => state.recipePage.value)


    return (
        <>
            <Form recipe={recipeData} />
            <Snackbars />
        </>
    );
};