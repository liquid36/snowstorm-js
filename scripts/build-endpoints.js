
const fetch = require('node-fetch');
const fs = require('fs');

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

fetch('http://172.16.80.80:8080/v2/api-docs')
    .then(res => res.json())
    .then((data) => {
        const response = {};
        for (let url in data.paths) {
            const urlData = data.paths[url];
            for (let method in urlData) {
                const data = urlData[method];
                const { operationId, tags } = data;

                const scope = camelize(tags[0]);
                const name = operationId.substring(0, operationId.indexOf('Using'));

                if (!response[scope]) {
                    response[scope] = {};
                }

                response[scope][name] = method.toLocaleUpperCase() + ' ' + url.replace(/\{/g, ':').replace(/\}/g, '');
            }

        }

        const json = JSON.stringify(response);
        fs.writeFileSync('./src/endpoints.json', json);

    });