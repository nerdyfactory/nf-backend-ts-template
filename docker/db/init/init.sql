# create databases
CREATE DATABASE IF NOT EXISTS `local`;
CREATE DATABASE IF NOT EXISTS `test`;

GRANT ALL PRIVILEGES ON *.* TO 'docker'@'%';