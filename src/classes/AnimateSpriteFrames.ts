class AnimateSpriteFrames {
  private frames: number;
  private isRunning: boolean;
  private obj: HTMLElement;
  private speed: number;
  private startTime: number;
  private width: number;

  constructor({
    frames,
    obj,
    speed,
    width,
  }: {
    frames: number;
    obj: HTMLElement;
    speed: number;
    width: number;
  }) {
    this.frames = frames;
    this.isRunning = false;
    this.obj = obj;
    this.speed = speed;
    this.startTime = 0;
    this.width = width;
  }

  private calcFPSProgress(startTime: number, timestamp: number) {
    return (timestamp - startTime) / 1 / this.speed;
  }

  private checkIfOnLastFrame(frame: number) {
    if (frame === this.frames - 1) {
      return 0;
    }
    return frame;
  }

  private setStartTime(startTime: number, timestamp: number) {
    if (startTime === 0) {
      return timestamp;
    }
    return startTime;
  }

  private styleSpritePosition(frame: number) {
    this.obj.style.objectPosition = `-${this.width + this.width * frame}px 0`;
  }

  start() {
    this.isRunning = true;
    this.walkCycle(0, 0);
  }

  stop() {
    this.isRunning = false;
    this.styleSpritePosition(0);
  }

  private walkCycle(timestamp: number, frame: number) {
    const startTime = this.startTime;
    this.startTime = this.setStartTime(startTime, timestamp);

    // Keeps the sprite frame animation from happening too quickly
    const progress = this.calcFPSProgress(this.startTime, timestamp);
    frame = this.checkIfOnLastFrame(frame);

    // Update sprite frame if enough time has passed
    if (progress >= 1) {
      this.styleSpritePosition(frame);
      frame++;
      this.startTime = 0;
    }

    if (this.isRunning) {
      requestAnimationFrame((timestamp) => this.walkCycle(timestamp, frame));
    }
  }
}

export default AnimateSpriteFrames;
