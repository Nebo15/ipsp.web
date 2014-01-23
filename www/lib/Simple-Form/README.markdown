# Simple Form

Getting a good contact form with an AJAX submission and validation sucks. This is a vanilla contact form using basic validation and AJAX. It uses the jQuery form plugin (http://jquery.malsup.com/form) and jQuery validation (http://bassistance.de/jquery-plugins/jquery-plugin-validation).

## How To Use

### Basic setup:
- Set up your own settings in the scripts/mail.php file:

```php
// Variables used to determine sender and recipient
$simpleFormMailRecipient = "to@example.com";
$simpleFormMailFrom = "from@example.com";
$simpleFormMailSubject = "Contact Form Submission";
$simpleFormSuccessMessage = "Thanks! Your message sent successfully.";
```
***
### SMTP authentication setup:
If you need to authenticate messages using SMTP to prevent emails being stuck in queue:
**NOTE**: This *requires* PEAR to be installed on the server. Test if it is installed by running this in a PHP document:
```php
// If the output of file is "true", PEAR is installed on server
require_once 'System.php';
var_dump(class_exists('System'));
```
- In /scripts/index.js, change:

```js
url: 'scripts/mail.php'
```

to

```js
url: 'scripts/smtp/mail.php'
```

- Configure the following variables for email recipients:

```php
$from = "Jane Smith <from@example.com>";
$to = "John Smith <to@example.com>";
$subject = "Contact Form Submission";
```

- Configure the following variables for authenticating with SMTP:

```php
$host = "smtp.domain.com";
$username = "example@domain.com";
$password = "password";
```
***
### Multi-recipient setup
Use the multi-recipient setup if you want to present users with departments to email with a drop down.
- In /scripts/index.js, change:

```js
url: 'scripts/mail.php'
```

to

```js
url: 'scripts/multi/mail.php'
```

- Configure the drop down options and emails in /scripts/multi/select.php

## Latest Changes

### 1.4 - Decomber 4, 2012

- Added multi-recipient contact form for "department"-based forms

### 1.3 - November 27, 2012

- Added SMTP authenticated mailer script
- Remove variables in index.js because they conflicted with other scripts and became unmanageable

### 1.2 - June 21, 2012

- Rebranded project as Simple Form
- Added better variable names to avoid JS or PHP conflicts
- Added variables in JS for easy modifications

### 1.0.1 - June 25, 2011

- Hotlinked jQuery

### 1.0 - June 25, 2011

- Added config variable for success messages