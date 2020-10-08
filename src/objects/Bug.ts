import images from '../images/*.png';

class Bug {
  height: number;
  isActive: boolean;
  isAlive: boolean;
  maxSpeed: number;
  minSpeed: number;
  sprite: string;
  width: number;

  constructor({ height = 20, maxSpeed = 13, minSpeed = 6, sprite = '', width = 20 }) {
    this.height = height;
    this.isActive = false;
    this.isAlive = false;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.sprite = sprite;
    this.width = width;
  }

  spawn() {
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
  }
}

export default Bug;
