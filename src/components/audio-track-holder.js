
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

import '@polymer/iron-icon';
import '@polymer/iron-icons/av-icons';


class AudioTrackHolder extends LitElement {
  
  static get styles() {
    return [
      css`

        #track-wrapper{
          display: block;
          height: 75px;
          overflow: hidden;
          transition: all .3s ease-out;
        }


        #track-holder{
            background: linear-gradient(45deg,#009b74,#000);
            display: grid;
            height: 70px;
            border-radius: 0 10px 10px  0;
            margin-bottom: 5px;
            grid-template-columns: 1fr auto;
            position: relative;
            cursor: pointer;
            transition: all .3s ease-in-out;
            box-shadow: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -7px rgba(0, 0, 0, .2);
            overflow: hidden;
        }

        #track-cotrols-wrapper{
          width: 90px;
          overflow-x:hidden;
          display: block;
          box-sizing: border-box;
        }
      
        #track-controls{
          display: flex;
          width: 85px;
          justify-content: flex-end;
          transform: translateX(45%);
          transition: all 0.5s ease-out;
        }

        #track-controls[selected]{
          transform: translateX(0);
        }
        

        .control-icon{
          height: 30px;
          width: 30px;
          margin-right: 6px;
          color: var(--app-secondary-color);
          margin-top: 20px;
          cursor: pointer;
        }

        #track-title{
          color: #fff;
          font-size: 15px;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 1px 1px 3px #000;
        }

        #track-artist{
          color: #fff;
          font-size: 13px;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 1px 1px 3px #000;
        }

        #track-info{
          padding: 16px 24px;
        }

        

        @keyframes rippleEffect {
            0% {transform:scale(1); opacity:0.6;}
            100% {transform:scale(100); opacity:0;}
        }

        #track-data > ul{
              list-style-type: none;
              padding: 0;
              box-sizing: border-box;
            }

        #track-data > ul > li:before { 
          content:'✓'; 
          display: inline-block;
          margin-right: 24px;
          color: #eee;
        }

        #track-data > ul > li{
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #eee;
          text-align: justify;
          margin: 6px 0;
          padding: 0 24px;
          box-sizing: border-box;
        }

        iron-icon[hidden]{
          display:none;
        }
    
    }
    `]
  }


  render() {
    return html`

      <div id="track-wrapper">
        <div id="track-holder">
            <div id="track-info">
                <div id="track-title">
                ${this.track.title}
                </div>
                <div id="track-artist">
                ${this.track.artist}
                </div>
            </div>
            <div id="track-controlls-wrapper">
              <div id="track-controls"  ?selected=${this.viewPause===true}>
                  <iron-icon class="control-icon" @click=${()=>this.playTrack(this.index)} icon="av:play-circle-outline"></iron-icon>
                  <iron-icon class="control-icon" @click=${()=>this.pauseTrack(this.index)} icon="av:pause-circle-outline"></iron-icon>
              </div>
            </div>

           
        </div>
           
        <div id="track-data">
              <ul id="my-list">
              ${repeat(this.track.description, listItem=>html`
              <li>${listItem}</li>
              `)}
              </ul>
          </div>
      </div>
    `;
  }

  static get properties() {
    return {
    track: Object,
    selected: Boolean,
    mustHover: Boolean,
    index: Number,
    viewPause: Boolean
    };
  }


  constructor() {
    super();
    this.track = {};
    this.selected = false;
  }


  firstUpdated(){
    const mainButton = this.shadowRoot.querySelector('#track-holder');
    mainButton.onclick = (e) => {
        let viewportOffset = this.getBoundingClientRect();
        let X = parseInt(e.pageX - viewportOffset.left);
        let Y = parseInt(e.pageY - viewportOffset.top);
        let rippleDiv = document.createElement("div");
        rippleDiv.classList.add('ripple');
        rippleDiv.setAttribute("style", "top:" + Y + "px; left:" + X + "px;");
        mainButton.appendChild(rippleDiv);
        setTimeout(() => {
            rippleDiv.parentElement.removeChild(rippleDiv);
        }, 900);
    }

  }

  updated(changedProps){

      console.log(this.viewPause)
      let trackWrapper = this.shadowRoot.querySelector('#track-wrapper');
      const itemsNo = this.track.description.length;

      const handleMouseOver = () =>{
        trackWrapper.style.height = `${115 + itemsNo*18}px`;
      }

      const handleMouseOut = () =>{
        trackWrapper.style.height = `75px`
      }

      if(this.mustHover){
          trackWrapper.addEventListener('mouseover', handleMouseOver)
          trackWrapper.addEventListener('mouseout', handleMouseOut)
      }else{
        this.recreateNode(trackWrapper);
        trackWrapper = this.shadowRoot.querySelector('#track-wrapper');
      }



      if(this.track.selected){
        const newTrackWrapper = this.shadowRoot.querySelector('#track-wrapper');
        trackWrapper.setAttribute('style', `height: ${115 + itemsNo*18}px`);
      }else{
        const newTrackWrapper = this.shadowRoot.querySelector('#track-wrapper');
        trackWrapper.setAttribute('style', `height: 75px`);
      }
     

    if(changedProps.has('selected'&&this.selected)){
       
    }else if(changedProps.has('selected'&&!this.selected)){
        
    }
    
      

  }

  playTrack(){
    console.log('test2')
    this.dispatchEvent(new CustomEvent('play-clicked', { detail: { index: this.index }, bubbles: true, composed: true }));

    
  }

  pauseTrack(){
    this.dispatchEvent(new CustomEvent('pause-clicked', { detail: { index: this.index }, bubbles: true, composed: true }));

  }

  recreateNode(el, withChildren) {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
      var newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
  }
  


 
}

window.customElements.define('audio-track-holder', AudioTrackHolder);
