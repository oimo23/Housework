import https from 'https'
import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

// ファイルのアップロードなどでmultipart/form-dataを使用するときの設定
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const proxy = httpProxyMiddleware(req, res, {
    target: 'https://script.google.com/macros/s/',
    changeOrigin: true,
    headers: {},
    pathRewrite: {
      '^/api/proxy': '',
    },
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  })
  // return しないと "API resolved without sending a response~"といわれるので
  return proxy
}
