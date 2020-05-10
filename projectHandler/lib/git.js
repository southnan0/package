const Git = require("nodegit");
const path = require('path');
const fs = require('fs');

const cloneOptions = {
    fetchOpts: {
        callbacks: {
            certificateCheck: function () {
                return 0;
            },
            credentials: function (url, userName) {
                return Git.Cred.userpassPlaintextNew("chenzhuonan", "123456");
            }
        },
    },
};

const clone = ({gitPath, outputPath}) => {
    Git.Clone(gitPath, outputPath, cloneOptions).then((repo) => {
        return repo.getCurrentBranch()
    }).catch((err) => {
        console.info(err);
    });
};

module.exports = {
    clone
}

const pathToRepo = path.resolve('E:\\code\\ht-project', 'material-rn')

Git.Repository.init(pathToRepo, 0).then((repo) => {

    // Git.Remote.create(repo, 'origin', 'http://gitlab.hd/web/material-operator.git')
    //     .then((remoteResult) => {
    //         console.info(remoteResult);
    //     }).catch((e) => {
    //     console.info('Remote error===>', e);
    // })

    // Git.Remote.list(repo).then((remote) => {
    //     console.info(remote);
    // }).catch((e) => {
    //     console.info('Remote error===>', e);
    // })

    repo.getReferenceNames(3).then((arrString) => {
        const headsBranchName = arrString.find((item) => {
            return item.includes('refs/heads');
        });

        Git.Reference.nameToId(repo, headsBranchName).then(async (oid) => {
            // const currentCommit = await repo.getCommit(oid).then(function(commit) {
            //     commit.tags
            // });
            repo.createTag(oid, 'v-test'+new Date().getTime(), 'myfirst-test-head').then((tag) => {
                console.info(tag.name());
            }).catch((e) => {
                console.info('create-tag', e);
            });
        }).catch((e) => {
            console.info('nameToId', e);
        })


        // repo.getBranch(headsBranchName).then(reference=>{
        //
        // })
        console.info(headsBranchName);
        // fs.writeFileSync(path.resolve(__dirname,'../logs/references.json'),JSON.stringify({
        //     references:arrString
        // }));
    })
}).catch((e) => {
    console.info('init error===>', e);
})



