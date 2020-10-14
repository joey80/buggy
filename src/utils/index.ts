const isNearEdge = (bug: HTMLElement) => {
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;
  const { top, right, bottom, left, width, height } = bug.getClientRects()[0];
  const pos = [];

  if (top <= height) pos.push('top');
  if (bottom >= clientHeight - height) pos.push('bottom');
  if (left <= width) pos.push('left');
  if (right >= clientWidth - width) pos.push('right');

  return pos.join('_');
};

export { isNearEdge };
