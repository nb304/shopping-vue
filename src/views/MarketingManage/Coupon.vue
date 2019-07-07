<template>
  <div id="listArea">
    <el-form :inline="true" class="demo-form-inline searchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="优惠券标题">
            <el-input v-model="orderPid" placeholder="输入编号">
              <i slot="prefix" class="el-icon-edit" />
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="优惠券类型">
            <el-input v-model="dianPuName" placeholder="输入名称">
              <i slot="prefix" class="el-icon-edit" />
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="优惠金额">
            <el-select v-model="orderCast" placeholder="选择">
              <el-option label="普通订单" value="普通订单" />
              <el-option label="优惠订单" value="优惠订单" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              style="width: 215px; margin-left: 70px;"
              @click="onSearch()"
            >搜索</el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>
            <el-button
              type="primary"
              style="width: 215px; margin-left: 70px;"
              @click="dialogFormVisible = true"
            >
              <svg-icon
                icon-class="tianjia"
                class-name
                style="width:14px !important; height:14px !important; margin-right:10px;"
              />添加优惠券
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <!-- <span>数量:900笔</span> -->
            <el-divider direction="vertical" />
            <span>时间:2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="优惠券标题" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优惠券类型" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优惠条件" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ scope.row.term }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="优惠金额" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="开始时间" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.timeState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ scope.row.tiemEnd }}</span>
            </template>
          </el-table-column>

          <el-table-column label="发放个数" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>优惠范围</span>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="addShops(scope.$index, list)"
              >添加商品</el-button>
            </template>
          </el-table-column>

          <!-- <el-tooltip class="item" effect="dark" content="用户信息描述" placement="right">
                <i class="el-icon-user-solid" />
          </el-tooltip>-->
          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>结束时间</span>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="productDesc(scope.$index, list)"
              >停用</el-button>
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="productDesc(scope.$index, list)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--==================分页组件(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 4, offset: 18}" :xs="{span: 24}">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="total"
          page-size="3"
          small="false"
          style="margin-top: 15px;margin-right: 10px;"
          @current-change="handleSizeChange"
        />
      </el-col>
    </el-row>
    <!--==================分页组件(结束)========================-->

    <!--===================商品详情描述弹出框(开始)========================-->
    <el-dialog title="商品详情" :visible.sync="productDescVisible" width="30%">
      <el-table v-loading="listLoading" :data="orderDescList" element-loading-text="Loading" border>
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-row :gutter="24">
          <el-col
            :sm="{span: 8,offset:16}"
            :xs="{span: 23}"
            style="margin-top:20px; text-align: center;"
          >
            <el-button style="width: 90%; " @click="productDescVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================商品详情描述弹出框(结束)========================-->
    <!--===================添加优惠券信息(开始)========================-->
    <el-dialog title="添加优惠券" :visible.sync="dialogFormVisible">
      <el-row :gutter="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="12">
            <el-form-item label="优惠类型">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="店铺优惠" value="shanghai"></el-option>
                <el-option label="商品优惠" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠标题">
              <el-input v-model="form.tiele" placeholder="优惠标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="满减门槛">
              <el-input v-model="form.hig" placeholder="满减门槛"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="发放个数">
              <el-input v-model="form.num" placeholder="发放个数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="活动时间">
              <el-col :span="8" style="padding:0">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date2"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================添加优惠券信息(结束)========================-->

    <el-dialog title="商品详情" :visible.sync="addShopsVisible" width="60%">
      <el-button
        type="primary"
        style="width: 215px; margin-left: 70px;"
        @click="addShopsVisible = true"
      >
        <svg-icon
          icon-class="tianjia"
          class-name
          style="width:14px !important; height:14px !important; margin-right:10px;"
        />添加我的商品/店铺
      </el-button>

      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-row :gutter="24">
          <el-col
            :sm="{span: 8,offset:16}"
            :xs="{span: 23}"
            style="margin-top:20px; text-align: center;"
          >
            <el-button style="width: 90%; " @click="addShopsVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, // 添加优惠券
      form: {},
      startDate: "", // 开始时间
      endDate: "", // 结束时间
      orderCast: "", // 订单类型
      orderState: "", // 订单状态
      orderPid: "", // 订单编号
      dianPuName: "", // 店铺名称
      elsePrice: "", // 订单金额对应里面的其他金额
      elseDesc: "", // 订单金额对应里面的其他描述
      addShopsVisible: false, // 添加优惠去弹窗
      expressPid: "", // 物流单号
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      list: [
        // 订单列表情况集合
        {
          title: "优惠券标题",
          type: "优惠券类型",
          term: "优惠条件",
          money: "优惠金额",
          timeState: "开始时间",
          tiemEnd: "结束时间",
          num: "发放个数",
          shops: "优惠范围"
        },
        {
          title: "优惠券标题",
          type: "优惠券类型",
          term: "优惠条件",
          money: "优惠金额",
          timeState: "开始时间",
          tiemEnd: "结束时间",
          num: "发放个数",
          shops: "优惠范围"
        },
        {
          title: "优惠券标题",
          type: "优惠券类型",
          term: "优惠条件",
          money: "优惠金额",
          timeState: "开始时间",
          tiemEnd: "结束时间",
          num: "发放个数",
          shops: "优惠范围"
        },
        {
          title: "优惠券标题",
          type: "优惠券类型",
          term: "优惠条件",
          money: "优惠金额",
          timeState: "开始时间",
          tiemEnd: "结束时间",
          num: "发放个数",
          shops: "优惠范围"
        }
      ]
    };
  },
  methods: {
    // 表单提交方法
    onSearch() {
      alert("搜索");
    },
    // 添加优惠商品
    addShops() {
      this.addShopsVisible = true;
    }
  }
};
</script>

<style >
/*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/

.el-form .el-row {
  margin: 0 auto;
  text-align: center !important;
}

.el-divider span {
  color: #606266;
  font-weight: bold;
}
.el-table th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}
.el-table th {
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
.el-table td {
  padding: 0px;
}
#listArea {
  margin: 30px;
}
/*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

/*==================自定义自适应css样式详情开始 ========================*/
@media only screen and (min-width: 1301px) and (max-width: 2000px) {
  /*宽 ==================1301--2000px===========*/
  .el-form .el-form-item .el-input__inner {
    width: 216px !important;
  }
}

@media only screen and (min-width: 360px) and (max-width: 500px) {
  /*宽================360 -- 500px================*/
  .el-form .el-form-item .el-input__inner {
    width: 250px !important;
  }
  .el-col-xs-23 {
    width: 100%;
  }
  .el-form-item .el-button {
    width: 250px !important;
  }
  .el-divider span {
    font-size: 11px;
  }
  .el-col {
    padding: 0px !important;
  }

  .el-dialog__wrapper .el-dialog {
    width: 90% !important;
  }

  div[aria-label="物流详情"] .el-form .el-form-item .el-input__inner {
    /*=物流详情弹出框信息*/
    width: 184px !important;
  }
  div[aria-label="物流详情"] .el-form .el-form-item .el-button {
    margin-left: 68px !important;
    width: 184px !important;
  }
}

@media only screen and (min-width: 200px) and (max-width: 350px) {
  /*宽=================200 -- 350==================*/
  .searchForm .el-col {
    padding: 0px !important;
    margin-left: 10px;
  }
  .searchForm .el-form-item .el-form-item__content {
    width: 194px !important;
  }
  .searchForm .el-form-item .el-button {
    margin-left: 34px !important;
    width: 195px !important;
  }
  .el-divider__text {
    /*分割线样式*/
    right: 0px !important;
    font-size: 9px !important;
  }
  .el-dialog__wrapper .el-dialog {
    /*========弹出框样式信息开始============*/
    width: 100% !important;
  }
  div[aria-label="物流详情"] .el-form-item__content {
    width: 194px !important;
  }
  div[aria-label="物流详情"] .el-form-item__content button {
    width: 194px !important;
    margin-left: 35px !important;
  }
}

/*==================自定义自适应css样式详情结束 ========================*/

/*========弹出框样式信息开始============*/
.el-dialog__wrapper div[role="dialog"] {
  margin-top: 50px !important;
}
.el-dialog__body {
  padding-top: 10px !important;
}
.el-dialog__body .el-table td {
  padding: 6px 0px !important;
}
/*========弹出框样式信息结束============*/

/*=======内部滚动条显示的css样式情况 开始==========*/
.title-menu-min {
  /*新加入隐藏滚动条效果*/
  height: 450px !important;
  overflow-y: scroll !important;
  -webkit-overflow-scrolling: touch;
}

.title-menu-min::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}

.title-menu-min::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.title-menu-min::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
/*=======内部滚动条显示的css样式情况 开始==========*/

/*=======物流详细描述信息css样式开始==========*/
/* .title-menu-min ul {
  padding-left: 1.5rem;
} */

.title-menu-min ul li {
  list-style: none;
  font-size: 0.8rem;
}
.track-rcol {
  width: 90% !important;
}
.track-list {
  position: relative;
}
.track-list li {
  position: relative;
  padding: 0px 0 1.5rem 25px;
  line-height: 1rem;
  border-left: 1px solid #d9d9d9;
  color: #999;
}
.track-list li.first {
  color: red;
  padding-top: 0;
  width: 100%;
  text-align: left;
  border-left: 1px solid #d9d9d9;
}
.track-list li .node-icon {
  position: absolute;
  left: -5.5px;
  border-radius: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  top: 4px;
  background-color: #999999;
}
.track-list li.first .node-icon {
  background-position: 0-72px;
  background-color: red;
  width: 1rem;
  z-index: 2;
  height: 1rem;
  position: absolute;
  left: -9px;
  top: 0;
  border-radius: 0.5rem;
}
.track-list li .time {
  margin-right: 20px;
  position: relative;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
  background-color: white;
  color: #999;
  width: 100%;
  text-align: left;
}
.track-list li .txt {
  position: relative;
  display: inline-block;
  vertical-align: top;
  color: #999;
}
.track-list li.first .time {
  text-align: left;
  width: 94%;
  color: red;
}
.track-list li.first .txt {
  color: red;
  text-align: left;
  width: 94%;
}
.track-list li.finall {
  position: relative;
  padding: 0px 0 1.5rem 25px;
  line-height: 18px;
  border-color: white;
  border-left: 1px solid #ffffff;
  color: #999;
}
.track-list li.finall .div-spilander {
  width: 1px;
  position: absolute;
  position: absolute;
  left: -1.5px;
  height: 0.5rem;
  background-color: #d9d9d9;
}
/*=======物流详细描述信息css样式结束==========*/
</style>
