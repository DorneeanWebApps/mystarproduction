
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

import { testimonialItems } from '../app-data/testimonials';
import { partnersItems } from '../app-data/partners';

import './footer-component';
// This element is *not* connected to the Redux store.
class MobilePartnersComponent extends LitElement {
  
  static get styles() {
    return [
      css`


     #partners-holder{
         height: auto;
         width:100%;
         background: linear-gradient(0deg,#000,#009b74,#000);
         display: block;
         z-index:8
         padding: 24px;
     }

     #partners-title{
         padding: 24px 0;
     }

     #partners-title>p{
         padding: 0 24px;
         font-weight: 700;
         font-family: Montserrat, sans-serif;
         font-size: 20px;
         color: #fff;
     }

     .partners-wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        padding: 24px;
     }




     .partner-card{
        text-align:center;
         width: 70px;
     }

     .partner-logo-container{
         width: 60px;
         height: 60px;
         display: block;
         margin: 0 auto;
     }

     .partner-logo{
         width: 100%;
         opacity: 1;
         height: 100%;
     }



     .parner-name{
        margin: 1px 0 0 0;

        height: 50px;
        display: grid;
        align-content:center;
        justify-content: center;
     }

     .parner-name>p{
         font-size: 10px;
         font-weight: 600;
         color: transparent;
         line-height: 12px;
         margin: 0;
         transition: color .2s ease-out;
     }

     .logo-hover{
        animation-name: logoHovered;
        animation-duration: .4s;
        animation-fill-mode: forwards;
     }


     #footer-wrapper{
         height: 200px;
         position: relative;
     }

     #triangles-holder{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100vw;
    }

    #triangle-bottomright {
          width: 0;
          height: 0;
          border-bottom: 25vh solid var(--app-primary-color);
          border-right: 50vw solid transparent;
          position: absolute;
          bottom: 0;
          right: 0;
        }

    #triangle-bottomleft {
        width: 0;
        height: 0;
        border-bottom: 25vh solid var(--app-primary-color);
        border-left: 50vw solid transparent;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .header-logo{
          position: absolute;
          height: 170px;
          width: 170px;
          left: calc(50% - 85px);
          top: 0;
          transition: all .1s ease-out;
        }

     @keyframes logoHovered{
            0%{
              opacity: 1;
            }
            50%{
                opacity: 1;
            }
            100%{
              opacity: 1;
            }
        }


    @media(min-width: 1024px){


    }

    @media(max-width: 460px){



        
    }
  
      `
      ]
    
    }


  render() {
    return html`

    <div id="partners-holder">

        <div id="partners-title">
            <p>CLIENTII NOSTRI</p>
        </div>

        <div class="partners-wrapper">
                ${repeat(partnersItems, (partner, index)=>html`
                <div class="partner-card">
                    <div class="partner-logo-container">
                        <img class="partner-logo" alt='${partner.alt}' src='images/partners/${partner.logo}.png'></div>
                    </div>
                    <div class="parner-name">
                        <p></p>
                    </div>
                </div>
                `)}
        </div>

    </div>

    `;
  }

  static get properties() {
    return {
    }
  }


  constructor() {
    super();

  }


  firstUpdated(){


  }

  logoHoverIn(index){
        const myLogo = this.shadowRoot.querySelector(`#partner-logo-${index}`);
        const logoText = this.shadowRoot.querySelector(`#logo-text-${index}`)
        myLogo.classList.add('logo-hover');
        setTimeout(() => {
            // myLogo.src=`images/partners/${partnersItems[index].logo}.png`
            myLogo.style.backgroundImage = `url("images/partners/${partnersItems[index].logo}.png")`
            logoText.style.color = "#fff";
            //  partnersItems[index].textColor ? partnersItems[index].textColor :
        }, 200);
        setTimeout(() => {
            myLogo.classList.remove('logo-hover');
        }, 400);

  }

  logoHoverOut(index){
        const myLogo = this.shadowRoot.querySelector(`#partner-logo-${index}`);
        const logoText = this.shadowRoot.querySelector(`#logo-text-${index}`)
        myLogo.classList.add('logo-hover');
        setTimeout(() => {
            // myLogo.src=`images/partners/${partnersItems[index].logoAlb}.png`
            myLogo.style.backgroundImage = `url("images/partners/${partnersItems[index].logoAlb}.png")`
            logoText.style.color = "transparent"
        }, 200);

        setTimeout(() => {
            myLogo.classList.remove('logo-hover');
        }, 400);
  }

  selectCurrent(index){
        clearInterval(this.interval);
        this.intervalCleared = true;
        this.currentTestimonial= testimonialItems[index];
        this.testimonialItems = testimonialItems.map((item, tIndex)=>({
            ...item,
            selected: index===tIndex ? true : false
        }))
  }

 
}

window.customElements.define('mobile-partners-component', MobilePartnersComponent);
