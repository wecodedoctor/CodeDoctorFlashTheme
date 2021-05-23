<?php get_header();?>
<?php
	if(have_posts()):
		while (have_posts()): the_post();
			get_template_part('ThemeResource/views/template-parts/page', 'sections');
		endwhile;
	endif;
?>
<?php get_footer();?>
