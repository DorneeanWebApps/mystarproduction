/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

// These are the shared styles needed by this element.
import './my-parallax-left';
import './my-parallax-right';
import './my-article';
import './slider-component';
import './gallery-component';
import './grafic-component';
import './mobile-partners-component'

import './audio-preview';
import './video-preview';

import './testimonials-section';


import {locatii, videoclipuri, aftermovie, promo, chroma} from '../app-data/video-thumbnails';
import { pictures } from '../app-data/gallery'

class MyView1 extends PageViewElement {
  static get styles() {
    return [
      css`
      .spacer{
        height:100vh;
      }

      .section-presentation{
        padding-top: 75px;
        display: block;
        width: 1170px;
        text-align: center;
        margin: 0 auto;
      }

      .section-presentation>p{
        font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          color: #9e9e9e;
          margin: 6px 0;
          transition: all .3s ease-out;
      }

      .section-presentation:hover>p{
        color: #fff;

      }

      @media (min-width: 1024px) {
        footer-component,
        mobile-partners-component{
          display: none;
        }
      }

      @media (max-width: 460px) {
      .section-presentation{
        display: none;
      }
      }

      
      `
    ];
  }

  render() {
    return html`
        <my-parallax-left @element-positioned="${(e)=>{this.elements = [...this.elements,e.detail]; this.requestUpdate()}}" .selectedLink=${this.selectedLink} .linkIndex="${1}" .data="${this.videoParallax}"></my-parallax-left>

        <my-article .data="${this.videoArticle}"></my-article>

        <video-preview .data="${this.videoPreviews}"></video-preview>

        <my-parallax-right @element-positioned="${(e)=>{this.elements = [...this.elements,e.detail]; this.requestUpdate()}}" .selectedLink=${this.selectedLink} .linkIndex="${2}" opacity="0" .data="${this.audioParallax}"></my-parallax-right>
        <div class="section-presentation">
          <p>Multi avem aparatura buna. Foarte putini stim sa o folosim astfel incat dintr-o voce buna si instrumentisti buni sa obtinem o inregistrare exceptionala.</p>
          <p>Avem ce trebuie si stim sa folosim ce avem. Rezultatul e firesc: inregistrari exceptionale, procesate corect, astfel incat produsul final sa fie de calitatea dorita.</p>
          <p>In cei 16 ani de experienta am invatat sa facem asta. Lucram repede si bine la preturi corecte.</p>
          <p>Ascuta demo-urile noastre si contacteaza-ne!</p>

        </div>

        <my-article .data="${this.audioArticle}"></my-article>

        <audio-preview></audio-preview>

        <my-parallax-left @element-positioned="${(e)=>{this.elements = [...this.elements,e.detail]; this.requestUpdate()}}" .data="${this.fotoParallax}" .linkIndex="${3}" .selectedLink=${this.selectedLink}></my-parallax-left>

        <gallery-component .gallery = ${pictures}></gallery-component>

        <my-parallax-right @element-positioned="${(e)=>{this.elements = [...this.elements,e.detail]; this.requestUpdate()}}" .selectedLink=${this.selectedLink} .linkIndex="${4}" opacity="0" .data="${this.graficParallax}"></my-parallax-right>

        <my-article .data="${this.graficArticle}"></my-article>

        <grafic-component></grafic-component>

        <testimonials-section></testimonials-section>

        <mobile-partners-component></mobile-partners-component>

        <footer-component></footer-component>


    `;
  }

  static get properties() {
    return {
        videoParallax: Object,
        audioParallax: Object,
        videoPreviews: Array,
        selectedLink: Number,
        elements: Array
    };
  }

  constructor() {
    super();
    setPassiveTouchGestures(true);
    this.videoParallax={
      title:"Productie VIDEO",
      text: "Detinem aparatura performanta si stim sa o folosim foarte bine. Acordam o atentie deosebita postproductiei. Lucram repede si bine, la preturi corecte.",
      image: "images/parallaxv",
      logo: "images/logov.jpg",
      alt: "MySTAR productie video"
    }

    this.audioParallax={
      title:"Productie AUDIO",
      text: "Inregistrare proceare voci si instrumentale, mix, master, colaje si mix-uri pentru instrumentisti, vocalisti si dansatori",
      image: "images/parallaxa",
      logo: "images/logoa.jpg",
      alt: "MySTAR productie audio"
    }

    this.fotoParallax={
      title:"Continut FOTO",
      text: "Sedinte foto, prezentare produs, locatie, corporate, fotografie suprarealista.",
      image: "images/parallaxf",
      logo: "images/logof.jpg",
      alt: "MySTAR continut foto"
    }

    this.graficParallax={
      title:"Editare GRAFICA",
      text: "Afise, flyere, social media, grafica video.",
      image: "images/parallaxg",
      logo: "images/logog.jpg",
      alt: "MySTAR productie grafica"
    }

    this.videoArticle={
      title: "Filmam foarte bine si procesam exceptional",
      listItems: [
        "Prezentari locatii (hoteluri, pensiuni, restaurante, complexe de agrement, etc)",
        "Imobiliare (filme de prezentare ale imobilelor in vederea vanzarii sau inchirierii)",
        "Videoclipuri muzicale (inclusiv low cost)",
        "Promo & AfterMovie (produse, evenimente, manifestari)",
        "Filmari cu drona",
        "Filmari chroma key (filmari in care fundalul este inlocuit cu un decor virtual)",
        "Corporate (evenimente publice sau private)",
        "Petreceri private (nunti, botezuri, majorate, diferite evenimente)"
      ],
      image:"images/videosmall",
      alt: "filmari MySTAR Production"
    }

    this.audioArticle={
      title: "Inregistram, corectam si procesam ireprosabil",
      listItems: [
        "Productie de la zero la produs final",
        "Inregistrari voci & instrumente",
        "Procesare voci & instrumente",
        "Aranjament orchestral",
        "Mix",
        "Master",
        "Colaje pentru vocalisti, instrumentisti, dansatori"
      ],
      image:"images/audiosmall",
      alt: "studio inregistrari MySTAR Production"
    }


    this.graficArticle={
      title: "Desenam, coloram, editam si procesam",
      listItems: [
        "Afise",
        "Flyere",
        "Kituri Social media",
        "Identitate visuala (parteneri)",
        "Grafica video",
        "Web design (parteneri)",
      ],
      image:"images/graficasmall",
      alt: "grafica MySTAR Production"
    }
    this.elements = [];
    this.videoPreviews = [locatii, videoclipuri, aftermovie, promo, chroma]
    
  
  }

  updated(changedProps){
    if(changedProps.has('elements')&&this.elements.length>0){
      this.dispatchEvent(new CustomEvent('elements-defined', { detail: this.elements, bubbles: true, composed: true }))
    }
  }

  scrollElement(detail){
    this.dispatchEvent(new CustomEvent('must-scroll', { detail, bubbles: true, composed: true }));
  }


  
}

window.customElements.define('my-view1', MyView1);
