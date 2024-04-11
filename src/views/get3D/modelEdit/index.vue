<template>
  <div id="model_edit">
    <div class="model_view">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box"
           viewBox="0 0 16 16">
        <path
            d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z">
        </path>
      </svg>
      <div id="root"></div>
    </div>
    <div class="oper_container">
      <div class="normal" @click="curScene">截取封面</div>
      <div class="normal">分享</div>
      <div class="normal">下载</div>
      <div class="normal" @click="saveModel">保存</div>
    </div>
  </div>
</template>

<script>
let editor
export default {
  data() {
    return {}
  },
  mounted() {
    const link = document.createElement('link');
    link.href = '/js/get3d/Editor.css';
    link.rel = 'stylesheet';
    document.querySelector('#model_edit')?.appendChild(link);
    const link1 = document.createElement('link');
    link1.href = '/js/get3d/index.css';
    link1.rel = 'stylesheet';
    document.querySelector('#model_edit')?.appendChild(link1);
    const script = document.createElement('script');
    script.src = '/js/get3d/index-0.0.4.umd.js'; // 替换为实际的JavaScript文件路径
    script.addEventListener('load', this.handleScriptLoad);
    document.head.appendChild(script);
  },
  methods: {
    handleScriptLoad() {
      editor = new Get3DLib.Get3DEditor(document.getElementById("root"), {
        uri: '/js/get3d/model/model.json',
        onSuccess: () => {
        }
      })
    },
    curScene() {
      editor.graphicCapture((blob) => { // {size:563020,type:"image/png"}
        // blob = new Blob([filestream], {type: 'application/vnd.ms-excel'});
        const a = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载连接
        a.href = href;
        a.download = "压缩包.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // 下载完移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      })
    },
    saveModel() {
      editor.getG3DFile((json) => {
        console.log(json, '编辑后的model.json')
        this.copyUrl(JSON.stringify(json))
      })
    },
    copyUrl(val) { // 复制链接
      let inputDom = document.createElement('input');  // 创建一个input元素
      inputDom.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
      inputDom.value = val; // 给input元素赋值
      document.body.appendChild(inputDom); // 添加到body
      inputDom.select(); //选中input元素的内容
      document.execCommand('Copy'); // 执行浏览器复制命令
      inputDom.style.display = 'none';
      inputDom.remove(); // 移除input元素
      this.$message.success('复制到剪贴板成功');
    }
  }
}
</script>

<style>
#sidebar {
  height: calc(100% - 60px);
  border-top-right-radius: 10px;
}
</style>

<style lang="less" scoped>

#model_edit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .model_view {
    width: 100vw;
    height: 100%;
    top: 0px;
    right: 0;
    position: absolute;
    overflow: hidden;

    svg {
      width: 35px;
      height: 35px;
      color: #78a9ff;
      animation: fadenum 2s linear infinite;
      position: absolute;
      left: 50%;
      top: 50%;
    }

    @keyframes fadenum {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

  }

  .oper_container {
    position: absolute;
    right: 10px;
    bottom: 30px;
    width: 320px;
    height: 30px;
    background: #111;


    .normal {
      color: #AAAAAA;
      padding: 5px 15px;
      float: left;
      height: 30px;
      padding-bottom: 25px;
      font-size: 14px;
    }

    .normal:hover {
      background: rgba(170, 170, 170, 0.2);
      border-radius: 5px;
      cursor: pointer;

    }
  }
}


</style>