import React from "react";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import Snackbars from "../../components/feedback/Snackbar";
import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes";
import { recipesReq } from "../../js/redux/reduxSlice/fetchSlice";
import { useDispatch } from "react-redux";

export async function getServerSideProps() {
    const res = await fetch(`/api/recipes`)
    const data = await res.json()

    return { props: { data } }


}

export default (props) => {
    const data = props.data
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(recipesReq(data))
    }, [])


    return (
        <>
            <PageMyRecipes />
            <Snackbars />
        </>
    );
};