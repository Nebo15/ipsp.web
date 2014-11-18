<?php

exec('cd ../ && git pull', $a);
echo implode("<br/>", $a);
