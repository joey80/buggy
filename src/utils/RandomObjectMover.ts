interface Vector {
  x: number;
  y: number;
}

class RandomObjectMover {
  boundEvent: (ev: TransitionEvent) => void;
  currentPosition: Vector;
  isRunning: boolean;
  nextPosition: Vector;
  object: HTMLImageElement;
  pixelsPerSecond: number;

  constructor(obj: HTMLImageElement, speed = 250) {
    this.boundEvent = () => {};
    this.currentPosition = { x: 0, y: 0 };
    this.isRunning = false;
    this.nextPosition = { x: 0, y: 0 };
    this.object = obj;
    this.pixelsPerSecond = speed;
  }

  calcDelta(a: Vector, b: Vector) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist;
  }

  generateNewPosition() {
    // Get container dimensions minus div size
    const containerSize = this.getContainerDimensions();
    const availableHeight = containerSize.height - this.object.clientHeight;
    const availableWidth = containerSize.width - this.object.clientWidth;

    // Pick a random place in the space
    const x = Math.floor(Math.random() * availableWidth);
    const y = Math.floor(Math.random() * availableHeight);

    console.log('newPos', { oldPos: this.currentPosition, newPos: { x, y } });
    return { x, y };
  }

  // TODO: needs a better name
  // window
  getContainerDimensions() {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    };
  }

  // TODO: Rotate a parent div of the bug??
  moveOnce() {
    // Pick a new spot on the page
    const next = this.generateNewPosition();

    // How far do we have to move?
    const delta = this.calcDelta(this.currentPosition, next);

    // Speed of this transition, rounded to 2DP
    const speed = Math.round((delta / this.pixelsPerSecond) * 100) / 100;

    this.object.style.transition = `transform ${speed}s linear`;
    this.object.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
    // this.object.style.transform = `rotate(${degree}deg)`;

    // Save this new position ready for the next call.
    this.currentPosition = next;
    this.isRunning = true;
  }

  // TODO: give this a better name
  rotate() {
    const { top, left, width, height } = this.object.getClientRects()[0];
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const radians = Math.atan2(this.nextPosition.x - centerX, this.nextPosition.y - centerY);
    // const degree = radians * (180 / Math.PI) * -1 + 100;
    const degree = radians * (180 / Math.PI);
    // this.object.style.transition = `transform 0.01s linear`;
    // this.object.style.transform = `rotate(${degree}deg)`;
    console.log('rotating to', degree);
    return degree;
  }

  setSpeed(pxPerSec: number) {
    this.pixelsPerSecond = pxPerSec;
  }

  start() {
    if (this.isRunning) return;

    // Make sure our object has the right css set
    this.object.style.willChange = 'transform';
    this.object.style.pointerEvents = 'auto';

    this.boundEvent = this.moveOnce.bind(this);

    // Bind callback to keep things moving
    this.object.addEventListener('transitionend', this.boundEvent);

    this.moveOnce();
    this.isRunning = true;
  }

  stop() {
    // if (!this.isRunning) return;

    this.object.removeEventListener('transitionend', this.boundEvent);
    // this.isRunning = false;
  }
}

export default RandomObjectMover;
