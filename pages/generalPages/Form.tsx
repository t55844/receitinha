import React, { useContext } from "react";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import Snackbars from "../../components/feedback/Snackbar";
import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes";
import { recipesReq } from "../../js/redux/reduxSlice/fetchSlice";
import { useDispatch } from "react-redux";
import { requestModel, urlAuth, urlMyRecipes } from "../../js/fetch/fecth";
import nookies from 'nookies'

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx)['receitinha-token']

    if (token) {

        const resToken = await requestModel(urlAuth, { method: 'GET', headers: { 'Authorization': token } })
            .then(res => res.json())

        if (resToken.error === false) {
            const data = await fetch(urlMyRecipes(resToken.payload.email))
                .then(res => res.json())

            return { props: { data: data } }

        }




    }
    return {
        redirect: {
            permanent: false,
            destination: "/generalPages/RegisterLogin"
        }
    }



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