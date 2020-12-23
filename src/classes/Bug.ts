import images from '../images/*.png';
import RandomObjectMover from '../utils/RandomObjectMover';

class Bug {
  bug: HTMLImageElement;
  bugContainer: HTMLDivElement;
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
    this.bugContainer = document.createElement('div');
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
    this.bugContainer.appendChild(this.bug);
    document.body.appendChild(this.bugContainer);
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
      objectFit: 'none',
      objectPosition: '0 0',
      position: 'fixed',
      width: `${this.width}px`,
    });

    Object.assign(this.bugContainer.style, {
      display: 'inline-block',
      height: `${this.height}px`,
      left: 0,
      top: 0,
      width: `${this.width}px`,
      zIndex: '9999999',
    });
  }

  move() {
    const move = new RandomObjectMover(this.bug, this.bugContainer, 60);
    move.start();
  }

  setStartTime = (startTime: number, timestamp: number) => {
    if (startTime === 0) return timestamp;
    return startTime;
  };

  // moves the legs
  // TODO: rename this method
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
