<template>
    <section class="msite">
        <!--首页头部-->
        <Header :title="address.name">
            <router-link :to="{name:'search'}" class="header_search" slot="left">
                <i class="iconfont icon-xiazai17"></i>
            </router-link>

            <span class="header_login" slot="right">
                <router-link :to="{name:'login'}" class="header_login_text" v-if="!userInfo._id">登录|注册</router-link>
                <span class="header_login_text" v-else><i class="iconfont icon-wode"></i></span>
            </span>
        </Header>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl+category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-option"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import Header from '../../components/Header/Header'
    import ShopList from '../../components/ShopList/ShopList'

    export default {
        data(){
            return{
                baseImageUrl:'https://fuss10.elemecdn.com'
            }
        },
        mounted(){
            this.$store.dispatch('getFoodCategorys')
            this.$store.dispatch('getShops')
        },
        computed:{
          ...mapState(['address','categorys','userInfo']),
            categorysArr(){
              const {categorys}=this
              let arr=[];
              let minArr=[];
              categorys.forEach(category=>{
                  if(minArr.length===8){
                      minArr=[]
                  }
                  if(minArr.length===0){
                      arr.push(minArr)
                  }
                  minArr.push(category)
              })
              return arr
            }

        },
        watch:{
            categorys(value){//categorys数组中有数据了，在异步更新界面之前执行
                //使用setTimeout可以实现效果，但是不太好
                // setTimeout(()=>{
                //     new Swiper('.swiper-container',{
                //         loop:true,
                //         pagination:{
                //             el:'.swiper-pagination',
                //         }
                //     });
                // },100)

                //界面更新就立即创建Swiper对象
                this.$nextTick(()=>{//一旦实现界面更新就立即调用
                    new Swiper('.swiper-container',{
                        loop:true,
                        pagination:{
                            el:'.swiper-pagination',
                        }
                    });
                })

            }
        },
        components:{
            Header,
            ShopList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .iconfont
                    font-size 12px
                    margin-right 5px
                    margin-left 2px
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px

</style>