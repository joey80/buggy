class AnimateSpriteFrames {
  frames: number;
  obj: HTMLElement;
  speed: number;
  width: number;

  constructor(obj: HTMLElement, frames: number, speed: number, width: number) {
    this.frames = frames;
    this.obj = obj;
    this.speed = speed;
    this.width = width;
  }

  // TODO: add better typing
  // TODO: make contructor an object
  // TODO: create init method
  // TODO: add stop method

  checkIfOnLastFrame(frame: number) {
    if (frame === this.frames - 1) {
      return 0;
    }
    return frame;
  }

  setStartTime = (startTime: number, timestamp: number) => {
    if (startTime === 0) return timestamp;
    return startTime;
  };

  styleSpritePosition(frame: number) {
    this.obj.style.objectPosition = `-${this.width + this.width * frame}px 0`;
  }

  start() {
    let startTime = 0;
    const determineProgress = (startTime: number, timestamp: number) => {
      return (timestamp - startTime) / 1 / this.speed;
    };

    const walkCycle = (timestamp: number, frame: number) => {
      startTime = this.setStartTime(startTime, timestamp);
      const progress = determineProgress(startTime, timestamp);
      frame = this.checkIfOnLastFrame(frame);
      if (progress >= 1) {
        this.styleSpritePosition(frame);
        frame++;
        startTime = 0;
      }
      requestAnimationFrame((timestamp) => walkCycle(timestamp, frame));
    };
    requestAnimationFrame((timestamp) => walkCycle(timestamp, 0));
  }
}

export default AnimateSpriteFrames;
