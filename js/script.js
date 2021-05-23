'use strict'

class Slider{
  constructor({main, wrap, textRight, textLeft, position = 0}){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.position = position;
    this.textsRight = document.querySelector(textRight).children;
    this.textsLeft = document.querySelector(textLeft).children;
  }
  init(){
    this.addGloClass();
    this.addStyle();
    this.controlSlider();
    this.controlClickSlider();
  }

  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    for ( const item of this.slides) {
      item.classList.add('glo-slider__item');
    }
  }
  addStyle(){
    const style = document.createElement('style');
    style.id = 'slider-style';
    style.textContent = `
      .glo-slider {
        overflow: hidden !important;
      }
      .glo-slider__wrap {
        display: flex !important;
        transition transform 0.5s !important;
        will-change: transform !important;
      }
      .noactive {
        visibility: visible !important;
        height: 8vw;
        transform: scale(0.65) rotate(30deg) !important;
        z-index: 15 !important;
      }
      .active {
        visibility: visible !important;
        transform: scale(0.85) rotate(30deg) !important;
        z-index: 15 !important;
      }
      .act {
        visibility: visible !important;
        margin: 0px 48px;
        flex: 1 1 26vw;
        transform: scale(1) rotate(30deg) !important;
        z-index: 15 !important;
        
      }
      .act span {
        display: block !important;
      }
      @media (max-width: 1000px) {
        .act {
          margin: 0 0px;
          flex: 0 0 22vw !important;
          height: 18vw;
        }
        .noactive {
          display: none
        }
        body {
          background: #020923 !important;
        }
      }
      @media (max-width: 550px) {
        .act {
          margin: 0 0px;
          flex: 0 0 48vw !important;
          height: 38vw;
        }
        .noactive {
          display: none
        }
        body {
          background: #020923 !important;
        }
      }
      @media (max-width: 400px) {
        .active {
          width: 22vw;
          height: 21vw;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  controlClickSlider() {
    let i = 0;
    for ( const item of this.slides) {
      if(i == 0) {
        item.classList.add('noactive');
      }
      if (i == 1) {
        item.classList.add('active');
      }
      if (i == 2) {
        item.classList.add('act');
      }
      if (i == 3) {
        item.classList.add('active');
      }
      if (i == 4) {
        item.classList.add('noactive');
      }
      ++i;
    }
    
    for (let index = 0; index < this.slides.length; index++) {
      const slide = this.slides[index];
      slide.addEventListener("click", () => {
        if (index == 0 + this.position) {
          if(this.position > -1) {
            this.position = this.position - 2;
            this.wrap.style.transform = `translateX(${this.position * -15}%)`;
          }
          if(this.position > -2) {
            --this.position;
            this.wrap.style.transform = `translateX(${this.position * -15}%)`;
          }
        }
        if (index == 1 + this.position) {
          if(this.position > -2) {
            --this.position;
            this.wrap.style.transform = `translateX(${this.position * -15}%)`;
          }
        }
        if (index == 3 + this.position) {
          if(this.position < 2) {
            ++this.position;
            this.wrap.style.transform = `translateX(${this.position * -15}%)`;
          }
        }
        if (index == 4 + this.position) {
          if(this.position < 1) {
            this.position = this.position + 2;
            this.wrap.style.transform = `translateX(${this.position * -15}%)`;
          }
          if(this.position < 2) {
            ++this.position;
            this.wrap.style.transform = `translateX(${this.position * -15}%)`;
          }
        }
        for ( const item of this.slides) {
          item.classList.remove('noactive');
          item.classList.remove('active');
          item.classList.remove('act');
        }
        let i = 0;
        for ( const item of this.slides) {
          if(i == this.position) {
            item.classList.add('noactive');
          }
          if (i == this.position + 1) {
            item.classList.add('active');
          }
          if (i == this.position + 2) {
            item.classList.add('act');
          }
          if (i == this.position + 3) {
            item.classList.add('active');
          }
          if (i == this.position + 4) {
            item.classList.add('noactive');
          }
          ++i;
        }
        let t = -2;
        for ( const item of this.textsRight) {
          item.classList.remove('acti');
          if(t == this.position) {
            item.classList.add('acti');
          }
          ++t;
        }
        let c = -2;
        for ( const item of this.textsLeft) {
          item.classList.remove('acti');
          if(c == this.position) {
            item.classList.add('acti');
          }
          ++c;
        }
      }); 

      for ( const item of this.slides) {
        item.classList.remove('noactive');
        item.classList.remove('active');
        item.classList.remove('act');
      }
      let i = 0;
      for ( const item of this.slides) {
        if(i == this.position) {
          item.classList.add('noactive');
        }
        if (i == this.position + 1) {
          item.classList.add('active');
        }
        if (i == this.position + 2) {
          item.classList.add('act');
        }
        if (i == this.position + 3) {
          item.classList.add('active');
        }
        if (i == this.position + 4) {
          item.classList.add('noactive');
        }
        ++i;
      }
    };

  }

  controlSlider() {
    if (document.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        document.addEventListener("wheel", this.onWheel.bind(this));
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        document.addEventListener("mousewheel", this.onWheel.bind(this));
      } else {
        // Firefox < 17
        document.addEventListener("MozMousePixelScroll", this.onWheel.bind(this));
      }
    } else { // IE8-
      document.attachEvent("onmousewheel", this.onWheel.bind(this));
    }
    
    
  }

  onWheel(e) {
    e = e || window.event;
  
    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if(delta > 0){
      if(this.position > -2) {
        --this.position;
        this.wrap.style.transform = `translateX(${this.position * -15}%)`;
      }
    } else{
      if(this.position < 2) {
        ++this.position;
        this.wrap.style.transform = `translateX(${this.position * -15}%)`;
      }
    }
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    for ( const item of this.slides) {
      item.classList.remove('noactive');
      item.classList.remove('active');
      item.classList.remove('act');
    }
    let i = 0;
    for ( const item of this.slides) {
      if(i == this.position) {
        item.classList.add('noactive');
      }
      if (i == this.position + 1) {
        item.classList.add('active');
      }
      if (i == this.position + 2) {
        item.classList.add('act');
      }
      if (i == this.position + 3) {
        item.classList.add('active');
      }
      if (i == this.position + 4) {
        item.classList.add('noactive');
      }
      ++i;
    }
    let q = -2;
    for ( const item of this.textsRight) {
      item.classList.remove('acti');
      if(q == this.position) {
        item.classList.add('acti');
      }
      ++q;
    }
    let w = -2;
    for ( const item of this.textsLeft) {
      item.classList.remove('acti');
      if(w == this.position) {
        item.classList.add('acti');
      }
      ++w;
    } 
  }
}
function ibg(){

		let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}

ibg();
const iconMenu = document.querySelector('.menu__icon');
if(iconMenu) {
  const menuBody = document.querySelector('.menu__body');
  iconMenu.addEventListener('click', function(e) {
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}