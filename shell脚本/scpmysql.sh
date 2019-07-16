#!/bin/bash

SERVERS=$*

for SERVER in $SERVERS
do
  scp -r installmysql.sh $SERVER:/root/
  ssh $SERVER sh /root/installmysql.sh
done