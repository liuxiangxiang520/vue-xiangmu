<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="mask" ref="mask"></div>
    <div class="big">
      <img :src="bigUrl" ref="bigImg"/>
    </div>
    
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
  export default {
    name: "Zoom",

    props: {
      imgUrl: String, // 中图的url
      bigUrl: String, // 大图的url
    },
    mounted() {
        this.maskWidth = this.$refs.event.clientWidth / 2
    },
    methods: {
        move:throttle(function (event){
            let left,top
            const maskDiv = this.$refs.mask
            const bigImg = this.$refs.bigImg
            //取出相关的数据：事件的offsetx/offsety,mask
            const {offsetX,offsetY} = event
            const maskWidth = this.maskWidth

            //计算left,top
            left = offsetX - maskWidth / 2
            top = offsetY - maskWidth / 2

            //left和top必须在【0，maskwidth】之间
            if(left < 0){
                left = 0
            }else if(left > maskWidth){
                left = maskWidth
            }
             if(top < 0){
                top = 0
            }else if(top > maskWidth){
                top = maskWidth
            }

            //指定名为mask的div的坐标值
            maskDiv.style.left = left + 'px'
            maskDiv.style.top = top + 'px'

            //指定大图<img>的坐标值（left,top)
            bigImg.style.left = -2 * left + 'px'
            bigImg.style.top = -2 * top + 'px'
        },50)
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
