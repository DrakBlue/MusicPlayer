<template>
    <transition
    enter-active-class='enter'
    leave-active-class='leave'>
        <div class="confirm-box" v-show="showFlag">
            <ul class="comfirm">
                <li class="text">{{text}}</li>
                <li>
                    <ul class="btn">
                        <li class="cancle-btn" @click="Cancle">{{cancle}}</li>
                        <li class='sure-btn' @click="Sure">{{sure}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>

export default {
    props:{
        text:{
            type:String,
            default:'是否确认清空搜索历史'
        },
        cancle:{
            type:String,
            default:'取消'
        },
        sure:{
            type:String,
            default:'确认'
        }
    },
    data(){
        return {
            showFlag:false
        }
    },
    methods:{
        Cancle (){
            this.showFlag = false
            this.$emit('handleCancle')
        },
        Sure (){
            this.showFlag = false
            this.$emit('handleSure')
        },
        show (){
            this.showFlag = true
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';


    .enter
        animation Enter 1s 1
    .leave
        animation Leave 1s 1
    .confirm-box
        position fixed
        height 8rem
        width 100%
        top 40%
        color  $color-text-d
        z-index 999
        align-self center
        .comfirm
            position relative
            margin 0 auto
            min-width 0
            width 30rem
            border-radius .5rem
            background-color $color-background
            border 1px solid $color-text-d
            position relative
            text-align center
            line-height 4rem
            font-size 1.4rem
            .text
                letter-spacing .2rem
            .btn
                display flex
                justify-content space-between
                .cancle-btn,.sure-btn
                    flex 1
@keyframes Enter 
    0%
        transform scale(0)
        opacity 0
    50%
        transform scale(1.1)
        opacity .5
    100%
        transform scale(1)
        opacity 1
@keyframes Leave 
    0%    
        transform scale(1)
        opacity 1
    100%
        transform scale(0)
        opacity 0

</style>
