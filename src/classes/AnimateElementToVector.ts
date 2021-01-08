import { calcWindowSize } from '../util';

interface Vector {
  x: number;
  y: number;
}

class AnimateElementToVector {
  private animationFrameRequest?: number;
  private currentPosition: Vector;
  private obj: HTMLElement;
  private objContainer: HTMLElement;
  private pixelsPerSecond: number;
  private scale: string;

  constructor({
    obj,
    objContainer,
    scale,
    speed,
  }: {
    obj: HTMLElement;
    objContainer: HTMLElement;
    scale: string;
    speed: number;
  }) {
    this.animationFrameRequest = undefined;
    this.currentPosition = { x: 0, y: 0 };
    this.obj = obj;
    this.objContainer = objContainer;
    this.pixelsPerSecond = speed;
    this.scale = scale;

    // Make sure our object has the right css set
    this.styleInitial();
  }

  // TODO: Add pauses randomly on the way to new position
  // TODO: Add 'jerky' randomness

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

  private generateNewPosition() {
    const { height, width } = calcWindowSize();
    const totalWidth = width - this.obj.clientWidth;
    const totalHeight = height - this.obj.clientHeight;
    return this.calcRandomVector(totalWidth, totalHeight);
  }

  private getCurrentTransformProperty() {
    const computedStyle = window.getComputedStyle(this.objContainer);
    return computedStyle.getPropertyValue('transform');
  }

  private getSpeed(nextPos: Vector) {
    const delta = this.calcDelta(this.currentPosition, nextPos);
    return this.calcSpeed(delta);
  }

  private moveElement() {
    // Pick a new position and rotate towards it
    const nextPos = this.generateNewPosition();
    this.setRotation(nextPos);

    // Animate element via CSS transition
    const speed = this.getSpeed(nextPos);
    this.styleMovement(speed, nextPos);

    // Save this new position for the next call.
    this.currentPosition = nextPos;
  }

  private setRotation(nextPos: Vector) {
    const angle = this.calcRotation(nextPos);
    this.styleRotation(angle);
  }

  start() {
    // Create animation loop
    this.objContainer.addEventListener('transitionend', this.moveElement.bind(this));
    if (!this.animationFrameRequest) {
      this.animationFrameRequest = requestAnimationFrame(this.moveElement.bind(this));
    }
  }

  stop() {
    // Freeze the transition in place by locking in the current x any y values
    // of the transform
    this.styleTransform();

    // Remove animation loop
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
    this.animationFrameRequest = undefined;
    this.objContainer.removeEventListener('transitionend', this.moveElement.bind(this));
  }

  private styleInitial() {
    Object.assign(this.objContainer.style, {
      pointerEvents: 'auto',
      willChange: 'transform',
    });

    Object.assign(document.body.style, {
      overflowX: 'hidden',
    });
  }

  private styleMovement(speed: number, nextPos: Vector) {
    Object.assign(this.objContainer.style, {
      transition: `transform ${speed}s linear`,
      transform: `translate3d(${nextPos.x}px, ${nextPos.y}px, 0) ${this.scale}`,
    });
  }

  private styleRotation(angle: number) {
    this.obj.style.transform = `rotate(${angle}deg)`;
  }

  private styleTransform() {
    Object.assign(this.objContainer.style, {
      transitionProperty: 'none',
      transform: this.getCurrentTransformProperty(),
    });
  }
}

export default AnimateElementToVector;
