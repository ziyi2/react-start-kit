//注意mocha是运行在服务器端,所以当然可以使用CommonJS规范
function add(x,y) {
    return x + y;
}

module.exports = add;