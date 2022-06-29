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
import dayjs from 'dayjs';
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
    legend: {
      labels: {
        color: 'rgb(255, 255, 255)'
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          return data.labels[tooltipItem.index]
            + ": "
            + data.datasets[0].data[tooltipItem.index]
            + " 回"; //ここで単位を付けます
        }
      }
    }
  },
};

const Home: NextPage = () => {
  const [yukiData, setYukiData] = useState<any>()
  const [rinData, setRinData] = useState<any>()
  const [result, setResult] = useState<any>()

  useEffect(() => {
    ;(async function () {
      try {
        const now = dayjs()
        const year = now.format('YYYY')
        const month = now.format('MM')
        const params = {
          yearMonth: year + '/' + Number(month)
        }
        const response: AxiosResponse<any> = await axios.get(
          `https://script.google.com/macros/s/AKfycbxV1fG8Sdt4SEABMV8CndDcYZWHJ8ofkfE-rsLwYn8_8f_wT9Y3_7pJ-4uBCPvmRfIs/exec`,
          { params }
          )
        setYukiData(response.data[0])
        setRinData(response.data[1])
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  useEffect(() => {
    const {result} = aggrigate(yukiData, rinData)
    setResult(result)
  }, [rinData])

  // const yukiDataList = yukiData ? yukiData.map((d) => (
  //   <li key={d.date}>
  //     {d.date}
  //   </li>
  // )) : null

  const breakFastData = doughnutChartDataMaker(result, 'breakFast')
  const breakFastCleanData = doughnutChartDataMaker(result, 'breakFastClean')
  const lunchData = doughnutChartDataMaker(result, 'lunch')
  const lunchCleanData = doughnutChartDataMaker(result, 'lunchClean')
  const dinnerData = doughnutChartDataMaker(result, 'dinner')
  const dinnerCleanData = doughnutChartDataMaker(result, 'dinnerClean')
  const roomCleanData = doughnutChartDataMaker(result, 'roomClean')
  const laundryStartData = doughnutChartDataMaker(result, 'laundryStart')
  const laundryDryingData = doughnutChartDataMaker(result, 'laundryDrying')
  

  return (
    <div className={styles.container}>
      {/* こんな感じでページごとのtitleなど設定できる */}
      <Head>
        <title>家事ウォッチング</title>
        <meta name="description" content="家事の実績を可視化出来ます。" />
      </Head>

      <Header />
      <main>
        <div className="text-center">{dayjs().format('YYYY年MM')}月</div>
        <div className="mt-10">
          <h3 className="text-center">朝ごはん</h3>
          <Doughnut data={breakFastData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">朝ごはん片付け</h3>
          <Doughnut data={breakFastCleanData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">昼ごはん</h3>
          <Doughnut data={lunchData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">昼ごはん片付け</h3>
          <Doughnut data={lunchCleanData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">夜ごはん</h3>
          <Doughnut data={dinnerData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">夜ごはん片付け</h3>
          <Doughnut data={dinnerCleanData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">部屋掃除</h3>
          <Doughnut data={roomCleanData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">洗濯物回し</h3>
          <Doughnut data={laundryStartData} options={doughnutOptions}/>
        </div>
        <div className="mt-10">
          <h3 className="text-center">洗濯物干し</h3>
          <Doughnut data={laundryDryingData} options={doughnutOptions}/>
        </div>
        {false &&
          <Bar data={chartData} />
        }
      </main>
    </div>
  )
}

const aggrigate = (yukiData: any, rinData: any) => {
  interface houseWorkCount {
    [key: string]: number
  }

  interface houseWorkMember {
    [key: string]: houseWorkCount
  }

  const result: houseWorkMember = {
    yuki: {
      breakFast: 0,
      breakFastClean: 0,
      lunch: 0,
      lunchClean: 0,
      dinner: 0,
      dinnerClean: 0,
      roomClean: 0,
      laundryStart: 0,
      laundryDrying: 0
    },
    rin: {
      breakFast: 0,
      breakFastClean: 0,
      lunch: 0,
      lunchClean: 0,
      dinner: 0,
      dinnerClean: 0,
      roomClean: 0,
      laundryStart: 0,
      laundryDrying: 0
    }
  }

  const houseworkNames = [
    'breakFast',
    'breakFastClean',
    'lunch',
    'lunchClean',
    'dinner',
    'dinnerClean',
    'roomClean',
    'laundryStart',
    'laundryDrying'
  ]

  if (!yukiData) return {result}

  console.info(yukiData)

  for(const dailyData of yukiData) {
    for(const houseworkName of houseworkNames) {
      if (dailyData[houseworkName] === '○') {
        result.yuki[houseworkName]++
      }
    }
  }

  for(const dailyData of rinData) {
    for(const houseworkName of houseworkNames) {
      if (dailyData[houseworkName] === '○') {
        result.rin[houseworkName]++
      }
    }
  }

  console.info(result)

  return {result}
}

const doughnutChartDataMaker = (result: any, houseworkName: string) => {
  const data = {
    datasets: [
      {
        data: [result?.yuki[houseworkName], result?.rin[houseworkName]],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)']
      }
    ],
    labels: ['YUKI', 'RIN'],
  }

  return data
}

export default Home
