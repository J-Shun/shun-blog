# 使用 Web Crypto API 直接創造 UUID

## 什麼是 UUID？

這裡附上一段維基百科的說明：

通用唯一辨識碼（英語：Universally Unique Identifier，縮寫：UUID）是用於電腦體系中以辨識資訊的一個 128 位元識別碼。

UUID 按照標準方法生成時，在實際應用中具有唯一性，且不依賴中央機構的註冊和分配。UUID 重複的概率接近零，可以忽略不計。

雖然看下來有點文謅謅的，但目前只要注意到幾個重點就行：「**具有唯一性**」、「**重複的概率接近零**」

這代表什麼呢？也就是說當我需要生成好幾筆專屬的 ID 標記我的資料時，我不用擔心這些 ID 會彼此有衝突

舉凡像是儲存在資料庫中的資料、React 的複數渲染等等，都會需要使用到不重複的值來對資料進行區分，應用到的範圍並不小

因此 UUID 是個相對不起眼卻又相當重要的存在

至於如果有人對「**接近**」於零的重複概率感到興趣，可以再去深入了解一下背後的演算法，至少以我目前的狀況來說，都是直接視為「**不會重複**」

## 創造 UUID 的方式

首先可以以先了解 UUID 的構造

UUID 由 32 個 16 進位的數字所組成，透過 '-' 分成五組，每組數量分別為「8-4-4-4-12」

有關產生出 UUID 的方式，之前有看過使用 `Math.random` 去生成的，也有看過直接使用套件 uuid 去生成的，算是各有好壞

而這次要使用的是，透過 `crypto` 來創造 UUID 的方式

整體程式碼相當簡單好用

```js
const uuid = crypto.randomUUID();
console.log(uuid);
```

這樣就行了

在以往創造 UUID 時，主要是直接使用 uuid 這項套件來進行處理

如今無需再另外下載套件，而是使用 crypto 就可以了

至於支援性的部份，可以參考 [Can I use...](https://caniuse.com/mdn-api_crypto_randomuuid) 的標示

## 參考

[如何用 JavaScript 產生 UUID / GUID？](https://www.cythilya.tw/2017/03/12/uuid/)

[通用唯一辨識碼- 維基百科](https://zh.wikipedia.org/zh-tw/%E9%80%9A%E7%94%A8%E5%94%AF%E4%B8%80%E8%AF%86%E5%88%AB%E7%A0%81)

[使用 JS 生成 UUID 的常用方法](https://juejin.cn/post/7066608015784280072)

[Crypto.randomUUID() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
