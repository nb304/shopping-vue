<template>
	<div id="listArea">

		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-row :gutter="24">
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="">
						<el-button type="primary">主要按钮</el-button>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="店铺名称">
						<el-input v-model="formInline.user" placeholder="输入名称"><i slot="prefix" class="el-icon-edit"></i></el-input>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="订单类型">
						<el-select v-model="formInline.region" placeholder="选择">
							<el-option label="普通订单" value="普通订单"></el-option>
							<el-option label="优惠订单" value="优惠订单"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="订单状态">
						<el-select v-model="formInline.region" placeholder="选择">
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
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="开始时间" class="myItem">
						<el-date-picker style="width: 100%;" v-model="value1" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="结束时间" class="myItem">
						<el-date-picker style="width: 100%;" v-model="value2" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
						</el-date-picker>
					</el-form-item>
				</el-col>


				<el-col :sm="{span: 6, offset: 6}" :xs="{span: 23}">
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="onSubmit" style="width: 215px; margin-left: 70px;">搜索</el-button>
					</el-form-item>
				</el-col>


			</el-row>
		</el-form>
		<el-row :gutter="24">
			<el-col :sm="{span: 24}" :xs="{span: 24}">
				<div>
					<el-divider content-position="right">
						<span>数量:900件</span>
					</el-divider>
				</div>
			</el-col>
		</el-row>

		<!-- ======================= 商品信息管理Talbe =========================  -->
		<el-row :gutter="24">
			<el-col :sm="{span: 24}" :xs="{span: 24}">

				<el-table class="title-menu-min" :data="tableData" border style="width: 100%">
					<el-table-column prop="date" label="编号" width="150">
					</el-table-column>
					<el-table-column prop="name" label="商品名称" width="120">
					</el-table-column>
					<el-table-column prop="province" label="商品品牌" width="120">
					</el-table-column>
					<el-table-column prop="city" label="商品类目" width="120">
					</el-table-column>
					<el-table-column prop="address" label="商品总库存" width="300">
					</el-table-column>
					<el-table-column prop="address" label="商品SPU参数" width="300">
					</el-table-column>
					<el-table-column prop="address" label="商品SKU参数" width="300">
					</el-table-column>
					<el-table-column prop="address" label="商品状态" width="300">
					</el-table-column>
					<el-table-column prop="address" label="创建人" width="300">
					</el-table-column>
					<el-table-column prop="address" label="操作人" width="300">
					</el-table-column>
					<el-table-column prop="address" label="操作人" width="300">
					</el-table-column>
					<el-table-column prop="zip" label="所属店铺" width="120">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
							<el-button type="text" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<!-- ======================= 商品信息管理Talbe(结束) =========================  -->

		<el-row :gutter="24">
			<el-col :sm="{span: 5, offset: 19}" :xs="{span: 24}">
				<el-pagination background layout="prev, pager, next" :current-page="currentPage" :total="total" @current-change="handleSizeChange"
				 page-size="3" small="false" style="margin-top: 15px;margin-right: 10px;">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value1: '',
				value2: '',
				formInline: {
					user: '',
					region: ''
				},
				total: 100,
				currentPage: 2,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1517 弄',
					zip: 200333
				}, {
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1519 弄',
					zip: 200333
				}, {
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}],
				dialogFormVisible: false
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			showMess(currIndex, obj2) {
				alert(obj2[currIndex].users);
			}
		}
	}
</script>

<style>
	
	/*新加入隐藏滚动条效果*/
	.title-menu-min {
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
	
	/*==================自定义自适应css========================*/
	@media only screen and (min-width: 600px) and (max-width: 2000px) {
		.el-form .el-form-item .el-input__inner {
			width: 216px !important;
		}
	}

	@media only screen and (min-width: 300px) and (max-width: 500px) {
		.el-form .el-form-item .el-input__inner {
			width: 250px !important;
		}

		.el-form .el-row {
			margin: 0 auto;
			text-align: center;
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

		/* .myItem{
			width: 100% !important;
		}
		.myItem .el-form-item__label{
			width: 66px;
			padding: 0px;
			text-align: left;
		} */
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
		padding: 3px 0px;
		padding-left: 10px;
		color: #606266;

	}

	.el-table td {
		padding: 3px 0;
	}

	#listArea {
		margin: 30px;
	}
</style>
