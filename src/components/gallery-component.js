
import { LitElement, html, css } from 'lit-element';
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

      #gallery-wrapper{
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto auto auto;
          box-sizing: border-box;
      }

      #image-1{
          grid-column: 1/3;
      }
      
      #image-2{
          grid-column: 3/4;
          grid-row: 1/3;
      }

      #image-3{
          grid-column: 4/5;
      }

      #image-4{
          grid-column: 1/2;
          grid-row: 2/4;
      }

      #image-5{
          grid-column: 2/3;
          grid-row: 2/3;
      }

      #image-6{
          grid-column: 2/4;
          grid-row: 3/4;
     }

      #image-7{
          grid-column: 4/5;
          grid-row: 2/4;
      }

      .image-container{
          overflow: hidden;
          border: 1px solid #000;
      }

      .gallery-image{
          width: 100%;
          height: auto;
          vertical-align: bottom;
          transition: all .3s ease-out;
          transform: scale(1.02, 1.02);
          opacity: .7;
      }

      .gallery-image:hover{
          transform: scale(1.1, 1.1);
          opacity: 1;
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

                <div id="gallery-wrapper">
                    <div class="image-container" id="image-1">
                        <img class="gallery-image" src="${this.landscapes[0]?`images/gallery/${this.landscapes[0].name}.jpg`:""}">
                    </div>
                    <div class="image-container" id="image-2">
                        <img class="gallery-image" src="${this.portraits[0]?`images/gallery/${this.portraits[0].name}.jpg`:""}">
                    </div>
                    <div class="image-container" id="image-3">
                        <img class="gallery-image" src="${this.squares[0]?`images/gallery/${this.squares[0].name}.jpg`:""}">
                    </div>
                    <div class="image-container" id="image-4">
                       <img class="gallery-image" src="${this.portraits[1]?`images/gallery/${this.portraits[1].name}.jpg`:""}">
                    </div>
                    <div class="image-container" id="image-5">
                        <img class="gallery-image" src="${this.squares[1]?`images/gallery/${this.squares[1].name}.jpg`:""}">
                    </div>
                    <div class="image-container" id="image-6">
                        <img class="gallery-image" src="${this.landscapes[1]?`images/gallery/${this.landscapes[1].name}.jpg`:""}">
                    </div>
                    <div class="image-container" id="image-7">
                    <img class="gallery-image" src="${this.portraits[2]?`images/gallery/${this.portraits[2].name}.jpg`:""}">
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
        filter: String
    };
  }


  constructor() {
    super();
    this.squares=[];
    this.portraits=[];
    this.landscapes=[];
  }


  firstUpdated(){
      if(!this.filter){
          this.squares = this.gallery.filter(image => image.orientation==="square").map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
          this.portraits = this.gallery.filter(image => image.orientation==="portrait").map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
          this.landscapes = this.gallery.filter(image => image.orientation==="landscape").map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
      }

      console.log(this.squares);


  }

  updated(changedProps){

  }


  filterGallery(category){
      let newGal = []
      if(category){
        newGal = this.gallery.filter(image => image.category===category)
      }else{
        newGal = [...this.gallery];
      }

      this.squares = newGal.filter(image => image.orientation==="square").map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
      this.portraits = newGal.filter(image => image.orientation==="portrait").map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
      this.landscapes = newGal.filter(image => image.orientation==="landscape").map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }


 
}

window.customElements.define('gallery-component', GalleryComponent);
