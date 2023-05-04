#!/bin/bash

argn=2
set -o nounset
set -o pipefail
ee () { echo -e "$@" 1>&2; }

script=$(basename "$0")

usage=$(cat <<HERE

USAGE: $script SCHEMA JSON

HERE
)


if [ $# -ne $argn ]; then
  ee "$usage"
  exit 65
fi

npx ajv validate --strict=true -s $1 -d $2
