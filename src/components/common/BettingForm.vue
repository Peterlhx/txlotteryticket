<template>
  <div>
    <div class="betting-form" >
      <div class="betting-title">
        <i class="sprite-icon" id="gopng_time"></i>
        <p class="lottery-msg">第{{ lotteryDetail.periods }}期 {{ lotteryDetail.lotteryTime }}开奖</p>
      </div>
      <div class="betting-content" :class="{'has-units': countUnits.length !== 0}">
        <i class="sprite-icon" id="gopng_recommend" v-if="lotteryDetail.isRecommend"></i>
        <p class="lottery-name">{{ lotteryDetail.name }}：</p>
        <div class="betting-nums">
          <p class="count-units" v-if="countUnits.length !== 0">
            <span class="unit" v-for="item in countUnits">{{ item }}</span>
          </p>
          <p class="lottery-num-list">
            <span 
            class="lottery-num" 
            :class="{'picked-num': customPick && !pickedNums[num] }" 
            @click="toggleStatus(num)"
            v-for="num in lotteryNums">{{ num | zeroFill }}</span>
            <span class="special-num" v-if="specialNum"> {{ specialNum | zeroFill }}</span>
          </p>
        </div>
        <i 
          class="sprite-icon"
          :class="{'rotate-icon': isRotate}"
          id="gopng_refresh"
          @click="changeNums"
          v-if="lotteryDetail.pickType === 'random'"></i>
        <div class="betting-msg">
          <select name="betAmount" id="betAmount" v-model="selectedAmount">
            <option 
              :value="amount" 
              v-for="(amount, index) in betAmount">{{ amount }}元</option>
          </select>
          <input 
            type="button"
            class="betting-btn"
            value="立即投注"
            :class="{clicked: isClicked}"
            @click="betting">
        </div>
      </div> 
    </div>
    <div class="betting-footer" v-if="lotteryDetail.bonusPool">
      <i class="sprite-icon" id="gopng_bonus"></i>
      <p class="bonus-pool">
        奖池
        <span class="bonus-num" v-for="item in bonusPool.billion" v-if="bonusPool.billion">{{ item }}</span>
        <span v-if="bonusPool.billion">亿</span>
        <span class="bonus-num" v-for="item in bonusPool.tenThousand" v-if="bonusPool.tenThousand">{{ item }}</span> 
        <span v-if="bonusPool.tenThousand">万</span>
        <span class="bonus-num" v-for="item in bonusPool.value" v-if="bonusPool.value">{{ item }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { getRandomNum, formatAmount } from '@/utils/utils'

export default {
  name: 'Lottery',
  props: {
    betAmount: {
      type: Array
    },
    lotteryDetail: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      lotteryNums: [],
      customPick: false,
      pickedNums: [],
      specialNum: '',
      startNum: '',
      endNum: '',
      countUnits: [],
      selectedAmount: this.betAmount[0],
      count: 0,
      bonusPool: {},
      isRotate: false,
      isClicked: false
    }
  },
  created () {
    let lotteryDetail = this.lotteryDetail

    this.customPick = lotteryDetail.pickType === 'custom'
    this.countUnits = lotteryDetail.countUnits || []

    this.count = lotteryDetail.specialRange ? --lotteryDetail.count : lotteryDetail.count
    this.startNum = lotteryDetail.numRange[0]
    this.endNum = lotteryDetail.numRange[1]

    this.lotteryNums = getRandomNum(this.startNum, this.endNum, this.count)

    if (lotteryDetail.specialRange) {
      let specialNum = getRandomNum(lotteryDetail.specialRange[0], lotteryDetail.specialRange[0], 1)
      this.specialNum = specialNum.join('')
    }

    if (lotteryDetail.bonusPool) {
      this.bonusPool = formatAmount(lotteryDetail.bonusPool)
    }
  },
  methods: {
    randomNums () {
      this.lotteryNums = getRandomNum(this.startNum, this.endNum, this.count)
      if (this.lotteryDetail.specialRange) {
        let specialNum = getRandomNum(this.lotteryDetail.specialRange[0], this.lotteryDetail.specialRange[1], 1)
        this.specialNum = specialNum.join('')
      }
    },
    changeNums () {
      this.isRotate = true
      // 设置点击态
      setTimeout(() => {
        this.isRotate = false
      }, 1000)

      let startTime = new Date()
      // 使用定时器，实现数字的变换
      let timer = setInterval(() => {
        this.randomNums()
        if (new Date() - startTime >= 1000) {
          clearInterval(timer)
        }
      }, 100)
    },
    toggleStatus (num) {
      this.$set(this.pickedNums, num, !this.pickedNums[num])
    },
    betting () {
      this.isClicked = true
      // 设置点击态
      setTimeout(() => {
        this.isClicked = false
      }, 300)

      let bettingNums = []
      let specialNum = this.specialNum || ''
      if (this.customPick) {
        this.pickedNums.forEach((item, index) => {
          bettingNums.push(index)
        })
      } else {
        bettingNums = this.lotteryNums
      }
      console.log(bettingNums)
      console.log(specialNum)
      // 提交投注信息
    }
  }
}
</script>

<style scoped>
  .betting-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: .2rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    background-color: #fff;
  }
  .betting-title,
  .betting-content,
  .betting-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: none;
    width: 100%;
  }
  .betting-title {
    border-bottom: 1px solid #cbcaca;
    padding-bottom: .15rem;
  }
  .sprite-icon {
    display: inline-block;
    margin-right: .1rem;
  }
  .rotate-icon {
    transition: transform 1s ease-out;
    transform: rotateZ(360deg);
  }
  .betting-title .lottery-msg {
    color: #666;
    font-size: .25rem;
  }
  .betting-content {
    position: relative;
    padding: .2rem 0 .1rem;
    flex-wrap: wrap;
  }
  .has-units {
    padding-top: .4rem;
  }
  .betting-content .lottery-name {
    color: #979696;
    font-size: .24rem;
  }
  .betting-content .betting-nums {
    display: flex;
    flex-direction: column;
  }
  .betting-nums {
    margin: .2rem 0 .1rem;
    flex-wrap: wrap;
  }
  .count-units,
  .lottery-num-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .count-units {
    position: absolute;
    top: .25rem;
  }
  .count-units .unit {
    width: .5rem;
    color: #979696;
    font-size: .24rem;
    margin-right: .2rem;
  }
  .lottery-num,
  .special-num {
    width: .5rem;
    height: .5rem;
    line-height: .5rem;
    color: #fff;
    font-size: .3rem;
    border-radius: .25rem;
    background-color: #f2514a;
    margin-right: .2rem;
    margin-bottom: .1rem;
  }
  .special-num {
    background-color: #4493f4;
  }
  .picked-num {
    color: #f2514a;
    border: 1px solid #f2514a;
    background-color: #fff;
  }
  .betting-msg {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: .05rem;
  }
  .betting-msg select {
    width: 1.3rem;
    height: .55rem;
    font-size: .3rem;
    color: #979696;
    border: 1px solid #cbcaca;
    border-radius: .1rem;
    background-color: #fff;
  }
  .betting-msg .betting-btn {
    width: 4.1rem;
    height: .55rem;
    color: #fff;
    font-size: .3rem;
    border-radius: .08rem;
    background-color: #f2514a;
  }
  .betting-msg .clicked {
    background-color: rgba(0, 0, 0, .5);
  }
  .betting-footer {
    height: .7rem;
    justify-content: center;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    background-color: #fbe7e6;
  }
  .betting-footer .spite-icon {
    margin-right: .03rem;
  }
  .betting-footer .bonus-pool {
    display: flex;
    color: #666;
    font-size: .25rem;
  }
  .bonus-pool .bonus-num {
    padding: .01rem .08rem;
    color: #fff;
    border-radius: .05rem;
    background: #f2514a;
    margin: 0 .01rem
  }
</style>
