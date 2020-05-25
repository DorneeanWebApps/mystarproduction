
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

import { testimonialItems } from '../app-data/testimonials';
import { partnersItems } from '../app-data/partners';

import './footer-component';
// This element is *not* connected to the Redux store.
class TestimonialsSection extends LitElement {
  
  static get styles() {
    return [
      css`



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
      }

      #testimanials-container{
          position: relative;
          display: block;
          min-height: 100px;
             margin-top: 70px;      }

      #artists-holder{
          display: flex;
          flex-direction: row;
          height: 100px;
          justify-content: flex-end;
          align-items: center;
          padding: 0 95px;
      }

      .button-wrapper{
       height: 87px;
       width: 87px;
       display: grid;
       align-content: center;
       justify-content: center;
       border: 2px solid #fff;
       border-radius: 50%;
       margin: 0 16px;
       box-sizing: border-box;
       opacity: .4;
       transition: all .5s ease-out;
       cursor: pointer;
     }

     .button-card[selected]>.button-wrapper,
     .button-card:hover>.button-wrapper{
       opacity: 1;
       transform: scale(1.1,1.1)
     }

     .button-card[selected]>.button-text,
     .button-card:hover>.button-text{
      opacity: 1;
     }

     .button-holder{
       height: 80px;
       width: 80px;
       border-radius: 50%;
       overflow: hidden;
       box-sizing: border-box;
     }

     .button-image{
       height: 100%;
       width: 100%;
     }



     .button-card{
       display: flex;
       flex-direction: column;
       width: 120px
     }

     .button-text{
       width: 100%;
       min-height: 62px;
       text-align: center;
       text-transform: uppercase;
       color: #fff;
       opacity: 0;
       transition: opacity .5s ease-out;
       font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 10px;
      padding-top: 16px;

     }

     #content-holder{
         position: relative;
         display: grid;
         grid-template-columns: 1fr 1170px 1fr;
         margin: 20px 0;
     }

     #testimonials-holder{
         grid-column: 2/4;
         height: 350px;
         display:grid;
         grid-template-columns: 225px 1fr;
         position: relative;
         z-index: 9;
     }

     #testimonial-foto-container-holder{
        border-top: 350px solid #fff;
        border-left: 225px solid transparent;
        position: relative;
     }

     #testimonial-foto-container{
        border-top: 346px solid var(--app-secondary-color);
        border-left: 221px solid transparent;
        bottom:2px;
        right: 0;
        position: absolute;
     }

     #testimonial-content{
         display: block;
         height: 100%;
         background: var(--app-secondary-color);
         border-top: 2px solid #fff;
         box-sizing: border-box;
         padding: 0 150px;
         text-align: right;
         position: relative;
     }

     #profile-picture-holder{
         position: absolute;
         height: 150px;
         width:150px;
         border-radius: 50%;
         background: black;
         bottom: 160px;
         right: -55px;
         border: 2px solid white;
         padding: 2px;
         transition: border .3s ease-out;
         z-index: 10
     }

     .main-image{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        opacity: 1;
        transition: opacity .3s ease-out;
     }

     #testimonial-content>p{
         font-style: italic;
         opacity: 1;
         transition: opacity .3s ease-out;
     }

     #profile-picture-holder[loading]{
        border: 2px solid rgba(255,255,255,.5);
     }

     #testimonial-content[loading]>p{
         opacity: .3;
     }

     #profile-picture-holder[loading]>.main-image{
         opacity: .5;
     }

     #testimonial-author{
         position: absolute;
         bottom: 16px;
         right: 170px;
     }

     .name-text{
         font-weight: 600;
         font-size: 15px;
     }

     .title-text{
         font-size: 12px;
         margin:0;
     }

     #partners-holder{
         height: auto;
         width:100%;
         background: linear-gradient(45deg,#009b74,#000);
         display: block;
         position: absolute;
         top: 150px;
         z-index:8
     }

     #partners-title{
         padding: 100px 0 50px 24px;
     }

     #partners-title>p{
         font-weight: 600;
         font-size: 20px;
     }

     .partners-wrapper{
        display: block;
        overflow: hidden;
     }

     .partners-element{
     }


     .partner-card{
        display: inline-block;
        text-align:center;
         width: 150px;
     }

     .partner-logo-container{
         width: 100px;
         height: 100px;
         display: block;
         margin: 0 auto;
     }

     .partner-logo{
         width: 100%;
         opacity: 1;
         height: 100%;
         background-size: contain;
         background-position: center center;
         background-repeat: no-repeat;
         transition: all .8s ease-out;
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

     .partners-element>a{
         text-decoration: none;
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
  
      `
      ]
    
    }


  render() {
    return html`
    <div id="testimanials-container">
        <div id="artists-holder">
            ${repeat(this.testimonialItems||[], (button,index)=>html`
                <div class="button-card" ?selected="${button.selected===true}" @click="${()=>this.selectCurrent(index)}">
                <div class="button-wrapper">
                  <div class="button-holder">
                    <img class="button-image" src="images/testimonials/${button.foto}.jpg">
                  </div>
                </div>
                <div class="button-text">
                    ${button.name.split(' ').slice(0,2).join(' ')}
                </div>
              </div>
            `)}
        </div>

        <div id="content-holder">
            <div id="testimonials-holder">
                <div id="testimonial-foto-container-holder">
                    <div id="testimonial-foto-container">
                        <div id="profile-picture-holder" ?loading=${this.loading===true}>
                            <img class="main-image" src="${this.currentTestimonial.foto ? `images/testimonials/${this.currentTestimonial.foto}.jpg`:""}">
                        </div>
                    </div>
                </div>
                <div id="testimonial-content" ?loading=${this.loading===true}>
                    <p>${this.currentTestimonial.text}</p>
                </div>
                <div id="testimonial-author">
                    <p  class="name-text">${this.currentTestimonial.name}</p>
                    <p class="title-text"> ${this.currentTestimonial.titlu}</p>
                </div>
            </div>
            <div id="partners-holder">

                <div id="partners-title">
                    <p>CLIENTII NOSTRI</p>
                </div>

                <div class="partners-wrapper">
                    <div class="partners-element">
                        ${repeat(partnersItems, (partner, index)=>html`
                        <a href="${partner.link}" target="blank">
                        <div class="partner-card">
                            <div class="partner-logo-container"
                                 @mouseenter="${()=>this.logoHoverIn(index)}"
                                 @mouseleave="${()=>this.logoHoverOut(index)}">
                                <div class="partner-logo" id="partner-logo-${index}" style ="background-image: url('images/partners/${partner.logoAlb}.png')"></div>
                            </div>
                            <div class="parner-name">
                                <p id="logo-text-${index}">${partner.title.toUpperCase()}</p>
                            </div>
                        </div>
                        </a>
                        `)}
                    </div>
                </div>

                <div id="footer-wrapper">
                    <div id="triangles-holder">
                        <div id="triangle-bottomleft"></div>
                        <div id="triangle-bottomright"></div>
                    </div>
                    <img class="header-logo" id="main-logo" src="images/load.png">
                </div>
                <footer-component></footer-component>

            </div>

            
        </div>
        

    </div>
    `;
  }

  static get properties() {
    return {
        currentTestimonial: Object,
        testimonialItems: Array,
        loading: Boolean,
        intervalCleared: Boolean,
        interval: Function
    };
  }


  constructor() {
    super();
    this.testimonialItems=[];
    this.currentTestimonial={};
    this.loading = false;
    this.intervalCleared = false;
  }


  firstUpdated(){
    let index = Math.floor(Math.random() * Math.floor(testimonialItems.length));
    this.testimonialItems = testimonialItems.map((item, tIndex)=>({
        ...item,
        selected: index===tIndex ? true : false
    }));
    
    console.log(this.testimonialItems);
    this.currentTestimonial= testimonialItems[index];
    setTimeout(() => {
        this.loading = this.intervalCleared ? false:true;
    }, 9700);
    this.interval = setInterval(() => {
        setTimeout(() => {
            this.loading=false;
        }, 300);
        setTimeout(() => {
            this.loading = this.intervalCleared ? false: true;
        }, 9700);
        let index = Math.floor(Math.random() * Math.floor(testimonialItems.length));
        this.currentTestimonial= testimonialItems[index];
        this.testimonialItems = testimonialItems.map((item, tIndex)=>({
            ...item,
            selected: index===tIndex ? true : false
        }))
    }, 10000);

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

window.customElements.define('testimonials-section', TestimonialsSection);
