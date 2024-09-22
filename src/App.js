import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [remainingPacks, setRemainingPacks] = useState(2); // 1日に引けるパック数を2に設定
  const [isStickerVisible, setStickerVisible] = useState(false);
  const [sticker, setSticker] = useState(null);
  const [isWaferOpen, setWaferOpen] = useState(false); // ウエハースが開かれたかどうかの状態

  // シールのランダム選択
  const pickRandomSticker = useCallback(() => {
    const totalStickers = 50; // シールの総数
    const randomNumber = Math.floor(Math.random() * totalStickers) + 1;
    return `/images/${randomNumber}.jpg`; // シール画像のパス
  }, []);

  // 残りパック数の更新
  const updateRemainingPacks = useCallback(() => {
    setRemainingPacks((prevPacks) => prevPacks - 1);
  }, []);

  // ウエハースを開ける
  const openWafer = useCallback(() => {
    if (remainingPacks > 0) {
      updateRemainingPacks();
      setSticker(pickRandomSticker());
      setWaferOpen(true); // ウエハースを開ける
      setStickerVisible(false); // 初期状態でシール非表示

      // ウエハースを開けるSE
      const audioWafer = new Audio('/sounds/wafer-open.mp3');
      audioWafer.play();

      // 1秒後にシールを表示し、SEを再生
      setTimeout(() => {
        setStickerVisible(true);
        const audioSticker = new Audio('/sounds/sticker-reveal.mp3');
        audioSticker.play(); // シールが表示された後にSEを再生
      }, 1000); // シールの表示を1秒遅らせる
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール一覧を開く
  const viewStickers = useCallback(() => {
    // シール一覧ページへの遷移（React Router の Link などに置き換える）
    window.location.href = '/stickers'; // 実際のURLに変更してください
  }, []);

  return (
    <div className="App">
      <h1 className="header">今日のウエハースを開けよう！</h1>
      <p className="remaining-packs">（残りパック数: {remainingPacks}）</p>

      <img
        src="/images/wafer.png"
        alt="ウエハース"
        className={`wafer ${isWaferOpen ? 'open' : ''}`} // ウエハースが開かれたときにアニメーションを実行
      />

      <button onClick={openWafer} className="open-wafer-button">
        ウエハースを開ける
      </button>

      {isStickerVisible && sticker && (
        <div className="sticker-container">
          <img 
            src={sticker} 
            alt="Sticker" 
            className="sticker show" 
          />
        </div>
      )}

      <button onClick={viewStickers} className="back-button">
        手に入れたシール一覧を見る
      </button>
    </div>
  );
}

export default App;
