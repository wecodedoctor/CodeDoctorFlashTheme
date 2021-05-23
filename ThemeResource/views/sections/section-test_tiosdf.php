<?php $attrs = layout_get_attrs( $args ); ?>
<section <?php echo $attrs->get_attrs() ?> class="<?php echo $attrs->get_classes() ?>">
	<?php echo $attrs->get_field_data('test');?>
</section>
