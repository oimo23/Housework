import '../styles/globals.css'

import { Auth0Provider } from '@auth0/auth0-react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'

import createEmotionCache from '../modules/framework/materialUI/createEmotionCache'
import theme from '../modules/framework/materialUI/theme'

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <Auth0Provider
      domain="dev-cz3row9p.us.auth0.com"
      clientId="k7WmaACzWh7AApP1UnThbDg3mpMMLiqK"
      redirectUri="http://localhost:3000/"
    >
      <RecoilRoot>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </RecoilRoot>
    </Auth0Provider>
  )
}

export default MyApp
