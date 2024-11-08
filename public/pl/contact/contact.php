<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../../vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

header('Content-Type: application/json; charset=utf-8');

$rawPostData = file_get_contents("php://input");
$data = json_decode($rawPostData, true);


$formData = $data['formData'];


try {
    $mail->isSMTP();
    $mail->Host       = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth   = true; 
    $mail->Username   = 'b1c9abd50f9d35';
    $mail->Password   = '62756a2ef6e44b';
    $mail->Port       = 2525;

    $mail->setFrom($formData['email'], 'Mailer');
    $mail->addAddress('j.decowski@intredo.com');

    $mail->isHTML(true); 
    $mail->Subject = $formData['orderId'] . ' - ' . $formData['topic'];
    $mail->Body    = '<b>Imię i nazwisko:</b> ' . $formData['name'] . '</br>' .
                     '<b>Wiadomość:</b> </br>' . $formData['message'];

    $mail->send();

    $response = array(
        'status' => 'success', 
        'message' => 'Message has been sent successfully' 
    );

    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
}