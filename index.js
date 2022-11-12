/*----------------------------------------------------*/
/* Quote Loop
------------------------------------------------------ */

function fade($ele) {
    $ele.fadeIn(1000).delay(3000).fadeOut(1000, function() {
        var $next = $(this).next('.quote');
        fade($next.length > 0 ? $next : $(this).parent().children().first());
   });
}
fade($('.quoteLoop > .quote').first());


/*----------------------------------------------------*/
/* Navigation
------------------------------------------------------ */

$(window).scroll(function() {

    if ($(window).scrollTop() > 300) {
        $('.main_nav').addClass('sticky');
    } else {
        $('.main_nav').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.main_nav').removeClass('open-nav');
    } else {
        $('.main_nav').addClass('open-nav');
    }
});

$('.main_nav li a').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_nav').removeClass('open-nav');
    }
});


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

jQuery(document).ready(function($) {

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});
  
});


TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);
var imgs = [
    'Images\233960912_3230181777268338_5053448654735894908_n.jpg',
  ],
  n = imgs.length,
  current = n-1,
  closedWidth = Math.floor(window.innerWidth/10)


for (var i=0; i<n; i++){

var bgImg = document.createElement('div');
bg.appendChild(bgImg);

gsap.set(bgImg, {
  attr:{id:'bgImg'+i, class:'bgImg'},
  width:'100%',
  height:'100%',
  backgroundImage:'url('+imgs[i]+')',
  backgroundSize:'cover',
  backgroundPosition:'center'
})

var b = document.createElement('div');
fg.appendChild(b);

gsap.fromTo(b, {
  attr:{id:'b'+i, class:'box'},
  innerHTML:'<p><sub>Fig.</sub> '+(i+1)+'</p>',
  width:'100%',
  height:'100%',
  borderLeft:(i>0)?'solid 1px #eee':'',
  backgroundColor:'rgba(250,250,250,0)',
  left:i*closedWidth,
  transformOrigin:'100% 100%',
  x:'100%'
},{
  duration:i*0.15,
  x:0,
  ease:'expo.inOut'
})  

b.onmouseenter = b.onclick = (e)=>{    
  if (Number(e.currentTarget.id.substr(1))==current) return;
   
  var staggerOrder = !!(current < Number(e.currentTarget.id.substr(1)));
  current = Number(e.currentTarget.id.substr(1));
  gsap.to('.box', {
    duration:0.5,
    ease:'elastic.out(0.3)',
    left:(i)=>(i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth),
    x:0,
    stagger: staggerOrder? 0.05:-0.05
  })
  
  bg.appendChild( document.getElementById('bgImg'+current) )
  gsap.fromTo('#bgImg'+current, {opacity:0}, {opacity:1, duration:0.3, ease:'power1.inOut'})
  gsap.fromTo('#bgImg'+current, {scale:1.05, rotation:0.05}, {scale:1, rotation:0, duration:1.5, ease:'sine'}) 
}
}


window.onresize = (e)=>{
closedWidth = Math.floor(window.innerWidth/10)
gsap.set('.box', { x:0, left:(i)=> (i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth) })
}