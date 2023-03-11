import Snackbars from "../../components/feedback/Snackbar";
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import dynamic from "next/dynamic";

import formStyle from '../../styles/myRecipes.module.css'
import TitleOfSection from "../../components/Menu/TitleOfSection";
const Form = dynamic(() => import("../../components/MyRecipes/Form"), {
    ssr: false,
});
//import Form from "../../components/MyRecipes/Form";


export default (props) => {
    const router = useRouter()
    const { idRecipe } = router.query
    const recipeData = useSelector((state) => state.recipePage.value)


    return (
        <div>
            <TitleOfSection text="Alterar Receita" />
            <div className={formStyle.formContainer}>
                <Form recipe={recipeData} />
            </div>
            <Snackbars />
        </div>
    );
};