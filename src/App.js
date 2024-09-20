import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// Stickersコンポーネントの定義
function Stickers({ ownedStickers }) {
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleStickerClick = (index) => {
    if (selectedSticker === index) {
      // 拡大中のシールを元に戻す
      setSelectedSticker(null);
    } else {
      // クリックされたシールを拡大
      setSelectedSticker(index);
    }
  };

  const handleOutsideClick = () => {
    setSelectedSticker(null); // 画像以外の場所をクリックで拡大解除
  };

  // コレクション率の計算
  const totalStickers = 50; // 全シール数
  const uniqueStickers = ownedStickers.length; // 所持しているシールの種類数
  const collectionRate = ((uniqueStickers / totalStickers) * 100).toFixed(2); // コレクション率

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <h1>手に入れたシール一覧</h1>
      <p>コレクション率: {collectionRate}%</p> {/* コレクション率を表示 */}

      {selectedSticker !== null && (
        <div className="sticker-expanded-background" onClick={handleOutsideClick}></div>
      )}

      <div className="sticker-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {ownedStickers.map((sticker, index) => (
          <div
            key={index}
            className={selectedSticker === index ? 'sticker-expanded' : 'sticker-item'}
            style={{
              cursor: 'pointer',
              zIndex: selectedSticker === index ? 10 : 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleStickerClick(index);
            }}
          >
            <img
              src={sticker.image}
              alt={sticker.name}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}  // シールの画像を大きくする
            />
            <p style={{ fontSize: selectedSticker === index ? '0.8rem' : '0.7rem' }}>
              {sticker.name} ({sticker.rarity}) ×{sticker.count}
            </p>
          </div>
        ))}
      </div>

      <Link to="/">
        <button style={{ marginTop: '20px' }}>戻る</button>
      </Link>
    </div>
  );
}

// Homeコンポーネントの定義
function Home({ openWafer, sticker, packsOpenedToday, maxPacksPerDay }) {
  const [isWaferOpened, setIsWaferOpened] = useState(false);
  const [showSticker, setShowSticker] = useState(false);

  const waferOpenSound = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/wafer-open.mp3`)); // SEファイルのパスを修正
  const viewStickersSound = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/view-stickers.mp3`)); // シール一覧ボタンを押した際のSE

  const handleOpenWafer = () => {
    if (waferOpenSound.current) {
      waferOpenSound.current.play(); // ウエハースを開封する際のSEを再生
    }

    setIsWaferOpened(true);
    setTimeout(() => {
      setShowSticker(true);
      openWafer();
    }, 1000);
  };

  const navigate = useNavigate();
  const handleViewStickersClick = () => {
    if (viewStickersSound.current) {
      viewStickersSound.current.play(); // シール一覧ページに遷移する際のSEを再生
    }

    setTimeout(() => {
      navigate('/stickers');
    }, 500); // 少し遅れて遷移する
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative', height: '800px' }}>
      <h1>今日のウエハースを開けよう！（残り {Math.max(maxPacksPerDay - packsOpenedToday, 0)} パック）</h1>
      <button onClick={handleOpenWafer} disabled={packsOpenedToday >= maxPacksPerDay}>
        ウエハースを開ける
      </button>

      <div className={`wafer ${isWaferOpened ? 'open' : ''}`} style={{ margin: '50px auto', perspective: '1000px' }}>
        <img src={`${process.env.PUBLIC_URL}/images/1159.jpg`} alt="ウエハース" style={{ width: 'auto', height: 'auto', maxWidth: '500px', maxHeight: '500px' }} />
      </div>

      {showSticker && sticker && (
        <div
          className={`sticker ${showSticker ? 'show' : ''}`}
          style={{ position: 'absolute', bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <img src={sticker.image} alt={sticker.name} style={{ width: '300px', height: 'auto', objectFit: 'cover' }} />
          <p style={{ textAlign: 'center' }}>{sticker.rarity}</p>
        </div>
      )}

      <button
        style={{
          marginTop: '20px',
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onClick={handleViewStickersClick}
      >
        手に入れたシール一覧を見る
      </button> {/* シール一覧を見るボタンの表示 */}
    </div>
  );
}

// Appコンポーネントの定義
function App() {
  const [sticker, setSticker] = useState(null);
  const [ownedStickers, setOwnedStickers] = useState([]);
  const [packsOpenedToday, setPacksOpenedToday] = useState(0);
  const maxPacksPerDay = 2;

  useEffect(() => {
    const savedStickers = JSON.parse(localStorage.getItem('ownedStickers')) || [];
    setOwnedStickers(savedStickers);
  }, []);

  const openWafer = () => {
    const randomSticker = getRandomSticker();

    if (!randomSticker) return;

    const newOwnedStickers = [...ownedStickers];
    const existingSticker = newOwnedStickers.find(s => s.name === randomSticker.name);
    if (existingSticker) {
      existingSticker.count += 1;
    } else {
      newOwnedStickers.push({ ...randomSticker, count: 1 });
    }

    setOwnedStickers(newOwnedStickers);
    localStorage.setItem('ownedStickers', JSON.stringify(newOwnedStickers));

    setSticker(randomSticker);
    const newPacksOpenedToday = packsOpenedToday + 1;
    setPacksOpenedToday(newPacksOpenedToday);
    localStorage.setItem('packsOpenedToday', newPacksOpenedToday);
  };

  const getRandomSticker = () => {
    const availableStickers = Array.from({ length: 50 }, (v, i) => ({
      name: `シール${i + 1}`,
      rarity: (i + 1) % 3 === 0 ? "★★★" : (i + 1) % 2 === 0 ? "★★" : "★",
      image: `/images/${i + 1}.jpg`
    }));

    const randomNum = Math.random() * 100;

    if (randomNum <= 70) {
      return availableStickers.find(sticker => sticker.rarity === "★");
    } else if (randomNum <= 95) {
      return availableStickers.find(sticker => sticker.rarity === "★★");
    } else {
      return availableStickers.find(sticker => sticker.rarity === "★★★");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home openWafer={openWafer} sticker={sticker} packsOpenedToday={packsOpenedToday} maxPacksPerDay={maxPacksPerDay} />}
        />
        <Route path="/stickers" element={<Stickers ownedStickers={ownedStickers} />} />
      </Routes>
    </Router>
  );
}

export default App;
