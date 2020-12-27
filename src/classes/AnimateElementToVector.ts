interface Vector {
  x: number;
  y: number;
}

class AnimateElementToVector {
  private currentPosition: Vector;
  private isRunning: boolean;
  private obj: HTMLElement;
  private objContainer: HTMLElement;
  private pixelsPerSecond: number;

  constructor({
    obj,
    objContainer,
    speed,
  }: {
    obj: HTMLElement;
    objContainer: HTMLElement;
    speed: number;
  }) {
    this.currentPosition = { x: 0, y: 0 };
    this.isRunning = false;
    this.obj = obj;
    this.objContainer = objContainer;
    this.pixelsPerSecond = speed;

    // Make sure our object has the right css set
    this.styleInitial();
  }

  // TODO: Add pauses randomly on the way to new position
  // TODO: Add 'jerky' randomness
  // TODO: stop() doesnt stop

  private calcDelta(a: Vector, b: Vector) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private calcRandomVector(width: number, height: number) {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  }

  // Return the angle from the center point of the element to the vector of the next position
  private calcRotation(nextPos: Vector) {
    const { top, left, width, height } = this.objContainer.getClientRects()[0];
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    return Math.atan2(nextPos.x - centerX, -(nextPos.y - centerY)) * (180 / Math.PI);
  }

  private calcSpeed(delta: number) {
    return Math.round((delta / this.pixelsPerSecond) * 100) / 100;
  }

  private calcWindowSize() {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    };
  }

  private generateNewPosition() {
    const { height, width } = this.calcWindowSize();
    const totalWidth = width - this.obj.clientWidth;
    const totalHeight = height - this.obj.clientHeight;
    return this.calcRandomVector(totalWidth, totalHeight);
  }

  private moveElement() {
    // Pick a new position and rotate towards it
    const nextPos = this.generateNewPosition();
    this.setRotation(nextPos);

    // Calculate motion
    const delta = this.calcDelta(this.currentPosition, nextPos);
    const speed = this.calcSpeed(delta);

    // Animate element via CSS transition
    this.styleMovement(speed, nextPos);

    // Save this new position for the next call.
    this.currentPosition = nextPos;
  }

  private setRotation(nextPos: Vector) {
    const angle = this.calcRotation(nextPos);
    this.styleRotation(angle);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Create animation loop
    this.objContainer.addEventListener('transitionend', this.moveElement.bind(this));
    requestAnimationFrame(this.moveElement.bind(this));
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    // Remove animation loop
    this.objContainer.removeEventListener('transitionend', this.moveElement.bind(this));
  }

  private styleInitial() {
    Object.assign(this.objContainer.style, {
      pointerEvents: 'auto',
      willChange: 'transform',
    });
  }

  private styleMovement(speed: number, nextPos: Vector) {
    Object.assign(this.objContainer.style, {
      transition: `transform ${speed}s linear`,
      transform: `translate3d(${nextPos.x}px, ${nextPos.y}px, 0)`,
    });
  }

  private styleRotation(angle: number) {
    this.obj.style.transform = `rotate(${angle}deg)`;
  }
}

export default AnimateElementToVector;
