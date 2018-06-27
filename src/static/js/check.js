var IE55 = IE6 = IE7 = IE8 = IE9 = false;

try{
    var userAgent = navigator.userAgent;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        if (IE55||IE6||IE7||IE8) {
            window.location.href="static/check.html";
        }
    }
}catch(e){
    alert(e);
}

////////////////////////////////////////////////////////
// check flash

function flashChecker()
{
    var hasFlash=0;　　　　//是否安装了flash
    var flashVersion=0;　　//flash版本

    if(document.all)
    {
        try{
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if(swf) {
                hasFlash=1;
                VSwf=swf.GetVariable("$version");
                flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        }catch(e){}
    }else{
        if (navigator.plugins && navigator.plugins.length > 0)
        {
            var swf=navigator.plugins["Shockwave Flash"];
            if (swf)
            {
                hasFlash=1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i)
                {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {f:hasFlash,v:flashVersion};
}

if(IE9){
    var fls=flashChecker();
    if(fls.f){
        //document.write("您安装了flash,当前flash版本为: "+fls.v+".x");
    }else{
        document.write('<div style="background: #f5e79e;"><div style="width:1000px;margin:0 auto;">您的浏览器必须安装Adobe Flash Player插件，才可以上传文件。<a href="static/setup/flashplayer_23_ax_debug_23.0.0.207.exe">下载</a></div></div>');
    }
}