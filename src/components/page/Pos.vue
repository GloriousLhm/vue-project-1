<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span='7' id="order-list">
          <!-- 我是订单栏  -->
          <el-tabs>
            <el-tab-pane label="点餐">
              点餐
            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
          <!-- border加了说明这个表格是有边框的 -->
          <el-table :data="tableData" border show-summary style="width: 100%">

            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="count" label="数量" width="50"></el-table-column>
            <el-table-column prop="price" label="金额" width="70"></el-table-column>
            <!-- fixed是将这个固定在最右边的 -->
            <el-table-column label="操作" width="100" fixed="right">
              <template scope="scope">
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small">增加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!--商品展示-->
        <el-col :span="17">
          我是产品栏
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
  export default {
    name: "Pos",
    data () {
      return {
        tableData: [{

          goodsName: '可口可乐',
          price: 8,
          count: 1
        }, {

          goodsName: '香辣鸡腿堡',
          price: 15,
          count: 1
        }, {

          goodsName: '爱心薯条',
          price: 8,
          count: 1
        }, {

          goodsName: '甜筒',
          price: 8,
          count: 1
        }]
      }
    },
    mounted: function () {
      // 解决100%高的问题
      // 在页面中使用了Element组件，这样他会自动给我们生产虚拟DOM，我们无法设置高度100%；
      // 这时候可以利用javascript，来设置100%高度问题。先要给我们的<el-col>标签上添加一个id，我们这里把ID设置为
      var orderHeight = document.body.clientHeight;
      document.getElementById("order-list").style.height = orderHeight + 'px';
    }
  }
</script>

<style>

</style>

