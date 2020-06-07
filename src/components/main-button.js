import { LitElement, html, css } from 'lit-element';

class MainButton extends LitElement {

    static get styles() {
        return [
            css `

            :host{
                display: grid;
                height: 60px;
                align-content: center;
                position: relative;
            }

            #main-button{
                height: 100%;
                position: relative;
                color: #e0e0e0;
                font-size: 15px;
                text-transform: uppercase;
                vertical-align: middle;
                text-align: center;
                cursor: pointer;
                border: none;
                border-radius: 4px;
                -webkit-tap-highlight-color: transparent;
                line-height: 36px;
                box-shadow: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -7px rgba(0, 0, 0, .2);
                transition: all .3s ease-in-out;
                text-shadow: 2px 2px rgba(0,0,0, .3);
                overflow: hidden;
            }

            #main-button:after{
                content: '';
                position: absolute;
                height: 100%;
                width: 100%;
                border-radius: 4px;
                box-shadow: 0 8px 12px 2px rgba(0, 0, 0, .14), 0 3px 15px 5px rgba(0, 0, 0, .12), 0 4px 5px -3px rgba(0, 0, 0, .2);
                opacity: 0;
                top: 0;
                left: 0;
                transition: opacity .3s ease-in-out;
            }

            #main-button:hover{
                color: #fff;
                font-weight: 600;
                font-size: 17px;

            }

            #main-button:hover::after{
                opacity: 1;
            }

            .ripple{
                position:absolute;
                background:rgba(255,255,255,1);
                border-radius:50%;
                width:5px;
                height:5px;
                animation:rippleEffect 1s;
                opacity:0;
                z-index: 1500;
            }

            @keyframes rippleEffect {
                0% {transform:scale(1); opacity:0.6;}
                100% {transform:scale(100); opacity:0;}
            }

            

        `
        ];
    }

    render() {
        return html `
            <div id="main-button">
                ${this.text}
            </div>
        `;
    }

    static get properties() {
        return {
            actionType: String,
            gradientColors: Object,
            text: String
        }
    }

    constructor() {
        super();
        this.gradientColors = {
            info: { in: "#6200ea",
                out: "#1976d2 "
            },
            attention: { in: "#8e24aa",
                out: "#ff6e40"
            },
            succes: { in: "#1b5e20",
                out: "#4caf50"
            },
            danger: { in: "#d50000",
                out: "#ff5252"
            },
            warn: { in: "#d84315",
                out: "#f57c00"
            },
            teal: { in: "#00897b",
                out: "#4db6ac"
            }
        }
    }

    firstUpdated() {
        
    }


    updated(changedProps) {
        const mainButton = this.shadowRoot.querySelector('#main-button');
        mainButton.style.background = `linear-gradient(45deg, ${this.gradientColors[this.actionType].in}, ${this.gradientColors[this.actionType].out})`
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


}

window.customElements.define('main-button', MainButton);