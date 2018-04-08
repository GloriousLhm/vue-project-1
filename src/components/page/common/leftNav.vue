<template>

  <div class="left-nav">
    <ul>
      <li>
        <i class="icon iconfont icon-caiwu-xianxing"></i>
        <div>收銀</div>
      </li>
      <li>
        <i class="icon iconfont icon-wxbmingxingdianpu"></i>
        <div>店鋪</div>
      </li>
      <li>
        <i class="icon iconfont icon-juzhuanchang"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="icon iconfont icon-wxbbiaowang"></i>
        <div>會員</div>
      </li>
      <li>
        <i class="icon iconfont icon-juzhuanchang"></i>
        <div>統計</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'leftNav',
    data () {
      return {

      }
    }
  }

</script>
<style>
.left-nav {
  color: #fff;
  font-size: 10px;
  height: 100%;
  /* height: 100vh; */
  background-color: #1d8ce0;
  float: left;
  width: 5%;
  /* position: absolute;
  left: 0; */
}
.iconfont {
  font-size: 24px;
}
.left-nav ul {
  padding: 0px;
  margin: 0px;
}
.left-nav li {
  text-align: center;
  border-bottom: 1px solid #20a0ff;
  padding: 10px;
}
</style>

