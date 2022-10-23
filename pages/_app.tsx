import React from 'react'
import '../styles/globals.css'
import { theme } from '../components/MaterialUI/theme'
import { ThemeProvider } from '@mui/material/styles'
import NavBar from '../components/Menu/NavBar'
import Footer from '../components/Footer/Footer'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      theme={theme}
    >
      <SnackbarProvider
        autoHideDuration={10000}
        preventDuplicate={true}
        maxSnack={5}
      >
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </SnackbarProvider>
    </ThemeProvider>

  )
}

export default MyApp
