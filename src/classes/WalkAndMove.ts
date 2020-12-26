import AnimateElementToVector from './AnimateElementToVector';
import AnimateSpriteFrames from './AnimateSpriteFrames';

class WalkAndMove {
  private obj: HTMLElement;
  private objContainer: HTMLElement;
  private objSpeed: number;
  private objContainerSpeed: number;
  private frames: number;
  private width: number;

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
    const walk = new AnimateSpriteFrames({
      frames: this.frames,
      obj: this.obj,
      speed: this.objSpeed,
      width: this.width,
    });
    walk.start();

    // move around screen
    setTimeout(() => {
      const move = new AnimateElementToVector({
        obj: this.obj,
        objContainer: this.objContainer,
        speed: this.objContainerSpeed,
      });
      move.start();
    }, 1000);
  }
}

export default WalkAndMove;
