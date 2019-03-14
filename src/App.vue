<template>
  <div style="height:100%;">
  <!--   <Alert :value="show" :hide-on-blur="true" title="我爱你" button-text="确定" content="测试一下" @on-show="showModel" @on-hide="hideModel"/> -->
   <!--  <Confirm theme="android" :value="show" confirm-text="确定" cancel-text="取消" :hide-on-blur="true" title="我爱你" content="测试一下" :show-input="true" @on-confirm="showModel" @on-hide="hideModel"/> -->
   <FormDialog :value="show" title="我爱你" confirm-text="确定" :fields="fields" @on-confirm="showModel"/>
  </div>
</template>

<script>
import {Alert,Confirm,FormDialog} from './components/index.js'
export default {
  components: {
    Alert,
    Confirm,
    FormDialog
  },
  methods: {
    showModel(val){
      console.log(val)
    },
    hideModel(){
    }
  },
  beforeDestroy () {
  },
  created(){
    setTimeout(()=>{
      this.show = true;
    },2000)
  },
  watch: {
    
  },
  computed: {
    
  },
  data () {
    return {
      show:false,
      fields:[
        {label:'姓名',type:'text',name:'name',placeholder:'请输入姓名',value:''},
        {label:'电话',type:'number',name:'phone',placeholder:'请输入电话',value:''},
        {label:'地址',type:'text',name:'address',placeholder:'请输入地址',value:''},
      ]
    }
  }
}
</script>

<style lang="less">

</style>
