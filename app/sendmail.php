<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet ="UTF-8";
    $mail-> setLauguage('ru', 'phpmailer/lauguage');
    $mail->IsHTML(true);
//от кого письмо
    $mail->setFrom('vitek_fetisov@mail.ru', 'Тест');
//Кому письмо 
    $mail->addAddress('vitek.fetisov@mail.ru');
//тема письма 

    $mail->Subject = 'Дороу'

    $social = "Напишите в WHATSAPP";
    if($_POST['social'] == "Позвоните мне"){
    $social = "Позвоните мне";
    }
    if(trim(!empty($_POST['name']))){
        $body.='<p?><strong>Имя:</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p?><strong>E-mail:</strong>'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['social']))){
        $body.='<p?><strong>Удобный для вас способ связи:</strong>'.$social.'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p?><strong>Сообщение:</strong>'.$_POST['message'].'</p>';
    }
    $mail->Body = $body;

    if(!$mail->send()){
        $message = 'Ошибка';
    }else{
        $message = 'Данные отправлены';
    }
    $response = ['message' => $message];
    
    header('Content-type: application/json');
    echo json_encode($response);
?>