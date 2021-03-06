import { LitElement, html, css } from 'lit-element';

class LazyImg extends LitElement {
    render(props) {
        return html `       
    <style>
        :host{
            box-sizing: border-box;
            height: 100%;
            display: block;
        }

        #my-picture{
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
        }

        

        #my-image{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        #my-image[hidden]{
            display: none;
        }



        img {
            opacity: 0;
            transition: none;
        }

        img.loaded {
            opacity: 1;
            transition: .5s opacity;
        }


    </style>
    <div id="my-picture" style="background-image: url('${this.fileName ? `${this.fileName}.png`:""}');">
            
            <img id="my-image" ?hidden="${typeof this.fileName === "undefined"}" src="${this.fileName ? `${this.fileName}.jpg`:""}" alt="${this.altData}" 
                                class="${this._loaded ? 'loaded' : ''}"
                                @load="${this._onImgLoad}"
                                @error="${this._onImgError}">
        </div>
    `;
    }


    static get properties() {
        return {
            imgData: {type: Object},
            fileName: {type: String},
            _loaded: { type: Boolean },
            altData: {type: String}
        }
    }

    //         <source media="(max-width: 425px)" srcset="images/webp.x425/${this.fileName}.webp" type="image/webp">
    //         <source media="(max-width: 425px)" srcset="images/jpeg.x425/${this.fileName}.jpg" type="image/jpeg">
    //         <source media="(max-width: 768px)" srcset="images/webp.x768/${this.fileName}.webp" type="image/webp">
    //         <source media="(max-width: 768px)" srcset="images/jpeg.x768/${this.fileName}.jpg" type="image/jpeg">
    //         <source media="(max-width: 1024px)" srcset="images/webp.x1024/${this.fileName}.webp" type="image/webp">
    //         <source media="(max-width: 1024px)" srcset="images/jpeg.x1024/${this.fileName}.jpg" type="image/jpeg">
    //         <source media="(max-width: 1440px)" srcset="images/webp.x1440/${this.fileName}.webp" type="image/webp">
    //         <source media="(max-width: 1440px)" srcset="images/jpeg.x1440/${this.fileName}.jpg" type="image/jpeg">
    //         <source media="(min-width: 1441px)" srcset="images/webp.x1920/${this.fileName}.webp" type="image/webp">
    //         <source media="(min-width: 1441px)" srcset="images/jpeg.x1920/${this.fileName}.jpg" type="image/jpeg"></source>

    constructor() {
        super();
        this._loaded = false;
        this.imgData={};

    }

    firstUpdated(changedProps) {
        this._loaded = false;
    }

    updated(changedProps) {
        if (changedProps.has('fileName')){
            this._loaded = false;
          }
          super.update(changedProps);
    }


    _onImgLoad() {
        this._loaded = true;
      }
    
    _onImgError() {
        console.log('image error')
    }


}


window.customElements.define('lazy-img', LazyImg);