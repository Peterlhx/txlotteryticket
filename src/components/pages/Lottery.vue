<template>
  <div class="lottery">
    <img src="../../assets/images/banner.png" class="banner" alt="头部banner">
    <div class="betting-form-wrap">
      <betting-form 
        :betAmount="betAmount" 
        :lotteryDetail="lotteryDetail" 
        v-if="betAmount.length !== 0"></betting-form>
    </div>
    <div class="rule-info-wrap">
      <span class="rule-title">规则说明</span>
      <div class="rule-info">{{ ruleInfo }}</div>
    </div>
  </div>
</template>

<script>
import {getLotteryList} from '@/service/getData'
import bettingForm from '@/components/common/BettingForm'

export default {
  name: 'Lottery',
  components: { bettingForm },
  data () {
    return {
      lotteryDetail: {},
      betAmount: [],
      ruleInfo: ''
    }
  },
  created () {
    let lottery = this.$route.query.type
    // 获取投注明细
    getLotteryList().then(res => {
      res.detail.forEach(item => {
        if (item.router === lottery) {
          this.lotteryDetail = item
        }
      })
      this.betAmount = res.betAmount
      this.ruleInfo = res.ruleInfo
    })
  }
}
</script>

<style scoped>
  .lottery {
    height: 100%;
    background-color: #c13736;
  }
  .banner {
    height: 3rem;
    display: block; /* 清除间距 */
  }
  .betting-form-wrap {
    width: 100%;
    padding: 0 .2rem;
    margin-bottom: .55rem;
    background: linear-gradient(#c63d35, #c13736);
  }
  .rule-info-wrap {
    position: relative;
    padding: 0 .4rem;
  }
  .rule-info-wrap .rule-title {
    color: #8e2424;
    font-size: .3rem;
    font-weight: bold;
  }
  .rule-title:before,
  .rule-title:after {
    content: '';
    width: 28%;
    height: 1px;
    background: #8e2424;
    position: absolute;
    top: .15rem;
    left: .6rem;
  }
  .rule-title:after {
    left: initial;
    right: .6rem;
  }
  .rule-info-wrap .rule-info {
    font-size: .25rem;
    color: #8e2424;
  }
</style>
