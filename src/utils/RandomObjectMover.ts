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
    return Math.sqrt(dx * dx + dy * dy);
  }

  calcRandomVector(w: number, h: number) {
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
    };
  }

  // Return the angle from the center point of the object to where we are going
  calcRotation(next: Vector) {
    const { top, left, width, height } = this.objectContainer.getClientRects()[0];
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    return Math.atan2(next.x - centerX, -(next.y - centerY)) * (180 / Math.PI);
  }

  calcSpeed(delta: number) {
    return Math.round((delta / this.pixelsPerSecond) * 100) / 100;
  }

  calcWindowSize() {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    };
  }

  generateNewPosition() {
    const { height, width } = this.calcWindowSize();
    const totalWidth = width - this.object.clientWidth;
    const totalHeight = height - this.object.clientHeight;
    return this.calcRandomVector(totalWidth, totalHeight);
  }

  moveObject() {
    // Pick a new position and rotate towards it
    const next = this.generateNewPosition();
    this.setRotation(next);

    // Calculate motion
    const delta = this.calcDelta(this.currentPosition, next);
    const speed = this.calcSpeed(delta);

    // CSS transition
    this.styleMovement(speed, next);

    // Save this new position for the next call.
    this.currentPosition = next;
    this.isRunning = true;
  }

  setRotation(next: Vector) {
    const angle = this.calcRotation(next);
    this.styleRotation(angle);
  }

  // TODO: Change to requestAnimationFrame
  start() {
    if (this.isRunning) return;

    // Make sure our object has the right css set
    this.styleInitial();

    // Create animation loop
    this.boundEvent = this.moveObject.bind(this);
    this.objectContainer.addEventListener('transitionend', this.boundEvent);
    this.moveObject();
    this.isRunning = true;
  }

  stop() {
    if (!this.isRunning) return;

    // Remove animation loop
    this.objectContainer.removeEventListener('transitionend', this.boundEvent);
    this.isRunning = false;
  }

  styleInitial() {
    Object.assign(this.objectContainer.style, {
      pointerEvents: 'auto',
      willChange: 'transform',
    });
  }

  styleMovement(speed: number, next: Vector) {
    Object.assign(this.objectContainer.style, {
      transition: `transform ${speed}s linear`,
      transform: `translate3d(${next.x}px, ${next.y}px, 0)`,
    });
  }

  styleRotation(angle: number) {
    this.object.style.transform = `rotate(${angle}deg)`;
  }
}

export default RandomObjectMover;
