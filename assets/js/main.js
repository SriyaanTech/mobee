// AUISY Technologies — shared interactivity
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- navbar scroll state ---------- */
  var nav = document.querySelector('.navbar-auisy');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 24){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- back to top ---------- */
  var backBtn = document.querySelector('.back-to-top');
  if(backBtn){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 500){ backBtn.classList.add('show'); }
      else{ backBtn.classList.remove('show'); }
    }, { passive:true });
    backBtn.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = el.getAttribute('data-count').includes('.') ? 1 : 0;
    var duration = 1400;
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = target * eased;
      el.textContent = (decimals ? val.toFixed(1) : Math.round(val)) + suffix;
      if(progress < 1){ requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && counters.length){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold:.4 });
    counters.forEach(function(el){ cio.observe(el); });
  }

  /* ---------- close mobile nav on link click ---------- */
  var navCollapse = document.getElementById('mainNav');
  if(navCollapse){
    navCollapse.querySelectorAll('a.nav-link, a.mega-link, a.dropdown-item').forEach(function(link){
      link.addEventListener('click', function(){
        if(window.innerWidth < 992 && navCollapse.classList.contains('show')){
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }

  /* ---------- active nav highlighting ---------- */
  var page = document.body.getAttribute('data-page');
  if(page){
    document.querySelectorAll('[data-nav]').forEach(function(el){
      if(el.getAttribute('data-nav') === page){ el.classList.add('active'); }
    });
  }

  /* ---------- contact / generic form demo submit ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var box = form.querySelector('.form-success');
      if(!form.checkValidity()){ form.classList.add('was-validated'); return; }
      form.classList.add('d-none');
      if(box){ box.classList.remove('d-none'); }
    });
  });

});
