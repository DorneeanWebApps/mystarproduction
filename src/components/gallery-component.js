
import { LitElement, html, css } from 'lit-element';
import './lazy-img'
import { repeat } from 'lit-html/directives/repeat.js';


class GalleryComponent extends LitElement {
  
  static get styles() {
    return [
      css`

      #gallery-holder{
          min-height: 400px;
          margin: 0 24px 100px 24px;
          background: #000000;
          box-sizing: border-box;
          box-shadow:0 6px 6px -6px #fff;
      }

      #filter-wrapper{
        display: grid;
        align-content: center;
        justify-content: center;
        height: 70px;
        color: #EEE;
        border-radius: 50px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
      }

      .filter-element:hover{
          color: var(--app-secondary-color);
          cursor: pointer
      }

     

      .image-container{
          overflow: hidden;
          border: 1px solid #000;
      }


      #preview-wrapper{
        height: 450px;
        display: block;
      }

      #gallery-image{
            display: block;
            width: auto;
            height: 100%;
            padding: 7px;
            background:#e6e6e6;
            margin: 0 auto;
      }

      #slider-wrapper{
        margin-top: 50px;
        height: auto;
        width: 100%;
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
        height: 100px;
        width: auto;
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

      @keyframes changeImage{
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

    .change-image{
        animation-name: changeImage;
        animation-duration: .4s;
        animation-fill-mode: forwards;
     }

      @media (min-width: 1024px){

        #gallery-holder{
          padding: 75px 0 50px 0;
        }

        #filter-wrapper{
        width: 750px;
        margin: 0 auto 75px auto;
        font-size: 21px;
        }
      }

      @media (max-width: 460px){
        #filter-wrapper{
            font-size: 13px;
        }

        #preview-wrapper{
        height: 150px;
        display: block;
      }

      .thumb-element{
          height: 70px;
      }

      #gallery-image{
          padding: 4px;
      }
      }
      

      `
      ]
    
    }


  render() {
    return html`

        <div id="gallery-holder">

                <div id="filter-wrapper">

                    <div class="filter-element" @click="${()=>this.filterGallery()}">
                        TOATE
                    </div>
                    <div class="filter-element" @click="${()=>this.filterGallery("portret")}">
                        PORTRETE
                    </div>
                    <div class="filter-element" @click="${()=>this.filterGallery("peisaj")}">
                        PEISAJE
                    </div>
                    <div class="filter-element" @click="${()=>this.filterGallery("produs")}">
                        PRODUSE
                    </div>
                    
                </div>

                <div id="preview-wrapper">

                    <img id="gallery-image" src="${this.selectedPicture.name ?`images/gallery/${this.selectedPicture.name}.jpg`:""}" alt=${this.selectedPicture.alt ? this.selectedPicture.alt:""}>

                </div>

                <div id="slider-wrapper">
                    <div id="slider-container">
                    ${repeat(this.currentGallery||[], (thumb,index)=>html`
                        <div class="thumb-holder" @click="${()=>this.selectImage(index)}">
                            <img class="thumb-element" id="thumb-${index}" src="images/gallery/${thumb.name}.png">
                        </div>
                    `)}
                    </div>
                </div>

        </div>
      
    `;
  }

  static get properties() {
    return {
        gallery:Object,
        squares: Array,
        landscapes: Array,
        portraits: Array,
        filter: String,
        selectedPicture: Object,
        currentGallery: Array
    };
  }


  constructor() {
    super();
    this.squares=[];
    this.portraits=[];
    this.landscapes=[];
    this.selectedPicture={};
    this.currentGallery=[]
  }


  firstUpdated(){
    
      this.selectedPicture = this.gallery[0];
      this.currentGallery = this.gallery;

  }

  updated(changedProps){
    if(changedProps.has('gallery')&&this.gallery.length>0){
        const thumbWrapper = this.shadowRoot.querySelector('#slider-wrapper');
        
  
        thumbWrapper.addEventListener('wheel',(e)=>{
          e.preventDefault();
           if (e.deltaY > 0) thumbWrapper.scrollLeft += 50;
           else thumbWrapper.scrollLeft -= 50;
        })
      }
  }

    selectImage(index){
        const galleryImage = this.shadowRoot.querySelector('#gallery-image');
        galleryImage.classList.add('change-image');
        setTimeout(() => {
            this.selectedPicture = this.currentGallery[index];  
        }, 200);
        setTimeout(() => {
            galleryImage.classList.remove('change-image');
        }, 400);
    }

  filterGallery(category){
    let newGal = []
    if(category){
      newGal = this.gallery.filter(image => image.category===category)
    }else{
      newGal = [...this.gallery];
    }
    this.currentGallery = newGal;
    this.selectedPicture = this.currentGallery[0];

}


 
}

window.customElements.define('gallery-component', GalleryComponent);
