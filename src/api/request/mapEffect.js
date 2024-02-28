import { request } from "./index";
/**
 * @description 合肥边界线
 * @param {string} data 参数
 * @param {functioni} callback 回调函数
 */
export function getHeifeiData(callback) {
    request('get', "http://data.marsgis.cn/file/geojson/hefei.json", res => {
        typeof callback === 'function' && callback(res);
    })
}