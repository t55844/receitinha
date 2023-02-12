import React from 'react'
import { SnackbarProvider } from 'notistack'
import { Provider, useDispatch } from 'react-redux'
import store from '../js/redux/store'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

import '../styles/globals.css'
import { theme } from '../components/MaterialUI/theme'
import { ThemeProvider } from '@mui/material/styles'
import NavBar from '../components/Menu/NavBar'
import Footer from '../components/Footer/Footer'
import { AuthProvider } from '../components/AuthContext'


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    Aos.init({ duration: 2000 })

  }, [])
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Provider store={store}>
        <ThemeProvider
          theme={theme}
        >
          <SnackbarProvider
            autoHideDuration={10000}
            preventDuplicate={true}
            maxSnack={5}
          >
            <AuthProvider>
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </div>
  )
}

export default MyApp
