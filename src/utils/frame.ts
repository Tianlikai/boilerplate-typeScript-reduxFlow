let lastTime = performance.now();
let frame = 0;
// let lastFrameTime = performance.now();

/**
 * 通过requestAnimationFrame计算帧率
 */
const getFPS = () => {
  const now = performance.now();
  // const fs = now - lastFrameTime;
  // lastFrameTime = now;
  // const interval = Math.round(1000 / fs);
  // console.log(interval);
  frame++;
  if (now > 1000 + lastTime) {
    const fps = Math.round((frame * 1000) / (now - lastTime));
    console.log(`fps: ${fps}`);
    frame = 0;
    lastTime = now;
  }
  window.requestAnimationFrame(getFPS);
};

export { getFPS };
