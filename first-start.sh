#!/bin/bash

docker run -p 3000:3000 -v /Users/gmauer/code/noom-demo:/app -w /app --rm --name noom-demo -ti node:12-alpine /bin/sh -c "npm i && npm start"
