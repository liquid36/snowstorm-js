import { Octokit as Core } from "@octokit/core";
import { requestLog } from "@octokit/plugin-request-log";

const ENDPOINT = require('./endpoints.json');

const endpointsPlugin = (snowtormJS: Core) => {
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
}

export const SnowstormJS = class extends Core {
    static plugins = [requestLog, endpointsPlugin]

    constructor(url: string, plainResponse = false) {

        super({ baseUrl: url });

        if (!plainResponse) {
            this.hook.wrap("request", async (request, options) => {
                return request(options).then((res: any) => res.data);
            });
        }

    }
};


const snow = new SnowstormJS('http://172.16.80.80:8080');
snow.branching.retrieveBranch({ path: 'MAIN/NEUQUEN' }).then(console.log).catch(console.error);
