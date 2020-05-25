
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

import { movie } from '../icons/menu-icons'


import './video-track-holder';
import './main-button'

class VideoPreview extends LitElement {
  
  static get styles() {
    return [
      css`

        


        #preview-accordion-holder::-webkit-scrollbar {
                    width: 5px;
                }

        #preview-accordion-holder::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; 
            border-radius: 10px;
        }
        #preview-accordion-holder::-webkit-scrollbar-thumb {
            background: linear-gradient(0deg, #009b74, #000);                    
            border-radius: 10px;
           
        }

        #preview-accordion{
            display: flex;
            flex-direction: column;
            padding-right: 6px;
            height: auto;
        }



        .track-holder{
            background: linear-gradient(45deg,#009b74,#000);
            display: grid;
            height: 70px;
            border-radius: 0 10px 10px  0;
            margin-bottom: 5px;
            grid-template-columns: 1fr auto;
        }

        .track-controls{
          display: inline;
          width: 85px;
        }
        

        .control-icon{
          height: 30px;
          width: 30px;
          margin-right: 6px;
          color: var(--app-secondary-color);
          margin-top: 20px;
        }

        .track-title{
          color: #fff;
          font-size: 15px;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 1px 1px 3px #000;
        }

        .track-artist{
          color: #fff;
          font-size: 13px;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 1px 1px 3px #000;
        }

        .track-info{
          padding: 16px 8px;
        }

        .action-button{
          width: 100%;
        }

        .mobile-preview-container,
        #preview-container{
        display: grid;
        justify-content: center;
        padding-bottom: 50px;
      }

      #slider-wrapper{
        height: auto;
        width: 770px;
        display:block;
        border-top: 1px dotted #eee;
        border-bottom: 1px dotted #eee;
        overflow-x: auto;
        padding: 25px 0;
        box-sizing: border-box;
      }

      #slider-wrapper::-webkit-scrollbar {
                    height: 5px;
                }

        #slider-wrapper::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; 
            border-radius: 10px;
        }
        #slider-wrapper::-webkit-scrollbar-thumb {
            background: linear-gradient(0deg, #009b74, #b2ff59);                    
            border-radius: 10px;
        }

      #slider-container{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: nowrap;
        width: auto;
        
      }

      .thumb-element{
        pointer-events: none;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .7;
      }

      .thumb-holder:hover>.thumb-element{
        opacity: 1;
      }

      .thumb-holder:hover>.button-holder>.button-icon{
        color: var(--app-secondary-color);
      }

      .thumb-holder{
        margin-right: 24px;
        width: auto;
        position: relative;
        display: block
      }

      .button-holder{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        align-content: center;
        justify-content: center;
      }

      .video-frame{
          margin: 0 auto;
      }

      #video-icon{
        height: 70px;
        width: 70px;
        color: #eee;
      }

      .button-icon{
        height: 65px;
        width: 65px;
        color: #eee;
        transition: all .3s ease-out;
      }

      .mobile-preview-container[hidden]{
        display: none;
      }

      @media (min-width: 1024px){
        #preview-holder{
            width: 1170px;
            height: 500px;
            margin: 100px auto;
            display: grid;
            grid-template-columns: 400px 1fr;
            padding-bottom: 50px;
            box-shadow:0 6px 6px -6px #fff;
        }

        #preview-accordion-holder{
            height: 500px;
            overflow-y: scroll;
        }

        .mobile-preview-container{
          display: none;
        }

      }

      @media (max-width: 460px){
        #preview-container{
          display: none;
        }


        #slider-wrapper{
          width: 100vw;
        }

        .thumb-element{
          height: 70px;
          width: auto;
        }

        .button-icon{
        height: 35px;
        width: 35px;
        }
      }
    
    }
    `]
  }


  render() {
    return html`

      <div id="preview-holder">
            <div id="preview-accordion-holder">
                    <div id="preview-accordion">
                        ${repeat(this.data||[], (track, index)=>html`
                           <video-track-holder .track="${track}" 
                                          @click="${()=>this.selectTrack(index)}" 
                                          .mustHover=${this.notSelected} 
                                          index="${index}"
                                          @play-clicked="${()=>this.playTrack(index)}"
                                          @pause-clicked="${()=>this.pauseTrack(index)}"></video-track-holder>

                    <div class="mobile-preview-container" ?hidden=${this.selectedVideoIndex!=index||this.selectedVideoIndex==null}>
                      <div class="video-frame">
                          <iframe width="380" height="215" src="https://www.youtube.com/embed/${this.primaryVideo}" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div id="slider-wrapper">
                            <div id="slider-container">
                            ${repeat(this.thumbnails||[], (thumb,tIndex)=>html`
                                <div class="thumb-holder" @click="${()=>this.selectVideo(thumb.link)}">
                                    <img class="thumb-element" id="thumb-${tIndex}" src="images/thumbnails/${thumb.thumbnail}.jpg">
                                    <div class="button-holder">
                                        <svg class="button-icon">${movie}</svg>
                                    </div>
                                </div>
                            `)}
                            </div>
                        </div>
                    </div> 
                        `)}
                    
                    </div>
            </div>
            <div id="preview-container">
                <div class="video-frame">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.primaryVideo}" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div id="slider-wrapper">
                    <div id="slider-container">
                    ${repeat(this.thumbnails||[], (thumb,index)=>html`
                        <div class="thumb-holder" @click="${()=>this.selectVideo(thumb.link)}">
                            <img class="thumb-element" id="thumb-${index}" src="images/thumbnails/${thumb.thumbnail}.jpg">
                            <div class="button-holder">
                                <svg class="button-icon">${movie}</svg>
                            </div>
                        </div>
                    `)}
                    </div>
                </div>
            </div>            
      </div>
    `;
  }

  static get properties() {
    return {
       tracks: Array,
       notSelected: Boolean,
       thumbnails: Array,
       primaryVideo: String,
       data: Array,
       selectedVideoIndex: Number
    };
  }


  constructor() {
    super();
    this.notSelected = true;
  }


  firstUpdated(){
    this.thumbnails=[...this.data[0].thumbs]
    this.primaryVideo = this.data[0].thumbs[0].link;
  }

  updated(changedProps){
    if(changedProps.has('thumbnails')&&this.thumbnails.length>0){
        const thumbWrapper = this.shadowRoot.querySelector('#slider-wrapper');
        
  
        thumbWrapper.addEventListener('wheel',(e)=>{
          e.preventDefault();
          console.log("test")
           if (e.deltaY > 0) thumbWrapper.scrollLeft += 50;
           else thumbWrapper.scrollLeft -= 50;
        })
      }
  }

  selectTrack(index){

    if(this.selectedVideoIndex != index){
      this.selectedVideoIndex = index;
    }else{
      this.selectedVideoIndex = null;
    }
    this.requestUpdate();
    this.selectedVideoIndex = index;
    this.thumbnails=[...this.data[index].thumbs]
    this.primaryVideo = this.data[index].thumbs[0].link;
  }



  selectVideo(link){
    this.primaryVideo = link;
  }


 
}

window.customElements.define('video-preview', VideoPreview);
