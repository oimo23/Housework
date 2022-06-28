// import axios, { AxiosResponse } from 'axios'
import axios, { AxiosResponse } from 'axios'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'

import Header from '../components/templates/Header'
import styles from '../styles/Home.module.scss'
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月'],
  datasets: [
    {
      label: 'Dataset',
      // データの値
      data: [65, 59, 80, 81, 56, 55, 40],
      // グラフの背景色
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
  ],
}

const doughnutOptions: any = {
  plugins: {
    doughnutlabel: {
      labels: [
        {
          text: 'ITEMS',
          color: '#666666',
          font: {
            size: 30,
          },
        },
        {
          text: 'TEST',
          color: '#888888',
        },
      ],
    },
  },
};

const Home: NextPage = () => {
  const [yukiData, setYukiData] = useState<any>()
  const [rinData, setRinData] = useState<any>()
  const [breakFast, setBreakFast] = useState<any>()

  useEffect(() => {
    ;(async function () {
      try {
        const response: AxiosResponse<any> = await axios.get(
          `https://script.google.com/macros/s/AKfycbzHlX1OUKnGlVjrKgaFHPQgxRZFTU5IQRhVX-UGgRvplS8FYzeHtVeuZtxPSf8Bp5E/exec`,
          { crossDomain: true }
          )
        setYukiData(response.data[0])
        setRinData(response.data[1])
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  useEffect(() => {
    const {breakFast} = aggrigate(yukiData, rinData)
    setBreakFast(breakFast)
    console.info(breakFast) 
  }, [rinData])

  // const yukiDataList = yukiData ? yukiData.map((d) => (
  //   <li key={d.date}>
  //     {d.date}
  //   </li>
  // )) : null

  const doughnutData1 = {
    datasets: [
      {
        data: [breakFast?.yuki, breakFast?.rin],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)']
      }
    ],
    labels: ['YUKI', 'RIN'],
  }
  

  return (
    <div className={styles.container}>
      {/* こんな感じでページごとのtitleなど設定できる */}
      <Head>
        <title>ユーザー一覧</title>
        <meta name="description" content="ユーザー一覧ページ。" />
      </Head>

      <Header />
      <main>
        <div>
          <h3 className="text-center">朝ごはん</h3>
          <Doughnut data={doughnutData1} options={doughnutOptions}/>
        </div>
        <Bar data={chartData} />
      </main>
    </div>
  )
}

const aggrigate = (yukiData: any, rinData: any) => {
  const breakFast = {
    yuki: 0,
    rin: 0
  }

  if (!yukiData) return {breakFast}

  console.info(yukiData)
  console.info(rinData)

  for(const dailyData of yukiData) {
    if (dailyData.breakFast === '○') {
      breakFast.yuki++
    }
  }

  for(const dailyData of rinData) {
    if (dailyData.breakFast === '○') {
      breakFast.rin++
    }
  }

  console.info(breakFast)

  // 朝ごはんの100分率
  // const breakFastTotal = breakFast.yuki + breakFast.rin
  // breakFast.yuki = Math.floor(breakFast.yuki / breakFastTotal) * 100
  // breakFast.rin  = 100 - breakFast.yuki

  return {breakFast}
}

export default Home
