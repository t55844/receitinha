import Head from 'next/head'
import React from 'react'

import mainStyle from '../styles/home/main.module.css'
import Main from '../components/Menu/Main'
import CardMyReipes from '../components/SectionHome/CardMyRecipes'
import RecipesList from '../components/SectionHome/RecipesList'
import SideBar, { IRecipesToSideBar } from '../components/SideBar/SideBar'
import Snackbars from '../components/feedback/Snackbar'
import TitleOfSection from '../components/Menu/TitleOfSection'
import nookies from 'nookies'
import { prisma } from '../js/prisma/prismaDb'
console.log(env("DATABASE_URL"))

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx)

  const recipes = await prisma.recipes.findMany({
    orderBy: {
      Likes: {
        _count: 'desc',

      }
    },
    take: 10,
    select: {
      name: true,
      img: true,
      comments: {
        take: 1,
        select: {
          text: true
        }
      },
      Users: {
        select: {
          name: true,
          id: true
        }
      }
    }
  });

  prisma.$disconnect();
  return { props: { cookies, recipes } }
}


export default function Home(props: {
  cookies: string,
  recipes: IRecipesToSideBar
}) {
  return (
    <div >
      <Head>
        <title>Receitinha</title>
        <meta name="description" content="Site para ver e compartilhar receitas" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/logo.png" />
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
        <SideBar recipes={props.recipes} />
      </main>
      <Snackbars />
    </div >
  )
}
