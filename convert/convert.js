const luainjs = require('lua-in-js');
const fs = require('fs');

const parse = (toParse) => {
  let value;

  if (toParse.strValues && Object.keys(toParse.strValues).length) {
    value = {};
    Object.keys(toParse.strValues).forEach(key => {
      if (typeof toParse.strValues[key] === "object") {
        value[key] = parse(toParse.strValues[key]);
      } else {
        value[key] = toParse.strValues[key];
      }
    });
  }

  if (toParse.numValues) {
    const numValues = toParse.numValues.filter(value => value);
    if (numValues.length) {
      if (value) {
        value.value = numValues;
      } else {
        value = numValues;
      }
    }
  }

  return value;
};

const convert = () => {
  const rawData = fs.readFileSync('./cluster-jewels.lua', 'utf8');
  const luaEnv = luainjs.createEnv();
  const luaScript = luaEnv.parse(rawData);
  const data = luaScript.exec();
  const parsed = parse(data);

  fs.writeFileSync('../docs/cluster-jewels.js', `export default ${JSON.stringify(parsed, null, 2)};`);


  const rawMods = fs.readFileSync('./cluster-jewels-mods.lua', 'utf8');
  const luaMods = luaEnv.parse(rawMods);
  const dataMods = luaMods.exec();
  const parsedMods = parse(dataMods);

  fs.writeFileSync('../docs/cluster-jewels-mods.js', `export default ${JSON.stringify(parsedMods, null, 2)};`);
};

convert();