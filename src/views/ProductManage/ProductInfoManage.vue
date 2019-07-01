<template>
	<div id="listArea" v-loading="isProductSPULoading">

		<!-- ======================= 商品信息按钮集合 =========================  -->
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-row :gutter="24">
				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="商品状态">
						<el-select v-model="formInline.productState" placeholder="选择">
							<el-option label="全部" value="6"></el-option>
							<el-option label="上架中" value="5"></el-option>
							<el-option label="下架" value="1"></el-option>
							<el-option label="删除" value="2"></el-option>
							<el-option label="库存充足" value="3"></el-option>
							<el-option label="库存不足" value="4"></el-option>
							<el-option label="编辑中" value="77"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :sm="{span: 6}" :xs="{span: 23}">
					<el-form-item label="搜索商品">
						<el-input v-model="formInline.user" placeholder="商品的名称/类型"><i slot="prefix" class="el-icon-edit"></i></el-input>
					</el-form-item>
				</el-col>

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
			</el-row>

			<el-row :gutter="24">
				<el-col :sm="{span: 6, offset: 18}" :xs="{span: 23}">
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="onSubmit" style="width: 215px; margin-left: 70px;">搜索</el-button>
					</el-form-item>
				</el-col>


			</el-row>
		</el-form>

		<!-- ======================= 商品信息按钮集合(结束) =========================  -->
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
						<el-button type="text" slot-scope="scope" size="small" @click="showProductLeimu(scope.row.date)">查看详情</el-button>
					</el-table-column>
					<el-table-column prop="address" label="商品总库存" width="300">
					</el-table-column>
					<el-table-column prop="address" label="SPU参数" width="100">
						<el-button type="text" slot-scope="scope" size="small" @click="shwoProductSpuInfo(scope.row.date)">查看详情</el-button>
					</el-table-column>
					<el-table-column prop="address" label="SKU参数" width="100">
						<el-button type="text" slot-scope="scope" size="small">查看详情</el-button>
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
		<el-dialog :fullscreen="isLoadingFull" :title="addProductTitle" :visible.sync="addProductFlag" class="addProduct" v-loading="isProductLoading">
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
								<el-button type="primary" style="width:270px;" @click="addProductSPU">添加商品的SPU</el-button>
							</el-form-item>
						</el-col>

						<el-col :sm="{span: 12}" :xs="{span: 23}">

							<el-form-item label="SKU" style="width:100%;">
								<el-button type="primary" style="width:270px;" @click="addProductSKU">添加商品的SKU</el-button>
							</el-form-item>
						</el-col>

					</el-row>

					<el-row :gutter="24">
						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品图片" style="width:100%;">
								<el-button type="primary" style="width:270px;" @click="addProductImages">添加商品图片</el-button>
							</el-form-item>
						</el-col>

						<el-col :sm="{span: 12}" :xs="{span: 23}">
							<el-form-item label="商品详情" style="width:100%;">
								<el-button type="primary" style="width:270px;" @click="addProductInfos">添加商品详情</el-button>
							</el-form-item>
						</el-col>
					</el-row>

				</el-form>

			</div>
			<!-- ======================= 步骤四(结束)=========================  -->

			<!-- ======================= 添加SPU ========================  -->
			<div id="addProductSpu" v-if="addProductSpuFlag" class="title-menu-min2" style="max-height: 400px; margin-left: 10px;">
				<el-form :inline="true" ref="addProductTwoFrom" :model="addProductTwoFrom" label-width="80px">
					<el-row v-for="(o,index) in addProductSpuForm.domains" :key="o.key" class="spusRowClass" :gutter="24">

						<el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:360px;">
							<el-col :sm="{span: 8}" :xs="{span: 12}">
								<el-form-item>
									<el-input class="SpuInput" v-model="o.spuKey" placeholder="请输入Key">
									</el-input>
								</el-form-item>
							</el-col>

							<el-col :sm="{span: 8}" :xs="{span: 12}">
								<el-form-item>
									<el-input class="SpuInput" v-model="o.spuValue" placeholder="请输入值">
									</el-input>
								</el-form-item>
							</el-col>

							<el-col :sm="{span: 4}" :xs="{span: 12}">
								<el-form-item>
									<el-input class="SpuInput2" v-model="o.spuOrder" placeholder="排序">
									</el-input>
								</el-form-item>
							</el-col>

							<el-col :sm="{span: 4}" :xs="{span: 12}">
								<el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSpuLink(o)"></el-button>
							</el-col>
						</el-card>
					</el-row>
				</el-form>
			</div>
			<!-- ======================= SPU窗口按钮组 ========================  -->
			<div v-if="addProductSpuFlag" style="margin-left: 10px;">
				<el-row class="spusRowClass" :gutter="24">

					<el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:360px;">

						<el-collapse accordion>
							<el-collapse-item title="操作菜单" name="1">
								<el-col :sm="{span: 4}" :xs="{span: 8}">
									<el-button type="primary" @click="addProductSpuLine">新增一行</el-button>
								</el-col>

								<el-col :sm="{span: 5}" :xs="{span: 8}">
									<el-button type="primary" @click="closeSpuWindows">关闭SPU窗口</el-button>
								</el-col>

								<el-col :sm="{span: 8}" :xs="{span: 12}">
									<el-button type="primary" class="addAndClose" @click="closeSpuWindows">保存SPU配置并关闭窗口</el-button>
								</el-col>
							</el-collapse-item>

						</el-collapse>
					</el-card>
				</el-row>
			</div>
			<!-- ======================= SPU窗口按钮组 ========================  -->
			<!-- ======================= 添加SPU(结束) ========================  -->

			<!-- ======================= 添加SKU ========================  -->
			<div id="addProductSku" v-if="addProductSkuFlag" class="title-menu-min2" style="max-height: 400px; margin-left: 10px;">
				<el-form :inline="true" ref="addProductTwoFrom" :model="addProductTwoFrom" label-width="80px">
					<el-row v-for="(o,index) in addProductSkuForm.domains" :key="o.key" class="spusRowClass" :gutter="24">

						<el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:360px;">
							<el-col :sm="{span: 8}" :xs="{span: 12}">
								<el-form-item>
									<el-input class="SpuInput" v-model="o.spuKey" placeholder="SKU名称">
									</el-input>
								</el-form-item>
							</el-col>

							<el-col :sm="{span: 8}" :xs="{span: 12}">
								<el-form-item>
									<el-input class="SpuInput" v-model="o.spuValue" placeholder="SKU值">
									</el-input>
								</el-form-item>
							</el-col>

							<el-col :sm="{span: 4}" :xs="{span: 12}">
								<el-form-item>
									<el-input class="SpuInput2" v-model="o.spuOrder" placeholder="排序">
									</el-input>
								</el-form-item>
							</el-col>

							<el-col :sm="{span: 4}" :xs="{span: 12}">
								<el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSkuLink(o)"></el-button>
							</el-col>
						</el-card>
					</el-row>
				</el-form>
			</div>
			<div v-if="addProductSkuFlag" style="margin-left: 10px;">
				<el-row class="spusRowClass" :gutter="24">

					<el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:360px;">

						<el-collapse accordion>
							<el-collapse-item title="操作菜单" name="1">
								<el-col :sm="{span: 4}" :xs="{span: 12}">
									<el-button type="primary" @click="addProductSkuLine">新增一行</el-button>
								</el-col>

								<el-col :sm="{span: 5}" :xs="{span: 12}">
									<el-button type="primary" @click="closeSkuWindows">关闭SKU窗口</el-button>
								</el-col>

								<el-col :sm="{span: 7}" :xs="{span: 13}">
									<el-button type="primary" class="addAndClose" @click="closeSkuWindows">保存SKU配置并关闭窗口</el-button>
								</el-col>

								<el-col :sm="{span: 8}" :xs="{span: 13}">
									<el-button type="primary" class="addAndClose" @click="createProductSku">生成商品的SKU库存与价格</el-button>
								</el-col>
							</el-collapse-item>

						</el-collapse>
					</el-card>
				</el-row>
			</div>
			<!-- ======================= 添加SKU(结束) ========================  -->

			<!-- ======================= 添加商品图片 ========================  -->
			<div v-if="uploadProductPLists">

				<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
				 :on-remove="handleRemove" name="pLists" :multiple="true" limit="6" accept="image/*" :on-exceed="exceedFun"
				 :file-list="fileList" :auto-upload="false" list-type="picture">
					<el-button slot="trigger" size="small" type="primary">选取需要上传的文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="closeProductImages">关闭窗口</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					<div slot="tip" class="el-upload__tip">图片默认显示顺序也是根据上传的顺序规定</div>
				</el-upload>
			</div>
			<!-- ======================= 添加商品图片(结束) ========================  -->

			<!-- ======================= 添加商品详情 ========================  -->
			<div v-if="uploadProductInfoFlag" class="title-menu-min2" style="max-height: 400px;">
				<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
				 :on-remove="handleRemove" name="pLists2" :multiple="true" limit="30" accept="image/*" :on-exceed="exceedFun"
				 :file-list="fileList" :auto-upload="false" list-type="picture">
					<el-button slot="trigger" size="small" type="primary">选取需要上传的文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="closeProductInfo">关闭窗口</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					<div slot="tip" class="el-upload__tip">图片默认显示顺序也是根据上传的顺序规定</div>
				</el-upload>
			</div <!--=======================添加商品详情（结束）========================-->

			<!-- ======================= 添加商品进度=========================  -->
			<el-steps :active="active" finish-status="success" align-center style="margin-top:30px;">
				<el-step title="步骤1" description="选择商品类目" show-overflow-tooltip="true"></el-step>
				<el-step title="步骤2" description="添加宝贝基本信息" show-overflow-tooltip="true"></el-step>
				<el-step title="步骤3" description="添加宝贝详细信息"></el-step>
				<el-step title="步骤4" :description="stepFourContent"></el-step>
			</el-steps>
			<el-button v-if="isAddOrNextFlag" :disabled='isStepBtn' style="margin-top: 12px;" @click="next">我已阅读无误,下一步</el-button>
			<el-button style="margin-top: 12px;" @click="last" :disabled='isStepBtn'>上一步</el-button>
			<el-button v-if="!isAddOrNextFlag" style="margin-top: 12px;" @click="next">我已阅读无误,确认添加</el-button>
			<el-button style="margin-top: 12px;" @click="addProductFlag = false" :disabled='isStepBtn'>关闭窗口</el-button>
		</el-dialog>
		<!-- ======================= 添加商品弹出层End =========================  -->

		<!-- ======================= 查看商品类目 =========================  -->

		<el-dialog title="商品类目信息" :visible.sync="productLeiMuInfoFlag" class="addProduct">
			<div>
				<el-form :inline="true" ref="productLeiMuInfoFlag" :model="addProductTwoFrom" label-width="80px">
					<el-row :gutter="24">

						<el-col :sm="{span: 12,offset: 6}" :xs="{span: 23}">

							<el-form-item label="商品类目" style="width:100%;">
								<el-input :disabled="true" v-model="productLeiMuValue">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<el-button style="margin-top: 12px;" @click="productLeiMuInfoFlag = false">关闭窗口</el-button>
		</el-dialog>
		<!-- ======================= 查看商品类目(结束) =========================  -->


		<!-- ======================= 查看商品SPU =========================  -->
		<el-dialog title="商品SPU信息" :fullscreen="isLoadingFull" :modal-append-to-body="true" :visible.sync="productSpuFlag" class="addProduct"
		 v-loading="isProductSPULoading">
			<div>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="SPU名称" width="220" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.date }}</template>
					</el-table-column>
					<el-table-column label="SPU值" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.date }}</template>
					</el-table-column>
					<el-table-column label="排序" width="120">
						<template slot-scope="scope">{{ scope.row.date }}</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right">

					</el-table-column>
				</el-table>
			</div>

			<el-button style="margin-top: 12px;" @click="productLeiMuInfoFlag = false">关闭窗口</el-button>
		</el-dialog>
		<!-- ======================= 查看商品类目(结束) =========================  -->


		<!-- ======================= 商品管理弹出层End =========================  -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// loading是否全屏显示
				isLoadingFull: false,
				// 浏览器大小
				screenWidth: '',
				screenHeight: '',
				// 查询商品SPU信息
				productSpuFlag: true,
				// 商品类目值
				productLeiMuValue: "衣服/牛仔裤",
				// 是否显示商品类目页面Flag
				productLeiMuInfoFlag: false,
				// 是否显示商品详情页面Flag
				uploadProductInfoFlag: false,
				// 添加商品图片显示的集合
				fileList: [],
				// 是否打开上传商品图片flag
				uploadProductPLists: false,
				// 是否开启进步条禁用按钮
				isStepBtn: false,
				// Sku键值对表单
				addProductSkuForm: {
					domains: [{
						spuKey: '',
						spuValue: '',
						spuOrder: '',
						isSystemDef: true
					}],
				},
				// 添加商品的SkuFlag
				addProductSkuFlag: false,
				// 是否开启"加载"
				isProductLoading: false,
				// SPU的表单
				addProductSpuForm: {
					domains: [{
						spuKey: '',
						spuValue: '',
						spuOrder: '',
						isSystemDef: true
					}],
				},
				// 第四步的内容
				stepFourContent: "填写宝贝重要信息",
				// 添加商品SPUFlag
				addProductSpuFlag: false,
				// 商品类目选中数据
				ProductMuluListIds: [],
				// 商品类目实体数据
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
					date: '2016-05-021',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-042',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1517 弄',
					zip: 200333
				}, {
					date: '2016-05-013',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1519 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}, {
					date: '2016-05-034',
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
			// 查询商品类目
			showProductLeimu(id) {
				// id为该商品的id 
				this.productLeiMuInfoFlag = true;
			},
			// 关闭上传商品详情页面
			closeProductInfo() {
				this.isProductLoading = true;
				// 打开步骤四 关闭图片窗口
				this.isShowFourFlag = true;
				this.uploadProductInfoFlag = false;
				// 改变内容
				this.stepFourContent = "填写宝贝重要信息";
				// 打开上一步下一步
				this.isStepBtn = false;
				this.isProductLoading = false;
			},
			// 显示上传商品详情页面
			addProductInfos() {
				// 打开加载
				this.isProductLoading = true;

				// 关闭步骤四 打开上传图片详情
				this.isShowFourFlag = false;
				this.uploadProductInfoFlag = true;
				// 改变内容
				this.stepFourContent = "上传图片的详情";
				// 关闭上一步下一步
				this.isStepBtn = true;
				this.isProductLoading = false;
			},
			// 关闭商品图片
			closeProductImages() {
				this.isProductLoading = true;
				// 打开步骤四 关闭图片窗口
				this.isShowFourFlag = true;
				this.uploadProductPLists = false;
				// 改变内容
				this.stepFourContent = "填写宝贝重要信息";
				// 打开上一步下一步
				this.isStepBtn = false;
				this.isProductLoading = false;
			},
			// 添加商品图片
			addProductImages() {
				this.isProductLoading = true;
				// 关闭步骤四 打开图片窗口
				this.isShowFourFlag = false;
				this.uploadProductPLists = true;
				// 改变内容
				this.stepFourContent = "上传商品的图片";
				// 关闭上一步下一步
				this.isStepBtn = true;
				this.isProductLoading = false;
			},
			// 上传商品图片的钩子函数
			submitUpload() {
				this.$refs.upload.submit();
			},
			exceedFun() {
				this.$message.error('最多只能上传6个文件');
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			// 生成商品SKU的价格和库存
			createProductSku() {
				// 需要将商品的信息保存 并整理出SKU对应的列表
				this.$confirm('此操作将保存你之前填写好的商品信息, 是否继续?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '继续',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '保存成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消保存'
					});
				});
			},
			// 关闭SKUchuangk
			closeSkuWindows() {
				this.isProductLoading = true;
				this.addProductSkuFlag = false;
				this.isShowFourFlag = true;
				this.isStepBtn = false;
				this.stepFourContent = "填写宝贝重要信息";
				this.isProductLoading = false;
			},
			// 打开SKU窗口
			addProductSKU() {
				this.isProductLoading = true;
				this.isStepBtn = true;
				// 改变步骤内容
				this.stepFourContent = "填写宝贝的SKU信息";
				// 打开和关闭对应窗口
				this.isShowFourFlag = false;
				this.addProductSkuFlag = true;
				this.isProductLoading = false;
			},
			// 打开SPU窗口
			addProductSPU() {
				this.isProductLoading = true;
				// 改变步骤内容
				this.isStepBtn = true;
				this.stepFourContent = "填写宝贝的SPU信息";
				// 打开和关闭对应窗口
				this.isShowFourFlag = false;
				this.addProductSpuFlag = true;
				this.isProductLoading = false;
			},
			// 关闭Spu窗口
			closeSpuWindows() {
				this.isProductLoading = true;
				// 显示第四步
				this.isShowFourFlag = true;
				this.isStepBtn = false;
				// 关闭SPU窗口
				this.addProductSpuFlag = false;
				this.stepFourContent = "填写宝贝重要信息";
				this.isProductLoading = false;

			},
			// 删除一行SPU
			removeProducSpuLink(item) {
				this.isProductLoading = true;
				var index = this.addProductSpuForm.domains.indexOf(item)
				if (item.isSystemDef) {
					this.$message({
						message: '不能删除系统定义好的哦',
						type: 'warning'
					});
					this.isProductLoading = false;
					return;
				}
				if (index !== -1) {
					this.addProductSpuForm.domains.splice(index, 1)
				}
				this.isProductLoading = false;
			},
			// 删除一行SKU
			removeProducSkuLink(item) {
				this.isProductLoading = true;
				var index = this.addProductSkuForm.domains.indexOf(item)
				if (item.isSystemDef) {
					this.$message({
						message: '不能删除系统定义好的哦',
						type: 'warning'
					});
					this.isProductLoading = false;
					return;
				}
				if (index !== -1) {
					this.addProductSkuForm.domains.splice(index, 1)
				}
				this.isProductLoading = false;
			},
			// 新增一行SKU
			addProductSkuLine() {
				this.isProductLoading = true;
				this.addProductSkuForm.domains.push({
					spuKey: '',
					spuValue: '',
					spuOrder: '',
					key: Date.now(),
					isSystemDef: false
				})
				this.$message({
					showClose: true,
					message: '新增成功,请拖动屏幕到底部'
				});
				this.isProductLoading = false;
			},
			// 新增一行SPU
			addProductSpuLine() {
				this.isProductLoading = true;
				this.addProductSpuForm.domains.push({
					spuKey: '',
					spuValue: '',
					spuOrder: '',
					key: Date.now(),
					isSystemDef: false
				})
				this.$message({
					showClose: true,
					message: '新增成功,请拖动屏幕到底部'
				});
				this.isProductLoading = false;
			},
			// 添加商品的上一步操作
			last() {
				this.isProductLoading = true;
				if (this.active <= 0) {
					this.$message.error('已经是第一步了');
					this.isProductLoading = false;
					return;
				} else if (this.active == 1) {
					// 当前为第二步,返回第一步
					this.isShowOneFlag = true;
					this.isShowTwoFlag = false;
					// 给出提示
					this.$message({
						message: '如果对`商品类目`进行修改后,SPU和SKU就会变成初始化的值哦',
						type: 'warning'
					});
				} else if (this.active == 2) {
					// 当前为第三步,返回第二步
					this.isShowTwoFlag = true;
					this.isShowThreeFlag = false;
				} else if (this.active == 3) {
					// 当前为第四步，返回第三不
					this.isShowThreeFlag = true;
					this.isShowFourFlag = false;
				}
				// 当前步骤数量-1
				this.active = this.active - 1;
				this.isAddOrNextFlag = true;
				this.isProductLoading = false;
			},
			// 添加商品的下一步操作
			next() {
				this.isProductLoading = true;
				// 判断是否为第一步
				if (this.active == 0) {
					// 需要判断是否勾选一二级类目
					if (this.ProductMuluListIds.length != 2) {
						this.$message.error('请选择该商品的类目(准确到二级类目去)');
						this.isProductLoading = false;
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
				this.isProductLoading = false;
			},
			handleChange(value) {
				console.log(value);
			}
		},
		created() {
			this.listLoading = false;
		},
		mounted() {
			this.screenWidth = document.body.clientWidth;
			this.screenHeight = document.body.clientHeight;
			if(this.screenWidth <= 500) {
				this.isLoadingFull = true;
			} else {
				this.isLoadingFull = false;
			}
			window.onresize = () => {
				return (() => {
					this.screenWidth = document.body.clientWidth;
					this.screenHeight = document.body.clientHeight;
					// 判断宽度是否小于500 小于500 全部全屏显示
					if(this.screenWidth <= 500) {
						this.isLoadingFull = true;
					} else {
						this.isLoadingFull = false;
					}
					
				})();
			};
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
	.title-menu-min2 {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	.title-menu-min2::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.title-menu-min2::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	.title-menu-min2::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
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
		.spusRowClass {
			margin-right: 0px !important;
			margin-left: 17px !important;
		}

		.SpusClass {
			width: 95% !important;
		}

		.el-form .el-form-item .el-input__inner {
			width: 216px !important;
		}

		.el-form .el-form-item .SpuInput .el-input__inner {
			width: 216px !important;
		}

		.el-form .el-form-item .SpuInput2 .el-input__inner {
			width: 80px !important;
		}
	}

	@media only screen and (min-width: 300px) and (max-width: 500px) {
		.addAndClose {
			margin-top: 10px !important;
		}

		.fixedClass {
			position: absolute;
			top: 100px;
		}

		.spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		.SpusClass {
			width: 330px !important;
		}

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

		.el-form .el-form-item .SpuInput .el-input__inner {
			width: 100px !important;
		}

		.el-form .el-form-item .SpuInput2 .el-input__inner {
			width: 100px !important;
		}

		/*  添加商品的css结束  */
		.el-form .el-form-item .el-input__inner {
			width: 250px;
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
