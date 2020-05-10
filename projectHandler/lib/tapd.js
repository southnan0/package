const axios = require('axios').default;
var CryptoJS = require("crypto-js");

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.info('response',response);
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.info('error',error);
    return Promise.reject(error);
});

const ACCOUNT = {
    user:'chenzhuonan@htmimi.com',
    pass:'123456'
}

function getEncodedValue() {
    var o = CryptoJS.MD5(Math.random() + "").toString();
    var t = CryptoJS.AES.encrypt(ACCOUNT.pass, o, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    var password_encode = t.ciphertext.toString(CryptoJS.enc.Base64);
    var iv = t.iv.toString(CryptoJS.enc.Base64);
    var key = t.key.toString(CryptoJS.enc.Base64);
    return {
        iv: iv,
        key: key,
        pass: password_encode
    };
}

const encodedObj = getEncodedValue();
axios({
    method: 'post',
    withCredentials:'true',
    maxRedirects:0,
    url: 'https://www.tapd.cn/cloud_logins/login',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
        'data[Login][ref]': 'https://www.tapd.cn/my_worktable',
        'data[Login][encrypt_key]': encodedObj.key,
        'data[Login][encrypt_iv]': encodedObj.iv,
        'data[Login][site]': 'TAPD',
        'data[Login][via]': 'encrypt_password',
        'data[Login][email]': ACCOUNT.user,
        'data[Login][password]': encodedObj.pass,
        'data[Login][login]': 'login'
    }
});
