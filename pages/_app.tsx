import React from 'react'
import '../styles/globals.css'
import { theme } from '../components/MaterialUI/theme'
import { ThemeProvider } from '@mui/material/styles'
import NavBar from '../components/Menu/NavBar'
import Footer from '../components/Footer/Footer'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import store from '../js/redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
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
    </Provider>

  )
}

export default MyApp
