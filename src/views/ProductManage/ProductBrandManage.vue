<template>
	<div id="listArea" >
		<!-- ======================= 商品品牌按钮集合 =========================  -->
		<el-form :inline="true" :model="searchBrandForm" class="demo-form-inline">
			<el-row :gutter="24">
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="搜索品牌" >
						<el-input v-model="searchBrandForm.brandName" placeholder="品牌的名称"><i slot="prefix" class="el-icon-edit"></i></el-input>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item>

						<el-button type="primary" style="width: 215px; margin-left: 70px;">
							<svg-icon icon-class="tianjia" class-name='' style="width:14px !important; height:14px !important; margin-right:10px;" />
							添加品牌
						</el-button>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" style="width: 215px; margin-left: 70px;">搜索</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<!-- ======================= 商品品牌按钮集合(结束) =========================  -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 品牌搜索表单
				searchBrandForm: {
					brandName: ''
				},
				// 品牌加载层集合
				ProductBrandLoadings: [{
					isProductBrandHtmlLoading: false
				}]
			}
		}
	}
</script>

<style>
</style>
