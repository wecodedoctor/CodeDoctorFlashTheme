<?php


namespace CodedoctorWordpressTheme\App;


use CodedoctorWordpressFlashCore\Loader\AbstractClassLoader;
use CodedoctorWordpressFlashCore\Loader\contracts\ClassInitializer;

class NavMenus extends AbstractClassLoader {
	use ClassInitializer;

	public function boot() {
		add_action('after_setup_theme', [$this, 'registerNavMenu']);
	}

	public function registerNavMenu() {
		register_nav_menus([
			'primary' => __('Primary menu', self::theme_text_domain())
		]);
	}
}