const luainjs = require('lua-in-js');
const fs = require('fs');

const parse = (toParse) => {
  if (toParse.numValues) {
    const numValues = toParse.numValues.filter(value => value);
    if (numValues.length) {
      return numValues;
    }
  }

  if (toParse.strValues) {
    const result = {};
    Object.keys(toParse.strValues).forEach(key => {
      if (typeof toParse.strValues[key] === "object") {
        result[key] = parse(toParse.strValues[key]);
      } else {
        result[key] = toParse.strValues[key];
      }
    });
    return result;
  }
};

const convert = () => {
  const rawData = fs.readFileSync('./cluster-jewels.lua', 'utf8');
  const luaEnv = luainjs.createEnv();
  const luaScript = luaEnv.parse(rawData);
  const data = luaScript.exec();
  const parsed = parse(data);

  fs.writeFileSync('../docs/cluster-jewels.js', `export default ${JSON.stringify(parsed, null, 2)};`);
};

convert();