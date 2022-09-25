import React from 'react'
import '../styles/globals.css'
import { theme } from '../components/MaterialUI/theme'
import { ThemeProvider } from '@mui/material/styles'
import NavBar from '../components/Menu/NavBar'
import Footer from '../components/Footer/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>

  )
}

export default MyApp
