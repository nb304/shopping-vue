<template>
	<div id="listArea">

		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-row :gutter="24">
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item>

						<el-button type="primary" @click="addProductFlag = true" style="width: 215px; margin-left: 70px;">
							<svg-icon icon-class="tianjia" class-name='' style="width:14px !important; height:14px !important; margin-right:10px;" />
							添加商品
						</el-button>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item>
						<el-button type="primary" @click="onSubmit" style="width: 215px; margin-left: 70px;">
							<svg-icon icon-class="tianjia" class-name='' style="width:14px !important; height:14px !important; margin-right:10px;" />
							批量导入商品SKU信息
						</el-button>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="商品状态">
						<el-select v-model="formInline.productState" placeholder="选择">
							<el-option label="全部" value="6"></el-option>
							<el-option label="上架中" value="5"></el-option>
							<el-option label="下架" value="1"></el-option>
							<el-option label="删除" value="2"></el-option>
							<el-option label="库存充足" value="3"></el-option>
							<el-option label="库存不足" value="4"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="搜索商品">
						<el-input v-model="formInline.user" placeholder="商品的名称/类型"><i slot="prefix" class="el-icon-edit"></i></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="24">
				<el-col :sm="{span: 6, offset: 18}" :xs="{span: 23}">
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

				<el-table class="title-menu-min" v-loading="listLoading" :data="tableData" border style="width: 100%">
					<el-table-column prop="date" label="编号" width="100" show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="name" label="商品名称" width="220" show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="商品品牌" width="120" show-overflow-tooltip="true">
						小米
					</el-table-column>
					<el-table-column prop="city" label="商品类目" width="90">
						<el-button type="text" size="small">查看详情</el-button>
					</el-table-column>
					<el-table-column prop="address" label="商品总库存" width="300">
					</el-table-column>
					<el-table-column prop="address" label="SPU参数" width="100">
						<el-button type="text" size="small">查看详情</el-button>
					</el-table-column>
					<el-table-column prop="address" label="SKU参数" width="100">
						<el-button type="text" size="small">查看详情</el-button>
					</el-table-column>
					<el-table-column prop="address" label="商品状态" width="90">
						<el-link type="primary" :underline="false">上架</el-link>
					</el-table-column>
					<el-table-column prop="address" label="创建人" width="300" show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="address" label="操作人" width="300" show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="zip" label="所属店铺" width="120" show-overflow-tooltip="true">
						<el-button slot-scope="scope" type="text" size="small">{{scope.row.date}}</el-button>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
							<el-button type="text" size="small">编辑</el-button>
							<el-button type="text" size="small">删除</el-button>
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

		<!-- ======================= 商品管理弹出层 =========================  -->

		<!-- ======================= 添加商品弹出层 =========================  -->
		<el-dialog :title="addProductTitle" :visible.sync="addProductFlag" class="addProduct">
			<!-- ======================= 步骤一=========================  -->
			<div v-if="isShowOneFlag" id="stepone" class="stepList">

				<el-form :inline="true" ref="addProductTwoFrom" :model="addProductTwoFrom" label-width="80px">
					<el-row :gutter="24">

						<el-col :sm="{span: 12,offset: 6}" :xs="{span: 23}">
							
							<el-form-item label="商品类目" style="width:100%;">
								<el-cascader class="addProductFormInput" v-model="ProductMuluListIds" :options="options" @change="handleChange"></el-cascader>
							</el-form-item>
						</el-col>

					</el-row>
				</el-form>


				<!-- <div>
					<div id="leimu1" style="float:left; margin:0px 30px 0px 60px;">
						<span>一级类目</span>
						<el-card class="box-card title-menu-min" style="max-height:340px;min-height:340px; margin:0px 30px; 0px 60px;">
							<div v-for="o in 100" :key="o" class="text item" style="width:130px;float:left; margin:5px 0px 5px 5px;">
								<input type="radio" @click="findTypeOneSubList(o)" value="1" name="mulu1" />
								<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
									<el-button type="info" class="autocut" plain style="width:110px;">信息按信息按信息按信息按信息按信息按</el-button>
								</el-tooltip>

							</div>
						</el-card>
					</div>

					<div id="leimu2">
						<span>二级类目</span>
						<el-card class="box-card title-menu-min" style="max-height:340px;min-height:340px;">
							<div v-for="o in 10" :key="o" class="text item" style="width:130px;float:left; margin:5px 0px 5px 5px;">
								<input type="radio" @click="findTypeTwoSubList(o)" value="1" name="mulu2" />
								<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
									<el-button type="info" class="autocut" plain style="width:110px;">信息按信息按信息按信息按信息按信息按</el-button>
								</el-tooltip>
							</div>
						</el-card>
					</div>
				</div> -->
			</div>
			<!-- ======================= 步骤一(结束)=========================  -->

			<!-- ======================= 步骤二=========================  -->
			<div id="steptwo" v-if="isShowTwoFlag">
				<el-form :inline="true" ref="addProductTwoFrom" :model="addProductTwoFrom" label-width="80px">

					<el-row :gutter="24">

						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品名称" style="width:100%;">
								<el-input class="addProductFormInput" v-model="addProductTwoFrom.name" placeholder="请输入商品名称"></el-input>
							</el-form-item>
						</el-col>

						<el-col :sm="{span: 12}" :xs="{span: 23}">

							<el-form-item label="商品品牌">
								<el-select class="addProductFormInput" v-model="addProductTwoFrom.region" placeholder="请选择商品品牌">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-col>

					</el-row>

					<el-row :gutter="24">
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="市场价格">
								<el-input class="addProductFormInput" v-model="addProductTwoFrom.name" placeholder="请输入市场价格"></el-input>
							</el-form-item>
						</el-col>

						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商城价格">
								<el-input class="addProductFormInput" v-model="addProductTwoFrom.name" placeholder="请输入商城价格"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-form>
			</div>
			<!-- ======================= 步骤二(结束)=========================  -->

			<!-- ======================= 步骤三=========================  -->
			<div id="stepthree" v-if="isShowThreeFlag">
				<el-form :inline="true" ref="addProductThreeFrom" :model="addProductTwoFrom" label-width="80px">
					<el-row :gutter="24">
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品卖点" style="width:100%;">
								<el-input class="addProductFormInput" v-model="addProductTwoFrom.name" placeholder="请输入商品卖点"></el-input>
							</el-form-item>
						</el-col>

						<el-col :sm="{span: 12}" :xs="{span: 23}">

							<el-form-item label="排序" style="width:100%;">
								<el-input class="addProductFormInput" v-model="addProductTwoFrom.name" placeholder="请输入商品排序"></el-input>
							</el-form-item>
						</el-col>

					</el-row>

					<el-row :gutter="24">
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品单位" style="width:100%;">
								<el-input class="addProductFormInput" v-model="addProductTwoFrom.name" placeholder="请输入商品单位"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品详情">
								<el-input type="textarea" class="addProductFormInput" v-model="addProductTwoFrom.desc"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-form>
			</div>
			<!-- ======================= 步骤三(结束)=========================  -->

			<!-- ======================= 步骤四========================  -->
			<div id="stepfour" v-if="isShowFourFlag">
				<el-form :inline="true" ref="addProductTwoFrom" :model="addProductTwoFrom" label-width="80px">
					<el-row :gutter="24">
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="SPU" style="width:100%;">
								<el-button type="primary" style="width:270px;">添加商品的SPU</el-button>
							</el-form-item>
						</el-col>

						<el-col :sm="{span: 12}" :xs="{span: 23}">

							<el-form-item label="SKU" style="width:100%;">
								<el-button type="primary" style="width:270px;">添加商品的SKU</el-button>
							</el-form-item>
						</el-col>

					</el-row>

					<el-row :gutter="24">
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品图片" style="width:100%;">
								<el-button type="primary" style="width:270px;">添加商品图片</el-button>
							</el-form-item>
						</el-col>
						
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品详情" style="width:100%;">
								<el-button type="primary" style="width:270px;">添加商品详情</el-button>
							</el-form-item>
						</el-col>
					</el-row>

				</el-form>

			</div>
			<!-- ======================= 步骤四(结束)=========================  -->
			<!-- ======================= 添加商品进度=========================  -->
			<el-steps :active="active" finish-status="success" align-center style="margin-top:30px;">
				<el-step title="步骤1" description="选择商品类目" show-overflow-tooltip="true"></el-step>
				<el-step title="步骤2" description="添加宝贝基本信息" show-overflow-tooltip="true"></el-step>
				<el-step title="步骤3" description="添加宝贝详细信息"></el-step>
				<el-step title="步骤4" description="填写宝贝重要信息"></el-step>
			</el-steps>
			<el-button v-if="isAddOrNextFlag" style="margin-top: 12px;" @click="next">我已阅读无误,下一步</el-button>
			<el-button v-if="!isAddOrNextFlag" style="margin-top: 12px;" @click="next">我已阅读无误,确认添加</el-button>
		</el-dialog>
		<!-- ======================= 添加商品弹出层End =========================  -->

		<!-- ======================= 商品管理弹出层End =========================  -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 商品类目数据
				ProductMuluListIds: [],
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则'
					}, {
						value: 'daohang',
						label: '导航'
					}]
				}, {
					value: 'zujian',
					label: '组件',
					children: [{
						value: 'basic',
						label: 'Basic'
					}, {
						value: 'form',
						label: 'Form'
					}, {
						value: 'data',
						label: 'Data'
					}, {
						value: 'notice',
						label: 'Notice'
					}, {
						value: 'navigation',
						label: 'Navigation'
					}, {
						value: 'others',
						label: 'Others'
					}]
				}, {
					value: 'ziyuan',
					label: '资源',
					children: [{
						value: 'axure',
						label: 'Axure Components'
					}, {
						value: 'sketch',
						label: 'Sketch Templates'
					}, {
						value: 'jiaohu',
						label: '组件交互文档'
					}]
				}],
				// 第二步用到的表单
				addProductTwoFrom: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				// 是否显示第四步flag
				isShowFourFlag: false,
				// 是否显示第三步flag
				isShowThreeFlag: false,
				// 是否显示第二步flag
				isShowTwoFlag: false,
				// 是否显示第一步flag
				isShowOneFlag: true,
				// 商品二级类目的id
				productTwoTypeId: '',
				// 商品一级类目的id
				productOneTypeId: '',
				// 添加商品时,显示添加还是下一步的flag
				// true显示下一步 false显示添加
				isAddOrNextFlag: true,
				// 添加商品步骤数
				active: 0,
				value1: '',
				value2: '',
				listLoading: true,
				formInline: {
					user: '',
					region: '',
					productState: ''
				},
				total: 100,
				currentPage: 2,
				dialogFormVisible: false,
				// 是否显示添加商品的窗口
				addProductFlag: false,
				// 添加商品的标题
				addProductTitle: "添加商品",
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
				}]
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			showMess(currIndex, obj2) {
				alert(obj2[currIndex].users);
			},
			// 添加商品的下一步操作
			next() {
				// 判断是否为第一步
				if (this.active == 0) {
					// 需要判断是否勾选一二级类目
					if (this.ProductMuluListIds.length != 2) {
						this.$message.error('请选择该商品的类目(准确到二级类目去)');
						return;
					}
					this.isShowOneFlag = false;
					this.isShowTwoFlag = true;
				} else if (this.active == 1) {
					// 第二步
					// 需要判断表单的值是否正确
					this.$message({
						message: '记住将表单填写完整',
						type: 'warning'
					});
					// 将第二步骤隐藏
					this.isShowTwoFlag = false;
					// 打开第三步骤
					this.isShowThreeFlag = true;
				} else if (this.active == 2) {
					// 第三步
					// 需要判断表单的值是否正确
					this.$message({
						message: '记住将表单填写完整',
						type: 'warning'
					});

					// 将第三步骤隐藏
					this.isShowThreeFlag = false;
					// 打开第四步骤
					this.isShowFourFlag = true;
				}
				if (this.active++ >= 3) {

					this.isAddOrNextFlag = false;
					this.$message({
						message: '提交前请记住做校验哦',
						type: 'warning'
					});
				}
			},
			// 单击单选按钮第一类目
			findTypeOneSubList(id) {
				if (this.productOneTypeId != id) {
					// 替换id
					this.productTwoTypeId = '';
					this.productOneTypeId = id;
				}
			},
			// 单击单选按钮第二类目
			findTypeTwoSubList(id) {
				this.productTwoTypeId = id;
			},
			handleChange(value) {
				console.log(value);
			}
		},
		created() {
			console.log("123");
			this.listLoading = false;
		}
	}
</script>

<style>
	.el-form-item .el-form-item__content .addProductFormInput .el-input__inner,
	.el-textarea__inner {
		width: 270px !important;
	}

	.autocut {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		-icab-text-overflow: ellipsis;
		-khtml-text-overflow: ellipsis;
		-moz-text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
	}

	/*  添加商品  */
	.addProduct .el-dialog {
		width: 900px !important;
	}

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

		/*  添加商品的css  */
		.addProduct .el-dialog {
			width: 400px !important;
		}

		#leimu1 {
			margin-left: 0px !important;
		}

		#leimu2 {
			margin-left: 30px !important;
		}

		/*  添加商品的css结束  */
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
