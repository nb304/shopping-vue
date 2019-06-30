<template>
  <div id="listArea">



    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}"  >
          <el-form-item label="订单编号" >
            <el-input v-model="orderPid" placeholder="输入编号" ><i slot="prefix" class="el-icon-edit"></i></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="店铺名称">
            <el-input v-model="dianPuNamer" placeholder="输入名称"><i slot="prefix" class="el-icon-edit"></i></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单类型" >
            <el-select v-model="orderCast" placeholder="选择" >
              <el-option label="普通订单" value="普通订单"></el-option>
              <el-option label="优惠订单" value="优惠订单"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单状态">
            <el-select v-model="orderState" placeholder="选择">
              <el-option label="待付款" value="待付款"></el-option>
              <el-option label="已取消" value="已取消"></el-option>
              <el-option label="未发货" value="未发货"></el-option>
              <el-option label="已发货" value="已发货"></el-option>
              <el-option label="未收货" value="未收货"></el-option>
              <el-option label="未收货-退单中" value="未收货-退单中"></el-option>
              <el-option label="未收货-退单成功" value="未收货-退单成功"></el-option>
              <el-option label="已收货" value="已收货"></el-option>
              <el-option label="已收货-退单中" value="已收货-退单中"></el-option>
              <el-option label="已收货-退单成功" value="已收货-退单成功"></el-option>
              <el-option label="已收货-换货中" value="已收货-换货中"></el-option>
              <el-option label="已收货-换货成功" value="已收货-换货成功"></el-option>
              <el-option label="待评价" value="待评价"></el-option>
              <el-option label="已结算" value="已结算"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}"  >
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker style="width: 100%;"
                            v-model="startDate"
                            type="date"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 6}" :xs="{span: 23}"  >
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker style="width: 100%;"
                            v-model="endDate"
                            type="date"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
            </el-date-picker>
          </el-form-item>
        </el-col>


        <el-col :sm="{span: 6, offset: 6}" :xs="{span: 23}"  >
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit" style="width: 215px; margin-left: 70px;">搜索</el-button>
          </el-form-item>
        </el-col>


      </el-row>
    </el-form>
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div >
          <el-divider content-position="right" >
            <span>数量:900笔</span>
            <el-divider direction="vertical"></el-divider>
            <span>时间:2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">

        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column  label="序号"  show-overflow-tooltip="true" >
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="订单编号" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.pid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="店铺"  show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.store }}</span>
            </template>
          </el-table-column>

          <el-table-column label="下单时间" show-overflow-tooltip="true"  >
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>


          <el-table-column class-name="status-col" label="类型"  show-overflow-tooltip="true"  >
            <template slot-scope="scope">
              <span>{{ scope.row.cast }}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="created_at" label="状态"  show-overflow-tooltip="true"  >
            <template slot-scope="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="created_at"   show-overflow-tooltip="true" >
            <template slot="header" slot-scope="scope">
              <span>订单商品</span>
              <el-tooltip class="item" effect="dark" content="商品信息描述" placement="right">
                <svg-icon icon-class="product"  />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="productDesc(scope.$index, list)"
                type="text"
                size="20px">
                {{ scope.row.product }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="created_at"   show-overflow-tooltip="true" >
            <template slot="header" slot-scope="scope">
              <span>订单金额</span>
              <el-tooltip class="item" effect="dark" content="订单金额描述" placement="right">
                <svg-icon icon-class="price"  />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="orderPriceDesc(scope.$index, list)"
                type="text"
                size="20px">
                {{ scope.row.price }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="created_at" show-overflow-tooltip="true" >
            <template slot="header" slot-scope="scope">
              <span>用户</span>
              <el-tooltip class="item" effect="dark" content="用户信息描述" placement="right">
                <i class="el-icon-user-solid"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showMess(scope.$index, list)"
                type="text"
                size="20px">
                {{ scope.row.users }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" show-overflow-tooltip="true" >
            <template slot="header" slot-scope="scope">
              <span>物流</span>
              <el-tooltip class="item" effect="dark" content="订单物流描述" placement="right">
                <i class="el-icon-location"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showMess(scope.$index, list)"
                type="text"
                size="20px">
                {{ scope.row.logistics }}
              </el-button>
              <span></span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :sm="{span: 5, offset: 19}" :xs="{span: 24}">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="total"
          @current-change="handleSizeChange"
          page-size="3"
          small="false"
          style="margin-top: 15px;margin-right: 10px;"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!--===================商品详情描述弹出框(开始)========================-->
    <el-dialog title="商品详情" :visible.sync="productDescVisible"  width="30%" >
        <el-table
          v-loading="listLoading"
          :data="orderDescList"
          element-loading-text="Loading"
          border
        >
          <el-table-column class-name="status-col" label="类型"  show-overflow-tooltip="true"  >
            <template slot-scope="scope">
              <span>{{ scope.row.cast }}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="created_at" label="信息"  show-overflow-tooltip="true"  >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer " >
          <el-button @click="productDescVisible = false">取 消</el-button>
          <el-button type="primary" @click="productDescVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <!--===================商品详情描述弹出框(结束)========================-->


    <!--===================订单金额详情弹出框(开始)========================-->
    <el-dialog title="订单金额" :visible.sync="orderPriceVisible"  width="30%" >
      <el-table
        v-loading="listLoading"
        :data="orderPriceList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型"  show-overflow-tooltip="true"  >
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="created_at" label="信息"  show-overflow-tooltip="true"  >
          <template slot-scope="scope">
            <span v-if="scope.$index==6">
                <el-input v-model="elsePrice"   placeholder="请输入" :value="scope.row.desc"  ></el-input>
            </span>
            <span v-if="scope.$index==7">
                <el-input v-model="elseDesc"   placeholder="请输入" :value="scope.row.desc"  ></el-input>
            </span>
            <span v-if="scope.$index!=7&&scope.$index!=6">
                {{scope.row.desc}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer " >
        <el-button @click="orderPriceVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderPriceVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================订单金额详情弹出框(结束)========================-->

  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderDescList:[
          {cast:"商品编号",desc:"1231241413"},
          {cast:"店铺名称",desc:"小彭家具"},
          {cast:"商品名称",desc:"茶杯"},
          {cast:"商品数量",desc:"2"},
          {cast:"商品总金额",desc:"78"},
          {cast:"商品购项",desc:"红色-4g-6+128"},
        ],
        orderPriceList:[
          {cast:"支付编号",desc:"5148949848948"},
          {cast:"下单时间",desc:"2019-1"},
          {cast:"商品金额",desc:"110"},
          {cast:"优惠金额",desc:"20"},
          {cast:"实付金额",desc:"90"},
          {cast:"运费",desc:"15"},
          {cast:"其他金额",desc:"0"},
          {cast:"其他描述",desc:"无"},
          {cast:"支付时间",desc:"2019-1-1"},
          {cast:"支付类型",desc:"支付宝"},
        ],
        productDescVisible: false,
        orderPriceVisible:  false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        startDate: '',
        endDate: '',
        orderCast: '',
        orderState: '',
        orderPid: '',
        dianPuNamer: '',
        total: 100,
        currentPage: 2,
        elsePrice:'',
        elseDesc:'',
        list: [
          {
            pid: '1',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '2',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '3',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '4',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '5',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '6',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '7',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '8',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '8',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '9',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          },
          {
            pid: '10',
            number: '123123',
            store: '小彭家居',
            date: '2019-9-9',
            cast: '优惠订单',
            state: '已发货',
            product: '苹果6x',
            price:123,
            users:'小明',
            logistics:'123123'
          }
        ]
      }
    },

    methods: {
      //表单提交方法
      onSubmit() {
        console.log('submit!')
      },

      //商品详情方法
      productDesc(currIndex,obj){
          this.productDescVisible=true
      },
      //订单金额方法
      orderPriceDesc(currIndex,obj){
        this.orderPriceVisible=true
      }
    }
  }
</script>

<style >


  /*==================自定义自适应css========================*/
  @media only screen and (min-width: 600px) and (max-width: 2000px) {
    .el-form .el-form-item .el-input__inner{
      width: 216px !important;
    }
  }
  @media only screen and (min-width: 300px) and (max-width: 500px) {
    .el-form .el-form-item .el-input__inner{
      width: 250px !important;
    }
    .el-form .el-row{
      margin: 0 auto;
      text-align:center;
    }
    .el-col-xs-23{
      width: 100%;
    }
    .el-form-item .el-button{
      width: 250px !important;
    }
    .el-divider span{
      font-size: 11px;
    }

    /*========弹出框样式信息开始============*/
    .el-dialog__wrapper .el-dialog{
       width: 80% !important;
    }


  }


  /*========弹出框样式信息开始============*/
  .el-dialog__body{
    padding-top: 10px !important;
  }
  .el-dialog__body .el-table td{
    padding: 6px 0px !important;
  }




  /*========当前页面的一些初始样式 输入框和表格等标签样式===========*/
  .el-divider span{
    color: #606266;font-weight:bold;
  }
  .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;

  }
  .el-table td{
    padding: 0px;
  }
  #listArea{
    margin: 30px;
  }



</style>
