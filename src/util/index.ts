const calcWindowSize = () => {
  return {
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  };
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getStartingPosition = (objHeight: number, objWidth: number, scale: string) => {
  const { height: winHeight, width: winWidth } = calcWindowSize();
  const randomSide = randomIntFromInterval(1, 4);
  const randomX = randomIntFromInterval(0, winWidth);
  const randomY = randomIntFromInterval(0, winHeight);

  // [null, top, right, bottom, left]
  const sidePosition = [
    {},
    { transform: `translate3d(${randomX}px, ${-1.3 * objHeight}px, 0) ${scale}` },
    { transform: `translate3d(${winWidth + 0.3 * objWidth}px, ${randomY}px, 0) ${scale}` },
    { transform: `translate3d(${randomX}px, ${winHeight + 0.3 * objHeight}px, 0) ${scale}` },
    { transform: `translate3d(${-1.3 * objWidth}px, ${randomY}px, 0) ${scale}` },
  ];
  return sidePosition[randomSide];
};

export { calcWindowSize, getStartingPosition, randomIntFromInterval };
