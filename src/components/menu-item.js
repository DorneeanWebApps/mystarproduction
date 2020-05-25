
import { LitElement, html, css } from 'lit-element';


// This element is *not* connected to the Redux store.
class MenuItem extends  LitElement  {
  
  static get styles() {
    return [
      css`
      
      .menu-icon{
          height:40px;
          width: 40px;
          color:#eee;
          display: block;
          margin: 0 auto;
        }

        #menu-holder{
          height: 150px;
          display: block;
          overflow: hidden;
          box-sizing: border-box;
          margin-bottom: 40px;
        }

        #menu-card{
          display: flex;
          flex-direction: column;
          justify-items: center;
          padding: 24px 24px;
          height: 170px;
          box-sizing: border-box;
          transform: translateY(60px);
          cursor: pointer;
        }

        #icon-element{
          flex: 1;
          display: grid;
          align-content:  end;
        }

        #my-text{
          color: var(--app-secondary-color);
          font-size: 21px;
          height: 60px;
          display: block;
          flex: 0 auto;
          overflow: hidden;
          margin: 16px 0 0;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }


        @keyframes heroSlideUpIn{
            0%{
              transform:translateY(60px);
            }
            100%{
              transform:translateY(0%)
            }
        }

        @keyframes heroSlideUpOut{
              0%{
                transform:translateY(0%);
              }
              100%{
                transform:translateY(60px)
              }
        }
        
        
        .item-slide-up-in{
              animation-name: heroSlideUpIn;
              animation-duration: .3s;
              animation-fill-mode: forwards;
            }

        .item-slide-up-out{
          animation-name: heroSlideUpOut;
          animation-duration: .3s;
          animation-fill-mode: forwards;
        }

      `
      ]
    
    }


  render() {
    return html`
      <div id="menu-holder" @mouseenter="${()=> this.hoverMenuItem()}" @mouseleave="${()=> this.leaveMenuItem()}">
        <div id="menu-card">
          <div id="icon-element">
                <svg class="menu-icon">${this.icon}</svg>
          </div>
          <div id="my-text">${this.text}</div>
        </div>
      </div>
       
    `;
  }

  static get properties() {
    return {
      icon: Object,
      text: String,
      mustHover: Boolean,
      item: String,
      touched: Boolean
    };
  }


  constructor() {
    super();
    
  }


  firstUpdated(){

  }

  updated(changedProps){

    if(changedProps.has('mustHover')){
      if(this.mustHover){
        this.hoverMenuItem();
      }else{
        this.leaveMenuItem();
      }
    }
  }

  hoverMenuItem(){
      const menuCard = this.shadowRoot.querySelector("#menu-card");
      menuCard.classList.remove('item-slide-up-out');
      menuCard.classList.add('item-slide-up-in');
  }

  leaveMenuItem(){
      const menuCard = this.shadowRoot.querySelector("#menu-card");
      menuCard.classList.remove('item-slide-up-in');
      menuCard.classList.add('item-slide-up-out');
  }



 
}

window.customElements.define('menu-item', MenuItem);
