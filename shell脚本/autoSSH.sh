#!/bin/bash

## 脚本接收的参数，也就是要互相配置 SSH 免密登录的服务器列表参数
BASE_HOST_LIST=$*

## 密码，默认用户是当前运行脚本的用户，比如 hadoop 用户
BASE_PASSWORD="hadoop"

## Shell 函数一个：模拟 SSH 公钥私钥文件生成的人机交互过程
sshkeygen(){
 expect -c "
 spawn ssh-keygen
 expect {
 \"ssh/id_rsa):\" {send \"\r\";exp_continue}
 \"passphrase):\" {send \"\r\";exp_continue}
 \"again:\" {send \"\r\";exp_continue}
 }
 "
}

## Shell 函数一个：模拟配置 SSH 免密登录过程的人机交互过程
sshcopyid(){
 expect -c "
 spawn ssh-copy-id $1
 expect {
 \"(yes/no)?\" {send \"yes\r\";exp_continue}
 \"password:\" {send \"$2\r\";exp_continue}
 }
 "
}

## 本机生成密钥对
sshkeygen

## 然后本机跟其他服务器建立 SSH 免密登录（包括自己）
for SSH_HOST in ${BASE_HOST_LIST}
do
 sshcopyid ${SSH_HOST} ${BASE_PASSWORD}
done