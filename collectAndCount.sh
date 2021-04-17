#!/bin/bash
# Collects all texts given as an argument to input.txt and runs wordCounter
# usage : ./collectAndCount.sh texts/ 
cat "$@" > input.txt
echo "Text collected"
node wordCounter.js input.txt out.txt
echo "Finished, result in out.txt"
