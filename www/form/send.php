<?php
require_once(dirname(dirname(dirname(__FILE__))).'/www/vendor/autoload.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $mc    = new Mailchimp('3868f86110f53230458abc41c7bbd0de-us7', ['CURLOPT_FOLLOWLOCATION' => true]);
    $data  = json_decode($_POST['data']);
    $email = $data[21];
    if(!filter_var($email->value, FILTER_VALIDATE_EMAIL)) {
       $email->value = "unknwon@unknown.com";
    }
    $vars  = [
        'EMAIL'      => $email->value,
        //-------------- 1 step -------------
        'LEGALADDR1' => $data[0]->value,
        'LEGALADDR2' => $data[1]->value,
        'LEGALADDR3' => $data[2]->value,
        'LEGALADDR4' => $data[3]->value,
        'COUNTRY'    => $data[4]->value,
        'BUSINESSA1' => $data[5]->value,
        'BUSINESSA2' => $data[6]->value,
        'BUSINESSA3' => $data[7]->value,
        'BUSINESSA4' => $data[8]->value,
        'BUSSINESS'  => $data[9]->value,
        //-------------- 2 step -------------
        'WEBSITES'   => $data[10]->value,
        'DESCRIBES'  => $data[11]->value,
        'DOESBUSIN'  => $data[12]->value,
        //-------------- 3 step -------------
        'WHATISPA'   => $data[13]->value,
        'WHATISTO'   => $data[14]->value,
        'WHATISAN'   => $data[15]->value,
        'WHATISA'    => $data[16]->value,
        'WHICHGEOG'  => $data[17]->value,
        //-------------- 4 step -------------
        'PRIMARYMA1' => $data[18]->value,
        'PRIMARYMA2' => $data[19]->value . '/' . $data[20]->value,
        'PRIMARYMA4' => $data[21]->value,
        'PRIMARYMA5' => $data[22]->value,
        'ITSPECIAL1' => $data[23]->value,
        'ITSPECIAL2' => $data[24]->value . '/' . $data[25]->value,
        'ITSPECIAL4' => $data[26]->value,
        'ITSPECIAL5' => $data[27]->value,
        'OTHERISSU1' => $data[28]->value,
        'OTHERISSU2' => $data[29]->value . '/' . $data[30]->value,
        'OTHERISSU4' => $data[31]->value,
        'OTHERISSU5' => $data[32]->value
    ];
    $result = $mc->lists->subscribe('e1fc4230c1', ['email' => $email->value], $vars, 'html', false, true);
}
?>
