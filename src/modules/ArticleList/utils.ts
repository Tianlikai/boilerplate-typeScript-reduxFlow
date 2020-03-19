import { BUFFER_BOTTOM, BUFFER_TOP } from "./constant";

/**
 * 图片是否在加载区域
 * @param offsetTop 图片顶部距离网站顶部距离
 * @param bottomViewPort 加载区域底部位置
 */
export const isVisible = (offsetTop: number, bottomViewPort: number) =>
  offsetTop < bottomViewPort;

/**
 * 获取缓冲视区范围
 * @param innerHeight
 * @param pageHeight
 * @param scrollY
 */
export const getBufferViewPort = (
  innerHeight: number,
  pageHeight: number,
  scrollY: number,
) => {
  const bottomViewPort = scrollY + innerHeight + BUFFER_BOTTOM;
  console.log(`bottomViewPort: ${bottomViewPort}, pageHeight: ${pageHeight}`);
  return {
    topViewPort: scrollY - BUFFER_TOP,
    bottomViewPort: bottomViewPort > pageHeight ? pageHeight : bottomViewPort,
  };
};
