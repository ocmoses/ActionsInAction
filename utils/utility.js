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
  },
  obscureEmail: (email) => {
    var splitEmail = email.split('@')
    var domain = splitEmail[1]
    var name = splitEmail[0]
    const ln = Math.floor(name.length / 3)
    let ast = ''
    for (let i = 0; i < name.length - ln; i++) {
      ast += '*'
    }
    return name.substring(0, ln).concat(ast).concat('@').concat(domain)
  },
  validateEmail: (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }
}
