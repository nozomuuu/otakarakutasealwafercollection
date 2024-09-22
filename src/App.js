import React, { useState } from "react";
import "./App.css";
import waferImage from "./images/wafer.png";
import sticker1 from "./images/sticker1.png";
import sticker2 from "./images/sticker2.png";
import sticker3 from "./images/sticker3.png";

const App = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentSticker, setCurrentSticker] = useState(null);
  const [remainingPacks, setRemainingPacks] = useState(5);
  const stickers = [sticker1, sticker2, sticker3]; // ここにシールの画像を追加

  const openWafer = () => {
    if (remainingPacks > 0) {
      setIsOpened(true);
      const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
      setCurrentSticker(randomSticker);
      setRemainingPacks(remainingPacks - 1);
    }
  };

  const reset = () => {
    setIsOpened(false);
    setCurrentSticker(null);
  };

  return (
    <div className="app">
      <div className="header">
        今日のウエハースを開けよう！
      </div>
      <div className="remaining-packs">
        残りパック数: {remainingPacks}
      </div>
      <div className="wafer-container">
        {!isOpened && (
          <>
            <img src={waferImage} alt="ウエハース" className="wafer" />
            <button onClick={openWafer}>ウエハースを開ける</button>
          </>
        )}
        {isOpened && currentSticker && (
          <div className="sticker-container">
            <img src={currentSticker} alt="シール" className="sticker show" />
            <button onClick={reset}>手に入れたシールを見る</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
