<template>
  <div class="vux-confirm">
    <x-dialog
      v-model="showValue"
      :mask-transition="maskTransition"
      :dialog-transition="theme === 'android' ? 'vux-fade' : dialogTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      @on-hide="$emit('on-hide')">
      <div class="weui-dialog__hd" v-if="!!title">
        <strong class="weui-dialog__title">{{ title }}</strong>
      </div>
      <div class="vux-prompt" v-for="item in fields">
        <label>{{item.label}}</label>
        <div class="vux-prompt-input">
          <input :type="item.type" v-model="item.value" :placeholder="item.placeholder"
          />
        </div>
      </div>
      <div class="weui-dialog__ft">
        <a v-if="showConfirmButton" href="javascript:;" class="weui-dialog__btn" :class="`weui-dialog__btn_${confirmType}`" @click="_onConfirm">{{confirmText}}</a>
      </div>
    </x-dialog>
  </div>
</template>


<script>
import XDialog from '../x-dialog'
export default {
  name: 'formDialog',
  components: {
    XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'ios'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    title: String,
    confirmText: String,
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    maskZIndex: [Number, String],
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    fields: {
      type:Array,
      default:[],
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    inputAttrs: Object,
    confirmType: {
      type: String,
      default: 'primary'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    }
  },
  created () {
    console.log(this.fields)
    this.showValue = this.show
    if (this.value) {
      this.showValue = this.value
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
      if (val) {
        if (this.showInput) {
          this.msg = ''
          setTimeout(() => {
            if (this.$refs.input) {
              this.setInputFocus()
            }
          }, 300)
        }
        this.$emit('on-show') // emit just after msg is cleared
      }
    }
  },
  data () {
    return {
      msg: '',
      showValue: false
    }
  },
  methods: {
    getInputAttrs () {
      return this.inputAttrs || {
        type: 'text'
      }
    },
    setInputValue (val) {
      this.msg = val
    },
    setInputFocus (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$refs.input.focus()
    },
    _onConfirm () {
      if (!this.showValue) {
        return
      }
      if (this.closeOnConfirm) {
        this.showValue = false
      }
      let fields = {};
      this.fields.map((val,index)=>{
        fields[val.name] = val.value;
      })
      this.$emit('on-confirm', fields)
    },
    _onCancel () {
      if (!this.showValue) {
        return
      }
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';
.vux-prompt {
  padding:10px 15px;
  display:flex;
  align-items: center;
  position:relative;
  &:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  } 
  &:first-child{
    margin-top:20px;
  }
  label{
    font-size:16px;
    color:#333;
    display: block;
    width: 80px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-all;
  }
}

.vux-prompt-input {
  flex:1;
  appearance: none;
  outline: none;
  font-size: 16px;
  input{
    padding: 10px 5px;
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    line-height: 1.47058824;
  }
}
</style>
