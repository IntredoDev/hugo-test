<?php

header('Content-Type: application/json; charset=utf-8');

$rawPostData = file_get_contents("php://input");
$data = json_decode($rawPostData, true);


$formData = $data['formData'];


echo json_encode([
    'status' => 'success',
    'message' => 'Form processed successfully',
    'data' => $formData 
]);