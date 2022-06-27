import { Button } from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import Header from '../components/templates/Header'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    ;(async function () {
      try {
        const params = {
          //任意のパラメータ
          crossDomain: true,
        }
        const response: AxiosResponse<any> = await axios.get(
          `https://script.google.com/macros/s/AKfycbzxq3mEdG2fKxRAhY4eLABINIsZ7cyDKtMeFoTyS1T0Vl1U9nYzcibo4LkPsEvuKR7C/exec`,
          { headers: { Authorization: 'Bearer token' }, params },
        )
        setData(response.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      {/* こんな感じでページごとのtitleなど設定できる */}
      <Head>
        <title>ユーザー一覧</title>
        <meta name="description" content="ユーザー一覧ページ。" />
      </Head>

      <Header />
      <main>
        <p>{data}</p>
      </main>
    </div>
  )
}

export default Home
