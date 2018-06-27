/**
 * Created by yangkk on 2016/9/14.
 */

const ExtMimeTypes = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    rtf: 'application/rtf',
    zip: 'application/zip',
    bmp: 'image/bmp',
    gif: 'image/gif',
    png: 'image/png',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    jpe: 'image/jpeg',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    txt: 'text/plain',
    xml: 'text/xml',
    html: 'text/html'
}

export const accept = function (extStr) {
    let extensions2 = [], mimeTypes2 = [];

    let exts = extStr.split(',');
    for (let n in exts) {
        let ext = exts[n];
        let mimeType = ExtMimeTypes[exts[n]];
        if (mimeType != null) {
            if (extensions2.indexOf(ext) < 0)
                extensions2.push(ext)
            if (mimeTypes2.indexOf(mimeType) < 0)
                mimeTypes2.push(mimeType)
        }
    }

    let extensions = '', mimeTypes = '';
    for (let n in extensions2) {
        if (n > 0)
            extensions += ',';
        extensions += extensions2[n];
    }
    for (let n in mimeTypes2) {
        if (n > 0)
            mimeTypes += ',';
        mimeTypes += mimeTypes2[n];
    }

    return {
        extensions, mimeTypes
    }
}

/*export const download = function (fileOids, isZip = false) {
    let url = config.apiPath + '/PDFApi/download?isZip=' + isZip;
    console.log(config.apiPath);
    console.log(fileOids)
    for (let i in fileOids) {
        url += '&file=' + encodeURIComponent(fileOids[i])
    }

    url += '&time=' + new Date().getTime();
    console.log(url);

    try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    } catch (e) {
    }
}*/

// 1,<a href="{{downloadUrl}}">下载</a>   --- 当前页面会闪一下
// 2,window.open(downloadUrl);    --- 会打开新窗口
// 3,iframe方式
//     try {
//         var elemIF = document.createElement("iframe");
//         elemIF.src = url;
//         elemIF.style.display = "none";
//         document.body.appendChild(elemIF);
//     } catch (e) {
//     }
// 4,post方式
// ？？？


/*===================下载文件
 * options:{
 * url:'',  //下载地址
 * data:{name:value}, //要发送的数据
 * method:'post'
 * }
 */
export const download = function (fileOids, isZip = false) {
    let url = config.apiPath + '/PDFApi/download?isZip=' + isZip;


    let $iframe = $('<iframe id="down-file-iframe" />');
    let $form = $('<form method="post" />');
    $form.attr('action', url);
    for (let i in fileOids) {
        $form.append('<input type="hidden" name="file" value="' + fileOids[i] + '" />');
    }
    $iframe.append($form);
    $(document.body).append($iframe);
    $form[0].submit();
    $iframe.remove();
}
