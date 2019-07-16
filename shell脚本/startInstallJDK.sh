#!/bin/bash

## 要安装 JDK 的服务器目录列表
SERVERS="hadoop02 hadoop03 hadoop04"

## 密码
PASSWORD=hadoop

## 软件源
BASE_SERVER=hadoop01

## 启动安装 installJDK.sh 脚本分发程序 和 自动安装
for SERVER in $SERVERS
do
scp installJDK.sh root@$SERVER:/root/
ssh root@$SERVER chmod 755 installJDK.sh
ssh root@$SERVER /root/installJDK.sh
done