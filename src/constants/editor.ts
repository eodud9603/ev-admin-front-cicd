/** L1 Editor Setting과 동일 */
export const CK_EDITOR_CONFIGS = {
    height: 300,
    // skin: 'bootstrapck',
    startupFocus: true,
    // bodyClass: 'CKEditor',
    language: 'ko',
    enterMode: 2,
    toolbar: [
        { name: 'document', items: [ 'Source', '-', /*'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-',*/ 'Templates' ] },
        { name: 'clipboard', items: ['SelectAll', 'Cut', 'Copy', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'styles', items: [/*'Styles', */'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
        { name: 'links', items: ['Link', 'Unlink'/*, 'Anchor'*/] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'/*, 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'*/ ] },
        { name: 'insert', items: ['Image', /*'Flash',*/ 'Table', /*'HorizontalRule',*/ 'Smiley', 'SpecialChar', /*'PageBreak',*/ 'Iframe', 'Youtube', 'EmojiPanel'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        // {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ]},
        // {name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    ],
    /** @TODO 서버 api url 기입 * 없을 시, 업로드 불가 */
    filebrowserUploadUrl: '/files/upload/ck?type=Files',
    filebrowserImageUploadUrl: '/files/upload/ck?type=Images',
    filebrowserUploadMethod: 'xhr',
    // https://evioc-dev.humaxcharger.com/files/upload/ck?type=Files&responseType=json
    removePlugins: 'cloudservices,easyimage,image,exportpdf',
    extraPlugins: 'youtube, emoji'
    // extraPlugins: 'emoji'
    // extraPlugins: 'print,format,font,colorbutton,justify,uploadimage',
    // extraAllowedContent: 'h3{clear};h2{line-height};h2 h3{margin-left,margin-top}',
    // removeDialogTabs: 'image:advanced;link:advanced'
} as const;
