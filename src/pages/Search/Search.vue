<template>
    <section class="search">
        <Header title="搜索"></Header>
        <form class="search_form" action="#" @submit.prevent="search">
            <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="keyword">
            <input type="submit" name="submit" class="search_submit">
        </form>
        <section class="list" v-if="!nosearchShops">
            <ul class="list_container"  ref="listUl">
                <router-link :to="{path:'/shop',query:{id:item.id}}" class="list_li" v-for="(item,index) in searchShops" :key="index">
                    <section class="item_left">
                        <img :src="imgBaseUrl+item.image_path" class="restaurant_img" alt="">
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.name}}</span>
                            </p>
                            <p>月售 {{item.month_sales || item.recent_order_num}} 单</p>
                            <p>{{item.delivery_fee||item.float_minimum_order_amount}}元起送/距离{{item.distance}}</p>
                        </div>
                    </section>
                </router-link>
            </ul>
        </section>
        <div class="search_none" v-else>很抱歉，无搜索结果</div>
    </section>
</template>

<script>
    import Header from '../../components/Header/Header'
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                keyword:'',
                imgBaseUrl:'http://cangdu.org:8001/img/',
                nosearchShops:false
            }
        },
        computed:{
            ...mapState(['searchShops'])
        },
        mounted(){
            this.$nextTick(()=>{
                new BScroll('.list')
            })
        },
        methods:{
            search(){
                const keyword=this.keyword.trim()
                if(keyword){
                    this.$store.dispatch('searchShops',keyword)
                }
            }
        },
        watch:{
            searchShops(value){
                this.nosearchShops = !value.length;
            }
        },
        components:{
            Header
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .search
        width 100%
        height 100%
        overflow hidden
        .search_form
            clearFix()
            margin-top 45px
            background-color #fff
            padding 12px 8px
            input
                height 35px
                padding 0 4px
                border-radius 2px
                font-weight bold
                outline none
                &.search_input
                    float left
                    width 79%
                    border 4px solid #f2f2f2
                    font-size 14px
                    color #333
                    background-color #f2f2f2
                &.search_submit
                    float right
                    width 18%
                    border 4px solid #02a774
                    font-size 16px
                    color #fff
                    background-color #02a774

        .list
            height 73%
            .list_container
                background-color: #fff;
                .list_li
                    display: flex;
                    justify-content: center;
                    padding: 10px
                    border-bottom: 1px solid $bc;
                    .item_left
                        margin-right: 10px
                        .restaurant_img
                            width 50px
                            height 50px
                            display block
                    .item_right
                        font-size 12px
                        flex 1
                        .item_right_text
                            width 240px
                            p
                                line-height 12px
                                margin-bottom 6px
                                overflow hidden
                                &:last-child
                                    margin-bottom 0
        .search_none
            margin: 0 auto
            color: #333
            text-align: center
            margin-top: 0.125rem
</style>