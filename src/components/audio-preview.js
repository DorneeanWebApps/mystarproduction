
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';


import { audioTracks } from '../app-data/audio';

import './audio-track-holder';
import './main-button'

class AudioPreview extends LitElement {
  
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
        }



        #loader-holder{
          height: 10px;
          width: 10px;
          border: 2px solid var(--app-secondary-color);
          border-radius: 50%;
          align-self: center;
          justify-self: center;
        }

        @keyframes loadingItem{
          0%{
            transform: scale(100,100);
          }
          100%{
            transform: scale(1,1);
          }
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

        #logo-holder{
          height: 405px;
          width:720px;
          display: grid;
          align-content: center;
          justify-content: center;

        }
        #loader-holder[hidden],
        #logo-holder[hidden]{
          display: none;
        }

        #audio-logo{
          animation-name: animateLogo;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
        }

        @keyframes animateLogo{
          0%{
            transform:scale(1,1)
          }
          25%{transform:scale(1.2,1.1)}
          50%{transform:scale(1.1,1.2)}
          75%{transform:scale(1.2,1.2)}
          100%{transform:scale(1.1,1.1)}
        }

        .animate-loader{
          animation-name: loadingItem;
          animation-duration: 1s;
          animation-fill-mode: forwards;
        }
    
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


        #preview-accordion-holder{
            height: 500px;
            overflow-y: scroll;
        }

        #preview-container{
            display: grid;
            height: 100%;
            border: 1px solid #fff;
            align-content: center;
            justify-content:center;
            overflow: hidden;
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
                        ${repeat(this.tracks||[], (track, index)=>html`
                           <audio-track-holder .track="${track}" 
                                          @click="${()=>this.selectTrack(index)}" 
                                          .mustHover=${this.notSelected} 
                                          index="${index}"
                                          .viewPause=${this.index===index?true:false}
                                          @play-clicked="${()=>this.playTrack(index)}"
                                          @pause-clicked="${()=>this.pauseTrack(index)}"></audio-track-holder>

                                          <div id="mobile-preview-container" ?hidden=${this.selectedAudioIndex!=index||this.selectedAudioIndex==null}>
                                            <video  ?hidden="${this.playOn===false||this.loading===true}" id="my-preview" width="380" height="215">
                                                <source id="my-source" src="audio/audio1.mp4" type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>           
                        `)}
                    
                    </div>
            </div>
            <div id="preview-container">
                <div id="logo-holder" ?hidden="${this.playOn===true}">
                    <img id="audio-logo" src="images/load.png">
                </div>
                <div id="loader-holder" ?hidden=${this.loading===false}>

                </div>
                <video  ?hidden="${this.playOn===false||this.loading===true}" id="my-preview" width="720" height="405">
                    <source id="my-source" src="audio/audio1.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
      </div>
    `;
  }

  static get properties() {
    return {
       tracks: Array,
       notSelected: Boolean,
       playOn: Boolean,
       loading: Boolean,
       index: Number,
       selectedAudioIndex: Number,
    };
  }


  constructor() {
    super();
    this.notSelected = true;
    this.playOn =false;
    this.loading = false;
  }


  firstUpdated(){
    const myVid = this.shadowRoot.querySelector('#my-preview');
    myVid.addEventListener('loadeddata',()=>{
        console.log('video loaded')
    })
    this.tracks=audioTracks.map(track=>({...track, selected: false}))
  }

  updated(changedProps){

  }

  selectTrack(index){

    if(this.selectedAudioIndex != index){
      this.selectedAudioIndex = index;
    }else{
      // this.selectedAudioIndex = null;
    }
    this.tracks = this.tracks.map((track, tidx)=>({...track, selected: tidx === index ? !track.selected: false}))

    const hasSelected = this.tracks.find(track=>track.selected===true);
    if(!hasSelected){
      this.notSelected = true;
    }else{
      this.notSelected = false;
    }
    this.requestUpdate();
  }

  playTrack(index){
    this.playOn =true;
    this.loading = true;
    const myVid = this.shadowRoot.querySelector('#my-preview');
    const mySrc = this.shadowRoot.querySelector("#my-source");
    const loader = this.shadowRoot.querySelector("#loader-holder");
    loader.classList.add("animate-loader")
    mySrc.src= `audio/${this.tracks[index].file}.mp4`;
    myVid.load();
    setTimeout(() => {
      this.loading = false;
      loader.classList.remove("animate-loader")
    }, 1000);
    myVid.play();
    this.index=index;
  }

  pauseTrack(index){
    const myVid = this.shadowRoot.querySelector('#my-preview');
    if(this.index===index){
      myVid.pause();
    }
  }


  


 
}

window.customElements.define('audio-preview', AudioPreview);
