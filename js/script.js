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

$(window).load(function(){
    $('.last-slide').css({'opacity': '1'});
    app.positionCenteredPhones();
    $('body, html').scrollTop(0);
});

$(document).ready(function(){

    $('.fancybox').fancybox({
      type: 'iframe',
      padding: 0,
      helpers: {
          media: {}
      }
    });

    $('body, html').scrollTop(0);

    $('.slide, .image-gallery-slide .gallery').css({height: $(window).height()});
    //app.shuffleGallery.start();

    app.previousSlide = getCurrentSlide();
    app.startAnimation(app.previousSlide);

    app.resizeGallery();

    //app.positionCenteredPhones();

    app.automaticSlideshows();

    $('a', '.slide-indicators .dots').on('click', function(){
        var slideNum = $('.slide-indicators .dots a').index($(this)); //this is zero-indexed
        console.log('clicked slide ' + slideNum);
        

        


        $('body, html').animate({'scrollTop': $(window).height() * slideNum}, 1000);
        
        $(window).unbind('scroll');
        setTimeout(function(){
            app.startAnimation(slideNum + 1);
        }, 1150);


        setTimeout(function() {
            $(window).bind('scroll', function(){
                currentSlide = getCurrentSlide();

                clearTimeout(timer);
                timer = setTimeout(refresh, 150);
            });            
        }, 1150);

    });

    /* play big slideshow on first screen 
    $('.play-button', '.first-slide').on('click', function(){
        $(this).css({'opacity': '0'});
        setTimeout(function(){
            $('.play-button', '.first-slide').css({'display': 'none'});
        });
        app.playBigSlideshow();

    });
    */

/* begin playground */

    var timer;
    $(window).bind('scroll', function(){
        currentSlide = getCurrentSlide();
        app.scrollBlackBar();
        clearTimeout(timer);
        timer = setTimeout(refresh, 150);
    });
    var refresh = function(){
        console.log('stopped scrolling');

        // currentSlide = getCurrentSlide();
        if ($(window).scrollTop() > (app.previousSlide - 1) * $(window).height()) {
            console.log('scrolled down!');
            $(window).unbind('scroll');
            $(window).scroll(function(){app.scrollBlackBar();});
            $('body, html').animate({'scrollTop': $(window).height() * (currentSlide-1+1)}, 500);
            
            app.startAnimation(currentSlide+1);
            app.previousSlide = currentSlide+1;
        } else {
            console.log('scrolled up!');
            $(window).unbind('scroll');
            $(window).scroll(function(){app.scrollBlackBar();});
            $('body, html').animate({'scrollTop': $(window).height() * (currentSlide-1)}, 500);
            
            app.startAnimation(currentSlide);
            app.previousSlide = currentSlide;
        }
        /*
        if (currentSlide !== app.previousSlide) {

            console.log('slide changed to ' + currentSlide);
            $(window).unbind('scroll');
            $(window).scroll(function(){app.scrollBlackBar();});
            $('body, html').animate({'scrollTop': $(window).height() * (currentSlide-1)}, 500);
            
            app.startAnimation(currentSlide);
            app.previousSlide = currentSlide;

        } else {
            console.log('stay on the same slide');
            $(window).unbind('scroll');
            $(window).scroll(function(){app.scrollBlackBar();});
            $('body, html').animate({'scrollTop': $(window).height() * (app.previousSlide-1)}, 500);
        }
        */
        setTimeout(function() {
            
            $(window).bind('scroll', function(){
                currentSlide = getCurrentSlide();

                clearTimeout(timer);
                timer = setTimeout(refresh, 150);
            });
            
        }, 650);
    };






/* end playground */
});

$(window).resize(function(){
    $('.slide').css({height: $(window).height()});
    app.resizeGallery();
    app.positionCenteredPhones();
});

var getCurrentSlide = function(){
    var winHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    var lesserSlide = parseInt(Math.abs(scrollHeight) / winHeight);
    var proportion = Math.abs(scrollHeight) % winHeight / winHeight; //if this number is greater than .5 then add 1 to lesserslide to get the current slide in focus
    var currentSlide = proportion > 0.5 ? lesserSlide + 1 : lesserSlide;
    //console.log('current slide: ' + (currentSlide + 1)); // slides aren't zero-indexed
    //return (currentSlide + 1); //so slides aren't zero-indexed
    console.log('CURRENT SLIDE: ' + (lesserSlide + 1));
    return (lesserSlide + 1);

}

app.startAnimation = function(slideNum) {
    $('.slide-indicators .dots a').removeClass('highlighted');
    $('.slide-indicators .dots a:nth-child(' + slideNum + ')').addClass('highlighted');
    
    switch (slideNum) {
        case 1:
            animateFirstSlide();
            break;
        case 2:
            animateSecondSlide();
            break;
        case 3:
            animateThirdSlide();
            break;
        case 4:
            animateFourthSlide();
            break;
        case 5:
            animateFifthSlide();
            break;
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
    $('.main-iphone').css({'left': '-50%'});
    $('.big-black-band').css({'opacity': '0'});
    // $('.slide-2-text, .slide-3-text, .slide-4-text').css({'left': '-100%'});
    $('.screen-2, .screen-3, .screen-4').css({'opacity': '0'});
    $('.last-slide').css({'z-index': '-1'});
}

var animateSecondSlide = function(){
    $('.second-slide .black-band').css({'bottom': '100%'});
    $('.second-slide .black-band').animate({'bottom': '0'}, 1000);
    // $('.big-black-band').css({'left': '100%'});
    $('.big-black-band').css({'left': '0'});

    $('.big-black-band').css({'opacity': '0'});
    $('.big-black-band .text-band').css({'width': '65%'});
    $('.big-black-band').animate({'opacity': '0.75'});
    $('.slide-2-text').animate({'left': '30%'});
    $('.slide-3-text').animate({'left': '-100%'});
    $('.slide-4-text').css({'left': '-100%'});
    $('.main-iphone').css({'left': '-5%', 'margin': '0'});
    $('.main-iphone').animate({'left': '5%'});
    $('.screen-2').css({'opacity': '1'});
    $('.screen-3').animate({'opacity': '0'});
    $('.screen-4').animate({'opacity': '0'});
    $('.main-iphone').animate({'left': '0'}, 1000);
    $('.second-slide .iphone').css({'left': '-100%'});
    $('.second-slide .iphone').animate({'left': '0'}, 1000);
    $('.last-slide').css({'z-index': '-1'});
}

var animateThirdSlide = function(){
    $('.third-slide .black-band').css({'bottom': '100%'});
    $('.third-slide .black-band').animate({'bottom': '0'}, 1000);
    // $('.big-black-band, .big-black-band .text-band').css({'left': '100%'});
    // $('.big-black-band.third, .big-black-band.third .text-band').css({'left': '0'});

    $('.main-iphone').css({'left': '50%', 'margin-left': $('.main-iphone').width()/2 * -1 + 'px'});
    $('.big-black-band').css({'opacity': '0.75'});
    $('.big-black-band .text-band').css({'width': '100%'});
    $('.slide-2-text').animate({'left': '100%'});
    $('.slide-3-text').animate({'left': '0'});
    $('.slide-4-text').css({'left': '-100%'});
    $('.screen-2').animate({'opacity': '0'});
    $('.screen-3').animate({'opacity': '1'});
    $('.screen-4').animate({'opacity': '0'});
    $('.third-slide .iphone').css({'left': '-100%'});
    $('.third-slide .iphone').animate({'left': '50%'}, 1000);
    $('.last-slide').css({'z-index': '-1'});
}

var animateFourthSlide = function(){
    $('.image-gallery-slide .black-band').css({'bottom': '100%'});
    $('.image-gallery-slide .black-band').animate({'bottom': '0'}, 1000);
    // $('.big-black-band, .big-black-band .text-band').css({'left': '100%'});
    // $('.big-black-band.fourth, .big-black-band.fourth .text-band').css({'left': '0'});

    $('.main-iphone').css({'left': '70%', 'margin-left': '0'});
    $('.slide-3-text').animate({'left': '100%'});
    $('.slide-4-text').animate({'left': '5%'});
    $('.screen-2').animate({'opacity': '0'});
    $('.screen-3').animate({'opacity': '0'});
    $('.screen-4').animate({'opacity': '1'});
    $('.big-black-band').css({'opacity': '0.75'});
    $('.big-black-band .text-band').css({'width': '65%'});
    $('.image-gallery-slide .iphone').css({'right': '-100%'});
    $('.image-gallery-slide .iphone').animate({'right': '0'}, 1000);
    $('.last-slide').css({'z-index': '-1'});
}

var animateFifthSlide = function(){
    //$('.last-slide .social-icons').addClass('animated bounceInDown');
    // $('.big-black-band').css({'opacity': '0'});

    $('.big-black-band').css({'left': '0'});
    $('.main-iphone').css({'left': '100%', 'margin-left': '0'});
    $('.big-black-band').css({'opacity': '0'});
    $('.slide-2-text, .slide-3-text, .slide-4-text').css({'left': '-100%'});
    $('.last-slide').css({'z-index': '0'});
    setTimeout(function(){
        //$('.last-slide .social-icons').removeClass('animated bounceInDown');
        //$('.last-slide .download-link').addClass('animated pulse');
        
    }, 1000);

    setTimeout(function(){
        //$('.last-slide .download-link').removeClass('animated pulse');
    }, 2000);
}
/*
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
                $('.first-slide .play-button').css({'display': 'block'});
            }, slideshowSpeed);
            setTimeout(function(){
                $('.first-slide .play-button').css({'opacity': '0.8'});
            }, slideshowSpeed + 500);
        }
    }, slideshowSpeed);
}
*/

app.positionCenteredPhones = function(){
    console.log($('.first-slide .iphone').height());
    $('.first-slide .iphone').css({'top': '50%', 'margin-top': $('.first-slide .iphone').height() / 2 * -1 + 'px'});
    $('.third-slide .iphone').css({'margin-left': $('.third-slide .iphone').width() / 2 * -1 + 'px'});
}

app.automaticSlideshows = function(){
    var slideshowSpeed = 4000;
    $('.main-iphone .screen').each(function(){
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

app.scrollBlackBar = function(){
    
    if ($('body').scrollTop() >= $(window).height() * 3) {
        console.log('black bar should not be sticky any more!');
        $('.big-black-band').removeClass('sticky');
        $('.main-iphone').removeClass('sticky');
    } else if ($('body').scrollTop() >= $(window).height()) {
        console.log('black bar should be sticky');
        $('.big-black-band').addClass('sticky');
        $('.main-iphone').addClass('sticky');
    } else if ($('body').scrollTop() < $(window).height()){
        $('.big-black-band').removeClass('sticky');
        $('.main-iphone').removeClass('sticky');
    }
}
$(window).on('scroll', function(){
    /*
    console.log('scrollin scrollin scrollin');
    if ($('body').scrollTop() >= $(window).height()) {
        console.log('make the black bar stick!');
    }
    */

    /*
    currentSlide = getCurrentSlide();
    if (currentSlide !== app.previousSlide) {

        console.log('slide changed to ' + currentSlide);
        app.startAnimation(currentSlide);
        app.previousSlide = currentSlide;
    }
    */
});
