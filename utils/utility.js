const today = new Date()
const YY = today.getFullYear()
const mm = today.getMonth() + 1
const dd = today.getDate()
const MM = mm > 9 ? mm : '0' + mm
const DD = dd > 9 ? dd : '0' + dd
const Today = YY + '-' + MM + '/' + DD
const TodayFormatted = DD + '/' + MM + '/' + YY

export const Util = {
  get_time: (date) => {
    return new Date(date).toLocaleTimeString()
  },
  isEmpty: (obj) => {
    if (typeof obj === 'undefined') return true
    return Object.keys(obj).length === 0
  }
}
