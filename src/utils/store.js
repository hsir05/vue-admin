import settings from "@/settings";

const keyName = settings.key + "-";

/**
 * 存储数据到sessionStore 
 */
export const setSession = (key, value) => {
    sessionStorage.setItem(`${keyName}${key}`, value);
};
/**
 * 获取数据
 */
export const getSession = key => {
    
  let data = sessionStorage.getItem(`${keyName}${key}`);
  if (data) {
      return data;
  } else {
    console.warn("key对应的value不存在");
    return "";
  }
};
/**
 * 清除key对应数据
 */
export const removeSession = key => {
  sessionStorage.removeItem(`${keyName}${key}`);
};
/**
 * 清除所有数据
 */
export const clearSession = () => {
  sessionStorage.clear();
};
