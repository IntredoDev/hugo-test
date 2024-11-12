<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

header('Content-Type: application/json; charset=utf-8');

$rawPostData = file_get_contents("php://input");
$data = json_decode($rawPostData, true);

$formData = $data['formData'];

try {
    $mail->isSMTP();
    $mail->Host       = 'mail.24customercare.com';
    $mail->SMTPAuth   = true; 
    $mail->Username   = 'no-reply@24customercare.com';
    $mail->Password   = '9A4prZDCeSz0K';

    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->SMTPDebug = 0;

    $mail->setFrom('no-reply@24customercare.com', 'Mailer');
    $mail->addAddress('pl@24customercare.com');

    $mail->isHTML(true); 
    $mail->Subject = $formData['orderId'] . ' - ' . $formData['topic'];
    $mail->Body    = '<b>Imię i nazwisko:</b> ' . $formData['name'] . '</br>' .
                     '<b>Imię klienta:</b> ' . $formData['email'] . '</br>' .
                     '<b>Wiadomość:</b></br>' . $formData['message'];
                     

    $mail->send();

    $response = array(
        'status' => 'success', 
        'message' => 'Message has been sent successfully' 
    );

    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
}