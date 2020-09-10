import { LitElement, html, css } from 'lit-element';
import './lazy-img-big';

// This element is *not* connected to the Redux store.
class MyParallaxRight extends LitElement {
  
  static get styles() {
    return [
      css`
      
      #parallax-container{
        position: relative;
        height: 100vh;
        display: block;
        overflow: hidden;
      }

      #parallax-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        vertical-align: bottom;
      }

      #parallax1-image:hover{
        transform: scale(1.2, 1.2) translate(-75px, 0);

      }

      .spacer{
        height: 150vh;
        display: block;
        background: rgba(0,0,0,1);

      }

      #main-layer{
        position: absolute;
        height: 100%;
        width: 100%;
        top:0;
        left: 0;
        background: #000;
      }

      #parallax-right-cover{
        position: absolute;
        height: 100vh;
        width: 50vw;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0));
      }


      h2{
        font-family: 'Montserrat', sans-serif;
        color: #EEE;
        font-weight:700;
        line-height: 50px;
        margin: 30px 0 0;
        font-size: 65px;

      }

      p{
        font-family: 'Montserrat', sans-serif;
        color: #fff;
        margin: 30px 0 0;
        line-height: 24px;
        font-size: 16px;
        max-width:470px;
        font-weight: 600;
      }

      #paralax-logo{
        width:200px;
        height: 200px;
        border-radius: 50%;
        margin: 24px 0;
        box-shadow: 15px 10px 20px rgba(255,255,255,0.19), 6px 6px 6px rgba(255,255,255,0.23);

      }


      @media (min-width: 1024px){
        
        
        #text-container{
            position: absolute;
            left: 1vw;
            top: 45%;
          }
      }

      @media (max-width: 460px) {

          #parallax-container{
            margin-top: 80px;
            height: 70vh;
          }

          
          #parallax-right-cover,
          #main-layer{
            display: none;
          }


          #paralax-logo{
            width:120px;
            height: 120px;
          }



          #mobile-text-container{
            margin-top: 20vh;
            position: relative;
            display: block;
            box-sizing: border-box;
            padding: 0 24px;
          }

           h2{
            margin: 16px 0 0;
            font-size: 24px;
          }

          p{
            margin: 10px 24px 0 0;
            line-height: 24px;
            text-align: justify;
            font-size: 13px;
          }


      }



      `
      ]
    
    }


  render() {
    return html`
        <div id="parallax-container">
          <lazy-img-big id="parallax-image" .altData=${this.data.alt} .fileName="${this.data?this.data.image:""}"></lazy-img-big>
          <div id="main-layer"></div>
          <div id="parallax-right-cover">
            <div id="text-container">
                <img id="paralax-logo" alt="${this.data.alt}" src="${this.data.logo}">
                <h2>${this.data.title}</h2>
                <p>${this.data.text}</p>
            </div>
          </div>
          <div id="mobile-text-container">
              <img id="paralax-logo" alt="${this.data.logo}" src="${this.data.logo}">
              <h2>${this.data.title}</h2>
              <p>${this.data.text}</p>
          </div>
        </div>
      
    `;
  }

  static get properties() {
    return {
        data: Object,
        opacity: String,
        selectedLink: Number,
        linkIndex: Number
    };
  }


  constructor() {
    super();
  }


  firstUpdated(){

    var container = this.shadowRoot.querySelector('#parallax-container');
    let mainLayer = this.shadowRoot.querySelector('#main-layer');
    mainLayer.style.opacity= this.opacity;
    window.addEventListener('scroll',()=>{
      const image= this.shadowRoot.querySelector('#parallax-image');
      const cover= this.shadowRoot.querySelector('#parallax-right-cover');
      const textContainer = this.shadowRoot.querySelector('#text-container');
      const logo = this.shadowRoot.querySelector('#paralax-logo')


      if(container.offsetHeight+window.pageYOffset>container.offsetTop){
        let diff=container.offsetHeight+window.pageYOffset-container.offsetTop;
        const scaleRate = diff/container.offsetHeight/5;
        const translateRateX = scaleRate*300;
        const translateRateY = scaleRate*200;
        const width = 750 + translateRateX/3
        image.style.transform = `scale(${1+scaleRate}, ${1+scaleRate}) translate(${translateRateX}px, ${translateRateY}px`;
        cover.style.width = `${width}px`;
        textContainer.style.right = `calc(10vh + ${translateRateX}px)`
        if(translateRateX>20){
          logo.style.width = `${200 - translateRateX + 20}px`;
          logo.style.height = `${200 - translateRateX + 20}px`;
          logo.style.marginRight = `${translateRateX*1.5 - 20}px`
        }
      }
    })

    this.dispatchEvent(new CustomEvent('element-positioned', { detail: {  top: container.getBoundingClientRect().top, index: this.linkIndex}, bubbles: true, composed: true }))

  }

  updated(changedProps){
    if(changedProps.has("selectedLink")&&this.selectedLink){
      if(this.linkIndex===this.selectedLink){
        const element = this.shadowRoot.querySelector("#parallax-container")
        element.scrollTop = 1000;
        this.dispatchEvent(new CustomEvent('must-scroll', { detail: {  top: element.getBoundingClientRect().top}, bubbles: true, composed: true }));
      }
    }
  }


 
}

window.customElements.define('my-parallax-right', MyParallaxRight);
