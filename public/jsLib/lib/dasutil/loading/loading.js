dasutil.loading = (function () {
    var name = "loading 相关操作类";
    //============内部私有属性及方法============

    var loading_div_id = "muyao-loading";

    function showLoading(param) {
        if (param == null) param = {};

        if (typeof (param) == "string")
            param = { text: param };

        //type可选值：loader-gif  loader-default,loader-bar,loader-border,loader-double 
        if (param.type == null) param.type = "loader-default";

        var datatext = '';
        if (param.text != null)
            datatext = ' data-text="' + param.text + '" ';

        var inhtml = '<div id="' + loading_div_id + '" class="loader ' + param.type + ' is-active"  ' + datatext + ' ></div>';


        if (param.parent)
            $(param.parent).append(inhtml);
        else
            $("body").append(inhtml);
    }

    function hideLoading() {
        $('#' + loading_div_id).remove();
    }
     

    //===========对外公开的属性及方法=========
    return {
        show: showLoading,
        hide: hideLoading,
        close: hideLoading,
    };
})();


