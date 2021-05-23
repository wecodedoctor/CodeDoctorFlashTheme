<?php
return [
    'admin_styles' => [
        'theme-admin-style' => [
            'src' => 'admin.css',
            'deps' => array(),
            'ver' => false,
            'media' => 'all'
        ]
    ],
    'admin_js' => [
        'jquery' => [],
        'theme-admin-js' => [
            'src' => 'admin.js',
            'deps' => array(),
            'ver' => false,
            'in_footer' => false,
            'localize_script' => [
                'object_name' => 'section_selection',
                'values' => array(
                    'ajax_url' => admin_url('admin-ajax.php')
                )
            ]
        ]
    ],
    'frontend_styles' => [
        'theme-style' => [
            'src' => 'app.css',
            'deps' => array(),
            'ver' => false,
            'media' => 'all'
        ]
    ],
    'frontend_js' => [
        'jquery' => [],
        'theme-app' => [
            'src' => 'app.js', // Source link of this asset
            'deps' => array('jquery'), // Dependencies of this asset. Default blank array
            'ver' => false, // Version of the asset. Default false
            'in_footer' => false // Is you want this asset to load in footer
        ]
    ]
];