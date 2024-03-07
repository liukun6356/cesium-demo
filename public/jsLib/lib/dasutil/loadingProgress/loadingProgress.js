dasutil.loadingProgress = (function () {
    var name = "loading 相关操作类";
    //============内部私有属性及方法============

    var loading_div_id = "muyao-loading";

    function showLoading(param) {
        if (param == null) param = {};

        if (typeof (param) == "string")
            param = { text: param };

        //type可选值：loaderProgress-gif  loaderProgress-default,loaderProgress-bar,loaderProgress-border,loaderProgress-double 
        if (param.type == null) param.type = "loaderProgress-default";

        var datatext = '';
        if (param.text != null)
            datatext = ' data-text="' + param.text + '" ';

        var inhtml = "";
        if (param.custom == "progress") {
            inhtml = '<div id="' + loading_div_id + '" class="loaderProgress  is-active"  ' + datatext + ' >' +
                `<div style="text-align: center;top: 53%;width: 100%;
            position: absolute;">
                <progress id="pg-` + param.id + `" max="100" value="0"></progress>
                <p id="pgv-` + param.id + `"></p>
               <div>`+
                '</div>';

        } else {
            inhtml = '<div id="' + loading_div_id + '" class="loaderProgress ' + param.type + ' is-active"  ' + datatext + ' ></div>';
        }
        if (param.parent)
            $(param.parent).append(inhtml);
        else
            $("body").append(inhtml);
    }

    function hideLoading() {
        $('#' + loading_div_id).remove();
    }

    function updateLoadingProgress(param) {
        $(`#pg-${param.id}`).length > 0 && $(`#pg-${param.id}`).val(param.val);
        $(`#pgv-${param.id}`).length > 0 && $(`#pgv-${param.id}`).html(param.val + "%");
    }

    //===========对外公开的属性及方法=========
    return {
        show: showLoading,
        hide: hideLoading,
        close: hideLoading,
        update: updateLoadingProgress,
    };
})();


