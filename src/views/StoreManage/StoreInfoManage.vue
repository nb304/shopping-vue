<template>

  <div id="stortInfo" style="margin: 50px 0px 0 0px !important;">

    <!-- ======================= 店铺信息管理  =========================  -->
    <el-divider content-position="left">店铺信息管理</el-divider>
    <div id="stortDiv" style="margin: 30px 50px 0 50px;">
      <el-form :inline="true" :model="stortInfoForm" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :sm="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺名称" style="width:100% !important;">
              <el-input v-model="stortInfoForm.stortName" style="width:100% !important;" placeholder="店铺名称" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺网址" style="width:100% !important;">
              <el-input v-model="stortInfoForm.stortUrl" style="width:100% !important;" disabled placeholder="店铺网址" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺等级" style="width:100% !important;">
              <el-input v-model="stortInfoForm.storeLeven" style="width:100% !important;" disabled placeholder="店铺等级" />
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺图片" style="width:100% !important;">
              <el-button type="primary" style="width: 100%;">设置店铺LOGO</el-button>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 12}" :xs="{span: 23}">
            <el-form-item label="设支付宝" style="width:100% !important;">
              <el-button type="primary" style="width: 100%;">设置收款的支付宝账户</el-button>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺描述" style="width:100% !important;">
              <el-input v-model="stortInfoForm.storeDesc" type="textarea" class="InputPx1200" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 4}" :xs="{span: 23}">
            <el-form-item style="width:100%;">
              <el-button type="danger" class="btn" style="width: 215px; margin-left: 70px;">确认修改</el-button>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 4}" :xs="{span: 23}">
            <el-form-item>
              <el-button type="primary" class="btn" style="width: 215px; margin-left: 70px;">恢复默认</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- ======================= 店铺信息管理(结束) =========================  -->

    <!-- ======================= 设置店长支付宝 =========================  -->

    <!-- ======================= 设置店长支付宝(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品信息管理Form
      stortInfoForm: {
        stortName: '鹿七七的小店',
        stortUrl: 'http://localhost:8080/store/luqiqi/23',
        storeLeven: '皇冠',
        storeDesc: ''
      }
    }
  }
}
</script>

<style>
	#stortInfo .el-form-item__content {
		width: 77% !important;
	}

	@media only screen and (min-width: 300px) and (max-width: 409px) {

		#stortInfo .el-form-item__content {
			width: 77% !important;
		}

		#stortDiv {
			margin: 0px 10px 0 20px !important;
		}

		.btn {
			width: 250px !important;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 500px) {
		#stortDiv {
			margin: 0px 10px 0 20px !important;
		}

		.btn {
			width: 280px !important;
		}
	}
</style>
