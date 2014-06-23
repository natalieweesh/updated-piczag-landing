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

    app.automaticSlideshows();

    $('a', '.slide-indicators .dots').on('click', function(){
        var slideNum = $('.slide-indicators .dots a').index($(this)); //this is zero-indexed
        console.log('clicked slide ' + slideNum);
        $('body, html').animate({'scrollTop': $(window).height() * slideNum}, 2000);
    });

    $('.play-button', '.first-slide').on('click', function(){
        $(this).hide(1000);
        app.playBigSlideshow();

    });
});

$(window).resize(function(){
    $('.slide').css({height: $(window).height()});
    app.resizeGallery();
});

var getCurrentSlide = function(){
    var winHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    var lesserSlide = parseInt(Math.abs(scrollHeight) / winHeight);
    var proportion = Math.abs(scrollHeight) % winHeight / winHeight; //if this number is greater than .5 then add 1 to lesserslide to get the current slide in focus
    var currentSlide = proportion > 0.5 ? lesserSlide + 1 : lesserSlide;
    //console.log('current slide: ' + (currentSlide + 1)); // slides aren't zero-indexed
    return (currentSlide + 1); //so slides aren't zero-indexed
}

app.startAnimation = function(slideNum) {
    $('.slide-indicators .dots a').removeClass('highlighted');
    $('.slide-indicators .dots a:nth-child(' + slideNum + ')').addClass('highlighted');
    
    switch (slideNum) {
        case 1:
            animateFirstSlide();
        case 2:
            animateSecondSlide();
        case 3:
            animateThirdSlide();
        case 4:
            animateFourthSlide();
        case 5:
            animateFifthSlide();
        default:
            break;
    }
}

app.resizeGallery = function(){
    var slideWidth = 160;
    var numOfSlides = Math.ceil($(window).width()/ slideWidth);
    var galleryWidth = numOfSlides * slideWidth;
    $('.gallery').css({'width': galleryWidth});
    $('.gallery').css({'margin-left': ($(window).width() - galleryWidth) / 2});
}

var animateFirstSlide = function(){
    //$('.first-slide .play-button').addClass('animated pulse');
    
    // setTimeout(function(){
        // $('.first-slide .play-button').removeClass('animated pulse');
    // }, 1000);
}

var animateSecondSlide = function(){
    $('.second-slide .black-band').css({'bottom': '100%'});
    $('.second-slide .black-band').animate({'bottom': '0'}, 1000);
    $('.second-slide .iphone').css({'left': '-100%'});
    $('.second-slide .iphone').animate({'left': '0'}, 1000);
}

var animateThirdSlide = function(){
    $('.third-slide .black-band').css({'bottom': '100%'});
    $('.third-slide .black-band').animate({'bottom': '0'}, 1000);
    $('.third-slide .iphone').css({'left': '-100%'});
    $('.third-slide .iphone').animate({'left': '50%'}, 1000);
}

var animateFourthSlide = function(){
    $('.image-gallery-slide .black-band').css({'bottom': '100%'});
    $('.image-gallery-slide .black-band').animate({'bottom': '0'}, 1000);
    $('.image-gallery-slide .iphone').css({'right': '-100%'});
    $('.image-gallery-slide .iphone').animate({'right': '0'}, 1000);
}

var animateFifthSlide = function(){
    $('.last-slide .social-icons').addClass('animated bounceInDown');
    
    setTimeout(function(){
        $('.last-slide .social-icons').removeClass('animated bounceInDown');
        $('.last-slide .download-link').addClass('animated pulse');
        
    }, 1000);

    setTimeout(function(){
        $('.last-slide .download-link').removeClass('animated pulse');
    }, 2000);
}

app.playBigSlideshow = function(){
    var slideshowSpeed = 2000;
    var bigScreen = $('.iphone .big-screen');
    var numOfSlides = $('.iphone .big-screen img').length;
    $('.iphone .big-screen').find('img').css({'left': '100%'});
    $('.iphone .big-screen').find('img').eq(0).css({'left': '0'});
    
    var currentSlide = 0;
    var nextSlide = currentSlide + 1;
    var slideshowPlaying = setInterval(function(){
        $(bigScreen).find('img').eq(currentSlide).css({'left': '-100%'});
        $(bigScreen).find('img').eq(nextSlide).css({'left': '0'});
        currentSlide = nextSlide;
        nextSlide += 1;
        if (nextSlide >= numOfSlides) {
            clearTimeout(slideshowPlaying);
            setTimeout(function(){
                $('.first-slide .play-button').show(1000);
            }, slideshowSpeed);
        }
    }, slideshowSpeed);
}

app.automaticSlideshows = function(){
    var slideshowSpeed = 2000;
    $('.iphone .screen').each(function(){
        var images = $(this);
        var numOfSlides = $(this).find('img').length;
        var currentSlide = 0;
        $(this).find('img').css({'opacity': '0'});
        $(this).find('img').eq(0).css({'opacity': '1'});
        setInterval(function(){
            nextSlide = (currentSlide + 1 >= numOfSlides ? 0 : currentSlide + 1);
            $(images).find('img').eq(currentSlide).css({'opacity': '0'});
            $(images).find('img').eq(nextSlide).css({'opacity': '1'});
            currentSlide = nextSlide;
        }, slideshowSpeed);
    });
}

$(window).scroll(function(){
    currentSlide = getCurrentSlide();
    if (currentSlide !== app.previousSlide) {

        console.log('slide changed to ' + currentSlide);
        app.startAnimation(currentSlide);
        app.previousSlide = currentSlide;
    }
});