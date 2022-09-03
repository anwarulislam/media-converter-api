#!/bin/bash
rm -rf temp
rm -rf converted_files
cd client && npm install && npm run build && cd ..
mkdir temp
mkdir converted_files