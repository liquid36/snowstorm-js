import { Octokit as Core } from "@octokit/core";
import { requestLog } from "@octokit/plugin-request-log";

import { ENDPOINTS } from './endpoints';

const endpointsPlugin = (snowtormJS: Core) => {
    for (let scope in ENDPOINTS) {
        for (let action in ENDPOINTS[scope]) {
            const [method, url] = ENDPOINTS[scope][action].split(' ');

            ENDPOINTS[scope][action] = snowtormJS.request.defaults({
                method,
                url,
                headers: { 'content-type': 'application/json', 'accept': 'application/json' }
            });
        }
    }
    return ENDPOINTS;
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
