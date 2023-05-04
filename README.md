GatewaySeq JSON schema
======================

[Current schema](schemas/current)

Current [schema](schemas/current/gatewayseq_schema.json)
and
[documentation](schemas/current/README.md)


Resources
---------

https://github.com/dhslab/cle-gatewayseq

https://json-schema.org/

https://ajv.js.org/


Install
-------

    npm i


Usage
-----

Run test cases under `test/`. Test cases are prefixed with `pass_` or
`fail_` and are run with `js/run_tests.js`

    npm test

Validate all `*.json` files under `jsonDir`

    js/validate_all.js JSON_DIRECTORY

Run `ajv-cli` directly to validate a single file

    npx ajv validate -s SCHEMA -d JSON
    # Or use wrapper
    0/ajv.sh SCHEMA JSON


Documentation
-------------

Documentation for each version is written in Quarto, generating Github-flavored Markdown. Requires [Quarto](https://quarto.org/) and
[Jupyter](https://jupyter.org/)

    cd schemas/<schema version>
    # Generates README.md
    quarto render README.qmd

When writing documentation, live preview with

    quarto preview README.qmd


Versioning
----------

    v<MAJOR>.<MINOR>[rc]

    MAJOR   changes JSON validation 
    MINOR   internal schema changes only 
    rc      (optional) indicates release candidate
