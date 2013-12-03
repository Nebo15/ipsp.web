<?php
error_reporting(E_ALL);
ini_set('display_errors', true);

require_once(__DIR__.'/../vendor/autoload.php');

$mc = new Mailchimp('2e371d9fe765a8c1c7f1a1586a281bdf-us7');

$params = array(
	"id" => '23207a4ce3',
    "email" => array(
        "email" => filter_var($_REQUEST['email'], FILTER_SANITIZE_EMAIL),
    ),
    'double_optin' => false
);

if(isset($_REQUEST) && is_array($_REQUEST) && array_key_exists('json', $_REQUEST)) {
  echo json_encode($mc->call('lists/subscribe', $params));
} else {
  $mc->call('lists/subscribe', $params);
  echo <<<HTML
  <!DOCTYPE HTML>
  <html lang="en-US">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="refresh" content="5;url=/">
          <script type="text/javascript">
            setTimeout(function() {
              window.location.href = "/";
            }, 5000);
          </script>
          <title>Перенаправление</title>
      </head>
      <body>
        Ваши данные отправленны, если в течении 5 секунд вы не будете перенаправлены обратно на сайт,
        то нажмите на <a href="/">ссылку</a>.
      </body>
  </html>
HTML;
}
