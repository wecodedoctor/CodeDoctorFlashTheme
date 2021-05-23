<?php
define('CD_THEME_DIR', get_template_directory());
define('CD_THEME_URL', get_template_directory_uri());

require __DIR__ . '/vendor/autoload.php';
\CodedoctorFlash\LoadFlashTheme::init();


