/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) {
    window.localStorage.clear()
    return
  }
  window.localStorage.removeItem(name)
}

/**
* 获取不重复的随机数
*/
export const getRandomNum = (start, end, count) => {
  let arr = []
  let hash = {}
  while (arr.length < count) {
    let random = start + Math.round(Math.random() * (end - start))
    if (!hash[random]) {
      arr.push(random)
      hash[random] = true
    }
  }
  return arr
}

/**
* 将数值转为对象
* 对象有两个属性：billion、tenThousand
*/
export const formatAmount = (value) => {
  value = parseInt(value)

  if (isNaN(value)) return ''

  let x = parseInt(value / 10000) % 10000
  let y = parseInt(value / 100000000)
  let result = {}

  if (y) {
    result['billion'] = y.toString()

    if (x) result['tenThousand'] = x.toString()
  } else if (x) {
    result['tenThousand'] = x.toString()
  } else {
    result['value'] = value.toString()
  }
  return result
}
