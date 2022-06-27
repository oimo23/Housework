import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  // TODO:テーマ設定を行います
  // Primaryカラーを設定
  palette: {
    primary: {
      light: '#FFE750',
      main: '#FEDB00',
      dark: '#EFCE00',
      contrastText: '#000000',
    },
    background: {
      default: '#23272A',
    },
    text: { primary: '#fff' },
    mode: 'dark',
  },
})

export default theme
