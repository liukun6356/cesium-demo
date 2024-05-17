<template>
  <div id="app">
    <router-view v-if="supportWebGL"/>
    <div v-if="!supportWebGL" class="support-text">
      <h3>系统检测到您使用的浏览器不支持WebGL功能！</h3>
      <p>1、请您检查浏览器版本，安装使用最新版chrome、火狐或IE11以上浏览器！</p>
      <p>2、WebGL支持取决于GPU支持，请保证客户端电脑已安装显卡驱动程序！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "VueApp",
  data() {
    return {
      supportWebGL: false,
    };
  },
  methods: {
    // 验证是否支持webgl
    verifyWebGL() {
      this.supportWebGL = das3d.util.webglreport();
    },
  },
  mounted() {
    this.verifyWebGL();
    console.log( `
                                              ,--,                                                                     ,--,
                                           ,---.'|                                                                  ,---.'|          ,--.
  ,----..                                  |   | :                                 ,-.     ,---,.                   |   | :      ,--/  /|
 /   /   \\                            ,---,:   : |                             ,--/ /|   ,'  .' |                   :   : |   ,---,': / '
|   :     :    ,---.     ,---.      ,---.'||   ' :            ,--,           ,--. :/ | ,---.'   |   ,---.    __  ,-.|   ' :   :   : '/ /
.   |  ;. /   '   ,'\\   '   ,'\\     |   | :;   ; '          ,'_ /|           :  : ' /  |   |   .'  '   ,'\\ ,' ,'/ /|;   ; '   |   '   ,
.   ; /--\`   /   /   | /   /   |    |   | |'   | |__   .--. |  | :    ,---.  |  '  /   :   :  :   /   /   |'  | |' |'   | |__ '   |  /
;   | ;  __ .   ; ,. :.   ; ,. :  ,--.__| ||   | :.'|,'_ /| :  . |   /     \\ '  |  :   :   |  |-,.   ; ,. :|  |   ,'|   | :.'||   ;  ;
|   : |.' .''   | |: :'   | |: : /   ,'   |'   :    ;|  ' | |  . .  /    / ' |  |   \\  |   :  ;/|'   | |: :'  :  /  '   :    ;:   '   \\
.   | '_.' :'   | .; :'   | .; :.   '  /  ||   |  ./ |  | ' |  | | .    ' /  '  : |. \\ |   |   .''   | .; :|  | '   |   |  ./ |   |    '
'   ; : \\  ||   :    ||   :    |'   ; |:  |;   : ;   :  | : ;  ; | '   ; :__ |  | ' \\ \\'   :  '  |   :    |;  : |   ;   : ;   '   : |.  \\
'   | '/  .' \\   \\  /  \\   \\  / |   | '/  '|   ,/    '  :  \`--'   \\'   | '.'|'  : |--' |   |  |   \\   \\  / |  , ;   |   ,/    |   | '_\\.'
|   :    /    \`----'    \`----'  |   :    :|'---'     :  ,      .-./|   :    :;  |,'    |   :  \\    \`----'   ---'    '---'     '   : |
 \\   \\ .'                        \\   \\  /             \`--\`----'     \\   \\  / '--'      |   | ,'                               ;   |,'
  \`---\`                           \`----'                             \`----'            \`----'                                 '---'
%c %c \n%c 柳晓黑胡椒 %c gis-demo `,
        ` padding: 0px 0px;`,
        'color: #3eaf7c; font-size: 16px;margin-bottom: 10px;',
        'background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff',
        'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',
    );
  }

}
</script>


<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

.support-text {
  padding-top: 50px;
  text-align: center;
}
.mask_div{
  display: none !important;
}
</style>
