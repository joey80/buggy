import images from '../images/*.png';

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

  create() {
    const bug = document.createElement('img');
    bug.className = 'bug';
    bug.src = images[this.sprite];
    const styles = {
      height: `${this.height}px`,
      left: 0,
      objectFit: 'none',
      objectPosition: '0 0',
      position: 'fixed',
      top: 0,
      width: `${this.width}px`,
      zIndex: '9999999',
    };
    Object.assign(bug.style, styles);
    document.body.appendChild(bug);
    this.bug = bug;
  }

  walk() {
    const walkCycle = (frame: number) => {
      if (frame === this.frames - 1) {
        frame = 0;
      }
      this.bug.style.objectPosition = `-${this.width + this.width * frame}px 0`;
      frame++;
      setTimeout(() => walkCycle(frame), 100);
    };
    walkCycle(0);
  }

  init() {
    this.create();
    this.walk();
  }
}

export default Bug;
