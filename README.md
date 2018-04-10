# electron_training
electron_training

Electronの練習用リポジトリ
各ディレクトリがそれぞれのアプリになっている
開発環境はMacです．
ソースコードのみなので，各自でパッケージングしてください．


# アプリ作成方法

```bash
$ npm i -D electron
$ npx electron-packager src Eye --platform=darwin --overwrite
```

## PythonApp
"Hello,Electron"を出力するだけの簡単アプリ
