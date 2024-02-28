import { request } from "./index";
/**
 * @description 添加漫游数据
 * @param {string} data 参数
 * @param {functioni} callback 回调函数
 */
//  http://10.100.5.12:8090/gisadmin-system/api/scene_roam/addOrUpdate
export function addOrUpdate(data, callback) {
  request('post', 'http://10.100.5.12:8090/gisadmin-system/api/scene_roam/addOrUpdate', res => {
    typeof callback === 'function' && callback(res);
  }, data);
}
/**
 * @description 获取漫游数据
 * @param {string} data 参数
 * @param {functioni} callback 回调函数
 */
export function getAllList(callback) {
  request('post', 'http://10.100.5.12:8090/gisadmin-system/api/scene_roam/getAllList', (res) => {
    typeof callback === 'function' && callback(res);
  });
}
export function deleteRoam(data,callback){
  request('post', 'http://10.100.5.12:8090/gisadmin-system/api/scene_roam/delete', res => {
    typeof callback === 'function' && callback(res);
  }, data);
}