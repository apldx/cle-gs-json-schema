#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import assert from 'assert';
import test from 'node:test';
import { parseArgs } from 'node:util';
import { glob } from 'glob';

const {
  positionals,
} = parseArgs({ allowPositionals: true });

const scriptName = path.basename(import.meta.url);
if (positionals.length !== 1) {
  console.error(`Usage: ${scriptName} JSON_DIRECTORY`);
  process.exit(1);
}
const jsonDir = positionals[0];

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

const check = (name, data) => {
  const valid = validate(data);
  if (valid !== true) {
    console.error(validate.errors);
  }
  test(`${name}`, (t) => {
    assert.ok(valid);
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
