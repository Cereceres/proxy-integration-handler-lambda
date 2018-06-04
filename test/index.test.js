const assert = require('assert');

const getHandler = require('../index');
const AwsTest = require('aws-lambda-testing');

const awsTest = new AwsTest();


describe('test to index', () => {
    it('should pass a object context', async() => {
        let called = false;
        const res = await awsTest.setHandler(getHandler((ctx) => {
            console.log('ctx ', ctx);
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.end);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            return Promise.resolve();
        })).exec({});
        console.log('res ', res);
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            return Promise.resolve({
                headers: {
                    a:'a'
                },
                statusCode: 302,
                body:'body'
            });
        })).exec({});
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'body');
        assert.deepEqual(response.headers, {
            a:'a'
        });
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            return {
                headers: {
                    a:'a'
                },
                statusCode: 302,
                body:'body'
            };
        })).exec({});
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'body');
        assert.deepEqual(response.headers, {
            a:'a'
        });
        assert(called);
    });
    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            ctx.set('b', 'b');
            return {
                headers: {
                    a:'a'
                },
                statusCode: 302,
                body:'body'
            };
        })).exec({});
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'body');
        assert.deepEqual(response.headers, {
            a:'a',
            b:'b'
        });
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            ctx.set('b', 'b');
            return Promise.resolve({
                headers: {
                    a:'a'
                },
                statusCode: 302,
                body:'body'
            });
        })).exec({});
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'body');
        assert.deepEqual(response.headers, {
            a:'a',
            b:'b'
        });
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            ctx.set('b', 'b');
            ctx.json({ a:'b' });
        })).exec({});
        assert(called);
        assert(response.statusCode === 200);
        assert(response.body);
        assert.deepEqual(response.headers, {
            'Content-Type': 'application/json',
            'b':'b'
        });
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            ctx.throw(302, { message:'error' });
        })).exec({}).catch((error) => ({ error }));
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'error');
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            ctx.throw(302, 'error');
        })).exec({}).catch((error) => ({ error }));
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'error');
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            throw new ctx.Error(302, 'error');
        })).exec({}).catch((error) => ({ error }));
        assert(called);
        assert(response.statusCode === 302);
        assert(response.body === 'error');
        assert(called);
    });

    it('should pass a object context', async() => {
        let called = false;
        const response = await awsTest.setHandler(getHandler((ctx) => {
            assert(ctx.headers);
            assert(ctx.json);
            assert(ctx.set);
            assert(ctx.params);
            assert(ctx.body);
            assert(ctx.query);
            assert(ctx.method);
            assert(ctx.path !== undefined);
            assert(ctx.requestContext !== undefined);
            assert(ctx.stageVariables !== undefined);
            called = true;
            ctx.end('response');
        })).exec({}).catch((error) => ({ error }));
        assert(called);
        assert(response.statusCode === 200);
        assert(response.body === 'response');
        assert(called);
    });
});
