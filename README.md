## 環境など

```
node v16.13.2
yarn 1.22.4
エディタ VSCode
```

### VSCode の推奨設定

・ESLint  
・Prettier  

上記の Plugin をインストールし、以下の設定をすると保存時自動でコード整形されます
https://ralacode.com/blog/post/vscode-prettier/

```
クオート：シングルクオーテーション
インデント：スペース2つ
セミコロン：なし
```


## 始め方
### 初回 / パッケージに更新があった時
```bash
yarn install
```

### 開発サーバー起動
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) を開く


## デプロイ先
https://presto-frontend.vercel.app/
