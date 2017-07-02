import fetch from '@/utils/fetch'
import * as lotteryList from '../../mock/lotteryList'

/**
 * 创建临时数据，返回Promise对象
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

var getLotteryList

// 生产环境使用真实数据
if (process.env.NODE_ENV === 'production') {
  /**
   * 获取彩票类型列表
   */
  getLotteryList = () => fetch('GET', '/api/getLotteryList', {})
} else {
  getLotteryList = () => setpromise(lotteryList.data)
}

export {
  getLotteryList
}
