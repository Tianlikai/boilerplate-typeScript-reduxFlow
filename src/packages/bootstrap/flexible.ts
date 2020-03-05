/**
 *  按照屏幕宽度设置font-size
 */
export const flexible = () => {
  const { clientWidth } = window.document.documentElement;
  let width;
  if (clientWidth <= 375) {
    width = 375;
  } else if (clientWidth <= 768) {
    width = 384 * (clientWidth / 768) * 2;
  } else if (clientWidth <= 1200) {
    width = 375 * (clientWidth / 1200);
  } else {
    width = 375;
  }
  document.documentElement.style.fontSize = `${width / 3.75}px`;
};
