import images from '../images/*.png';
import { isNearEdge } from '../utils';

class Bug {
  bug: HTMLImageElement;
  direction: Array<string>;
  frames: number;
  height: number;
  isActive: boolean;
  isAlive: boolean;
  maxSpeed: number;
  minSpeed: number;
  sprite: string;
  walkSpeed: number;
  width: number;

  constructor({
    frames = 0,
    height = 20,
    maxSpeed = 13,
    minSpeed = 6,
    sprite = '',
    walkSpeed = 100,
    width = 20,
  }) {
    this.bug = document.createElement('img');
    this.direction = [];
    this.frames = frames;
    this.height = height;
    this.isActive = false;
    this.isAlive = false;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.sprite = sprite;
    this.walkSpeed = walkSpeed;
    this.width = width;
  }

  appendBugToDOM() {
    document.body.appendChild(this.bug);
  }

  assignBugClassName() {
    this.bug.className = 'bug';
  }

  checkIfOnLastFrame(frame: number) {
    if (frame === this.frames - 1) {
      return 0;
    }
    return frame;
  }

  createBugImage() {
    this.bug.src = images[this.sprite];
  }

  createBugStyles() {
    Object.assign(this.bug.style, {
      height: `${this.height}px`,
      left: 0,
      objectFit: 'none',
      objectPosition: '0 0',
      position: 'fixed',
      top: 0,
      width: `${this.width}px`,
      zIndex: '9999999',
    });
  }

  moveCycle() {
    const movement = (step: number) => {
      // if (isNearEdge(this.bug)) this.rotateBugToNewAngle();
      // if near edge rotate to opposite angle?
      this.bug.style.top = `${this.direction[1]}${step}px`;
      this.bug.style.left = `${this.direction[0]}${step}px`;
      step++;
      requestAnimationFrame(() => movement(step));
    };
    requestAnimationFrame(() => movement(0));
  }

  move() {
    // console.log('random', Math.floor(Math.random() * 360));
    // TODO: add this to motion function
    if (isNearEdge(this.bug)) this.rotateBugToNewAngle();
    // this.moveCycle();
  }

  rotateBugToNewAngle() {
    const dirlookup = (num: number) => {
      if (num >= 0 && num <= 90) return ['+', '-'];
      if (num >= 91 && num <= 180) return ['+', '+'];
      if (num >= 181 && num <= 270) return ['-', '+'];
      return ['-', '-'];
    };
    const newAngle = Math.floor(Math.random() * 360);
    this.direction = dirlookup(newAngle);
    console.log({ newAngle, dir: this.direction });
    this.bug.style.transform = `rotate(${newAngle}deg)`;
  }

  setStartTime = (startTime: number, timestamp: number) => {
    if (startTime === 0) return timestamp;
    return startTime;
  };

  updateBugObjectPosition(frame: number) {
    this.bug.style.objectPosition = `-${this.width + this.width * frame}px 0`;
  }

  init() {
    this.create();
    this.walk();
    this.move();
  }

  create() {
    this.assignBugClassName();
    this.createBugImage();
    this.createBugStyles();
    this.appendBugToDOM();
  }

  walk() {
    let startTime = 0;
    const determineProgress = (startTime: number, timestamp: number) => {
      return (timestamp - startTime) / 1 / this.walkSpeed;
    };

    const walkCycle = (timestamp: number, frame: number) => {
      startTime = this.setStartTime(startTime, timestamp);
      const progress = determineProgress(startTime, timestamp);
      frame = this.checkIfOnLastFrame(frame);
      if (progress >= 1) {
        this.updateBugObjectPosition(frame);
        frame++;
        startTime = 0;
      }
      requestAnimationFrame((timestamp) => walkCycle(timestamp, frame));
    };
    requestAnimationFrame((timestamp) => walkCycle(timestamp, 0));
  }
}

export default Bug;
