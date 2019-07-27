<template>
  <div id="freightManage">
    <el-form ref="form" :model="freightManageForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="运费标题">
            <el-input v-model="freightManageForm.freightTitle" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="商品列表">
            <el-select v-model="freightManageForm.products" placeholder="请选择" filterable="true" multiple="true" collapse-tags="true" clearable="true">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="发货地址">
            <el-input v-model="freightManageForm.shipAddress" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="选择省市">
            <el-select v-model="freightManageForm.city" placeholder="请选择" filterable="true" multiple="true" collapse-tags="true" clearable="true">
              <el-option-group
                v-for="group in cityOptions"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>

  </div>

</template>

<script>
export default {
  name: 'FreightManage',
  data() {
    return {
      cityOptions: [{
        label: '省份',
        cityOptions: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '直辖市',
        cityOptions: [
          {
            value: 'Chengdu',
            label: '成都'
          },
          {
            value: 'Shenzhen',
            label: '深圳'
          },
          {
            value: 'Guangzhou',
            label: '广州'
          },
          {
            value: 'Dalian',
            label: '大连'
          }]
      }],

      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      freightManageForm: { // 添加运费管理所需的表单
        freightTitle: '', // 运费标题
        products: ''// 商品列表id信息
      }
    }
  }
}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #freightManage{
    margin: 30px;
  }

</style>
