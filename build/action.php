<?php 

// Получаем доступ к данным из формы
$login = $_POST['login'];
$email = $_POST['email'];

// Преобразуем символы формы
$login = htmlspecialchars($login);
$email = htmlspecialchars($email);

// Декодируем url
$login = urldecode($login);
$email = urldecode($email);

// Удаляем пробелы если токовые имеются
$login = trim($login);
$email = trim($email);

// Почта получателя
$to  = "<example@gmail.com>";

// Заголовок письма
$subject = 'Данные формы';

$message = '
<html>
<head>
 <title>Тестовая отправка</title>
</head>
<body>
<p>Вы получили данные формы</p>
<table>
 <tr>
<th>login: </th><th>' . $login . '</th>
 </tr>
 <tr>
<td>Email: </td><td>' . $email . '</td>
 </tr>
 <tr>
</table>
</body>
</html>
';

$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: От кого письмо <example@gmail.com>\r\n"; 
$headers .= "Reply-To: <example@gmail.com>\r\n";

mail($to, $subject, $message, $headers);

?>