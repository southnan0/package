const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const openNewTerminal = require('./lib/openNewTerminal');

const chooseEnvironment = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'env',
        message: '请选择环境变量',
        choices: [{
            name: '开发环境',
            value: 'dev'
        }, {
            name: '测试环境',
            value: 'beta'
        }, {
            name: 'stg环境',
            value: 'stg'
        }, {
            name: '生产环境',
            value: 'release'
        }, {
            name: 'sit环境',
            value: 'sit'
        }, {
            name: 'fix环境',
            value: 'fix'
        }, {
            name: 'stress环境',
            value: 'stress'
        }]
    }]).then(({env}) => {
        process.env.API_ENV = env;

        getDirNpmScript();
    }).catch((error) => {
        throw error;
    });
};


/**
 * 遍历，获取指定目录的项目名称和启动命令
 * path.resolve('E:\\code\\ht-project')
 * @param dirPath
 */
const getDirNpmScript = (dirPath) => {
    if (!dirPath) {
        throw '请输入启动项目的文件夹路径'
    }

    const d = fs.readdirSync(dirPath, {withFileTypes: true});

    const project = [];
    d.forEach((dirent) => {
        const isDirectory = dirent.isDirectory();

        if (isDirectory) {
            const newDirPath = path.resolve(dirPath, dirent.name);
            try {
                const strFile = fs.readFileSync(path.resolve(newDirPath, 'package.json')).toString();
                const jsonFile = JSON.parse(strFile);
                const runScript = jsonFile.scripts['ht:dev'];
                if (runScript) {
                    project.push({...dirent, runScript})
                }
            } catch (e) {
                console.info('error=>', e);
            }
        }
    });

    inquirer.prompt([{
        type: 'checkbox',
        name: 'projectIndex',
        message: '请选择要运行的项目',
        choices: project.map((item, index) => {
            return {
                name: item.name,
                value: index
            }
        })
    }]).then(({projectIndex}) => {
        projectIndex.map((index)=>{
            const {runScript,name} = project[index];
            openNewTerminal({
                dirPath:path.resolve(dirPath,name),
                runScript
            });
        })

    }).catch((error) => {
        throw error;
    });
};

chooseEnvironment();




