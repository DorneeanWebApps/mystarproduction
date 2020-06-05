
import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

// This element is *not* connected to the Redux store.
class MyArticle extends LitElement {
  
  static get styles() {
    return [
      css`




        #article-text>h2{
          margin: 0;
          color: var(--app-secondary-color);
          font-family: 'Montserrat', sans-serif;
        }

        #article-text > ul{
              list-style-type: none;
              padding: 0;
            }

        #article-text > ul > li:before { 
          content:'✓'; 
          display: inline-block;
          margin-right: 24px;
          color: #eee;
        }

        #article-text > ul > li{
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          color: #eee;
          text-align: justify;
          margin: 6px 0;
        }

        #article-image-wrapper{
          height: 100%;
          display: grid;
          align-content: center;
          
        }

        #article-image{
          width: 100%;
          height: auto;
        }

        #image-holder{
          width: 100%;
          display: flex;
          overflow: hidden;
          background: #ffff;
        }


        @media (min-width: 1024px){

          #article-text{
            min-height: 360px;
          }
                
          #article-holder{
              width: 1170px;
              margin: 0 auto 15px auto;
              padding: 150px 0 50px 0;
              background: #000000;
              display: grid;
              grid-template-columns: 400px 1fr;
              grid-gap: 48px;
              box-sizing: border-box;
              box-shadow:0 6px 6px -6px #fff;
              
            }
        }


        @media (max-width: 460px) {
          #article-holder{
            padding: 0 24px;
          }

            #article-image-wrapper{
              display: none;
            }

            #article-text>h2{
              font-size: 20px;
            }

            #article-text > ul > li{
              font-size: 13px;
            }
        }

      `
      ]
    
    }


  render() {
    return html`
        <div id="article-holder">
          <div id="article-text">
            <h2>${this.data.title}</h2>
            <ul>
              ${repeat(this.data.listItems||[], listiItem=>html`
              <li>${listiItem}</li>
              `)}
            </ul>
          </div>
          <div id="article-image-wrapper">
            <div id="image-holder">
              <lazy-img id="article-image" @load="${()=>this.loadImage()}" .fileName="${this.data.image}" .altData=${this.data.alt}></lazy-img>
            </div>
          </div>
        </div>
      
    `;
  }

  static get properties() {
    return {
      data: Object
    };
  }


  constructor() {
    super();
    this.data={};
  }

  firstUpdated(){
    
  }

  updated(){
    const container = this.shadowRoot.querySelector('#article-image-wrapper');
    const imageHolder = this.shadowRoot.querySelector('#image-holder');
      window.addEventListener('scroll',()=>{
      if(container.offsetHeight+window.pageYOffset>container.offsetTop){
        const image= this.shadowRoot.querySelector('#article-image');
        let diff=container.offsetHeight+window.pageYOffset-container.offsetTop;
        const scaleRate = diff/container.offsetHeight/15;
        const translateRateX = scaleRate*100;
        const translateRateY = scaleRate*100;
        image.style.transform = `scale(${1+scaleRate}, ${1+scaleRate}) translate(-${translateRateX}px, ${translateRateY}px`;
      }

    })   
  }

  loadImage(){
   
    const imageHolder = this.shadowRoot.querySelector('#image-holder');
    const image= this.shadowRoot.querySelector('#article-image');
    setTimeout(() => {
      imageHolder.style.height = `${image.offsetHeight}px`;
    }, 200);
    
  }


 
}

window.customElements.define('my-article', MyArticle);
