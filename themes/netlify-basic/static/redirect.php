<?php
var_dump($_SERVER['REQUEST_URI']);
if ($_SERVER['REQUEST_URI'] === '/pl/thank-you/') {
    // Send a 404 Not Found status header
   header("HTTP/1.0 404 Not Found");
   
   // Optionally, display a custom 404 message or include a 404 page
   echo '404 Page Not Found';
   exit();
}
?>