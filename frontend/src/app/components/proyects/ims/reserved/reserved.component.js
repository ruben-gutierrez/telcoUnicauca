$(document).ready(function(){
    $('.bajar').click(function(){
        $('body, html').animate({
            scrollTop:'0px'
        },300);
    });
    $(window).scroll(function(){
        if($(this).scrollTop()>0){
            $('.bajar').slideDown(300);
        }else {
        $('.bajar').slideUp(300);
        }
    });
});