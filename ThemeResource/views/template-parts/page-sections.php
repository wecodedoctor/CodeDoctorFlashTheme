<?php
$sections = apply_filters('page_sections_list', get_the_ID());
$section_ids = !empty($sections) ? array_column($sections, 'id') : array();
if(!empty($section_ids)):
    foreach ($section_ids as $id):
        $selected_container = carbon_get_post_meta($id, 'chosen_layout_type', 'carbon_fields_container_layout_type');
        $section_container_data = layout_sections_vars($id, $selected_container);
        $section_container_data->getFrontEndInformation()->getViewHtml($id, $section_container_data);
    endforeach;
endif;