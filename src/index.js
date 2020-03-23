"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@octokit/core");
const plugin_request_log_1 = require("@octokit/plugin-request-log");
const ENDPOINT = require('./endpoints.json');
const endpointsPlugin = (snowtormJS) => {
    for (let scope in ENDPOINT) {
        for (let action in ENDPOINT[scope]) {
            const [method, url] = ENDPOINT[scope][action].split(' ');
            ENDPOINT[scope][action] = snowtormJS.request.defaults({
                method,
                url,
                headers: { 'content-type': 'application/json', 'accept': 'application/json' }
            });
        }
    }
    return ENDPOINT;
};
exports.SnowstormJS = (_a = class extends core_1.Octokit {
        constructor(url, plainResponse = false) {
            super({ baseUrl: url });
            if (!plainResponse) {
                this.hook.wrap("request", async (request, options) => {
                    return request(options).then((res) => res.data);
                });
            }
        }
    },
    _a.plugins = [plugin_request_log_1.requestLog, endpointsPlugin],
    _a);
const snow = new exports.SnowstormJS('http://172.16.80.80:8080');
snow.branching.retrieveBranch({ path: 'MAIN/NEUQUEN' }).then(console.log).catch(console.error);
