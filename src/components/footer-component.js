
import { LitElement, html, css } from 'lit-element';

import { facebookIcon, instaIcon, youtubeIcon, phoneIcon, mailIcon } from './my-icons'
class FooterComponent extends LitElement {
  
  static get styles() {
    return [
      css`
      


        .icon-love{
       height: 20px;
       width:20px;
       color: #c51162;
       display: inline;
     }

     #contact-data,
     #dev-data,
     #social-icons-wrapper{
         display: grid;
         align-content: center;
         justify-content: center;
         color: white;
     }


     .social-icon{
         color: white;
         height: 20px;
         width:20px;
         margin: 0 36px;
         display: inline;
         transition: all .3s ease-out
     }

     .link-icon{
         margin-right: 16px;
     }


     .social-icon:hover{
        transform: scale(1.5, 1.5);
        color: var(--app-secondary-color);
     }



     #copyright-field{
        grid-column: 1/4;
        text-align: center;
        font-size: 13px;
        color: white;
     }

     .social-href{
         text-decoration: none;
         color: white;
         vertical-align: center;
         display: inline-block;
     }


     #dev-data>h5{
         font-size: 15px;
         display: inline;
         color: white;
     }

     .dev-logo{
         display:inline;
         height: 20px;
         width: auto;
     }

     #dev-data-holder{
         color: white;
     }



     .links-holder{
         display: flex;
     }

     .path{
       stroke-dasharray: 160;
       stroke-dashoffset: 160;
       animation: animate 1.5s forwards infinite;
     }

     .path-1{
      stroke-dasharray: 700;
       stroke-dashoffset: 700;
       stroke:#f09b36;
       fill:none;
       animation: animate_1 .5s forwards linear;
     }

     .path-2{
      stroke-dasharray: 700;
       stroke-dashoffset: 700;
       stroke:#f09b36;
       fill:#f09b36;
       animation: animate_1 1.5s forwards infinite;
     }
     @keyframes animate{
        to{
          stroke-dashoffset: 0;
        }
     }

     @keyframes animate_1{
        to{
          stroke-dashoffset: 0;
          fill:#f09b36;
        }
     }

     .logo-svg{
       height: 18px;
       width: 90px;
     }


     @media(min-width: 1024px){
      #footer-container{
            display: grid;
            height: 85px;
            padding-bottom: 24px;
            z-index: 1000;
            background: #000;
            grid-template-columns: 1fr auto 1fr;
            align-content: center;
            justify-content: center;
        }

        #contact-data-mobile{
          display: none;
        }

        .href-link{
         display: flex;
     }
     }

     @media(max-width: 460px){
      #footer-container{
        padding: 100px 0 48px 0;;
         display: flex;
         flex-direction: column;
         justify-content: center;
         
      }

      #contact-data{
        display: none;
      }

      .href-link{
        color: white;
      }

      #contact-data-mobile{
        padding: 24px 0;
          display: grid;
          justify-content: center;
     }


      `
      ]
    
    }


  render() {
    return html`
        <div id="footer-container">

                <div id="social-icons-wrapper">
                    <div id="social-icons">
                        <a class="social-href" target="blank" href="https://www.facebook.com/MySTARproduction/"> <svg title="Facebook" class="social-icon">${facebookIcon}</svg></a>
                        <a class="social-href" target="blank" href="https://www.youtube.com/mystarproduction"> <svg title="You Tube" class="social-icon">${youtubeIcon}</svg></a>
                        <a class="social-href" target="blank" href="https://www.instagram.com/michaelmystar/"> <svg title="Instagram" class="social-icon">${instaIcon}</svg></a>
                    </div>
                </div>

                <div id="contact-data-mobile">
                        <div class="href-link"><a class="social-href" target="blank" href="tel: +40740783488"> <svg class="social-icon link-icon">${phoneIcon}</svg></a>+40 740 783488</div>
                        <div class="href-link"><a class="social-href" target="blank" href="mailto:office@mystarproduction.ro"> <svg class="social-icon link-icon">${mailIcon}</svg></a>&nbsp;office@mystarproduction.ro</div>
                </div>

                <div id="dev-data">
                        <div id="dev-data-holder">
                            Made with&nbsp;
                            <svg class="icon-love" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                             class="wow draws love" x="0px" y="0px" viewBox="0 0 63.4257431 63.4257431" enable-background="new 0 0 63.4257431 63.4257431" 
                             xml:space="preserve" style="visibility: visible;">
                                <path class="path" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="currentColor" stroke-width="7" stroke-miterlimit="10" d="M38.9352112 54.8121719c-54.8910255-16.981266-26.9966011-58.880127-8.443182-38.7315483C38.9974861-9.9171877 81.8266068 16.6946049 38.9352112 54.8121719L38.9352112 54.8121719zM38.9352112 54.8121719"></path>
                            </svg>&nbsp;
                            by
                            <a class="social-href" target="blank" href="https://www.dorneean.ro/">
                            <!-- <img class="dev-logo" src="images/dorneean.png"> -->
                            <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 806.36 182.09">
                            <defs>
                            <style>.cls-1{fill-rule:evenodd; clip-rule:evenodd; stroke-width:8; stroke-miterlimit:10;}
                            .cls-2{fill:#f09b36;}
                            </style></defs>
                            <title>Dorneean WebApps</title><g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                            <path id="letter_" data-name="&lt;Compound Path&gt;"  class="cls-1 path-2" d="M77.45,162.8H77q-4.44,9.38-11.72,13.56t-20.59,4.2q-13.08,0-21.71-3.21A27.66,27.66,0,0,1,9.25,166.62q-5.05-7.51-7.15-20a190.76,190.76,0,0,1-2.1-31A203.51,203.51,0,0,1,2,84.73q2-12.45,6.91-20A27.41,27.41,0,0,1,21.83,54q8-3.21,20.35-3.21a54.84,54.84,0,0,1,19.61,3.33Q70.54,57.47,77,68.57h.49V0H93.24V169.12l-15.79,9.46ZM18.5,141.71q1.23,9.75,4.56,14.8a15.57,15.57,0,0,0,9.13,6.66,58.51,58.51,0,0,0,15.17,1.6q9.86,0,15.79-2.22a16.77,16.77,0,0,0,9.12-8.39Q75.48,148,76.46,137t1-28.74A107.73,107.73,0,0,0,76,88.8a31.53,31.53,0,0,0-5-12.83,20.33,20.33,0,0,0-9.38-7.15A39.79,39.79,0,0,0,47.36,66.6a58.51,58.51,0,0,0-15.17,1.6,15.57,15.57,0,0,0-9.13,6.66q-3.33,5.06-4.56,14.8a215.49,215.49,0,0,0-1.23,26A215.56,215.56,0,0,0,18.5,141.71Z"/>
                            <path id="letter_2" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M108.74,84.48q1.35-12.45,6.17-20A25.66,25.66,0,0,1,129,53.9q9.24-3.09,24.79-3.09t24.66,3.09a25.73,25.73,0,0,1,13.94,10.6q4.81,7.53,6.29,20a271.52,271.52,0,0,1,1.48,31.2,282.93,282.93,0,0,1-1.48,32.07q-1.49,12.58-6.29,19.86a25,25,0,0,1-14.06,10.11q-9.26,2.84-24.54,2.84t-24.55-2.84a25,25,0,0,1-14.06-10.11q-4.8-7.28-6.29-19.86a285.3,285.3,0,0,1-1.48-32.07A297.93,297.93,0,0,1,108.74,84.48Zm16.9,58.83q1,10.13,4.07,15.17a13.61,13.61,0,0,0,8.88,6.41,68.39,68.39,0,0,0,15.17,1.36,68.45,68.45,0,0,0,15.17-1.36,13.65,13.65,0,0,0,8.88-6.41q3.08-5.05,4.07-15.17t1-27.63q0-17.5-1-27.62t-4.07-15.17a13.7,13.7,0,0,0-8.88-6.42,69.14,69.14,0,0,0-15.17-1.35,69.08,69.08,0,0,0-15.17,1.35,13.65,13.65,0,0,0-8.88,6.42q-3.09,5.06-4.07,15.17t-1,27.62Q124.65,133.2,125.64,143.31Z"/>
                            <path id="letter_3" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M216.8,52.78h15.78v15.3h.5q4.44-9.12,10.85-13.2t18.25-4.07q15,0,22.08,7.4t7,26.39V94.72H277a140.68,140.68,0,0,0-.61-14.43,20.42,20.42,0,0,0-2.84-9.13,11.82,11.82,0,0,0-6.29-4.69,34.93,34.93,0,0,0-10.73-1.35q-23.92-.5-23.93,25.9v87.56H216.8Z"/>
                            <path id="letter_4" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M306.87,52.78h15.79V69.07h.49a47,47,0,0,1,6.17-8.64,26.52,26.52,0,0,1,7.28-5.55,34.21,34.21,0,0,1,9.25-3.08,65,65,0,0,1,12.08-1q10.86,0,18,2.72a27.28,27.28,0,0,1,11.35,7.64,29,29,0,0,1,5.92,12.21,71.9,71.9,0,0,1,1.72,16.41V171l-15.78,7.61V93.49a63.92,63.92,0,0,0-.87-10.61A24.52,24.52,0,0,0,375,73.75a17.22,17.22,0,0,0-7.27-6.29q-4.81-2.34-12.46-2.34A51.21,51.21,0,0,0,342,66.72a25,25,0,0,0-10.37,5.43A24.58,24.58,0,0,0,325,82.63a50.35,50.35,0,0,0-2.34,16.53v79.42H306.87Z"/>
                            <path id="letter_5" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M426.74,119.39V131a109.24,109.24,0,0,0,1.11,17.14A26.23,26.23,0,0,0,431.8,159a14.7,14.7,0,0,0,8,5.68,46,46,0,0,0,13.32,1.6q9.62,0,15.54-.49a19.41,19.41,0,0,0,9.37-2.84,12,12,0,0,0,4.69-7.4A64.68,64.68,0,0,0,484,141.09h15.79v4.69a69.27,69.27,0,0,1-1.61,16,20.57,20.57,0,0,1-6.29,10.85q-4.68,4.2-13.32,6.05t-22.69,1.85q-15.54,0-24.79-3A25.37,25.37,0,0,1,417,167.24q-4.81-7.41-6.17-19.86a304.07,304.07,0,0,1-1.35-31.7,226.46,226.46,0,0,1,1.85-32.06q1.85-12.59,7-19.86a26.71,26.71,0,0,1,14.18-10.11q9-2.84,23.31-2.84,14.06,0,22.69,3t13.32,9a34.12,34.12,0,0,1,6.29,15.42,133.36,133.36,0,0,1,1.61,22.2v19ZM484,103.6q0-9.87-.49-17.15a28.37,28.37,0,0,0-3.21-12.08,15.87,15.87,0,0,0-8.51-7q-5.81-2.22-16.4-2.22T439,67.34a15.87,15.87,0,0,0-8.51,7,28.37,28.37,0,0,0-3.2,12.08q-.5,7.29-.5,17.15Z"/>
                            <path id="letter_6" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M530.46,119.39V131a109.24,109.24,0,0,0,1.11,17.14A26.23,26.23,0,0,0,535.51,159a14.73,14.73,0,0,0,8,5.68,46,46,0,0,0,13.32,1.6q9.61,0,15.54-.49a19.34,19.34,0,0,0,9.37-2.84,12,12,0,0,0,4.69-7.4,64.68,64.68,0,0,0,1.23-14.43h15.79v4.69a69.87,69.87,0,0,1-1.6,16,20.63,20.63,0,0,1-6.29,10.85q-4.7,4.2-13.32,6.05t-22.7,1.85q-15.54,0-24.79-3a25.41,25.41,0,0,1-14.06-10.36q-4.8-7.41-6.16-19.86a300.94,300.94,0,0,1-1.36-31.7A228,228,0,0,1,515,83.62q1.85-12.59,7-19.86a26.71,26.71,0,0,1,14.18-10.11q9-2.84,23.31-2.84,14.07,0,22.7,3a27.82,27.82,0,0,1,13.32,9,34.23,34.23,0,0,1,6.29,15.42,134.55,134.55,0,0,1,1.6,22.2v19Zm57.22-15.79q0-9.87-.49-17.15A28.37,28.37,0,0,0,584,74.37a15.87,15.87,0,0,0-8.51-7q-5.79-2.22-16.4-2.22t-16.4,2.22a15.79,15.79,0,0,0-8.51,7A28.37,28.37,0,0,0,531,86.45q-.5,7.29-.49,17.15Z"/>
                            <path id="letter_7" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M689.45,168.66a25.67,25.67,0,0,1-7,5.49,54.77,54.77,0,0,1-7.93,3.69,45.89,45.89,0,0,1-9.62,2.1,107.21,107.21,0,0,1-12.21.62q-12.09,0-19.74-2.72A26.69,26.69,0,0,1,621,170a28.72,28.72,0,0,1-5.92-12.46,76.31,76.31,0,0,1-1.6-16.4c0-6.08.45-18.33,1.36-23.26a25.9,25.9,0,0,1,5.67-12.46,27.27,27.27,0,0,1,12-7.77q7.65-2.71,20.23-2.71a146.58,146.58,0,0,1,14.67.61,47.08,47.08,0,0,1,9.5,1.85,20.27,20.27,0,0,1,6.16,2.94,17.8,17.8,0,0,1,4.44,4.54h.5V90a79.23,79.23,0,0,0-.74-11.72,14.59,14.59,0,0,0-3.45-7.77q-2.73-3-8.27-4.19a75,75,0,0,0-15.41-1.23,71.58,71.58,0,0,0-15.05,1.23c-3.62.83-6.25,2.14-7.89,4a12.1,12.1,0,0,0-3,7,89,89,0,0,0-.5,10.24H617.92V80.9a49.35,49.35,0,0,1,1.23-11.09,19.1,19.1,0,0,1,5.55-9.62Q629,56,637.53,53.4t23.31-2.59q13.06,0,21.46,2.1t13.19,6.54A22.39,22.39,0,0,1,702,70.67c1.15,4.52,1.72,9.83,1.72,9.17v90.28l-14.3,8.46ZM631,152.31a15.55,15.55,0,0,0,5.43,7.53,23.06,23.06,0,0,0,9.37,3.82,83.44,83.44,0,0,0,27.13,0,23.78,23.78,0,0,0,9.38-3.82c3.75-2.7,4.27-4.32,5.42-7.53s1-11.27,1-16c0-9.53-1.71-18.65-6.47-22s-12.42-5.06-22.95-5.06-18.17,1.69-22.93,5.06-7.16,16.57-7.16,26.1A35.71,35.71,0,0,0,631,152.31Z"/>
                            <path id="letter_8" data-name="&lt;Compound Path&gt;" class="cls-1 path-2" d="M718.3,52.78h15.78V69.07h.5a46.11,46.11,0,0,1,6.17-8.64A26.33,26.33,0,0,1,748,54.88a34.45,34.45,0,0,1,9.25-3.08,65.1,65.1,0,0,1,12.09-1q10.85,0,18,2.72a27.28,27.28,0,0,1,11.35,7.64,28.83,28.83,0,0,1,5.92,12.21,71.32,71.32,0,0,1,1.73,16.41V171l-15.79,7.61V93.49a65,65,0,0,0-.86-10.61,24.87,24.87,0,0,0-3.33-9.13,17.25,17.25,0,0,0-7.28-6.29q-4.82-2.34-12.46-2.34a51.27,51.27,0,0,0-13.19,1.6,25,25,0,0,0-10.36,5.43,24.49,24.49,0,0,0-6.66,10.48,50.07,50.07,0,0,0-2.35,16.53v79.42H718.3Z"/>
                            <g id="_Group_" data-name="&lt;Group&gt;"><rect id="_Path_" data-name="&lt;Path&gt;" class="path cls-2" x="100.6" width="1.71" height="182.09"/></g>
                            <g id="_Group_2" data-name="&lt;Group&gt;"><rect id="_Path_2" data-name="&lt;Path&gt;" class="path cls-2" x="207.13" width="1.71" height="182.09"/></g>
                            <g id="_Group_3" data-name="&lt;Group&gt;"><rect id="_Path_3" data-name="&lt;Path&gt;" class="path cls-2" x="297.59" width="1.71" height="182.09"/></g>
                            <g id="_Group_4" data-name="&lt;Group&gt;"><rect id="_Path_4" data-name="&lt;Path&gt;" class="path cls-2" x="401.58" width="1.71" height="182.09"/></g>
                            <g id="_Group_5" data-name="&lt;Group&gt;"><rect id="_Path_5" data-name="&lt;Path&gt;" class="path cls-2" x="506.42" width="1.71" height="180.79"/></g>
                            <g id="_Group_6" data-name="&lt;Group&gt;"><rect id="_Path_6" data-name="&lt;Path&gt;" class="path cls-2" x="607.87" width="1.71" height="180.79"/></g>
                            <g id="_Group_7" data-name="&lt;Group&gt;"><rect id="_Path_7" data-name="&lt;Path&gt;" class="path cls-2" x="710.17" width="1.71" height="180.79"/></g></g></g></svg>
                            </a>
                        </div>


                </div>

                <div id="contact-data">
                    <div class="links-holder">
                        <div class="href-link"><a class="social-href" target="blank" href="tel: +40740783488"> <svg class="social-icon link-icon">${phoneIcon}</svg></a>+40 740 783488</div>
                        <div class="href-link"><a class="social-href" target="blank" href="mailto:office@mystarproduction.ro"> <svg class="social-icon link-icon">${mailIcon}</svg></a>&nbsp;office@mystarproduction.ro</div>
                    </div>
                </div>

                <div id="copyright-field">
                &copy; MySTAR Production 2020. All Rights Reserverd.
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
  }


  firstUpdated_not(){
      const letter1 = this.shadowRoot.querySelector('#letter_');
      const letter2 = this.shadowRoot.querySelector('#letter_2');
      const letter3 = this.shadowRoot.querySelector('#letter_3');
      const letter4 = this.shadowRoot.querySelector('#letter_4');
      const letter5 = this.shadowRoot.querySelector('#letter_5');
      const letter6 = this.shadowRoot.querySelector('#letter_6');
      const letter7 = this.shadowRoot.querySelector('#letter_7');
      const letter8 = this.shadowRoot.querySelector('#letter_8');

      setInterval(() => {
        setTimeout(() => {
         letter1.classList.add('path-1');
        },50)
        setTimeout(() => {
          letter2.classList.add('path-1');
        }, 500);
        setTimeout(() => {
          letter3.classList.add('path-1');
        }, 1000);
        setTimeout(() => {
          letter4.classList.add('path-1');
        }, 1500);
        setTimeout(() => {
          letter5.classList.add('path-1');
        }, 2000);
        setTimeout(() => {
          letter6.classList.add('path-1');
        }, 2500);
        setTimeout(() => {
          letter7.classList.add('path-1');
        }, 3000);
        setTimeout(() => {
          letter8.classList.add('path-1');
        }, 3500);
        setTimeout(() => {
          letter1.classList.remove('path-1');
          letter2.classList.remove('path-1');
          letter3.classList.remove('path-1');
          letter4.classList.remove('path-1');
          letter5.classList.remove('path-1');
          letter6.classList.remove('path-1');
          letter7.classList.remove('path-1');
          letter8.classList.remove('path-1');
        }, 5000);
      }, 5100);
  }


 
}

window.customElements.define('footer-component', FooterComponent)

