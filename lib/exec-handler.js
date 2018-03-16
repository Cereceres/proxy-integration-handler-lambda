const ErrorClass = require('./error-class')

module.exports = (handler, { query, body, params, headers, method, path, requestContext, stageVariables }) => new Promise((resolve, reject) => {
    const _headers = {};
    const statusCode = 200;
    const json = (res) => resolve({
        headers:{
            'Content-Type': 'application/json',
            ..._headers
        },
        statusCode,
        body:JSON.stringify(res)
    });

    const end = (body) => resolve({
        statusCode,
        body
    });
    const ctx = {
        query,
        params,
        headers,
        body,
        end,
        json,
        method,
        path,
        requestContext,
        stageVariables,
        Error: ErrorClass,
        end
    }
    ctx.set = (key, value) => {
        _headers[key] = value;
        return ctx
    };
    ctx.throw = (statusCode=400, error = {}) => reject({
        statusCode: statusCode || error.code,
        body: error.message || error
    })
    try {
        const res = handler(ctx);

        if (res instanceof Promise)return res
            .then((_res)=>{
                _res.headers = {..._res.headers, ..._headers}
                resolve(_res)
            })
            .catch(reject);
        res.headers = {...res.headers, ..._headers}
        return resolve(res);
    } catch (error) {
        reject(error);
    }
});