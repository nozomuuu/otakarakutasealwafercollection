import React from 'react';
import { Link } from 'react-router-dom';

function StickersPage() {
  return (
    <div>
      <h1>手に入れたシール一覧</h1>
      <p>ここにシール一覧が表示されます。</p>
      <Link to="/">ホームに戻る</Link>
    </div>
  );
}

export default StickersPage;
