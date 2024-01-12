
// 检查生日是否正确
function checkBirthday (card) {
  var len = card.length
  // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len === 15) {
    var reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
    const arrData = card.match(reFifteen)
    const year = arrData[2]
    const month = arrData[3]
    const day = arrData[4]
    const birthday = new Date('19' + year + '/' + month + '/' + day)
    return verifyBirthday('19' + year, month, day, birthday)
  }
  // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len === 18) {
    var reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
    const arrData = card.match(reEighteen)
    const year = arrData[2]
    const month = arrData[3]
    const day = arrData[4]
    const birthday = new Date(year + '/' + month + '/' + day)
    return verifyBirthday(year, month, day, birthday)
  }
  return false
}

// 校验日期
function verifyBirthday (year, month, day, birthday) {
  var now = new Date()
  var nowYear = now.getFullYear()
  // 年月日是否合理
  if (birthday.getFullYear() === year && (birthday.getMonth() + 1) === month && birthday.getDate() === day) {
    // 判断年份的范围（3岁到100岁之间)
    var time = nowYear - year
    if (time >= 0 && time <= 150) {
      return true
    }
    return false
  }
  return false
}

// 纯汉字
const checkFontH = (rule, value, callback) => {
  if (value && !(/^[\u4e00-\u9fa5|·]+$/.test(value))) {
    callback(new Error('请输入20个以内的汉字'))
  } else {
    callback()
  }
}

// 证件号的校验
const idCard = (rule, value, callback) => {
  if ((value && !(/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value))) || (value && !(/^8[123]0000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(value)))) {
    callback(new Error('证件号格式不对'))
  } else {
    callback()
  }
}
// 校验发病年龄
const checkAeg = (rule, value, callback) => {
  if (value && (value < 0 || value > 130)) {
    callback(new Error('请输入正确发病年龄'))
  } else {
    callback()
  }
}
// 用于验证电话
const checkTel = (rule, value, callback) => {
  if (value && !(/^(\d|-|\+){6,15}$/.test(value))) {
    callback(new Error('电话输入有误'))
  } else {
    callback()
  }
}
export default {
  checkBirthday,
  checkFontH,
  idCard,
  checkAeg,
  checkTel
}
