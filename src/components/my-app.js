/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  updateHoveredState
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-icon';
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-icons/av-icons'
import { menuIcon } from './my-icons.js';
import './snack-bar.js';

import { facebookIcon, instaIcon, youtubeIcon, phoneIcon, mailIcon } from './my-icons'
import { camera, photo, digital, microphone, contact } from '../icons/menu-icons';

import './carousel-item';
import './menu-item';

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean },
      selectedLink :Number,
      selectedScrolledLink: Number,
      images1: Array,
      images2: Array,
      images3: Array,
      images4: Array,
      headerImages: Array,
      _pageScrolled: Boolean,
      _touched:Boolean,
      contactSelected: Boolean,
      menuSelected: Object,
      mobileMenuActive: Boolean,
      mobileContactActive: Boolean,
      elements: Array
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;

          --app-drawer-width: 256px;

          --app-primary-color: #000;
          --app-secondary-color: #009b74;


        }

        #app-header-desktop{
          display:  grid;
          position: relative;
          background: var(--app-primary-color);
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        #carrousel-1{
          display: block;
          height: 100%;
        }

        #carrousel-2{
          display: block;
          height: 100%;
        }

        #carrousel-3{
          display: block;
          height: 100%;
        }

        #carrousel-4{
          display: block;
          height: 100%;
        }


        #triangle-bottomleft {
          width: 0;
          height: 0;
          border-bottom: 25vh solid var(--app-primary-color);
          border-right: 50vw solid transparent;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        #triangle-bottomright {
          width: 0;
          height: 0;
          border-bottom: 25vh solid var(--app-primary-color);
          border-left: 50vw solid transparent;
          position: absolute;
          bottom: 0;
          right: 0;
        }

        #triangles-holder{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100vw;
        }

        .header-logo{
          position: absolute;
          height: 170px;
          width: 170px;
          left: calc(50% - 85px);
          transition: all .1s ease-out;
        }

        .contact-logo-holder{
          display: block;
          border-bottom: 1px dotted #fff;
          text-align: center;
        }

        .social-links{
          flex:1;
          width: 250px;
          padding: 48px 0;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          justify-content: center;
          align-content: center;
        }

        #social-icons{
          display: grid;
          width: 100%;
          justify-content: center;
          text-align: center;
        }

        .social-icon:hover{
        transform: scale(1.5, 1.5);
        color: var(--app-secondary-color);
     }

        .contact-logo{
          height: 170px;
          width: 170px;
          margin: 48px auto;
        }

        .header-logo-scrolled{
          height: 75px;
          width: 75px;
          margin: 8px auto;
        }

        #main-logo{
          bottom: -50px;
        }


        .scrolled-logo{
          bottom: -65px;
        }

        .header-logo:hover{
          height: 200px;
          width: 200px;
          left: calc(50% - 100px);
          bottom: -65px;
        }

        #menu-holder{
          display: block;
          width: 100%;
        }


        #menu-spacer{
          display:block;
        }

        #scrolled-menu-holder{
          display: grid;
          width:108px;
          grid-template-columns: 108px 1fr;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0,0,0,.3);
          transform: translateX(100%);
          height: 100%;
          transition: width .3s ease-out;
        }

        #scrolled-menu-holder[selected]{
          width: 463px;
          grid-template-columns: 108px 355px;
        }

        .menu-icon{
          width:36px;
          height:36px;
          color: #666;
          margin: 40px auto 0 auto;
          transition: all .3s ease-out;
        }

        .menu-item-scrolled>h6{
          color: #666;
          opacity: 0;
          margin: 0;
          transition: all .3s ease-out;
        }

        .menu-item-scrolled[selected],
        .menu-item-scrolled:hover>h6{
          color: #fff;
          opacity: 1;
        }

        .menu-item-scrolled[selected]>.menu-icon,
        .menu-item-scrolled:hover>.menu-icon{
          color: #fff;
          animation-name: itemHovered;
          animation-duration: .3s;
          animation-fill-mode: forwards;
        }

        .contact-icon{
          color: var(--app-secondary-color);
          margin-left: auto;
          height: 48px;
          width: 48px;
          margin-top: 48px;
          cursor: pointer;
        }


        @keyframes heroSlideRightIn{
            0%{
              transform:translateX(100%);
            }
            100%{
              transform:translateX(0%)
            }
        }

        @keyframes heroSlideRightOut{
              0%{
                transform:translateX(0);
              }
              100%{
                transform:translateX(100%)
              }
        }

        @keyframes itemHovered{
              0%{
                transform: scale(1,1);
              }
              50%{
                transform: scale(1.3,1.3)
              }
              100{
                transform: scale(1,1)
              }
        }
        
        
        .menu-slide-down-in{
              animation-name: heroSlideRightIn;
              animation-duration: .7s;
              animation-fill-mode: forwards;
            }

        .menu-slide-down-out{
          animation-name: heroSlideRightOut;
          animation-duration: .7s;
          animation-fill-mode: forwards;
        }

        .contact-data-holder{
          width: 307px;
        }


        .contact-data{
          display: flex;
          flex-direction: column;
          width: 0;
          justify-self: flex-end;
          overflow: hidden;
          height: 100%;
          transition: all .3s ease-out;
          text-align: right;
          font-family: 'Montserrat', sans-serif;
        }

        data-wrapper{
          flex: 0;
        }

        .contact-data>h1, h2, h3, h4, h5, h6{
          color: #FFF;

        }

        .contcat-header{
          display: inline-block;
        }

        .contact-data> h4, h5,h6{
          margin: 0;
        }

        .contact-data>h6{
          color: #666;
        }

        .contact-data[selected]{
          width: 307px;
          padding: 24px;
          border: 1px solid #fff;
          border-radius: 5px;
          background: rgba(0,0,0,.5);
          display: flex;
          flex-direction: column;
        }


        .logo-hover{
            animation-name: logoHovered;
            animation-duration: .4s;
            animation-fill-mode: forwards;
        }

        @keyframes logoHovered{
            0%{
              opacity: 1;
            }
            50%{
                opacity: 0;
            }
            100%{
              opacity: 1;
            }
        }

        .social-icon{

         color: white;
         height: 20px;
         width:20px;
         display: inline;
         justify-self: center;
         transition: all .3s ease-out
     }



        @media (min-width: 1024px){
          #main-wrapper{
            display: block;
          }

          #mobile-header,
          #mobile-menu,
          #mobile-slider{
            display:none;
          }

          #menu-container{
            width: 1170px;
            margin: 0 auto;
            display: grid;
            height: 100%;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            align-content: center;
            justify-content: center;
            text-align: center;
          }

          #menu-container-scrolled{
            width: 108px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-items: center;
            text-align: center;
            padding: 24px 8px;
          }

          .contact-header{
            font-weight: normal;
            opacity: .8;
          }


        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */

        @media (max-width: 460px) {
          .main-wrapper{
            display: flex;
            flex-direction: column;
            height: 100vh;
            box-sizing: border-box;
          }

           #scrolled-menu-holder,
           #menu-holder,
           #app-header-desktop{
             display:none
           } 


           #mobile-header{
             width: 100vw;
             display: grid;
             grid-template-columns: 1fr 1fr;
             align-content: center;
             color: transparent;
             padding: 16px 0;
             box-sizing: border-box;
             flex: 0 1 auto;
           }

           .header-logo-scrolled{
             margin: 0 auto 0 16px; 
           }

           .mobile-header-icon{
            color: rgba(255, 255, 255, .7);
             margin: 0 16px 0 auto;
             height: 48px;
             width: 48px;
             align-self: center;
           }

           .mobile-header-icon[active]{
             color: #fff;
           }

           #main-content{
             flex: 1 0px;
             overflow: auto;
             position: relative;
           }

           #mobile-menu{          
            position: fixed;
            background: rgba(0,0,0,.3);
            z-index: 1000;
            top: 107px;
            height: calc(100vh - 107px);
            right: 0;
            display: grid;
            grid-template-columns: 80px 307px;
            justify-content: center;
            text-align: center;
            transform: translateX(100%);
            transition: all .2s ease-out;
          }

          .menu-bar{
            width: 80px;
          }

          #mobile-menu[active]{
            transform: translateX(307px);
          } 

          #mobile-menu[contact-selected]{
            transform: translateX(0);
            background: rgba(0,0,0,.5);
          }

           #spacer{
             height: 500px;
           }

           .mobile-menu-icon{mobile-header
             height :auto;
           }

           .mobile-menu-icon,
           .mobile-menu-icon>.menu-icon,
           .mobile-menu-icon>h6{
             margin-top: 16px;
             color: white;
           }

           .mobile-menu-icon>h6{
            margin: 0 0 16px 0;
           }


           .mobile-menu-icon>.menu-icon{
             margin: 0 16px;
             justify-self: center;
           }


           .menu-spacer{
             height: 80px;
           }

           
           .contact-header{
             text-align: right;
           }

           .mobile-contact-data{
             align-content: center;
             box-sizing: border-box;
           }

           .contact-data-holder{
             display: flex;
             flex-direction: column;
             width:100%;
             padding: 24px;
             box-sizing: border-box;
           }



        }


      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <div class="main-wrapper">
      <div id="app-header-desktop">
        <div id="carrousel-1" @mouseover="${()=> this.hoverMenuItem("video")}" @mouseleave="${()=> this.leaveMenuItem("video")}">
            <carousel-item direction="up" speed="2900" .images="${this.images1}"></carousel-item>
        </div>
        <div id="carrousel-2" @mouseover="${()=> this.hoverMenuItem("audio")}" @mouseleave="${()=> this.leaveMenuItem("audio")}">
            <carousel-item direction="down" speed="3000" .images="${this.images2}"></carousel-item>
        </div>
        <div id="carrousel-3" @mouseover="${()=> this.hoverMenuItem("foto")}" @mouseleave="${()=> this.leaveMenuItem("foto")}">
            <carousel-item  dirdisplay: grid;
          grid-template-columns: 1fr 1fr;ection="up" speed="2800" .images="${this.images3}"></carousel-item>
        </div>
        <div id="carrousel-4" @mouseover="${()=> this.hoverMenuItem("grafica")}" @mouseleave="${()=> this.leaveMenuItem("grafica")}">
            <carousel-item  direction="down" speed="3200" .images="${this.images4}"></carousel-item>
        </div>

        <div id="triangles-holder">
            <div id="triangle-bottomleft"></div>
            <div id="triangle-bottomright"></div>
            <img class="header-logo" id="main-logo" src="images/load.png">
        </div>
        
      </div>

             
      <div id="menu-holder" >
          <div id="menu-container">     
            <menu-item .mustHover="${this.menuSelected.video}" .icon="${camera}" @click="${()=>this.selectedLink=1}" text="VIDEO"></menu-item>
            <menu-item .mustHover="${this.menuSelected.audio}" .icon="${microphone}" @click="${()=>this.selectedLink=2}" text="AUDIO"></menu-item>
            <menu-item .mustHover="${this.menuSelected.foto}" .icon="${photo}" @click="${()=>this.selectedLink=3}" text="FOTO"></menu-item>
            <menu-item .mustHover="${this.menuSelected.grafica}" .icon="${digital}" @click="${()=>this.selectedLink=4}" text="GRAFICA"></menu-item>
          </div>
      </div>



      <div id="mobile-header">
        <img class="header-logo-scrolled"   
                   id="scrolled-menu-logo" 
                   src="images/load.png" 
                   @click="${()=>this.selectedLink=0}">
        <iron-icon icon="dashboard" class="mobile-header-icon" ?active="${this.mobileMenuActive===true}" @click="${()=>{this.mobileMenuActive=!this.mobileMenuActive;}}"></iron-icon>
      </div>
      <div id="main-content">

            <div id="mobile-menu" ?active="${this.mobileMenuActive===true}" ?contact-selected="${this.mobileContactActive}">
                <div class="menu-bar">
                  <div class="mobile-menu-icon" ?selected="${this.selectedScrolledLink===1}" @click="${()=>this.selectedLink=1}">
                      <svg class="menu-icon">${camera}</svg>
                      <h6>VIDEO</h6>
                  </div>
                  <div class="mobile-menu-icon" ?selected="${this.selectedScrolledLink===2}" @click="${()=>this.selectedLink=2}">
                      <svg class="menu-icon">${microphone}</svg>
                      <h6>AUDIO</h6>
                  </div>
                    <div class="mobile-menu-icon" ?selected="${this.selectedScrolledLink===3}" @click="${()=>this.selectedLink=3}">
                      <svg class="menu-icon">${photo}</svg>
                      <h6>FOTO</h6>
                    </div>
                    <div class="mobile-menu-icon" ?selected="${this.selectedScrolledLink===4}" @click="${()=>this.selectedLink=4}">
                      <svg class="menu-icon">${digital}</svg>
                      <h6>GRAFICA</h6>
                    </div>

                    <div class="mobile-menu-icon" @click="${()=>this.showMobileContact()}">
                      <svg class="menu-icon">${contact}</svg>
                      <h6>CONTACT</h6>
                    </div>
                  </div>

                  <div class="mobile-contact-data">

                    <div class="contact-data-holder">
                      <h2 class="contact-header">MySTAR Production</h2>
                      <h4 class="contact-header">Vatra Dornei, Suceava</h4>
                      <br>
                      <h6 class="contact-header">CUI: 29862403</h6>
                      <h6 class="contact-header">F33/366/2012</h6>
                      <br>
                      <h5 class="contact-header">0740 783488</h5>
                      <h5 class="contact-header">office@mystarproduction.ro</h5>
                      <iron-icon @click="${()=>this.showMobileContact()}" class="contact-icon" icon="av:skip-next"></iron-icon>
                      <div class="social-links">
                              <a class="social-href" target="blank" href="https://www.facebook.com/MySTARproduction/"> <svg title="Facebook" class="social-icon">${facebookIcon}</svg></a>
                              <a class="social-href" target="blank" href="https://www.youtube.com/mystarproduction"> <svg title="You Tube" class="social-icon">${youtubeIcon}</svg></a>
                              <a class="social-href" target="blank" href="https://www.instagram.com/michaelmystar/"> <svg title="Instagram" class="social-icon">${instaIcon}</svg></a>
                      </div>
                    </div>
              </div>
          </div>

          <div id="mobile-slider">
            <carousel-item direction="up" speed="2900" .images="${this.headerImages}"></carousel-item>
          </div>


          <div id="scrolled-menu-holder" ?selected=${this.contactSelected===true}>
              <div id="menu-container-scrolled"  ?selected=${this.contactSelected===true}>  
                  <img class="header-logo-scrolled"   
                      id="scrolled-menu-logo" 
                      src="images/load.png" 
                      @mouseenter=${()=>this.logoHoverIn()}
                      @mouseleave=${()=>this.logoHoverOut()}
                      @click="${()=>this.selectedLink=0}">

                  <div class="menu-item-scrolled" ?selected="${this.selectedScrolledLink===1}" @click="${()=>this.selectedLink=1}">
                    <svg class="menu-icon">${camera}</svg>
                    <h6>VIDEO</h6>
                  </div>
                  <div class="menu-item-scrolled" ?selected="${this.selectedScrolledLink===2}" @click="${()=>this.selectedLink=2}">
                    <svg class="menu-icon">${microphone}</svg>
                    <h6>AUDIO</h6>
                  </div>
                  <div class="menu-item-scrolled" ?selected="${this.selectedScrolledLink===3}" @click="${()=>this.selectedLink=3}">
                    <svg class="menu-icon">${photo}</svg>
                    <h6>FOTO</h6>
                  </div>
                  <div class="menu-item-scrolled" ?selected="${this.selectedScrolledLink===4}" @click="${()=>this.selectedLink=4}">
                    <svg class="menu-icon">${digital}</svg>
                    <h6>GRAFICA</h6>
                  </div>

                  <div class="menu-item-scrolled" @click="${()=>this.showContact()}">
                    <svg class="menu-icon">${contact}</svg>
                    <h6>CONTACT</h6>
                  </div>

              </div>
              <div class="contact-data" ?selected=${this.contactSelected===true}>
                  <div class="data-wrapper">
                    <div class="contact-logo-holder">
                      <img class="contact-logo" id="main-logo" src="images/load.png">
                    </div>
                    <div class="contact-data-holder">
                      <h2 class="contact-header">MySTAR Production</h2>
                      <h4 class="contact-header">Vatra Dornei, Suceava</h4>
                      <br>
                      <h6 class="contact-header">CUI: 29862403</h6>
                      <h6 class="contact-header">F33/366/2012</h6>
                      <br>
                      <h5 class="contact-header">0740 783488</h5>
                      <h5 class="contact-header">office@mystarproduction.ro</h5>
                      <iron-icon @click="${()=>this.showContact()}" class="contact-icon" icon="av:skip-next"></iron-icon>
                    </div>
                    <div class="social-links">
                            <a class="social-href" target="blank" href="https://www.facebook.com/MySTARproduction/"> <svg title="Facebook" class="social-icon">${facebookIcon}</svg></a>
                            <a class="social-href" target="blank" href="https://www.youtube.com/mystarproduction"> <svg title="You Tube" class="social-icon">${youtubeIcon}</svg></a>
                            <a class="social-href" target="blank" href="https://www.instagram.com/michaelmystar/"> <svg title="Instagram" class="social-icon">${instaIcon}</svg></a>
                    </div>
                  </div>
              </div>
          </div>



          <!-- Main content -->
          <main role="main">
            <my-view1 class="page" .selectedLink=${this.selectedLink} @elements-defined=${(e)=>this.defineElements(e.detail)} @must-scroll=${(e)=>this.scrolltoElement(e.detail)} ?active="${this._page === 'view1'}"></my-view1>
            <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
            <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
            <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
          </main>
      </div>
      </div>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
    this.images1=['headv1','headv2','headv3','headv4'];
    this.images2=['heada2','heada3','heada4','heada1'];
    this.images3=['headf1','headf2'];
    this.images4=['headg1','headg2','headg3'];
    this.headerImages = ['headv1','heada2', 'headf1','headg1'];
    this.mobileMenuActive = true;
    this.mobileContactActive = false;
    this.menuSelected = {
      video: false,
      audio: false,
      foto: false,
      grafica:false
    }

    this.contactSelected = false;

  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        () => store.dispatch(updateDrawerState(false)));

        window.addEventListener('scroll', () => {
          const myHeader = this.shadowRoot.querySelector('#app-header-desktop');
          this._pageScrolled = window.pageYOffset > myHeader.offsetHeight ? true : false;
          if(this.elements){
            const scrolledElement =this.elements.find((element,eIndex)=>window.pageYOffset>element.top&&this.elements[eIndex+1]?window.pageYOffset<this.elements[eIndex+1].top:window.pageYOffset>element.top);
            if(scrolledElement){
              this.selectedScrolledLink = scrolledElement.index 
            }
          }
          
        })

  }



  updated(changedProps) {
    if (changedProps.has('_page')) {
      const appContainer = this.shadowRoot.host;
      const pageTitle = this.appTitle + ' - ' + this._page;
      // updateMetadata({
      //   title: pageTitle,
      //   description: pageTitle
      //   // This object also takes an image property, that points to an img src.
      // });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 300);
    }

    if(changedProps.has("selectedLink")){
      console.log(this.selectedLink);
      this.selectedScrolledLink = this.selectedLink;
      if(this.selectedLink===0){
        window.scrollTo({'behavior': 'smooth',
        'left': 0,
        'top': 0
        })
      }
    }

    if(changedProps.has('_pageScrolled')){

      const myMenu = this.shadowRoot.querySelector("#scrolled-menu-holder");
      const scrolledLogo = this.shadowRoot.querySelector("#scrolled-menu-logo")

      if(this._pageScrolled){
        myMenu.classList.add('menu-slide-down-in');
        myMenu.classList.remove('menu-slide-down-out');
        // scrolledLogo.style.bottom="-65px";
        this._touched = true;
      }else if(this._touched){
        myMenu.classList.add('menu-slide-down-out')
        myMenu.classList.remove('menu-slide-down-in')
        // scrolledLogo.style.bottom="0px";
      }else{
        // scrolledLogo.style.bottom="0px";
      }
      
    }
  }

  defineElements(detail){
    this.elements = detail;
  }


  logoHoverIn(index){
    const myLogo = this.shadowRoot.querySelector(`#scrolled-menu-logo`);
    myLogo.classList.add('logo-hover');
    setTimeout(() => {
        myLogo.src=`images/arrow-up.png`
    }, 200);
    setTimeout(() => {
        myLogo.classList.remove('logo-hover');
    }, 400);

}

logoHoverOut(index){
    const myLogo = this.shadowRoot.querySelector(`#scrolled-menu-logo`);
    myLogo.classList.add('logo-hover');
    setTimeout(() => {
        myLogo.src=`images/load.png`
    }, 200);

    setTimeout(() => {
        myLogo.classList.remove('logo-hover');
    }, 400);
}


  showContact(){
    this.contactSelected=!this.contactSelected;
  }

  showMobileContact(){
    this.mobileContactActive = !this.mobileContactActive;
  }

  scrolltoElement(detail){
    const content = this.shadowRoot.querySelector("#main-content");
    const header = this.shadowRoot.querySelector("#mobile-header");
    const pageOffSet = window.pageYOffset;
    if(header.offsetHeight!=0){
      content.scrollTo({'behavior': 'smooth',
      'left': 0,
      'top': detail.top + content.scrollTop - header.offsetHeight
      })
    }else{
      window.scrollTo({'behavior': 'smooth',
      'left': 0,
      'top': detail.top + pageOffSet
      })
    }
   
    
  }

  hoverMenuItem(item){
  Object.keys(this.menuSelected).forEach(key=>{
      if(key===item){
        this.menuSelected[key] = true;
      }else{
        this.menuSelected[key] = false;
      }
    })
    store.dispatch(updateHoveredState(item));
    this.requestUpdate()
  }

  leaveMenuItem(item){
    Object.keys(this.menuSelected).forEach(key=>{
      if(key===item){
        this.menuSelected[key] = false;
      }
    })
    store.dispatch(updateHoveredState(""));
    this.requestUpdate();
  }
  

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('my-app', MyApp);
