import { LitElement, html, css } from 'lit-element';

class LazyImgBig extends LitElement {
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
    <div id="my-picture" style="background-image: url('${this.fileName}.png');">
    <picture>
            <source media="(max-width: 425px)" srcset="${this.fileName}.460px.jpg" type="image/jpeg">
            <source media="(max-width: 768px)" srcset="${this.fileName}.750px.jpg" type="image/jpeg">
            <source media="(max-width: 1024px)" srcset="${this.fileName}.1024px.jpg" type="image/jpeg">
            <source media="(max-width: 1366px)" srcset="${this.fileName}.1366px.jpg" type="image/jpeg">
            <source media="(max-width: 1440px)" srcset="${this.fileName}.1440px.jpg" type="image/jpeg">
            <source media="(max-width: 1601px)" srcset="${this.fileName}.1600px.jpg" type="image/jpeg">
            <img id="my-image" ?hidden="${typeof this.fileName === "undefined"}" src="${this.fileName}.1920px.jpg" alt="${this.altData}" 
                                class="${this._loaded ? 'loaded' : ''}"
                                @load="${this._onImgLoad}"
                                @error="${this._onImgError}">
    </picture>
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

    buildName(image){
        if(typeof image !== "undefined") {
            const fileNameEls = image.split('.');
            fileNameEls.splice(-1,1);
            this.fileName = fileNameEls.join('.');
        }
        
    }

    _onImgLoad() {
        this._loaded = true;
      }
    
    _onImgError() {
        console.log('image error')
    }


}


window.customElements.define('lazy-img-big', LazyImgBig);