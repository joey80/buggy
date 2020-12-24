import images from '../images/*.png';
import WalkAndMove from './WalkAndMove';

class Bug {
  bug: HTMLImageElement;
  bugContainer: HTMLElement;
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

  // TODO: add better typing
  // TODO: should be positioned offscreen to start with from a random side
  // TODO: add random scale size
  // TODO: add deaths if clicked
  // TODO: pick a new path if moused over

  init() {
    this.create();
    this.move();
  }

  create() {
    this.assignBugClassName();
    this.createBugImage();
    this.createBugStyles();
    this.appendBugToDOM();
  }

  move() {
    const move = new WalkAndMove({
      frames: this.frames,
      obj: this.bug,
      objContainer: this.bugContainer,
      objSpeed: this.walkSpeed,
      objContainerSpeed: 60,
      width: this.width,
    });

    move.init();
  }

  appendBugToDOM() {
    this.bugContainer.appendChild(this.bug);
    document.body.appendChild(this.bugContainer);
  }

  assignBugClassName() {
    this.bug.className = 'bug';
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
}

export default Bug;
