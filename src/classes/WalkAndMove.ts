import AnimateElementToVector from './AnimateElementToVector';
import AnimateSpriteFrames from './AnimateSpriteFrames';

interface WalkAndMove {
  obj: HTMLElement;
  objContainer: HTMLElement;
  objSpeed: number;
  objContainerSpeed: number;
  frames: number;
  width: number;
}

// TODO: Add better typing

class WalkAndMove {
  obj;
  objContainer;
  objSpeed;
  objContainerSpeed;
  frames;
  width;

  constructor({
    obj,
    objContainer,
    objSpeed,
    objContainerSpeed,
    frames,
    width,
  }: {
    obj: HTMLElement;
    objContainer: HTMLElement;
    objSpeed: number;
    objContainerSpeed: number;
    frames: number;
    width: number;
  }) {
    this.obj = obj;
    this.objContainer = objContainer;
    this.objSpeed = objSpeed;
    this.objContainerSpeed = objContainerSpeed;
    this.frames = frames;
    this.width = width;
  }

  init() {
    // start walk cycle
    const walk = new AnimateSpriteFrames(this.obj, this.frames, this.objSpeed, this.width);
    walk.start();

    // move around screen
    setTimeout(() => {
      const move = new AnimateElementToVector(this.obj, this.objContainer, this.objContainerSpeed);
      move.start();
    }, 1000);
  }
}

export default WalkAndMove;
