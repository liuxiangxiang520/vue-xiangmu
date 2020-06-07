<template>
<div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Brand></Brand>
    <Floor></Floor>
    <Like></Like>
    <Rank></Rank>
    <TodayRecommend></TodayRecommend>
    
</div>
</template>

<script type="text/ecmascript-6">
import ListContainer from './ListContainer/ListContainer'
import Brand from './Brand/Brand'
import Floor from './Floor/Floor'
import Like from './Like/Like'
import Rank from './Rank/Rank'
import TodayRecommend from './TodayRecommend/TodayRecommend'
export default {
    name:'Home',
    //局部注册组件
    components:{
        ListContainer,
        Brand,
        Floor,
        Like,
        Rank,
        TodayRecommend
    }
}
</script>

<style lang="less" scoped>


</style>
