// 建立 XHR 物件
const xhr = new XMLHttpRequest();

// 設定請求
xhr.open(method/* "GET", "POST", "PUT", "DELETE", etc. */, url, async /*optional*/ );

// 設定發出的請求的表頭
// 會在 open 之後使用
xhr.setRequestHeader(header, value);

// 發送請求
xhr.send(payload);

// onload 當資料確定有回傳了，則開始執行以下function
xhr.onload = function() {
    // do whatever you want
}

// 監聽事件
xhr.addEventListener("progress", updateProgress);
xhr.addEventListener("load", transferComplete);
xhr.addEventListener("error", transferFailed);
xhr.addEventListener("abort", transferCanceled);