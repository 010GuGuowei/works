<?php
include_once './connect.php';

// $userName = $_POST['userName'];
// $userPwd = $_POST['userPwd'];
$email = $_POST['email'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

// $sql = "SELECT `id` FROM `user` WHERE `username` = '{$userName}' AND `email` = '{$email}'";
$sql = `CREATE TABLE ${email}cart (
     id int(11) NOT NULL AUTO_INCREMENT,
     num int(20) DEFAULT NULL,
     PRIMARY KEY (id)
   ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;`;

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result);

if (count($arr) == 1) {
    echo json_encode(['result' => 1, 'msg' => '登录成功']);
} else {
    echo json_encode(['result' => 0, 'msg' => '登录失败']);
}
