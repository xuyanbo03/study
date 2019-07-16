#!/bin/bash

## 远程软件安装源
BASE_SERVER=centos

## 为了防止系统没有安装 wget 工具，所以安装….
yum install -y wget

## 远程下载
wget http://${BASE_SERVER}/soft/jdk-8u73-linux-x64.tar.gz

## 解压到对应安装目录
tar -zxvf jdk-8u73-linux-x64.tar.gz -C /usr/local

## 配置环境变量
cat >> /etc/profile << EOF
export JAVA_HOME=/usr/local/jdk1.8.0_73
export PATH=\$PATH:\$JAVA_HOME/bin
EOF

rm -rf /root/jdk-8u73-linux-x64.tar.gz
## 监测安装是否成功
source /etc/profile
java -version