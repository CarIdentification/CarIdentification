// utils/util.js
/**
 * 将距离格式化
 * <1000m时 取整,没有小数点
 * >1000m时 单位取km,一位小数点 
 */
function formatDistance(num) {
  　if (num < 1000) {
    　　return num.toFixed(0) + 'm';
  　} else if (num > 1000) {
    　　return (num / 1000).toFixed(1) + 'km';
  　}
}