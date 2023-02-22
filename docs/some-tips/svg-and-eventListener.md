# 針對 icon 進行設定，卻無法得到我要的結果？

這是我剛學 React 沒多久後所犯的一個錯誤，是過去採過的一個小坑

當時我的我進入到了 React 框架，並且想要做一組切換紐，根據我點的按鈕顯示帶入不同的資料做顯示

原本的構想是這樣的：

1. 載入外部的 icon 圖
2. 在每個 icon 上設置屬性區分
3. 撰寫函式，在抓取點擊對象的屬性後，根據內容執行不同任務
4. 將函式設置在每個 icon 當中

看起來是相當單純的流程，沒想到在實際寫完之後，卻注意到了不太對勁

當實際在 icon 上進行點擊時，可以發現出現的效果時有時無，讓人摸不著頭緒

看到這裡，稍微有點經驗的人應該已經察覺到了

沒錯，icon 圖的格式就是 SVG，一切都是它惹的禍

## 實際情況

讓我們實際處理看看

首先這裡只帶入一個 icon，並看一下 React 的程式碼效果：

```jsx title="src/App.js"
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
  const handleClick = (e) => {
    console.log(e.target);
  };

  return (
    <div>
      <GiHamburgerMenu onClick={handleClick} />
    </div>
  );
}

export default App;
```

說明一下程式碼

我使用了 `react-icons` 這個套件匯入常見的 Hamburger Menu 這個 icon

我們在上面設置事件監聽，並讓使用者按下 icon 後印出動作對象，這樣就行了

那麼接下來可以嘗試看看，當使用者重複按下 icon 好幾次時可以注意到，明明只有那個按下那個 icon，卻會冒出 2 種結果

一個是 path，另一個是 svg

之所以發生這種事，是因為 path 本身就是 SVG 的一部分

如果想確認，只需要點開 svg 就可以明白了

這樣看下來，之前的錯誤就佷明顯了

原本所設置的函式會印出點擊的對象，而我們所點擊到的對象因為滑鼠位置的關係，剛好是 svg 這個標籤中的 path

這種情況其實佷常見，例如下方的程式碼就是一例：

```jsx title="src/App.js"
function App() {
  const handleClick = (e) => {
    console.log(e.target);
  };

  return (
    <div>
      <button onClick={handleClick}>
        <span>span in button</span>
      </button>
    </div>
  );
}

export default App;
```

實際下去測試，可以發現結果和剛剛一樣，會因為滑鼠點擊的位置而產生不同的結果（button 和 span）

因為我們設置的事件監聽剛好在父元素，因此子元素也同樣會有影響（畢竟包在裡面，對吧？）

可以思考看看，假如你按到了子元素，那是不是也等同於按到了它上層的父元素呢？

在這方面，有一個專有的名詞，叫做「**冒泡事件 (Event Bubbling)**」

有興趣可以去瞭解一下，這裡就先不多做說明了

## 如何處理？

回到剛剛 icon 的問題，如果使用者每次按都可能按到其他部位，那我該怎麼針對每個 icon 做設定？

這裡提供一個簡單的方法：

```jsx title="src/App.js"
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
  const handleClick = (e) => {
    console.log(e.target);
  };

  return (
    <div>
      <button onClick={handleClick}>
        <GiHamburgerMenu style={{ pointerEvents: "none" }} />
      </button>
    </div>
  );
}

export default App;
```

上方的程式碼稍微只是稍微做了些更動

1. 首先將 icon 先使用 button 包起
2. 在 icon 中使用 CSS 的 `pointer-events` 這個屬性，將它調整成 `none` 。這麼做可以避免任何跟 icon 有關的點擊事件

如此一來，即便你怎麼按，你所按到的也只會是父元素的 button

接下來如果要進行設定，只要設定在 button 上就沒問題了～
