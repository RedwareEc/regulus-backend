#!/bin/bash          
lerna run build
pm2 start ecosystem.config.js 