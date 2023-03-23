#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn add typescript -D
yarn build
yarn typeorm migration:run -d dist/src/data-source.js