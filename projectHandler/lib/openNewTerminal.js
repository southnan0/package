const {exec} = require('child_process');

/**
 * 打开新窗口执行命令
 * @param dirPath
 * @param runScript
 */
module.exports = ({dirPath,runScript})=>{
    const command = `start cmd.exe /k "cd ${dirPath} && ${runScript}"`;
    console.info('openNewTerminal===>command===>',command);
    const buildProcess = exec(command);
    buildProcess.stdout.on('data',(data)=>{
        console.info('openNewTerminal stdout====>',data);
    });

    buildProcess.stderr.on('data',(data)=>{
        console.info('openNewTerminal stderr====>',data);
    });
};
