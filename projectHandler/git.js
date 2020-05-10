const {clone} = require('./lib/git')
const path = require('path');
const fs = require('fs')

const arr1 = ["http://gitlab.hd/web/jj-sj-h5.git", "http://gitlab.hd/web/mj-weixin.git", "http://gitlab.hd/web/quark-h5.git", "http://gitlab.hd/web/middleground.git", "http://gitlab.hd/web/app-h5.git", "http://gitlab.hd/web/json-config.git", "http://gitlab.hd/web/material-website.git", "http://gitlab.hd/web/htlib.git", "http://gitlab.hd/web/jz-website.git", "http://gitlab.hd/MMB2B_platform/hd-b2b-material-order.git", "http://gitlab.hd/web/sl-weixin.git", "http://gitlab.hd/web/jz-weixin.git", "http://gitlab.hd/web/fc-mp.git", "http://gitlab.hd/web/web-thrift.git", "http://gitlab.hd/web/cl-supplier-platform.git", "http://gitlab.hd/web/mm_weixin.git", "http://gitlab.hd/web/clfx-weixin.git", "http://gitlab.hd/web/cl-handbook-pc.git", "http://gitlab.hd/web/fc-platform.git", "http://gitlab.hd/ducan/mini-app-template.git"];
const arr2 = ["http://gitlab.hd/web/material-operator.git", "http://gitlab.hd/web/material-designer.git", "http://gitlab.hd/web/materialsell-mp.git", "http://gitlab.hd/web/cl-handbook-h5.git", "http://gitlab.hd/web/cg-h5.git", "http://gitlab.hd/web/material-mall.git", "http://gitlab.hd/web/material-mp.git", "http://gitlab.hd/web/cg-platform.git", "http://gitlab.hd/web/cg-sj-platform.git", "http://gitlab.hd/web/material-platform.git", "http://gitlab.hd/web/cl-platform.git", "http://gitlab.hd/web/cl-mall.git", "http://gitlab.hd/web/cg-weixin.git", "http://gitlab.hd/web/jz-platform.git", "http://gitlab.hd/web/material-suppliers.git", "http://gitlab.hd/web/material-platform-vue.git", "http://gitlab.hd/web/material-designer-vue.git", "http://gitlab.hd/web/material-operator-vue.git", "http://gitlab.hd/chenzhuonan/material-rn.git", "http://gitlab.hd/web/cl-mp.git"];

const arr = [
    ...arr1,
    ...arr2
];

/**
 * 根据git的url，生成项目文件夹名称
 * @param gitPath
 * @returns {string}
 */
const getDirName = (gitPath) => {
    const regExp = /(?<=\/)(\w|-)+.git$/gi;
    const match = gitPath.match(regExp);
    if (match) {
        return match[0].replace('.git', '');
    }

    throw '请设置输入正确的git地址' + gitPath;
};

/**
 * 检查当前文件夹在指定目录是否存在，是，跳过
 * @param dirName
 * @param dirPath
 * @returns {Array<string>|boolean}
 */
const checkFolderExists = ({dirName, dirPath}) => {
    try {
        const d = fs.readdirSync(path.resolve(dirPath, dirName), {withFileTypes: true});
        return d;
    }catch (e) {
        return false;
    }
};

arr.forEach((item) => {
    const dirName = getDirName(item)
    const dirPath = path.resolve('E:\\code\\ht-project')
    const isFolderExists = checkFolderExists({
        dirName,
        dirPath
    });

    if(!isFolderExists){
        clone({gitPath: item, outputPath: path.resolve(dirPath, dirName)})
    }
});

