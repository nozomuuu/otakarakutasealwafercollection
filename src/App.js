import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [remainingPacks, setRemainingPacks] = useState(2);
  const [isStickerVisible, setStickerVisible] = useState(false);
  const [sticker, setSticker] = useState(null);
  const [waferOpen, setWaferOpen] = useState(false);

  // シールをランダムに選択
  const pickRandomSticker = useCallback(() => {
    const totalStickers = 50;
    const randomNumber = Math.floor(Math.random() * totalStickers) + 1;
    return `/images/${randomNumber}.jpg`;
  }, []);

  // 残りパック数を更新
  const updateRemainingPacks = useCallback(() => {
    setRemainingPacks((prevPacks) => prevPacks - 1);
  }, []);

  // ウエハースを開ける
  const openWafer = useCallback(() => {
    if (remainingPacks > 0) {
      updateRemainingPacks();
      setSticker(pickRandomSticker());
      setStickerVisible(false); // シールを一旦非表示
      setWaferOpen(true); // ウエハースが開いた状態
      const audio = new Audio('/sounds/wafer-open.mp3');
      audio.play();

      setTimeout(() => {
        setStickerVisible(true); // シールを1秒後に表示
        const stickerAudio = new Audio('/sounds/sticker-reveal.mp3');
        stickerAudio.play(); // シール登場後にSEを再生
      }, 2000); // 2秒後にシールが表示され、SEが再生される
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール一覧ページに遷移
  const viewStickers = useCallback(() => {
    window.location.href = '/stickers'; // シール一覧ページへ遷移
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem', whiteSpace: 'nowrap', padding: '10px' }}>
        今日のウエハースを開けよう！
      </h1>
      <p style={{ textAlign: 'center' }}>（残りパック数: {remainingPacks}）</p>

      <img 
        src="/images/wafer.png" 
        alt="ウエハース" 
        className={`wafer ${waferOpen ? 'open' : ''}`} // ウエハースが開いた状態を反映
        style={{ display: 'block', margin: '20px auto', maxWidth: '200px', cursor: 'pointer' }}
        onClick={openWafer}
      />

      <button onClick={openWafer} style={{ display: 'block', margin: '20px auto' }}>
        ウエハースを開ける
      </button>

      {isStickerVisible && sticker && (
        <div className="sticker-container">
          <img 
            src={sticker} 
            alt="Sticker" 
            className="sticker"
            style={{ display: 'block', margin: '0 auto', maxWidth: '300px' }} 
          />
        </div>
      )}

      <button onClick={viewStickers} style={{ display: 'block', margin: '20px auto' }}>
        手に入れたシール一覧を見る
      </button>
    </div>
  );
}

export default App;
