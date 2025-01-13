<?php
header('Content-Type: application/json; charset=utf-8');
$data = file_get_contents('php://input');
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://pl.centrumoferty.com/api.php',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_HTTPHEADER => array(
        'x-api-key: DmAvtKJgCnrACuA',
        'Content-Type: application/json'
    ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;