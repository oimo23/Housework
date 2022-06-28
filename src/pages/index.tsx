// import axios, { AxiosResponse } from 'axios'
// import { Chart, registerables } from 'chart.js'
import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

// import { Bar } from 'react-chartjs-2'
import Header from '../components/templates/Header'
import styles from '../styles/Home.module.scss'

// const chartData = {
//   // x 軸のラベル
//   labels: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月'],
//   datasets: [
//     {
//       label: 'Dataset',
//       // データの値
//       data: [65, 59, 80, 81, 56, 55, 40],
//       // グラフの背景色
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 205, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(201, 203, 207, 0.2)',
//       ],
//       // グラフの枠線の色
//       borderColor: [
//         'rgb(255, 99, 132)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 205, 86)',
//         'rgb(75, 192, 192)',
//         'rgb(54, 162, 235)',
//         'rgb(153, 102, 255)',
//         'rgb(201, 203, 207)',
//       ],
//       // グラフの枠線の太さ
//       borderWidth: 1,
//     },
//   ],
// }

const Home: NextPage = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    ;(async function () {
      try {
        const response: AxiosResponse<any> = await axios.get(
          `https://script.google.com/macros/s/AKfycbxeb5KLPYAynSH1YeuQ8fkaKkZHpxJpF_xnkZevxFaVzF7ngSFy1a7rUKperYpMIZx0/exec`
        )
        setData(response.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  useEffect(() => {
    console.info(data) 
  }, [data])

  const dataList = data ? data.map((d) => (
    <li key={d.date}>
      {d.date}
    </li>
  )) : null

  return (
    <div className={styles.container}>
      {/* こんな感じでページごとのtitleなど設定できる */}
      <Head>
        <title>ユーザー一覧</title>
        <meta name="description" content="ユーザー一覧ページ。" />
      </Head>

      <Header />
      <main>
        <ul>{dataList}</ul>
        {/* <Bar data={chartData} /> */}
      </main>
    </div>
  )
}

export default Home
