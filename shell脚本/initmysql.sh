#!/bin/bash

mysql -uroot -proot << EOF
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
 FLUSH PRIVILEGES;
 use mysql;
 select host, user, password from user;
EOF