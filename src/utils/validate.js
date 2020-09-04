import request from '@/utils/request'
const pathToRegexp = require('path-to-regexp');

export const rules = {
    type: [
        { required: true, message: '请选择内容', trigger: 'blur' },
    ],
    specialSubjectId: [
        { required: true, message: '请选择专题', trigger: 'blur' },
    ],
    title: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ], 
    year: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    aim: [
        { required: true, message: '请选择', trigger: 'blur' },
    ],
    query: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    key: [
        { required: true, message: '请输入采集key', trigger: 'blur' },
    ],

    institutionId: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
}
/**
 * 外部链接验证
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'user']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 小写验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 大写验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 英文字母验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 字符串验证
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 数组验证
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * URL验证
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 邮箱验证
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/*验证pad还是pc*/
export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  let flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 判断身份证号码
 */
export function cardid(code) {
  let list = [];
  let result = true;
  let msg = '';
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  if (!validatenull(code)) {
    if (code.length == 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = "证件号码格式错误";
      } else if (!city[code.substr(0, 2)]) {
        msg = "地址编码错误";
      } else {
        //18位身份证需要验证最后一位校验位
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17]) {
          msg = "证件号码校验位错误";
        } else {
          result = false;
        }

      }
    } else {
      msg = "证件号码长度不为18位";
    }

  } else {
    msg = "证件号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
}
/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  let list = [];
  let result = true;
  let msg = '';
  var isPhone = /^0\d{2,3}-?\d{7,8}$/;
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确';
      } else {
        result = false;
      }
    } else {
      msg = '手机号码长度不为11位';
    }
  } else {
    msg = '手机号码不能为空';
  }
  list.push(result);
  list.push(msg);
  return list;
}
/**
 * 判断姓名是否正确
 */
export function validatename(name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(name)) return false;
  return true;
}
/**
 * 判断是否为整数
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为小数
 */
export function validatenumord(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val == 'boolean') {
    return false;
  } 
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}

/**
 * 异步验证
 * @param {string} url 请求地址
 * @param {json} data 附加参数
 * @param {string} message 验证返回信息
 * @param {function} callback 验证不通过的回调函数
 */
export function asyncValidator(url, data, message, callback) {
  request.post(url, data).then(response => {
    console.log(response);
    if (!response.isSuccess) {
      callback(new Error(message));
    } else {
      callback()
    }
  }).catch(error => {
    console.error(error);
    callback(new Error(message));
  });
}


/*
* url 匹配
*/
export function menuIsRoutes(currentPath, menu) {
    let isRedirect = false
    let keys = '0'
    for (let i = 0; i < menu.length; i++) {
        let item = menu[i]

        if (item.children && item.children.length < 2 && item.path) {
            let re = pathToRegexp.pathToRegexp(item.path)
            let match = re.exec(currentPath);
            if (match) {
                isRedirect = true
                keys = `${i}`
            }
        } else if (item.children) {
            for (let j = 0; j < item.children.length; j++) {
                let re = pathToRegexp.pathToRegexp(item.children[j].path)
                let match = re.exec(currentPath);
                if (match) {
                    isRedirect = true
                    keys = `${i}-${j}`
                }
            }
        }
    }
    return { isRedirect, keys }
}