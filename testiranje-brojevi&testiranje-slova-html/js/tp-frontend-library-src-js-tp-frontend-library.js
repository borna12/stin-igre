jQuery(document).ready(function(){
  (function($){
    $('.tp_menu_link > .tp_expand_menu').on('click', function (e){
      e.stopPropagation();
      e.preventDefault();
      $(this).closest('li').toggleClass('open').find('.tp_child_menu').first().toggle()
    })
  })(jQuery)
})
