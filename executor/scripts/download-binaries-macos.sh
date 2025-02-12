#!/bin/bash

[ ! -d "./temp/binary" ] && mkdir -p "./temp/binary"

if [ ! -f "./temp/binary/hc" ]; then
    wget https://github.com/perspect3vism/ad4m/releases/download/binary-deps-0.1.0/hc-darwin-0.1.0
    mv hc-darwin-0.1.0 ./temp/binary/hc
    chmod +x ./temp/binary/hc
fi

if [ ! -f "./temp/binary/holochain" ]; then
    wget https://github.com/perspect3vism/ad4m/releases/download/binary-deps-0.1.0/holochain-darwin-0.1.0
    mv holochain-darwin-0.1.0 ./temp/binary/holochain
    chmod +x ./temp/binary/holochain
fi

if [ ! -f "./temp/swipl/bin/swipl" ]; then
    wget https://github.com/perspect3vism/ad4m/releases/download/binary-deps-0.1.0/swipl-darwin-x86.zip
    unzip swipl-darwin-x86.zip -d ./temp
    rm -rf ./temp/__MACOSX
    rm -rf swipl-linux-x64.zip
fi