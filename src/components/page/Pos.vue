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
                <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                <!-- 直接 @click="addOrderList(goods)"是不管用的 element中规定的-->
                <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="total-div">
            数量：{{totalCount}} &nbsp;&nbsp;&nbsp;金额：{{totalMoney}}元
          </div>
          <div class="div-btn">
            <el-button type="warning">挂单</el-button>
            <el-button type="danger" @click="delAllGoods">删除</el-button>
            <el-button type="success" @click="checkout">结账</el-button>
          </div>
        </el-col>

        <!--商品展示-->
        <el-col :span="17">
          <!-- 我是产品栏 -->

          <!-- 常用商品 -->
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">

              <ul>
                <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                  <span>{{goods.goodsName}}</span>
                  <span class="o-price">￥{{goods.price}}元</span>
                </li>

              </ul>
            </div>
          </div>

          <!-- 商品分类布局 -->
          <div id="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    name: "Pos",
    data () {
      return {
        tableData: [],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        totalMoney: 0,
        totalCount: 0
      }
    },
    mounted: function () {
      // 解决100%高的问题
      // 在页面中使用了Element组件，这样他会自动给我们生产虚拟DOM，我们无法设置高度100%；
      // 这时候可以利用javascript，来设置100%高度问题。先要给我们的<el-col>标签上添加一个id，我们这里把ID设置为
      var orderHeight = document.body.clientHeight;
      document.getElementById("order-list").style.height = orderHeight + 'px';
    },
    // 说明一创建就开始执行
    created: function () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php').then(response => {
        console.log(response);
        this.oftenGoods = response.data
      }).catch(error => {
        console.log(error);
        alert('网络错误，不能访问')
      })

      axios.get('http://jspang.com/DemoApi/typeGoods.php').then(response => {
        console.log(response);
        this.type0Goods = response.data[0]
        this.type1Goods = response.data[1]
        this.type2Goods = response.data[2]
        this.type3Goods = response.data[3]
      })
    },
    methods: {

      // 添加订单列表的方法
      addOrderList (goods) {
        this.totalMoney = 0;
        this.totalCount = 0;
        // 商品是否被已经存在于订单列表中
        let isHave = false;
        //判断是否这个商品已经存在于订单列表
        for (let i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].goodsId);
          if (this.tableData[i].goodsId == goods.goodsId) {
            isHave = true; //存在
          }
        }
        //根据isHave的值判断订单列表中是否已经有此商品
        if (isHave) {
          //存在就进行数量添加
          let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
          arr[0].count++;
          //console.log(arr);
        } else {
          //不存在就推入数组
          let newGoods = { goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1 };
          this.tableData.push(newGoods);

        }

        this.getAllMoney();


      },
      // 模拟结账功能
      checkout () {
        if (this.totalCount != 0) {
          this.tableData = [];
          this.totalMoney = 0;
          this.totalCount = 0;
          // element中提供的message方法
          this.$message({
            // 设置message的一些属性的
            message: '结账成功，感谢你又为店铺出的力',
            type: 'sucess'
          })
        } else {
          this.$message.error("没有商品需要结账")
        }
      },
      // 删除单个产品
      delSingleGoods (goods) {
        console.log(goods);
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
        this.getAllMoney();
      },
      // 汇总数量和金额
      getAllMoney () {
        this.totalMoney = 0;
        this.totalCount = 0;
        if (this.tableData) {
          this.tableData.forEach((element) => {
            this.totalCount += element.count;
            this.totalMoney = this.totalMoney + (element.price * element.count);
          })

        }
      },
      // 删除全部产品
      delAllGoods () {
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
      }
    }
  }
</script>
<style>
.div-btn {
  margin-top: 10px;
  margin-left: 22%;
}
.title {
  height: 40px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  border-radius: 15px;
  background-color: pink;
}
.o-price {
  color: #58b7ff;
}
#goods-type {
  margin-top: 100px;
}
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.total-div {
  background-color: #eee;
  padding: 10px;
  border-bottom: 2px solid #666;
}
</style>

