import React, { useContext } from "react";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import Snackbars from "../../components/feedback/Snackbar";
import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes";
import { recipesReq } from "../../js/redux/reduxSlice/fetchSlice";
import { useDispatch } from "react-redux";
import { requestModel, urlAuth, urlRecipes } from "../../js/fetch/fecth";
import Router, { useRouter } from "next/router";
import { AuthContext } from "../../components/AuthContext";
import nookies from 'nookies'

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx)['receitinha-token']

    if (token) {

        const resToken = await requestModel(urlAuth, { method: 'GET', headers: { 'Authorization': token } })
            .then(res => res.json())

        if (resToken.error === false) {
            const data = await fetch(urlRecipes)
                .then(res => res.json())

            return { props: { data } }

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