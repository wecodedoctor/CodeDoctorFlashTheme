(function($){
    "use strict";
    $(function(){
        var selection_field = $('.wp-admin.post-type-cf_sections [name="carbon_fields_compact_input[_chosen_layout_type]"]');
        var selection_field__value = $.trim(selection_field.val());
        var screen_options = $('.wp-admin.post-type-cf_sections input.hide-postbox-tog[type="checkbox"][id^="carbon_fields_container_"]');
        var activable_option_id = selection_field__value ? 'carbon_fields_container_' + selection_field__value + '-hide' : null;
        screen_options.each(function(key, item){
            var el = $(item);
            var id = el.attr('id').replace('-hide', '');
            if(el.attr('id') !== activable_option_id && id !== 'carbon_fields_container_layout_type') {
                el.prop('checked', false);
                $('#'+id).hide();
            } else {
                el.prop('checked', true);
                $('#'+id).show();
            }
        });
        selection_field.on('change', function(event){
            var new_selection = $.trim($(this).val()),
                new_activated_id = 'carbon_fields_container_' + new_selection + '-hide',
                input_element =  $('.wp-admin.post-type-cf_sections input.hide-postbox-tog[type="checkbox"][id^="'+new_activated_id+'"]'),
                metabox_id = 'carbon_fields_container_' + new_selection,
                old_section = selection_field__value,
                old_input_element = $('.wp-admin.post-type-cf_sections input.hide-postbox-tog[type="checkbox"][id^="carbon_fields_container_'+old_section+'-hide"]'),
                old_metabox_id = 'carbon_fields_container_' + old_section;
            selection_field__value = new_selection;
            if(input_element && input_element.length > 0) {
                input_element.prop('checked', 'checked');
                $('#'+metabox_id).show();
            }
            if(old_input_element && old_input_element.length > 0) {
                old_input_element.prop('checked', false);
                $('#'+old_metabox_id).hide();
            }
        });
    });
})(jQuery);