# proxy-integration-handler-lambda
proxy integration handler lambda

# Usage

```js
let called = false;
const response = await awsTest.setHandler(getHandlder((ctx) => {
    assert(ctx.headers);
    assert(ctx.json);
    assert(ctx.set);
    assert(ctx.params);
    assert(ctx.body);
    assert(ctx.query);
    called = true;
    ctx.set('someHeader', 'theHeader');
    ctx.json({ a:'b' });
})).exec({});
assert(called);
assert(response.statusCode === 200);
assert(response.body === "{'a':'b'}");
assert.deepEqual(response.headers, {
    'Content-Type': 'application/json',
    'someHeader':'theHeader'
});
```

# API
Is a function receives other function what is the handler of api getaway request.

## proxyIntegrationHandlerLambda(handler)

handler is exec with context object:

    const ctx = {
        query,
        params,
        headers,
        body,
        json, // method
        throw // method
        method,
        path,
        requestContext,
        stageVariables,
        Error, // class
        set // method
    }

The response from handler is catch from promise returned, json or end method. The Error class can be intansced with statusCode and message.

## Methods

    json(object) -> Set the header content-type to application/json.

    set(header, value) -> Set the header to value in headers object.

    throw(statusCode, message) -> set the statusCode and body to message and return response.

    end(body) -> set the body and statusCode to 200 and return response.
