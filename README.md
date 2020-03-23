# Snowstorm.JS

SnomedCT Snowstorm Client for Javascript

## Install

```
npm i snowstorm-js --save
```

## Usage 

```javascript
import { SnowstormJS } from 'snowstorm-js'

const snowstorm = new SnowstormJS('http://localhost:8080');

snowstorm.branching.retrieveBranch({ path: 'MAIN' })
         .then(console.log)
         .catch(console.error);

snowstorm.descriptions.findBrowserDescriptions({
    branch: 'MAIN/SNOMEDCT-ES',
    term: 'fiebre amarilla'
})
.then(console.log)
.catch(console.error);

```

[Completed list of methods](https://github.com/liquid36/snowstorm-js/blob/master/src/endpoints.json)