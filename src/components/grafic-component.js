
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

import { graficItems } from '../app-data/grafica';

class GraficComponent extends LitElement {
  
  static get styles() {
    return [
      css`


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
       border-radius: 50%;
       overflow: hidden;
       box-sizing: border-box;
     }

     .button-image{
       height: 100%;
       width: 100%;
     }

     #content-holder{
       flex:1;
       display: grid;
       align-content: center;
       justify-content: center;
     }


     .button-wrapper{

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


     .button-text{
       display: block;
       width: 100%;
       text-align: center;
       text-transform: uppercase;
       color: #fff;
       opacity: 0;
       transition: opacity .5s ease-out;
       font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 10px;
        padding: 8px 0;

     }

     #my-preview{
       border: 1px solid white;
       opacity: 0;
       transition: opacity .5s ease-out;
     }

     #image-preview-holder[active],
     #my-preview[active]{
       opacity: 1;
     }

     .hidden{
       display: none;
     }

     #image-preview-holder{
       opacity: 0;
       width: 100%;
       display: flex;
       align-content: center;
       transition: opacity .5s ease-out;
     }



     #image-container{
       position: relative;
       box-sizing: border-box;
       border: 1px solid #fff;
     }

     .video-controller{
       position:absolute;
       bottom: 24px;
       right: 24px;
       height: 48px;
       width: 48px;
       color: var(--app-secondary-color);
       cursor: pointer;
       transition: color .3s ease-out;
     }

     .video-controller[hidden]{
       display: none;
     }

     .video-controller:hover{
      color: #fff;
     }

     #link-frame,
     #video-grafic{
       border: 1px solid #fff;
     }

     #title-holder{
       height: 75px;
       background: linear-gradient(90deg,#000,#009b74,#000);
       display: grid;
       align-content: center;
       justify-content: center;
       opacity: 0;
       transition: opacity .5s ease-out;
       color: #fff;
       font-size: 15px;
       font-family: 'Montserrat', sans-serif;
       text-shadow: 1px 1px 3px #000;
       text-align: center;
     }

     #title-holder[active]{
       opacity: 1;
     }

     @media (min-width: 1024px) {
      #grafic-wrapper{     
            display: flex;
            justify-content: center;
            margin: 75px auto 0 auto;
            height: 700px;
            width: 1170px;
            flex-direction: column;
            box-shadow: rgb(255, 255, 255) 0px 6px 6px -6px;

        }

        .button-card{
          display: flex;
          flex-direction: column;
          width: 120px
        }

        .button-wrapper{
          height: 87px;
          width: 87px;
        }

        #buttons-holder{
          display: flex;
          align-items: center;
          justify-content: center;
          flex:0;
        }

        .button-holder{
          height: 80px;
          width: 80px;
        }

        #mobile-video-frame,
        .mobile-preview{
            display: none;
        }


        #title-holder{
          width:770px;
          margin: -75px auto 0 auto;
       }

       #preview-image{
          width: auto;
          height: 406px;
          vertical-align: bottom;
        }

      }

     @media (max-width: 460px) {
      #buttons-holder{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        align-content: center;
        justify-content: center;
        box-sizing: border-box;
        padding-bottom: 24px;
      }

      .button-card{
        justify-items: center;
        justify-content: center;
        margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .button-wrapper{
          height: 55px;
          width: 55px;
        }


      .button-image{
        width: 50px;
        height: 50px;
      }

      .button-text{
        display: block;
        text-align:center;
      opacity: 1;
      margin: 0 auto;
      font-size: 10px;
      justify-self: center;
      }

      #video-frame,
      .desktop-preview{
        display: none;
      }

      #preview-image{
          width: 90vw;
          height: auto;
          vertical-align: bottom;
        }
     }
    
    
    `
      ]
    
    }


  render() {
    return html`

      <div id="grafic-wrapper">
          <div id="buttons-holder">
              ${repeat(this.myButtons||[],(button, index)=>html`
              <div class="button-card" ?selected="${button.selected===true}" @click="${()=>this.selectCurrent(index)}">
                <div class="button-wrapper">
                  <div class="button-holder">
                    <img class="button-image" src="images/grafica/buttons/${button.image}.jpg">
                  </div>
                </div>
                <div class="button-text">
                    ${button.text}
                </div>
              </div>
              `)}
          </div>
          <div id="content-holder">
                <video ?active=${this.buttonSelected===false} id="my-preview-mobile" class="desktop-preview" width="720" height="405" autoplay="true" muted="muted" loop>
                    <source src="images/grafica/prezentare.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                    this.currentSelected.imagine   </video>

                  <video ?active=${this.buttonSelected===false} id="my-preview-desktop" class="mobile-preview" width="380" height="215" autoplay="true" muted="muted" loop>
                  <source src="images/grafica/prezentare.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                  this.currentSelected.imagine   </video>

                <div id="image-preview-holder" ?active=${this.imageLoaded === true}>
                  <div id="image-container" ?hidden="${this.previewMode!==true}">
                    <img id="preview-image" src="${this.currentSelected.imagine?`images/grafica/${this.currentSelected.imagine}.jpg`:""}">
                    <iron-icon title="vezi video" @click="${()=>this.loadVideo()}" ?hidden="${this.currentSelected.hasVideo===false}" class="video-controller" icon="av:play-circle-filled"></iron-icon>
                  </div>
                

                  <div id="desktop-link-frame">
                    <iframe width="722" height="406" style="vertical-align: bottom;" src="https://www.youtube.com/embed/${this.currentSelected.link}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>

                  <div id="mobile-link-frame">
                    <iframe width="380" height="215" style="vertical-align: bottom;" src="https://www.youtube.com/embed/${this.currentSelected.link}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>


                
                  <div id="video-frame">
                    <video id="video-grafic" width="${this.currentSelected.width}" height="${this.currentSelected.height}" controls autoplay="true" muted="muted">
                      <source src="${this.currentSelected.video?`images/grafica/${this.currentSelected.video}.mp4`:""}" type="video/mp4">
                      Your browser does not support the video tag.
                      this.currentSelected.imagine   </video>
                  </div>

                  <div id="mobile-video-frame">
                    <video id="mobile-video-grafic" width="200" height="357" controls autoplay="true" muted="muted">
                      <source src="${this.currentSelected.mobileVideo?`images/grafica/${this.currentSelected.mobileVideo}.mp4`:""}" type="video/mp4">
                      Your browser does not support the video tag.
                      this.currentSelected.imagine   </video>
                  </div>
                
                </div>

                
                
          </div>

         

      </div>
      <div id="title-holder" ?active="${this.imageLoaded === true}">
          ${this.currentSelected.title}
      </div>


      
      
    `;
  }

  static get properties() {
    return {
        myButtons: Array,
        hasLink: Boolean,
        hasVideo: Boolean,
        videoToPlay: Boolean,
        linkToPlay: Boolean,
        previewMode: Boolean,
        buttonSelected: Boolean,
        imageLoaded: Boolean,
        currentSelected: Object,
        offsetWidth: Number
    };
  }


  constructor() {
    super();
    this.buttonSelected=false;
    this.imageLoaded=false;
    this.currentSelected={};
    this.videoToPlay = false;
    this.linkToPlay = false;
    this.previewMode = true;
  }


  firstUpdated(){
      const mainWrapper = this.shadowRoot.querySelector("#grafic-wrapper")
      const imagePreview = this.shadowRoot.querySelector("#image-preview-holder");
      const mobileLinkFrame = this.shadowRoot.querySelector("#mobile-link-frame");
      const desktopLinkFrame = this.shadowRoot.querySelector("#desktop-link-frame");
      const videoFrame = this.shadowRoot.querySelector("#video-frame");
      const mobileVideoFrame = this.shadowRoot.querySelector("#mobile-video-frame");
      
      this.offsetWidth=mainWrapper.offsetWidth;

      desktopLinkFrame.style.display="none";
      mobileLinkFrame.style.display="none";
      videoFrame.style.display="none";
      mobileVideoFrame.style.display="none";
      imagePreview.classList.add("hidden");
      imagePreview.style.display="none";

      this.myButtons = graficItems.map(item=>(
        {
          image:item.buton, 
          text: item.buttonTitle, 
          selected: false,
        }));
  }


  selectCurrent(index){
    this.previewMode = true;
    const myPreviewMobile = this.shadowRoot.querySelector("#my-preview-mobile");
    const myPreviewDesktop = this.shadowRoot.querySelector("#my-preview-desktop")
    const imagePreview = this.shadowRoot.querySelector("#image-preview-holder");
    const imageContainer = this.shadowRoot.querySelector("#image-container");
    const mobileLinkFrame = this.shadowRoot.querySelector("#mobile-link-frame");
    const desktopLinkFrame = this.shadowRoot.querySelector("#desktop-link-frame");
    const videoFrame = this.shadowRoot.querySelector("#video-frame");
    const mobileVideoFrame = this.shadowRoot.querySelector("#mobile-video-frame");

    const videoItem = this.shadowRoot.querySelector("#video-grafic");
    const mobileVideoItem = this.shadowRoot.querySelector("#mobile-video-grafic");
    desktopLinkFrame.style.display="none";
    mobileLinkFrame.style.display="none";
    videoFrame.style.display="none";

    this.myButtons.forEach((button,curIndex)=>{
      if(index===curIndex){
        button.selected = !button.selected;
      }else{
        button.selected = false;
      }
    })
    this.requestUpdate();
    if(this.myButtons[index].selected){
      this.buttonSelected = true;
      this.imageLoaded=false;
      setTimeout(() => {
        this.currentSelected = {...graficItems[index],hasVideo: (graficItems[index].link||graficItems[index].video) ? true : false}
        myPreviewMobile.classList.add("hidden");
        myPreviewDesktop.classList.add("hidden");
        imagePreview.style.display="grid";
        imagePreview.classList.remove("hidden");
        if(!this.currentSelected.video&&!this.currentSelected.link){
          videoFrame.style.display="none";
          mobileVideoFrame.style.display="none";
          setTimeout(() => {
            imageContainer.classList.remove("hidden");
            imageContainer.style.display="grid";

          }, 100);
          this.imageLoaded=true;
        }else if(this.currentSelected.video&&!this.currentSelected.link){

          imageContainer.classList.add("hidden");
          imageContainer.style.display="none";
          if(this.offsetWidth>460){
            videoFrame.style.display="block";
            videoFrame.style.width=`${this.currentSelected.width}px`
            videoFrame.style.height=`${this.currentSelected.height}px`;
            mobileVideoFrame.style.display="none";
            videoItem.load();
            videoItem.play();  
          }else{
            mobileVideoFrame.style.display="block";
            mobileVideoFrame.style.width="200px";
            mobileVideoFrame.style.height="357px";
            videoFrame.style.display="none";
            mobileVideoItem.load();
            mobileVideoItem.play();
          }
          
          this.imageLoaded=true;
          this.requestUpdate();
        }else if(!this.currentSelected.video&&this.currentSelected.link){
          setTimeout(() => {
            videoFrame.style.display="none";
            mobileVideoFrame.style.display="none";
            imageContainer.style.display="none";
            if(this.offsetWidth>460){
              desktopLinkFrame.style.display="block";
            }else{
              mobileLinkFrame.style.display="block";
            }
            this.imageLoaded=true;
            this.requestUpdate();
          }, 300);
          
        }
        
      }, 500);
    }else{
      this.imageLoaded=false;
      setTimeout(() => {
        imagePreview.classList.add("hidden");
        imagePreview.style.display="none";
        this.requestUpdate();
        if(this.offsetWidth>460){
          myPreviewDesktop.classList.remove("hidden");
        }else{
          myPreviewMobile.classList.remove("hidden");
        }
        setTimeout(() => {
          this.buttonSelected = false;
        },100)
      }, 500);
      
    }
  }

  updated(changedProps){
      
      
  }


 
}

window.customElements.define('grafic-component', GraficComponent);
