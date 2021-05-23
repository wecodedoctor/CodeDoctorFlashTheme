<?php
namespace CodedoctorWordpressTheme\Sections\metabox;


use Carbon_Fields\Field;
use CodedoctorWordpressFlashCore\Loader\contracts\ClassInitializer;
use CodedoctorWordpressFlashSection\contracts\AbstractRegisterLayoutSectionMetabox;

class TestMetabox extends AbstractRegisterLayoutSectionMetabox
{
    use ClassInitializer;

    protected $metabox_title = 'Test';

    protected $metabox_container_id = 'test_tiosdf';

    public function metabox_fields(): array
    {
        return [
            Field::make('text', 'test', __('Test'))
        ];
    }
}