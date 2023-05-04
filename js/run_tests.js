#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import test from 'node:test';
import assert from 'assert';
//import { glob } from 'glob';

//const schemaPath =
//  (await glob('./schemas/current/gatewayseq_schema_*.json'))[0];
const schemaPath = 'schemas/current/gatewayseq_schema.json';
console.log(`Found schema ${schemaPath}`);

const ajv = new Ajv();

let validate;
(async () => {
  try {
    const schemaString = await fs.promises.readFile(schemaPath);
    const schemaData = JSON.parse(schemaString);
    validate = ajv.compile(schemaData);
  } catch (e) {
    console.error(`Could not compile schema ${schemaPath}: ${e}`);
    throw e;
  }
})();

const jsonDir = 'test';

const check = (name, data) => {
  const valid = validate(data);
  let assert_function;
  let truthiness = true;
  if (name.startsWith('pass')) {
    if (valid !== true) {
      console.error(validate.errors);
    }
    assert_function = assert.ok;
  } else if (name.startsWith('fail')) {
    assert_function = (value) => assert.ok(!value);;
  } else {
    throw 'Test JSON does not begin with pass or fail';
  }
  test(`${name}`, (t) => {
    if (valid !== truthiness) {
    }
    assert_function(valid);
  });
};

(async () => {
  try {
    const jsonFiles = await fs.promises.readdir(jsonDir);
    for (const jsonFile of jsonFiles) {
      const jsonPath = path.join(jsonDir, jsonFile);
      try {
        const jsonString = await fs.promises.readFile(jsonPath);
        const data = JSON.parse(jsonString);
        check(jsonFile, data);
      } catch (e) {
        console.error(`${e}`);
      }
    }
  } catch (e) {
    console.error(`Could not read files in ${jsonDir}: ${e}`);
  }
})();