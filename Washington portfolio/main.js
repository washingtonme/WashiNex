// JavaScript code with GSAP animations

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .services__img, .contact__input',{interval: 200}); 

// scrolling to sections when nav links are clicked
navLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

//cursor
const cursor = document.querySelector(".cursor"); 

let x = 0, y = 0, mouseX = 0, mouseY = 0;

function animate() {
  let distX = mouseX - x;
  let distY = mouseY - y;

  x += distX / 5;
  y += distY / 5;

  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';

  requestAnimationFrame(animate);
}

document.addEventListener("mousemove",(e)=> {
  mouseX = e.pageX;
  mouseY = e.pageY;
  cursor.style.display = 'block';
});

//stop animation off the screen
document.addEventListener("mouseout", () => {
  cursor.style.display = 'none';
});

//enlarge inner circle on click
document.addEventListener("click", () => {
  cursor.classList.add('clicked'); // Add the clicked class on click

  // Remove the clicked class after the transition is complete
  setTimeout(() => {
    cursor.classList.remove('clicked');
  }, 300); // Same duration as the transition
});

animate();

let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

// Call changeText every 4 seconds
setInterval(changeText, 4000);

// function([string1, string2],target id,[color1,color2])    

$(document).ready(function() {
    $('body').ripples({
      resolution: 512,
      dropRadius: 20, //px
      perturbance: 0.04,
    });
  
    $('body').on('click', function(e) {
      var $el = $(this);
      var x = e.pageX - $el.offset().left;
      var y = e.pageY - $el.offset().top;
      $el.ripples('drop', x, y, 30, 0.03);
    });
  });
  $(document).ready(function() {
  $('body').ripples({
    resolution: 512,
    dropRadius: 20, //px
    perturbance: 0.04,
  });

  $(window).on('scroll', function(e) {
    var $el = $('body');
    var x = e.pageX - $el.offset().left;
    var y = e.pageY - $el.offset().top;
    $el.ripples('drop', x, y, 30, 0.03);
  });
});

// GSAP animation for the .home__blob element
gsap.to('.home__blob', {
    scale: 1.2, // Scale up to 120% of its original size
    duration: 2, // Duration of 2 seconds
    ease: 'elastic.out(1, 0.3)', // Elastic easing for a more fluid effect
    repeat: -1, // Repeat the animation indefinitely
    yoyo: true // Make the animation reverse on each iteration for a pulsating effect
});

  