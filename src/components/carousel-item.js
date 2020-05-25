
import { LitElement, html, css } from 'lit-element';

// This element is *not* connected to the Redux store.
class CarouselItem extends LitElement {
  
  static get styles() {
    return [
      css`
      

      :host{
        display: block;
      }


      #slider-holder{
        width: auto;
        position: relative;
        overflow: hidden;
      }
      
      .header-image{
        height: auto;
        width:100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .7;
        transition: all .3s ease-out;
      }

      .header-image:hover{
        opacity: 1;
      }

      .element-up{
        transform:translateY(-100%)
      }

      .element-down{
        transform:translateY(-100%)
      }

      @keyframes heroSlideUpIn{
              0%{
                transform:translateY(100%);
              }
              100%{
                transform:translateY(0%)
              }
        }

      @keyframes heroSlideUpOut{
            0%{
              transform:translateY(0);
            }
            100%{
              transform:translateY(-100%)
            }
      }

      @keyframes heroSlideDownIn{
            0%{
              transform:translateY(-100%);
            }
            100%{
              transform:translateY(0%)
            }
      }

      @keyframes heroSlideDownOut{
            0%{
              transform:translateY(0);
            }
            100%{
              transform:translateY(100%)
            }
      }

      .hero-slide-down-in{
              animation-name: heroSlideDownIn;
              animation-duration: .7s;
              animation-fill-mode: forwards;
            }

      .hero-slide-down-out{
        animation-name: heroSlideDownOut;
        animation-duration: .7s;
        animation-fill-mode: forwards;
      }

      .hero-slide-up-in{
        animation-name: heroSlideUpIn;
        animation-duration: .7s;
        animation-fill-mode: forwards;
      }

      .hero-slide-up-out{
        animation-name: heroSlideUpOut;
        animation-duration: .7s;
        animation-fill-mode: forwards;
      }


      
      `
      ]
    
    }


  render() {
    return html`
      <div id="slider-holder">
          <img id="first-image" @load="${(e)=>this.loadImage()}" src="${this.firstImage}" class="header-image">
          <img id="second-image" src="${this.secondImage}" class="header-image"></div>
      </div>
       
    `;
  }

  static get properties() {
    return {
        images: Array,
        speed: Number,
        direction: String,
        firstImage: String,
        secondImage:String,
    };
  }


  constructor() {
    super();
  }


  firstUpdated(){
      const secondImage = this.shadowRoot.querySelector('#second-image');
      this.firstImage = `images/header/${this.images[0]}.jpg`;
      this.secondImage = `images/header/${this.images[1]}.jpg`;
      if(this.direction==="up"){
        secondImage.classList.add('element-down');
      }else{
        secondImage.classList.add('element-up');
      }
      setTimeout(() => {
        if(this.direction==="up"){
          this.slideUp(1, "second");
        } else {
          this.slideDown(1, "second");
        }
      }, this.speed);
  }


  loadImage(){
    const firstImage = this.shadowRoot.querySelector('#first-image');
    const firstImageHeight= firstImage.offsetHeight;
    const sliderHolder = this.shadowRoot.querySelector("#slider-holder");
    sliderHolder.style.height = `${firstImageHeight}px`;
  }


  slideDown(index, state){

    const length = this.images.length;
    const firstImage = this.shadowRoot.querySelector('#first-image');
    const secondImage = this.shadowRoot.querySelector('#second-image');
    if (state==="second"){
      firstImage.classList.remove('hero-slide-down-in');
      secondImage.classList.remove('hero-slide-down-out');
      firstImage.classList.add('hero-slide-down-out');
      secondImage.classList.add('hero-slide-down-in');
    }else{
      secondImage.classList.remove('hero-slide-down-in');
      firstImage.classList.remove('hero-slide-down-out');
      secondImage.classList.add('hero-slide-down-out');
      firstImage.classList.add('hero-slide-down-in');
    }
    let nextIndex = index<length-1? index+1 : 0;
   
    setTimeout(() => {
      if (state==="second"){
        this.firstImage = `images/header/${this.images[nextIndex]}.jpg`
      }else{
        this.secondImage = `images/header/${this.images[nextIndex]}.jpg`
      }
      this.slideDown(nextIndex, state==="second"? "first":"second")
    }, this.speed);
  }

  slideUp(index, state){
    const length = this.images.length;
    const firstImage = this.shadowRoot.querySelector('#first-image');
    const secondImage = this.shadowRoot.querySelector('#second-image');
    if (state==="second"){
      firstImage.classList.remove('hero-slide-up-in');
      secondImage.classList.remove('hero-slide-up-out');
      firstImage.classList.add('hero-slide-up-out');
      secondImage.classList.add('hero-slide-up-in');
    }else{
      secondImage.classList.remove('hero-slide-up-in');
      firstImage.classList.remove('hero-slide-up-out');
      secondImage.classList.add('hero-slide-up-out');
      firstImage.classList.add('hero-slide-up-in');
    }
    let nextIndex = index<length-1? index+1 : 0;
    setTimeout(() => {
      if (state==="second"){
        this.firstImage = `images/header/${this.images[nextIndex]}.jpg`
      }else{
        this.secondImage = `images/header/${this.images[nextIndex]}.jpg`
      }
      this.slideUp(nextIndex, state==="second"? "first":"second")
    }, this.speed);
  }
}

window.customElements.define('carousel-item', CarouselItem);
