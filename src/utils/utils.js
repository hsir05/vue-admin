import pathToRegexp from 'path-to-regexp'
/*
 * url 匹配 返回menu需要的key
 */
export function menuIsRoutes(currentPath, menu) {
  let isRedirect = false;
  let keys = "0"; 
  for (let i = 0; i < menu.length; i++) {
    let item = menu[i];

    if (item.children && item.children.length < 2 && item.path) {
      let re = pathToRegexp.pathToRegexp(item.path);
      let match = re.exec(currentPath);
      if (match) {
        isRedirect = true;
        keys = `${i}`;
      }
    } else if (item.children) {
      for (let j = 0; j < item.children.length; j++) {
        let re = pathToRegexp.pathToRegexp(item.children[j].path);
        let match = re.exec(currentPath);
        if (match) {
          isRedirect = true;
          keys = `${i}-${j}`;
        }
      }
    }
  }
  return { isRedirect, keys };
}
