import React from 'react';

import TopBar from './TopBar';
import MenuBar from './MenuBar';

const style = {
  root: {
    display: 'flex',
  },
};

function Main() {
  return (
    <div className={style.root}>
      <TopBar />
      <MenuBar />
    </div>
  );
}

export default Main;
