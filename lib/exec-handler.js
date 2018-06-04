const ErrorClass = require('./error-class')

module.exports = (handler, ctx) => new Promise((resolve, reject) => {
    const _headers = {};
    const statusCode = 200;
    ctx.json = (res) => resolve({
        headers:{
            'Content-Type': 'application/json',
            ..._headers
        },
        statusCode,
        body:JSON.stringify(res)
    });

    ctx.end = (body) => resolve({
        statusCode,
        body
    });
    ctx.Error =  ErrorClass
    ctx.set = (key, value) => {
        _headers[key] = value;
        return ctx
    };
    ctx.throw = (statusCode, error = {}) => reject({
        statusCode: statusCode || error.code || 400,
        body: error.message || error
    })
    try {
        const res = handler(ctx) || {}

        if (res.then && res.catch) return res
            .then((_res={})=>{
                _res.headers = {..._res.headers, ..._headers}
                resolve(_res)
            })
            .catch(reject);
        res.headers = res.headers || {}
        res.headers = {...res.headers, ..._headers}
        return resolve(res);
    } catch (error) {
        console.log('error ', error);
        reject(error);
    }
});