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
  objectContainer: HTMLDivElement;
  pixelsPerSecond: number;

  constructor(obj: HTMLImageElement, objContainer: HTMLDivElement, speed = 250) {
    this.boundEvent = () => {};
    this.currentPosition = { x: 0, y: 0 };
    this.isRunning = false;
    this.nextPosition = { x: 0, y: 0 };
    this.object = obj;
    this.objectContainer = objContainer;
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
    this.rotate(next);

    // How far do we have to move?
    const delta = this.calcDelta(this.currentPosition, next);

    // Speed of this transition, rounded to 2DP
    const speed = Math.round((delta / this.pixelsPerSecond) * 100) / 100;

    this.objectContainer.style.transition = `transform ${speed}s linear`;
    this.objectContainer.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
    // this.object.style.transform = `rotate(${degree}deg)`;

    // Save this new position ready for the next call.
    this.currentPosition = next;
    this.isRunning = true;
  }

  // TODO: give this a better name
  rotate(next: Vector) {
    // this.object.style.transform = `rotate(${0}deg)`;
    const { top, left, width, height } = this.objectContainer.getClientRects()[0];
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const angle = Math.atan2(next.x - centerX, -(next.y - centerY)) * (180 / Math.PI);
    // const radians = Math.atan2(centerX - next.x, centerY - next.y);
    // const radians = Math.atan2(next.x - centerX, next.y - this.currentPosition.y);
    // Math.atan2(mouse_x - center_x, mouse_y - center_y);
    // const degree = radians * (180 / Math.PI) * -1 + 100;
    // let degree = radians * (180 / Math.PI) - 180;
    // if (degree < 0) degree = 360 + degree;

    // let final = degree;
    // if (final >= 180) final -= 160;
    // if (final < 180) final += 160;

    // let final = degree
    // if (final >= 90 && final <= 180 ) final -=
    // this.object.style.transition = `transform 0.01s linear`;
    // const angle =
    //   Math.atan2(next.y, next.x) - Math.atan2(this.currentPosition.y, this.currentPosition.x);
    // const degree = angle * (180 / Math.PI) + 180;
    // this.object.style.transform = `rotate(${degree}deg)`;

    // start, target
    // const angle = () => {
    //   const dy = next.y - this.currentPosition.y;
    //   const dx = next.x - this.currentPosition.x;
    //   let theta = Math.atan2(dy, dx); // range (-PI, PI]
    //   theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //   return theta;
    // };

    // const angle360 = () => {
    //   let theta = angle(); // range (-180, 180]
    //   if (theta < 0) theta = 360 + theta; // range [0, 360)
    //   // if (theta <= 180) theta += 180;
    //   // if (theta >= 180) theta -= 180;
    //   return theta;
    // };
    console.log('rotating to', angle);
    this.object.style.transform = `rotate(${angle}deg)`;
    // return degree;
  }

  setSpeed(pxPerSec: number) {
    this.pixelsPerSecond = pxPerSec;
  }

  start() {
    if (this.isRunning) return;

    // Make sure our object has the right css set
    this.objectContainer.style.willChange = 'transform';
    this.objectContainer.style.pointerEvents = 'auto';

    this.boundEvent = this.moveOnce.bind(this);

    // Bind callback to keep things moving
    this.objectContainer.addEventListener('transitionend', this.boundEvent);

    this.moveOnce();
    this.isRunning = true;
  }

  stop() {
    // if (!this.isRunning) return;

    this.objectContainer.removeEventListener('transitionend', this.boundEvent);
    // this.isRunning = false;
  }
}

export default RandomObjectMover;
