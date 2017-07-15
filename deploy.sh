#!/bin/sh
gulp
cd /mnt/coding/idea_workspaces/common/common/src/main/webapp
rm -rf 404.html assets/ auth.html fonts/ index.html maps/ reg.html scripts/ styles/
cd -
cp -rvf release/*  /mnt/coding/idea_workspaces/common/common/src/main/webapp 
