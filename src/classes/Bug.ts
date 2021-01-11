import images from '../images/*.png';
import WalkAndMove from './WalkAndMove';
import { getStartingPosition, randomIntFromInterval } from '../util';

class Bug {
  bug: HTMLImageElement;
  bugContainer: HTMLElement;
  direction: Array<string>;
  frames: number;
  height: number;
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
    this.isAlive = true;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.scale = this.calculateScale();
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

  // TODO: death should show guts where it was clicked

  init() {
    this.create();
    this.move.start();
  }

  private create() {
    this.assignBugClassName();
    this.createBugImage();
    this.createBugStyles();
    this.createEventListeners();
    this.appendBugToDOM();
  }

  die() {
    this.isAlive = false;
    this.move.stop();
    this.styleDeath();
  }

  private appendBugToDOM() {
    this.bugContainer.appendChild(this.bug);
    document.body.appendChild(this.bugContainer);
  }

  assignBugClassName() {
    this.bug.className = 'bug';
  }

  calculateScale() {
    const num = randomIntFromInterval(7, 10);
    if (num === 10) return 'scale(1)';
    return `scale(0.${num})`;
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
    const start = () => {
      if (this.isAlive) {
        setTimeout(() => {
          if (this.isAlive) {
            this.move.start();
          }
        }, 1000);
      }
    };
    const stop = () => this.move.stop();

    this.bugContainer.addEventListener('mouseout', start);
    this.bugContainer.addEventListener('mouseover', stop);

    this.bugContainer.addEventListener('click', () => {
      this.bugContainer.removeEventListener('mouseout', start);
      this.bugContainer.removeEventListener('mouseover', stop);
      this.die();
    });
  }

  styleDeath() {
    this.bug.style.objectPosition = '';
  }
}

export default Bug;
