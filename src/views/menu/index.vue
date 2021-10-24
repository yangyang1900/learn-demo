<template>
    <div id="main">
        <div class="content">
            <!-- 左边导航栏 -->
            <div class="admin_nav" v-show="fullWidth">
                <div class = "admin_nav_site">
                    <ul v-for="(item,index) in navList" :key="index">
                        <li 
                          @click="handleToTitle(index,item)" 
                          @mouseenter="changeTitleColor(index)" 
                          @mouseleave="removeTitleColor(index)"      
                          ref="title" :class="{active:currentSort == index}"
                        >
                            <div class="middle">
                                {{item.title}}
                            </div>
                        </li>
                        <li 
                          v-for="(it,idx) in item.secMenu" 
                          :key="idx" 
                          v-show="item.isSubShow" 
                          class="active1">
                            <router-link :to="it.path" tag="a">{{it.name}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'navigation-1',
        data() {
            return {
                navList: [{
                        title: '用户管理',
                        isSubShow: false,
                        className: 'icon-guanliyuan1',
                        close: 'icon-close',
                        up: 'icon-zhedie',
                        secMenu: [
                            {
                            name: '工号管理',
                            path: '/home/navigation-one/user'
                            }, 
                            // {
                            // name: '角色管理',
                            // path: '/home/navigation-one/role'
                            // }, 
                            // {
                            // name: '权限管理',
                            // path: '/home/navigation-one/user'
                            // }, 
                        ]

                    },
                    {
                        title: '资源管理',
                        isSubShow: false,
                        className: 'icon-ziyuan',
                        close: 'icon-close',
                        up: 'icon-zhedie',
                        secMenu: [
                            {
                                name: '我的收藏',
                                path: '/home/navigation-one/user'
                            },
                            {
                                name: '我的项目',
                                path: '/home/navigation-one/role'
                            }
                        ]

                    },
                    {
                        title: '综合管理',
                        isSubShow: false,
                        className: 'icon-zonghe',
                        close: 'icon-close',
                        up: 'icon-zhedie',
                        secMenu: [{
                                name: '划配管理',
                                path: '/home/navigation-one/user'
                            },
                            {
                                name: '数据信息',
                                path: '/home/navigation-one/role'
                            }
                        ]

                    },
                    {
                        title: '系统消息',
                        isSubShow: false,
                        className: 'icon-xiaoxi',
                        close: 'icon-close',
                        up: 'icon-zhedie',
                        secMenu: [{
                                name: '实时动态',
                                path: '/home/navigation-one/user'
                            },
                            {
                                name: '过去动态',
                                path: '/home/navigation-one/role'
                            }
                        ]
                    }
                ],
                currentSort: 0,
                fullWidth: true,
            }
        },
        mounted() {

        },
        methods: {
            active(index) {
                this.currentSort = index;
            },
            changeTitleColor(index) {
                this.currentSort = index;
            },
            removeTitleColor(index) {
                this.currentSort = null;
            },
            handleToTitle(ind, item) {
                this.navList[ind].isSubShow = !this.navList[ind].isSubShow;
                if (this.navList[ind].isSubShow == true) {
                    this.navList[ind].close = 'icon-zhedie';
                } else {
                    this.navList[ind].close = 'icon-close';
                }
            },
        }

    }
</script>

<style scoped>
    #main {
        background: #F0F6FF;
        font-size: 16px;
        height: 100%;
    }

    #main .content {
        display: flex;
        flex-direction: row;
        height: 100%; 
    }

    .content .admin_nav {
        height: 100%;
        width: 200px;
        padding: 0 !important;
        background: #364150;
        position: relative;

    }

    .content .admin_nav .admin_nav_site{
        height: 100%;
    }

    .content .admin_nav .title {
        height: 1.39rem;
        line-height: 1.39rem;
        background: rgba(63, 73, 86, 1);
        color: #FFFFFF;
        text-align: center;
        font-size: 0.18rem;
        display: flex;
        justify-content: center;
    }

    .content .admin_nav .title div {
        padding: 0 0.03rem;
    }

    .content .admin_nav .title div:first-child i {
        font-size: 0.18rem;
    }

    .content .admin_nav ul .active {
        background: rgba(68, 81, 99, 1);
    }

    .content .admin_nav ul .active1 a.router-link-active {
        padding-top: 13px;
        color: #fff;
    }

    .content .admin_nav ul li {
        height: 0.6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.18rem;
    }

    .content .admin_nav ul li a {
        color: #cecdc5;
        cursor: pointer;
    }

    .content .admin_nav ul li:first-child {
        font-size: 0.2rem;
        height: 0.64rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #BEC5C0;
        cursor: pointer;
    }

    .content .admin_nav ul li:first-child div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #BEC5C0;
    }

    .content .admin_nav ul li:first-child .left_icon {
        width: 22%;
    }

    .content .admin_nav ul li:first-child .left_icon i {
        color: #1296DB;
    }

    .content .admin_nav ul li:first-child .middle {
        width: 56%;
        display: flex;
        justify-content: flex-start;
    }

    .content .admin_nav ul li:first-child .right_icon {
        width: 22%;
    }

    .admin_nav .admin .middle:hover {
        color: #fff;
    }

    .admin_nav .admin .right_icon i:hover {
        color: #fff;
    }

    .admin_nav .admin .middle.router-link-active {
        color: #fff;
    }

    .content .admin_nav_position {
        position: absolute;
        z-index: 3000;
    }

</style>
