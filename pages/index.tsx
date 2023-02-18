import Head from 'next/head'
import React from 'react'

import mainStyle from '../styles/home/main.module.css'
import Main from '../components/Menu/Main'
import CardMyReipes from '../components/SectionHome/CardMyRecipes'
import RecipesList from '../components/SectionHome/RecipesList'
import SideBar from '../components/SideBar/SideBar'
import Snackbars from '../components/feedback/Snackbar'
import TitleOfSection from '../components/Menu/TitleOfSection'
import nookies from 'nookies'
export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx)
  console.log(cookies)


  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { props: { cookies } }
}

export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      </Head>

      <header>
        <Main />
      </header>
      <TitleOfSection text=' Nós temos uma enorme variedade de receitas' />
      <main className={mainStyle.main}>
        <section>
          <CardMyReipes />
          <RecipesList />
        </section>
        <SideBar />
      </main>
      <Snackbars />
    </div >
  )
}
