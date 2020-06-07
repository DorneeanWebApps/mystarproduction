
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

import { movie } from '../icons/menu-icons'

class SliderComponent extends LitElement {
  
  static get styles() {
    return [
      css`

      #slider-holder{
          min-height: 400px;
          width: 1170px;
          margin: 0 auto 15px auto;
          padding: 75px 0 50px 0;
          background: #000000;
          display: grid;
          grid-template-columns: 400px 1fr;
          grid-gap: 48px;
          box-sizing: border-box;
          box-shadow:0 6px 6px -6px #fff;
      }

      #explanations-holder{
        height: 100%;
        padding: 48px 0;
        display: grid;
        grid-template-columns: 70px 1fr;
        grid-gap: 24px;
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

      


      #explanations-text>h3,p{
        margin-top: 0;
        font-family: 'Montserrat', sans-serif;
      }

      #explanations-text>h3{
        color: var(--app-secondary-color);
      }

      #explanations-text>p{
        color: #eee;
      }

      #preview-container{
        display: grid;
        justify-content: center;
        padding-bottom: 50px;
        border-bottom: 1px dotted #eee;
      }


      #slider-wrapper{
        height: auto;
        width: 770px;
        display:block;
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

      `
      ]
    
    }


  render() {
    return html`
    <div id="slider-holder">
      <div id="explanations-holder">
          <svg id="video-icon">${movie}</svg>
          <div id="explanations-text">
            <h3>${this.data.title}</h3>
            <p>${this.data.description}</p>
          </div>
      </div>

      <div id="videos-wrapper">
        <div id="preview-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.primaryVideo}" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div id="slider-wrapper">
            <div id="slider-container">
              ${repeat(this.data.thumbs||[], (thumb,index)=>html`
                <div class="thumb-holder" @click="${()=>this.selectVideo(thumb.link)}">
                  <img class="thumb-element" id="thumb-${index}" alt="thumb.alt" src="images/thumbnails/${thumb.thumbnail}.jpg">
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
        thumbnails: Array,
        primaryVideo: String,
        data: Object
    };
  }


  constructor() {
    super();
    this.data={};
   
    
     
  }


  firstUpdated(){
    this.primaryVideo = this.data.thumbs[0].link;
  }

  updated(changedProps){
    if(changedProps.has('thumbnails')&&this.thumbnails.length>0){
      const thumbWrapper = this.shadowRoot.querySelector('#slider-wrapper');
      

      thumbWrapper.addEventListener('wheel',(e)=>{
        e.preventDefault();
         if (e.deltaY > 0) thumbWrapper.scrollLeft += 50;
         else thumbWrapper.scrollLeft -= 50;
      })
    }
  }


  selectVideo(link){
    this.primaryVideo = link;
  }


 
}

window.customElements.define('slider-component', SliderComponent);
