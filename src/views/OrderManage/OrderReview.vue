<template>
  <div id="listArea">
    <el-form :inline="true" class="demo-form-inline searchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单编号">
            <el-input v-model="orderPid" placeholder="输入编号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="用户账号">
            <el-input v-model="userPid" placeholder="输入账号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="审批类型">
            <el-select v-model="reviewCast" placeholder="选择">
              <el-option label="审批未通过" value="审批未通过" />
              <el-option label="审批通过" value="审批未通过" />
              <el-option label="待审批" value="待审批" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单状态">
            <el-select v-model="orderState" placeholder="选择">
              <el-option label="待付款" value="待付款" />
              <el-option label="已取消" value="已取消" />
              <el-option label="未发货" value="未发货" />
              <el-option label="已发货" value="已发货" />
              <el-option label="未收货" value="未收货" />
              <el-option label="未收货-退单中" value="未收货-退单中" />
              <el-option label="未收货-退单成功" value="未收货-退单成功" />
              <el-option label="已收货" value="已收货" />
              <el-option label="已收货-退单中" value="已收货-退单中" />
              <el-option label="已收货-退单成功" value="已收货-退单成功" />
              <el-option label="已收货-换货中" value="已收货-换货中" />
              <el-option label="已收货-换货成功" value="已收货-换货成功" />
              <el-option label="待评价" value="待评价" />
              <el-option label="已结算" value="已结算" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}">
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
        <el-col :sm="{span: 6}" :xs="{span: 23}">
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

        <el-col :sm="{span: 6, offset: 6}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 215px; margin-left: 70px;" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>数量:900笔</span>
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
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="订单编号" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.pid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.applyTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="审批类型" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.reviewCast }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="订单状态" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.orderState }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>审批信息</span>
              <el-tooltip class="item" effect="dark" content="审批信息详情" placement="right">
                <svg-icon icon-class="product" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="productDesc(scope.$index, list)"
              >
                {{ scope.row.reviewMess }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>商家信息</span>
              <el-tooltip class="item" effect="dark" content="商家信息详情" placement="right">
                <svg-icon icon-class="dianpu2" style="color: #606266;" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderPriceDesc(scope.$index, list)"
              >
                {{ scope.row.merchant }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>订单金额</span>
              <el-tooltip class="item" effect="dark" content="订单金额描述" placement="right">
                <svg-icon icon-class="price" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderPriceDesc(scope.$index, list)"
              >
                {{ scope.row.price }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>用户</span>
              <el-tooltip class="item" effect="dark" content="用户信息描述" placement="right">
                <i class="el-icon-user-solid" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderUserDesc(scope.$index, list)"
              >
                {{ scope.row.users }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>审批结果</span>
              <el-tooltip class="item" effect="dark" content="审批结果信息" placement="right">
                <svg-icon icon-class="result" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderExpressDesc(scope.$index, list)"
              >
                审批结果
              </el-button>
              <span />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>操作</span>
              <el-tooltip class="item" effect="dark" content="审批操作" placement="right">
                <svg-icon icon-class="xiugai2" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderExpressDesc(scope.$index, list)"
              >
                审批
              </el-button>
              <span />
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      orderPid: '', // 订单编号
      userPid: '', // 用户账号
      reviewCast: '', // 订单类型
      orderState: '', // 订单状态
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      list: [
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        }
      ]

    }
  }

}

</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/

  .el-form .el-row{
    margin: 0 auto;
    text-align:center !important;
  }

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
  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1301px) and (max-width: 2000px) { /*宽=================1301 -- 2000==================*/
    .el-form .el-form-item .el-input__inner{
      width: 216px !important;
    }
  }

  @media only screen and (min-width: 360px) and (max-width: 500px) {  /*宽================360 -- 500px================*/
    .el-form .el-form-item .el-input__inner{
      width: 250px !important;
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
    .el-col{
      padding: 0px !important;
    }

    .el-dialog__wrapper .el-dialog{
      width: 90% !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px)  {   /*宽=================200 -- 350==================*/
    .searchForm .el-col{
      padding: 0px !important;
      margin-left: 10px;
    }
    .searchForm  .el-form-item .el-form-item__content{
      width: 194px !important;
    }
    .searchForm .el-form-item .el-button{
      margin-left: 34px !important;
      width: 195px !important;
    }

    .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    .searchForm .el-form-item .el-button{
      margin-left: 34px !important;
      width: 195px !important;
    }
  }

  /*==================自定义自适应css样式详情结束 ========================*/

</style>
