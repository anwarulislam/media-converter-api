#!/bin/bash
rm temp
rm converted_files
cd client && npm install && npm run build && cd ..