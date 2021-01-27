$(function() {
    $.scrollify({
        section : ".page-scroll",
        before:function(data) {
            console.log(data);
            if(data == 0){
                $('#btn-crear').hide(); 
            }else{
                $('#btn-crear').show(); 
            }  
        }
    });

    $('.hero').on('beforeChange', function(event, slick, currentSlide, nextSlide){              
        if(nextSlide == 2){
          setTimeout(function(){ $('.gf-credit-card').hide("slow") }, 500);          
        }else if(nextSlide == 1){
          $('.gf-credit-card').show();
        }
      });
});

var instalada = false;

jQuery(document).ready(function ($) {
    $('.hero').slick({
        dots: true,
        appendDots:'.dots-container',
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 8000,
        draggable: true,
        arrows: true,
        appendArrows: '.slider-nav',
        prevArrow: '<img src="images/gf-arrow-slider.png" srcset="images/gf-arrow-slider@2x.png 2x" alt="Next">',
        nextArrow: '<img src="images/gf-arrow-slider.png" srcset="images/gf-arrow-slider@2x.png 2x" alt="Next">',
    });

    //read json config
    var country = 'ar';
    var flag_add_fav = false;
    var num_visit_reset = 0;
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const super_flag_add_fav = urlParams.get('flag_add_fav') || null;

    console.log(super_flag_add_fav);

    $.getJSON( "config.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            if(key === country){                
                flag_add_fav = val['flag_add_fav'];
                num_visit_reset = val['num_visit_reset'];
                var auxShowAddFav = false;
                if(super_flag_add_fav == null){
                    auxShowAddFav = flag_add_fav;                
                }else{
                    auxShowAddFav = super_flag_add_fav;
                }
                
                if(!auxShowAddFav){
                    $("#msgModal").hide();
                }else{
                    var num_actual = localStorage.getItem("num_visit_reset") || -1;
                    num_actual = +num_actual;
                    console.log(num_actual);
                    console.log(num_visit_reset);
                    if(num_actual > (num_visit_reset - 1) || num_actual == -1){
                        $("#msgModal").show();
                        localStorage.setItem("num_visit_reset", 1);
                    }else{
                        num_actual = num_actual + 1;
                        localStorage.setItem("num_visit_reset", num_actual);
                        $("#msgModal").hide();
                    }                    
                }

                if(instalada){
                    $("#msgModal").hide();
                }
            }
        });
    }); 
});              

$('.close-btn').on('click',function() {
    $(this).closest('#msgModal').fadeOut();
})

function openChat(){
    if(navigator.userAgent.toLowerCase().indexOf('opera') != -1 && window.event.preventDefault) 
        window.event.preventDefault();
     
    this.chat = window.open('https://chat.claroarg.s1gateway.com/pe/06a082a572719beabfe0b93ff204dd51bad42a718c2e5cdf83eb4124661d25dce607ff30dc553c99?s1_origin=O.AGLOGUEO', 'Claro', 'toolbar=0,scrollbars=0,location=0,status=0,menubar=0,width=420,height=645,resizable=0'); 
    this.chat.focus();
    this.chat.opener=window;
    return false;
}

// if are standalone android OR safari
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true || (screen.height-document.documentElement.clientHeight < 40)) {
    // hidden the button
    $("#msgModal").hide();
    instalada = true;
}

var userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (/android/i.test(userAgent)) {
    $("#steps-ios").hide();
    $("#steps-android").show();
}

if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    $("#steps-ios").show();
    $("#steps-android").hide();
}


