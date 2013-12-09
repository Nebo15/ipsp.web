<?php
error_reporting(E_ALL);
ini_set('display_errors', true);

require_once(__DIR__.'/../vendor/autoload.php');

function showPage($title, $data) {
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
          <title>{$title}</title>
      </head>
      <body>
        {$data}<br />
      </body>
  </html>
HTML;
}

if(!isset($_REQUEST)) {
  exit('No request data');
}

if(!array_key_exists('email', $_REQUEST)) {
  exit('Email is not set');
}

$email = filter_var($_REQUEST['email'], FILTER_SANITIZE_EMAIL);

$merge_vars = [];
$merge_vars['EMAIL'] = $email ?: 'noinfo'.microtime(true).'@dontmail.me';
$mc = new Mailchimp('2e371d9fe765a8c1c7f1a1586a281bdf-us7');
$result = $mc->lists->subscribe('3dd249cb0d', ['email' => $email], $merge_vars, 'html', false, true);

if(array_key_exists('type', $_REQUEST) && $_REQUEST['type'] == 'json') {
  echo json_encode($result);
} else {
  showPage('Перенаправление', 'Ваши данные отправленны, если в течении 5 секунд вы не будете перенаправлены обратно на сайт, то нажмите на <a href="/">ссылку</a>.');
}
