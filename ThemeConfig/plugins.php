<?php
/**
 * Define template reuiqred plugins
 * paramters -
 *  i. slug = Array key ( The plugin slug (typically the folder name). )
 *  ii. name = Plugin name
 *  iii. zip_name = Zip file name that is located in wp-content/themes/codedoctorflash/ThemeResource/plugins
 *  iv. required = boolean value ( If false, the plugin is only 'recommended' instead of required. )
 *  v. version = Plugin version
 */
return [
    'contact-form-7' => [
        'name'               => 'Contact form 7',
        'zip_name'           => 'contact-form-7.zip',
        'required'           => true,
        'version'            => '5.4.1'
    ],
    'classic-editor' => [
        'name' => 'Classic editor',
        'zip_name' => 'classic-editor.zip',
        'required' => true,
        'version' => '1.6'
    ]
];