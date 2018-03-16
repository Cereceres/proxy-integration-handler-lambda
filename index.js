const co = require('co');

const execHandler = require('./lib/exec-handler');

const statusDefault = 400;
const defaultStatusCode = process.env.STATUS_DEFAULT || statusDefault;

module.exports = (handler) => (event, ctx, cb) => co(function *() {
    const {
        queryStringParameters: query = {},
        pathParameters: params = {},
        headers = {},
        body = {},
        httpMethod: method = 'GET',
        path = '/',
        requestContext = null,
        stageVariables = null
    } = event;
    const paramsToExecHandler = {
        query,
        body,
        params,
        headers,
        method,
        path,
        requestContext,
        stageVariables
    };
    const response = yield execHandler(handler, paramsToExecHandler);
    const {
        body: bodyResponse = '',
        statusCode = defaultStatusCode,
        headers: headersResponse = {}
    } = response;
    cb(null, { body: JSON.stringify(bodyResponse), statusCode, headers: headersResponse });
})
    .catch(({ message = '', body = message, statusCode = defaultStatusCode, headers = {}, stack }) => {
        console.log('stack ', stack);
        cb(null, {
            body:JSON.stringify(body),
            statusCode,
            headers
        });
    });