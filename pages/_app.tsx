import React from 'react'
import '../styles/globals.css'
import { theme } from '../components/MaterialUI/theme'
import { ThemeProvider } from '@mui/material/styles'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
