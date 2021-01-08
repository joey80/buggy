import AnimateElementToVector from './AnimateElementToVector';
import AnimateSpriteFrames from './AnimateSpriteFrames';

class WalkAndMove {
  private obj: HTMLElement;
  private objContainer: HTMLElement;
  private objSpeed: number;
  private objContainerSpeed: number;
  private frames: number;
  private move: InstanceType<typeof AnimateElementToVector>;
  private scale: string;
  private walk: InstanceType<typeof AnimateSpriteFrames>;
  private width: number;

  constructor({
    obj,
    objContainer,
    objSpeed,
    objContainerSpeed,
    frames,
    scale,
    width,
  }: {
    obj: HTMLElement;
    objContainer: HTMLElement;
    objSpeed: number;
    objContainerSpeed: number;
    frames: number;
    scale: string;
    width: number;
  }) {
    this.obj = obj;
    this.objContainer = objContainer;
    this.objSpeed = objSpeed;
    this.objContainerSpeed = objContainerSpeed;
    this.frames = frames;
    this.scale = scale;
    this.width = width;

    this.walk = new AnimateSpriteFrames({
      frames: this.frames,
      obj: this.obj,
      speed: this.objSpeed,
      width: this.width,
    });

    this.move = new AnimateElementToVector({
      obj: this.obj,
      objContainer: this.objContainer,
      scale: this.scale,
      speed: this.objContainerSpeed,
    });
  }

  start() {
    this.walk.start();

    // move around screen
    setTimeout(() => {
      this.move.start();
    }, 1000);
  }

  stop() {
    this.walk.stop();
    this.move.stop();
  }
}

export default WalkAndMove;
