#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn typeorm-ts-node-commonjs migration:run -d src/data-source.js