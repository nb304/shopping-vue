<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">

      <el-dropdown>
        <div class="avatar-wrapper">

          <!-- ======================= 导航栏消息图标 =========================  -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <!-- ======================= 导航栏消息图标 =========================  -->
              <el-badge v-if="isShowMessage" id="messageRed" is-dot class="item" title="提示">
                <svg-icon icon-class="message" class-name="message-class" />
              </el-badge>
              <el-badge v-else="isShowMessage" title="提示">
                <svg-icon icon-class="message" class-name="message-class" />
              </el-badge>
              <!-- ======================= 导航栏消息图标(结束) =========================  -->
            </span>
            <!-- ======================= 导航栏消息数据实体 =========================  -->
            <el-dropdown-menu slot="dropdown">
              <el-tabs type="border-card" style="width:350px;">
                <el-tab-pane label="全部消息" class="title-menu-min">
                  <el-card v-for="value,key in messageInfos" shadow="hover" class="info">
                    <span :key="value.mid" style="width:100%; display:block;" @click="messageInfo(value.mid)">
                      {{ value.message }}
                    </span>
                  </el-card>

                </el-tab-pane>
                <el-tab-pane label="未读消息" class="title-menu-min">未读消息</el-tab-pane>
                <el-tab-pane label="已读消息" class="title-menu-min">已读消息</el-tab-pane>
              </el-tabs>

            </el-dropdown-menu>
          </el-dropdown>
          <!-- ======================= 导航栏消息图标(结束) =========================  -->

        </div>

      </el-dropdown>

      <!-- ======================= 头像 =========================  -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <span @click="Home">Home</span>
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- ======================= 头像(结束) =========================  -->
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    setInterval(() => {
      this.Home2()
    }, 1000)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async Home() {
      console.log('123')
    },
    Home2() {
      this.isShowMessage = !this.isShowMessage
    },
    messageInfo(id) {
      alert('消息实体' + id)
    }
  },
  data() {
    return {
      isShowMessage: true,
      messageInfos: [
        { 'mid': 1, 'message': '信息1' },
        { 'mid': 2, 'message': '信息2' }
      ]
    }
  }
}
</script>

<style lang="scss">
	.el-tab-pane {
		max-height:400px;
		overflow:auto !important;
	}
	.info {
		margin: 10px 0px;
	}
	.el-card__body {
		padding: 10px 10px !important;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		-icab-text-overflow: ellipsis;
		-khtml-text-overflow: ellipsis;
		-moz-text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
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

	.el-dropdown-menu {
		position: absolute;
		top: 30px !important;
	}

	.mark {
		position: absolute;
		right: 25px;
		top: 12px;
	}

	.text {
		font-size: 14px;
	}

	.box-card {
		width: 300px;
	}

	.el-badge {
		margin-bottom: 30px;
	}

	#messageRed .el-badge__content {
		margin-top: 12px !important;
		margin-right: 6px;
	}

	.message-class {
		height: 25px !important;
		width: 25px !important;
		padding: 5px 5px 0 0;
		cursor: pointer;
	}

	.navbar {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #fff;
		box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

		.hamburger-container {
			line-height: 46px;
			height: 100%;
			float: left;
			cursor: pointer;
			transition: background .3s;
			-webkit-tap-highlight-color: transparent;

			&:hover {
				background: rgba(0, 0, 0, .025)
			}
		}

		.breadcrumb-container {
			float: left;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;

			&:focus {
				outline: none;
			}

			.right-menu-item {
				display: inline-block;
				padding: 0 8px;
				height: 100%;
				font-size: 18px;
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background .3s;

					&:hover {
						background: rgba(0, 0, 0, .025)
					}
				}
			}

			.avatar-container {
				margin-right: 30px;

				.avatar-wrapper {
					margin-top: 5px;
					position: relative;

					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}

					.el-icon-caret-bottom {
						cursor: pointer;
						position: absolute;
						right: -20px;
						top: 25px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
