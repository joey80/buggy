import images from '../images/*.png';
import WalkAndMove from './WalkAndMove';
import { getStartingPosition } from '../util';

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
  move: InstanceType<typeof WalkAndMove>;
  scale: string;
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
    this.scale = `scale(${Math.random() + 0.2})`;
    this.sprite = sprite;
    this.walkSpeed = walkSpeed;
    this.width = width;

    this.move = new WalkAndMove({
      frames: this.frames,
      obj: this.bug,
      objContainer: this.bugContainer,
      objSpeed: this.walkSpeed,
      objContainerSpeed: 60,
      scale: this.scale,
      width: this.width,
    });
  }

  // TODO: add deaths if clicked
  // TODO: crawling bugs should burrow out from the screen

  init() {
    this.create();
    this.startMove();
  }

  private create() {
    this.assignBugClassName();
    this.createBugImage();
    this.createBugStyles();
    this.createEventListeners();
    this.appendBugToDOM();
  }

  startMove() {
    this.move.start();
  }

  private appendBugToDOM() {
    this.bugContainer.appendChild(this.bug);
    document.body.appendChild(this.bugContainer);
  }

  assignBugClassName(name?: string) {
    this.bug.className = name || 'bug';
  }

  private createBugImage() {
    this.bug.src = images[this.sprite];
  }

  private createBugStyles() {
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
      transition: 'transform 15s linear',
      width: `${this.width}px`,
      zIndex: '9999999',
      ...getStartingPosition(this.height, this.width, this.scale),
    });
  }

  createEventListeners() {
    this.bugContainer.addEventListener('mouseout', () => {
      this.move.start();
    });

    this.bugContainer.addEventListener('mouseover', () => {
      this.move.stop();
    });
  }
}

export default Bug;
