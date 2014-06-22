var app = {
    shuffleGallery: {

    },
    previousSlide: 1
};

(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
        
        this.each(function(i){
            
            $(this).replaceWith($(shuffled[i]));
            
        });
        
        return $(shuffled);
 
    };
 
})(jQuery);

app.shuffleGallery = {
    rotateTime: 4000,
    fadeSpeed: 500,
    shufflingGallery: {}

}


app.shuffleGallery.start = function(){
    rotateTime = this.rotateTime;
    fadeSpeed = this.fadeSpeed;
    this.shufflingGallery = setInterval(function(){
        
        setTimeout(function(){
            // $('.gallery > a').addClass('dim');
            setTimeout(function(){
                $('.gallery > a').shuffle();
                //$('.gallery > a').removeClass('dim');
            }, fadeSpeed * 2);
        }, rotateTime - fadeSpeed * 2);
        
    }, rotateTime);
}

app.shuffleGallery.pause = function(){
    clearInterval(this.shufflingGallery);
};

$(document).ready(function(){
    $('.slide').css({height: $(window).height()});
    app.shuffleGallery.start();

    app.previousSlide = getCurrentSlide();
    app.startAnimation(app.previousSlide);

    app.resizeGallery();

    $('a', '.slide-indicators .dots').on('click', function(){
        var slideNum = $('.slide-indicators .dots a').index($(this)); //this is zero-indexed
        console.log(slideNum);
        $('body', 'html').animate({'scrollTop': $(window).height() * slideNum});
    });
});

$(window).resize(function(){
    $('.slide').css({height: $(window).height()});
    app.resizeGallery();
});

var getCurrentSlide = function(){
    var winHeight = $(window).height();
    var scrollHeight = $('body').scrollTop();
    var lesserSlide = parseInt(Math.abs(scrollHeight) / winHeight);
    var proportion = Math.abs(scrollHeight) % winHeight / winHeight; //if this number is greater than .5 then add 1 to lesserslide to get the current slide in focus
    var currentSlide = proportion > 0.5 ? lesserSlide + 1 : lesserSlide;
    //console.log('current slide: ' + (currentSlide + 1)); // slides aren't zero-indexed
    return (currentSlide + 1); //so slides aren't zero-indexed
}

app.startAnimation = function(slideNum) {
    $('.slide-indicators .dots a').removeClass('highlighted');
    $('.slide-indicators .dots a:nth-child(' + slideNum + ')').addClass('highlighted');
    if (slideNum === 2) {
        animateSecondSlide();
    } else if (slideNum === 3) {
        animateThirdSlide();
    } else if (slideNum === 4) {
        animateFourthSlide();
    }
}

app.resizeGallery = function(){
    var slideWidth = 160;
    var numOfSlides = Math.ceil($(window).width()/ slideWidth);
    var galleryWidth = numOfSlides * slideWidth;
    $('.gallery').css({'width': galleryWidth});
    $('.gallery').css({'margin-left': ($(window).width() - galleryWidth) / 2});
}

var animateSecondSlide = function(){
    $('.second-slide .black-band').css({'bottom': '100%'});
    $('.second-slide .black-band').animate({'bottom': '0'}, 1000);
}

var animateThirdSlide = function(){
    $('.third-slide .black-band').css({'bottom': '100%'});
    $('.third-slide .black-band').animate({'bottom': '0'}, 1000);
}

var animateFourthSlide = function(){
    $('.image-gallery-slide .black-band').css({'bottom': '100%'});
    $('.image-gallery-slide .black-band').animate({'bottom': '0'}, 1000);
}



$(window).scroll(function(){
    currentSlide = getCurrentSlide();
    if (currentSlide !== app.previousSlide) {

        console.log('slide changed to ' + currentSlide);
        app.startAnimation(currentSlide);
        app.previousSlide = currentSlide;
    }
});