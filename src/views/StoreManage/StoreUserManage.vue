<template>
  <div id="StoreUserManage">
    <!--==================分割线(开始)========================-->
    <el-row :gutter="24" >
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-tooltip class="item" effect="dark" content="店铺名称" placement="right">
              <svg-icon icon-class="dianpu2" />
            </el-tooltip>
            <span style="margin-right: 20px">:小鹏家具</span>
            <el-tooltip class="item" effect="dark" content="在线人数" placement="right">
              <i class="el-icon-user-solid" />
            </el-tooltip>
            <span>:6498人</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24"  style="100% !important;">
      <!--=================权限信息标签模块(开始)========================-->
      <el-col id="jurisdictionInfo" :sm="{span: 4}" :xs="{span: 24}" style="100% !important;">
        <el-row :gutter="24">
          <el-col :sm="{span: 23}" :xs="{span: 24}">
            <el-divider content-position="center">
              <span>权限</span>
            </el-divider>
          </el-col>
          <el-col :sm="{span: 23}" :xs="{span: 24}">
            <el-tree
              ref="tree"
              :data="jurisdictionList"
              show-checkbox
              node-key="id"
              highlight-current
              :props="defaultProps"
            />
          </el-col>
        </el-row>
      </el-col>
      <!--=================权限信息标签模块(结束)========================-->

      <!--=================基本信息标签模块(开始)========================-->
      <el-col id="basicInfo" :sm="{span: 4}" :xs="{span: 24}"  style="width: 100% !important;">
        <el-form :model="dynamicValidateForm" :inline="true" class="demo-form-inline" :rules="rules">

          <el-row :gutter="24">

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-divider content-position="center">
                <span>基本信息</span>
              </el-divider>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-form-item label="身份证号" prop="userPid">
                <el-input v-model="dynamicValidateForm.userPid" placeholder="请输入身份证"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-form-item label="电话号码" prop="phoneNumber">
                <el-input v-model="dynamicValidateForm.phoneNumber" placeholder="请输入电话号码"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-form-item label="用户姓名" prop="userName">
                <el-input v-model="dynamicValidateForm.userName" placeholder="请输入姓名"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-form-item label="用户地址" prop="userAddress">
                <el-input v-model="dynamicValidateForm.userAddress" placeholder="请输入地址"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-form-item label="账户密码" prop="userPassword">
                <el-input v-model="dynamicValidateForm.userPassword" placeholder="请输入密码"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}">
              <el-form-item label="性别" style="margin-left: 10px !important;">
                <el-radio-group v-model="dynamicValidateForm.sex" style="margin-left: 25px">
                  <el-radio label="男" value="0" />
                  <el-radio label="女" value="0" />
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 23}" :xs="{span: 24}" style="text-align: right;">
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus" style="width: 205px; margin-right: 10px " @click="onSubmit">添加</el-button>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </el-col>
      <!--=================基本信息标签模块(结束)========================-->

      <!--=================店铺人员信息标签模块(开始)========================-->
      <el-col id="storePerson" :sm="{span: 11}" :xs="{span: 24}"  style="width: 100% !important;">
        <el-row :gutter="24">
          <el-col :sm="{span: 23}" :xs="{span: 24}">
            <el-divider content-position="center">
              <span>店铺人员</span>
            </el-divider>
          </el-col>
          <el-col :sm="{span: 23}" :xs="{span: 24}">
            <el-table
              v-loading="listLoading"
              :data="userList"
              element-loading-text="Loading"
              @row-dblclick="handleSelect"
              style="width: 100% !important;"
            >
              <el-table-column label="序号" show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column label="账号" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.userId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="号码" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.phoneNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.phoneNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最近登录" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.loginTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否在线" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.whetherOnline }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.state }}</span>
                </template>
              </el-table-column>

              <el-table-column label="状态" show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.state }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
      <!--=================店铺人员信息标签模块(结束)========================-->

    </el-row>

  </div>

</template>
<script>
export default {
  data() {
    return {
      jurisdictionList: [
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        }
      ],
      dynamicValidateForm: {
        userPid: '', // 用户id
        phoneNumber: '', // 电话号码
        userName: '', // 用户名称
        userAddress: '', // 用户地址
        userPassword: '', // 用户密码
        sex: '男' // 性别
      },
      rules: {
        userPid: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userAddress: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
  }

}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #StoreUserManage{
    margin: 30px;
  }

  #StoreUserManage .el-divider span{   /*分割线样式*/
    color: #606266;
    font-weight:bold;
  }

  #StoreUserManage .el-form--inline .el-form-item{
    margin: 0px !important;
    margin-bottom: 19px !important;
  }
  #StoreUserManage .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #StoreUserManage .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #StoreUserManage .el-table td{
    padding: 0px;
  }

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/
    #StoreUserManage #basicInfo .el-row{        /* 基础信息布局的对应的信息*/
      width: 20rem !important;
      margin: 0px !important;
    }

    #StoreUserManage #basicInfo .el-input__inner{ /*基础信息中输入框样式*/
      width: 12rem !important;
    }
    #StoreUserManage #basicInfo{ /*基础信息中样式*/
      width: 26% !important;
    }

    #StoreUserManage #jurisdictionInfo .el-row{ /*权限信息样式*/
      width: 13.4rem !important;
      margin-left: -5px !important;
    }

    #StoreUserManage #storePerson .el-row{ /*店铺人员信息样式*/
      width: 135% !important;
    }
  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

    #StoreUserManage #basicInfo{
      width: 25% !important;
    }
    #StoreUserManage #basicInfo .el-row{        /* 基础信息布局的对应的信息*/
      width: 16.5rem !important;
      margin: 0px !important;
    }

    #StoreUserManage #basicInfo .el-input__inner{ /*基础信息中输入框样式*/
      width: 9.4rem !important
    }

    #StoreUserManage #jurisdictionInfo{ /*权限信息样式*/
      width: 18% !important;
    }
    #StoreUserManage #jurisdictionInfo .el-row{ /*权限信息样式*/
      width: 13.5rem !important;
      margin-left: -5px !important;
    }

    #StoreUserManage #storePerson { /*店铺人员信息样式*/
      width: 57%!important;
    }
  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/
    #StoreUserManage #basicInfo{ /*基础信息布局模板样式*/
      width: 100% !important;
    }
    #StoreUserManage #basicInfo .el-input__inner{ /*基础信息中输入框样式*/
      width: 13rem !important;
    }
    #StoreUserManage #basicInfo .el-row{        /* 基础信息布局的对应的信息*/
      width: 19.5rem !important;
    }

    #StoreUserManage #jurisdictionInfo{ /*权限信息样式*/
      width: 100% !important;
    }
    #StoreUserManage #jurisdictionInfo .el-row{ /*权限信息样式*/
      width: 19.5rem !important;
      margin-left: 0px !important;
    }

  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    #StoreUserManage #basicInfo{ /*基础信息布局模板样式*/
      width: 100% !important;
    }
    #StoreUserManage #basicInfo .el-input__inner{ /*基础信息中输入框样式*/
      width: 8.8rem !important;
    }
    #StoreUserManage #basicInfo .el-row{        /* 基础信息布局的对应的信息*/
      width: 15.5rem !important;
    }

    #StoreUserManage #jurisdictionInfo{ /*权限信息样式*/
      width: 100% !important;
    }

    #StoreUserManage #jurisdictionInfo .el-row{ /*权限信息样式*/
      width: 15.7rem !important;
      margin-left: 0px !important;
    }
  }
</style>
