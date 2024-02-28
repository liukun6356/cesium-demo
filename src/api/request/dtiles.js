import { request } from "./index";
/**
 * @description 获取显示构件树模型数据
 * @param {string} data 参数
 * @param {functioni} callback 回调函数
 */
export function getTreeData(url, callback) {
    request('get', url, res => {
        typeof callback === 'function' && callback(res);
    })
}