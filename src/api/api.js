import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/sys/common/view/";

//角色管理
const addRole = (params)=>postAction("/sys/role/add",params);
const editRole = (params)=>putAction("/sys/role/edit",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);

export {
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
}



