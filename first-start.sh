#!/bin/bash

docker run -p 3000:3000 -v $(pwd):/app -w /app --rm --name nm-demo -ti node:12-alpine /bin/sh -c "npm i && npm start"
