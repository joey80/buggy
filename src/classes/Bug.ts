import images from '../images/*.png';
import { isNearEdge } from '../utils';

class Bug {
  bug: HTMLImageElement;
  frames: number;
  height: number;
  isActive: boolean;
  isAlive: boolean;
  maxSpeed: number;
  minSpeed: number;
  sprite: string;
  width: number;

  constructor({ frames = 0, height = 20, maxSpeed = 13, minSpeed = 6, sprite = '', width = 20 }) {
    this.bug = document.createElement('img');
    this.frames = frames;
    this.height = height;
    this.isActive = false;
    this.isAlive = false;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.sprite = sprite;
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

  move() {
    // TODO: add this to motion function
    if (isNearEdge(this.bug)) this.rotateBugToNewAngle();
  }

  rotateBugToNewAngle() {
    const newAngle = Math.floor(Math.random() * Math.PI * 2 * 100);
    this.bug.style.transform = `rotate(${newAngle}deg)`;
  }

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
    const walkCycle = (frame: number) => {
      frame = this.checkIfOnLastFrame(frame);
      this.updateBugObjectPosition(frame);
      frame++;
      setTimeout(() => walkCycle(frame), 100);
    };
    walkCycle(0);
  }
}

export default Bug;
