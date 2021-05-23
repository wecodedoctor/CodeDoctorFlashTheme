import swal from 'sweetalert';
(function($){
    /**
     * Selection management system
     * Ref: https://api.jqueryui.com/sortable/#event-change
     */
    $(function(){
        let selected_area = $( "#_cd-admin-section-selection-of-sections--sortable" ),
            selected_area_ul = $('#_cd-admin-section-selection-list--list'),
            selected_page = $('#_cd-admin-section-selection-of-sections--page-id').attr('value'),
            selected_data = selected_area.attr('data-selected') ? JSON.parse(selected_area.attr('data-selected')) : [],
            selected_data_input = $('#_cd-admin-section-selection-setting'),
            selection_save_button = $('#_cd-admin-section-selection-list--save'),
            searching_input = $('#_cd-admin-section-input--search-value--input'),
            searching_result_holder = $('#_cd-admin-selection-input-result-holder'),
            searching_result_ul = $('#_cd-admin-selection-input-result'),
            searching_box_close_btn = $('#_cd-admin-selection-input-result--close'),
            searching_found_text_place = $('#_cd-admin-selection-input-result--counter'),
            ajax_variable_data = !!window.section_selection ? window.section_selection : { ajax_url: "" },
            searching_loader = $('#_cd-admin-selection-input-result--loader'),
            saving_loader = $('#_cd-admin-selection-save--loader'),
            debounce_timeout = null,
            debounce_lock = false,
            functions = {
                prepare_search_result_item: function(result) {
                    let filtered_result = [];
                    if(result && result.length > 0) {
                        $.each(result,function(key, item){
                            let item_html = `<li>
                            <div class="item" data-post-id="${item.post_id}" data-post-title="${item.post_title}" data-post-edit-url="${item.post_edit_url}">
                                <div class="item-title">${item.post_title}</div>
                                <div class="item-actions">
                                    <a class="button-primary" href="${item.post_edit_url}" target="_blank">View</a>
                                    <a class="button-secondary _select-item _select_cd-admin-section-selection-select-new" onclick="selection_operations.selectElem(event,this, ${item.post_id}, '${item.post_title}', '${item.post_edit_url}')" href="#">Select</a>
                                </div>
                            </div>
                        </li>`;
                            filtered_result.push(item_html);
                        });
                    }
                    return filtered_result;
                },
                set_search_result: function(result) {
                    let result_html = functions.prepare_search_result_item(result);
                    if(result_html.length > 0) {
                        searching_result_holder.show();
                        searching_result_ul.html( result_html.join("\r\n") );
                    }
                },
                set_result_result_count: function(result) {
                    let count = result && result.length;
                    searching_found_text_place.text( `Found ${count} results` )
                }
            };
        window.selection_operations = {
            selectElem: function(event, elem, post_id, post_title, post_url) {
                // alert('Hello');
                event.preventDefault();
                //data-post-id="${item.post_id}" data-post-title="${item.post_title}" data-post-edit-url="${item.post_edit_url}"
                let _this = $(elem),
                    html_data_value = JSON.stringify({id: post_id, title:post_title }),
                    html = `<li class="ui-state-default" data-id="${post_id}" data-value='${html_data_value}'>
                <div class="item">
                    <div class="item-drag-button"><span class="dashicons dashicons-sort"></span></div>
                    <div class="item-name">${post_title}</div>
                    <div class="item-actions">
                        <a class="button-link" href="${post_url}" target="_blank"><span class="dashicons dashicons-edit"></span></a>
                        <a class="button-link-delete" href="#" data-remove-id="${post_id}" onclick="selection_operations.chosen_remove(event, this, ${post_id})"><span class="dashicons dashicons-trash"></span></a>
                    </div>
                </div>
            </li>`;
                selected_area.append(html);
                selection_operations.afterSelectionCheckEmpty(_this);
                _this.closest('li').remove();
                selection_operations.reload_selection_input();
            },
            chosen_remove: function(event, el, post_id) {
                event.preventDefault();
                let _el = $(el),
                    removeable_list_item = _el.closest('li');
                swal({
                    title: "Are you sure?",
                    text: "Do you really need to remove the section ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            removeable_list_item.remove();
                            selection_operations.reload_selection_input();
                        }
                    });
            },
            afterSelectionCheckEmpty(elem) {
                let count_child = elem.closest('li').parent('ul').children('li').length;
                if(count_child <= 1) {
                    searching_box_close_btn.trigger('click');
                }
            },
            chosen_selections_array: function() {
                let items = selected_area.sortable( "toArray", {attribute: 'data-value' } );
                if(items && items.length > 0) items = items.map(function(item) { return JSON.parse(item); });
                return items;
            },
            reload_selection_input: function() {
                const value = selection_operations.chosen_selections_array();
                selected_data_input.attr('value', JSON.stringify(value));
            }
        };
        selected_area.sortable({
            key: "sort",
            axis: "y",
            containment: $( "#admin_section_selection_panel" ),
            handle: '.item-drag-button'
        });
        selected_area.disableSelection();
        selected_area.on( "sortupdate", selection_operations.reload_selection_input );
        selection_save_button.on('click', function(event){
            event.preventDefault();
            let __selected_sections = selection_operations.chosen_selections_array();
            if(__selected_sections && __selected_sections.length > 0) {
                $.ajax({
                    url: ajax_variable_data.ajax_url,
                    method: 'POST',
                    data: {
                        action: 'update_sections_for_page',
                        post_id: selected_page,
                        sections: __selected_sections
                    },
                    beforeSend: function() {
                        selected_area_ul.addClass('loading');
                    },
                    success: function(result) {
                        swal((result.status  ? 'Good job!': "!Ooh"), result.message, (result.status  ? "success" : "error"));
                    },
                    error: function(xhr) {

                    },
                    complete: function() {
                        selected_area_ul.removeClass('loading');
                    }
                });
            }
            // let primary_data = selected_area.sortable( "toArray", {attribute: 'data-value' } );
            // if(primary_data && primary_data.length > 0) selected_data = primary_data.map(function(item) { return JSON.parse(item); })
            // console.log(selected_data, ajax_variable_data);

        });
        searching_input.on('keyup',function(event){
            let _el = $(this),
                __value = $.trim(_el.val()),
                __already_selected = selection_operations.chosen_selections_array();
            if(debounce_timeout) clearTimeout(debounce_timeout);
            if(__value.length > 0) {
                if(!debounce_lock) {
                    debounce_timeout = setTimeout(function(){
                        $.ajax({
                            type: 'POST',
                            method: 'POST',
                            url: ajax_variable_data.ajax_url,
                            data: {
                                action: 'search_sections_for_page',
                                page_id: selected_page,
                                already_selected: __already_selected.length > 0 ? __already_selected.map(function(item){ return item.id; }) : [],
                                s: __value
                            },
                            dataType: "json",
                            beforeSend: function() {
                                debounce_lock = true;
                                searching_loader.addClass('is-active');
                            },
                            success: function(result) {
                                functions.set_search_result(result);
                                functions.set_result_result_count(result);
                            },
                            error: function(xhr) {
                                alert(`Error: ${xhr.responseText}`);
                            },
                            complete: function() {
                                debounce_lock = false;
                                searching_loader.removeClass('is-active');
                            }
                        })
                    },250);
                } else {
                    event.preventDefault();
                }
            } else {
                searching_box_close_btn.trigger('click');
            }

        });
        searching_box_close_btn.on('click', function(event){
            event.preventDefault();
            searching_result_holder.hide();
            searching_result_ul.find('li').remove();
            searching_input.val('');
        });
    });
})(window.jQuery);