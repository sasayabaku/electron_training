
const fs = require('fs');
const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let inputTxt = null;
let footerArea = null;

let currentPath = null;
let editor = null;

window.addEventListener('DOMContentLoaded', onLoad);


function onLoad() {
  // 入力関連領域
  inputArea = document.getElementById('input_area');
  // 入力領域
  inputTxt = document.getElementById('input_txt');
  // フッター領域
  footerArea = document.getElementById('footer_fixed');

  editor = ace.edit('input_txt');
  editor.getSession().setMode('ace/mode/javascript');
  editor.setTheme('ace/theme/twilight');

  //ドラッグ&ドロップ関連処理
  //イベントの伝搬を止めて，アプリのHTMLとファイルが差し替わらないようにする
  document.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  document.addEventListener('drop', (event) => {
    event.preventDefault();
  });

  // 入力部分の処理
  inputArea.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  inputArea.addEventListener('dragleave', (event) => {
    event.preventDefault();
  });
  inputArea.addEventListener('dragend', (event) => {
    event.preventDefault();
  });
  inputArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    readFile(file.path);
  });

  // "読み込む"ボタンの制御
  document.querySelector('#btnLoad').addEventListener('click', () => {
    openLoadFile();
  });
  // "保存する"ボタンの制御
  document.querySelector('#btnSave').addEventListener('click', () => {
    openLoadFile();
  });
};

// ファイルを開く

function openLoadFile() {
  const win = BrowserWindow.getFocusedWindow();

  dialog.showOpenDialog(
    win,
    // どんなダイアログを出すかを指定するプロパティ
    {
      properties: ['openFile'],
      filters: [
        {
          name: 'Documents',
          extensions: ['txt', 'text', 'html', 'js']
        }
      ]
    },
    // "ファイル選択"ダイアログが閉じられたあとのコールバック関数
    (fileNames) => {
      if (fileNames) {
        readFile(fileNames[0]);
      }
    });
}

// ファイルを保存
function saveFile() {

  //初期の入力エリアに設定されたテキストを保存しようとしたときは新規ファイルを作成する
  if (currentPath === '') {
    saveNewFile();
    return;
  }

  const win = BrowserWindow.getFocusedWindow();

  dialog.showMessageBox(win, {
    title: 'ファイルの上書き保存を行います．',
    type: 'info',
    buttons: ['OK', 'Cancel'],
    detail: '本当に保存しますか?'
  },
  //メッセージボックスが閉じられた後のコールバック関数
  (response) => {
    // OKボタン(ボタン配列の0番目がOK)
    if (response === 0) {
      const data = editor.getValue();
      writeFile(currentPath, data);
    }
  }
);
}

// ファイルを書き込む
function writeFile(path, data) {
  fs.writeFile(path, data, (error) => {
    if (error != null) {
      alert('error: ' + error);
    }
  });
}

// 新規ファイルの保存

function saveNewFile() {

  const win = BrowserWindow.getFocusedWindow();
  dialog.showSaveDialog(
    win,
    // どんなダイアログを出すかを指定するプロパティ
    {
      properties: ['openFile'],
      filters: [
        {
          name: 'Documents',
          extensions: ['txt', 'text', 'html', 'js']
        }
      ]
    },

    // セーブ用ダイアログが閉じられた後のコールバック関数
    (fileName) => {
      if (fileName) {
        const data = editor.getValue();
        currentPath = fileName;
        writeFile(currentPath, data);
      }
    }
);
}
