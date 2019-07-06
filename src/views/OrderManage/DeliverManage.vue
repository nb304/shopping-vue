<template>
  <div id="DeliverManage">
    <el-form :inline="true" class="demo-form-inline searchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 5}" :xs="{span: 23}">
          <el-form-item label="订单编号">
            <el-input v-model="orderPid" placeholder="输入编号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 5}" :xs="{span: 23}">
          <el-form-item label="用户账户">
            <el-input v-model="userPid" placeholder="输入用户编号 "><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 5}" :xs="{span: 23}">
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
        <el-col :sm="{span: 5}" :xs="{span: 23}">
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

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 200%;" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>店铺名称:小鹏家具</span>
            <el-divider direction="vertical" />
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
        <el-button type="primary" icon="el-icon-thumb" class="produce" style="width: 10%;" @click="onSubmit">一键生成</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'DeliverManage',
  data() {
    return {
      orderPid: '', // 订单编号
      userPid: '', // 用户账号
      startDate: '', // 开始时间
      endDate: '' // 结束时间
    }
  }
}
</script>

<style >

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #DeliverManage{
    margin: 30px;
  }

  #DeliverManage .searchForm .el-row{
     text-align: left !important;
   }
  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1301px) and (max-width: 2000px) { /*宽 ==================1301--2000px===========*/
    #DeliverManage .el-form .el-form-item .el-input__inner{
      width: 10rem !important;
    }

    #DeliverManage .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 15px !important;
    }

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) {  /*宽================360 -- 500px================*/

    #DeliverManage .searchForm .el-row{
      text-align: center !important;
    }

    #DeliverManage .el-form .el-form-item .el-input__inner {
      width: 13rem !important;
    }
    #DeliverManage .searchForm .el-col:nth-child(5){   /*代表设置功能搜索区域的第五个 el-col对应下标签的演示*/
      margin-left: -2rem !important;
    }

    #DeliverManage .searchForm button{
      width: 205% !important;
      margin-left: 0.8rem;
    }

    #DeliverManage .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }

    #DeliverManage .produce {  /*一键生成按钮样式*/
      width: 60% !important;
      margin-left: 5.8rem !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350px==================*/
    #DeliverManage .searchForm .el-row{
      text-align: center !important;
    }

    #DeliverManage .el-form .el-form-item .el-input__inner {
      width: 10.6rem !important;
    }

    #DeliverManage .searchForm .el-col:nth-child(5){   /*代表设置功能搜索区域的第五个 el-col对应下标签的演示*/
      margin-left: -0.5rem !important;
    }

    #DeliverManage .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #DeliverManage .produce {  /*一键生成按钮样式*/
      width: 60% !important;
      margin-left: 5.5rem !important;
    }
  }

  /*==================自定义自适应css样式详情结束 ========================*/
</style>
