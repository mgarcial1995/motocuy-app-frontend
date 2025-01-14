// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import { useRouter } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import React, { useState, useEffect } from "react";

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

export const userLoggedContext = React.createContext({}); //user context

// ** Configure JSS & ClassName
const App = props => {
  const [userLogged, setUserLogged] = useState(false); //user logged state
  const router = useRouter()
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userLogged"));
    if (token) {
      setUserLogged({ logged: true, typeUser: token.data.typeUser, department: token.data.department, district: token.data.district, province: token.data.province })
      router.push('/drivers')
    } else {
      setUserLogged(false);
      router.push('/')
    }
  }, [])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <userLoggedContext.Provider value={{ userLogged, setUserLogged }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>MotocuyApp Admin</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </CacheProvider>
    </userLoggedContext.Provider>
  )
}

export default App
