#!/bin/bash

## auto install mysql
## 假如是第二次装，那么要先停掉服务，并且卸载之前的 mysql
service mysql stop
EXISTS_RPMS=`rpm -qa | grep -i mysql`
echo ${EXISTS_RPMS}
for RPM in ${EXISTS_RPMS}
do
 rpm -e --nodeps ${RPM}
done

## 删除残留文件
rm -fr /usr/lib/mysql
rm -fr /usr/include/mysql
rm -f /etc/my.cnf
rm -fr /var/lib/mysql

## 从服务器获取安装 mysql 的 rpm 包
wget http://centos/soft/MySQL-client-5.6.26-1.linux_glibc2.5.x86_64.rpm
wget http://centos/soft/MySQL-server-5.6.26-1.linux_glibc2.5.x86_64.rpm

## 删除之前的密码文件，以免产生干扰
rm -rf /root/.mysql_secret

## 安装服务器
rpm -ivh MySQL-server-5.6.26-1.linux_glibc2.5.x86_64.rpm
## 安装客户端
rpm -ivh MySQL-client-5.6.26-1.linux_glibc2.5.x86_64.rpm

## 获取到生成的随机密码
##PSWD=`cat /root/.mysql_secret | awk -F ':' '{print substr($4,2,16)}'`
PSWD=` grep -v '^$' /root/.mysql_secret | awk -F ':' '{print substr($4,2,16)}'`
##PSWD=${PWD:1:16}

## 然后删除刚刚下下来的 rpm 包
rm -rf MySQL-client-5.6.26-1.linux_glibc2.5.x86_64.rpm
rm -rf MySQL-server-5.6.26-1.linux_glibc2.5.x86_64.rpm

## 提示安装的步骤都完成了。
echo "install mysql server and client is done .!!!!!!"
## 打印出来刚刚生成的 mysql 初始密码
echo "random password is:${PSWD}"
## 开启 mysql 服务
service mysql start


## 获取密码
ABC=`cat /root/.mysql_secret`
LAST_PASSWORD=${ABC:(-16)}
echo "最后的 mysql 安装随机密码：${LAST_PASSWORD}"
echo "install mysql success!!!!!!!"

## 进行初始化配置
## 第一次不能使用初始生成的明文密码进行登录。所以使用 expect 去模拟登录，然后改掉密码
expect -c "
 spawn mysql -u root -p
 expect {
 \"password:\" {send \"${LAST_PASSWORD}\r\";exp_continue}
 \"mysql>\" {send \"set PASSWORD = PASSWORD('root');exit;\r\";exp_continue}
 }
"

## 此处给 MySQL 数据设置远程连接权限
mysql -uroot -proot << EOF
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
 FLUSH PRIVILEGES;
 use mysql;
 select host, user, password from user;
EOF

## 修改数据库默认字符编码集
cp /usr/share/mysql/my-default.cnf /etc/my.cnf
cat >> /etc/my.cnf << EOF
 init_connect = 'SET NAMESutf8'
 character-set-server = utf8
 collation-server = utf8_general_ci
EOF

## mysql 重启，使设置的字符编码集生效
service mysql restart