<template>
  <div class="home">
    <ul>
        <li v-for="item in lotteryList">
          <router-link :to="'/lottery?type=' + item.router">{{ item.name }}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import {getLotteryList} from '@/service/getData'
export default {
  name: 'Home',
  data () {
    return {
      lotteryList: []
    }
  },
  created () {
    getLotteryList().then(res => {
      this.lotteryList = res.detail
    })
  }
}
</script>

<style scoped>
  .home {
    padding: .1rem;
  }
  .home li {
    font-size: .3rem;
    list-style: none; 
    text-align: left;
    margin-bottom: .1rem;
  }
</style>
