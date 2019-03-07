import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
<dom-module id="review-rating-styles">
  <template>
    <custom-style>
      <style is="custom-style">
        :host {
          --iron-icon-height: 32px;
          --iron-icon-width: 32px;
          font-size: var(--review-rating-font-size, 16px);
          line-height: var(--review-rating-line-height, 16px);
        }

        .review-container {
          display: block;
          width: 100%;
          font-family: var(--review-rating-font-family, sans-serif);
          text-align: var(--review-rating-text-align, center);
        }

        .feedback-container{
          text-align: left;
        }

        paper-dialog{
          width: var(--review-rating-paper-dialog-width, 80%);
          height: var(--review-rating-paper-dialog-height, 30%);
        }

        paper-dialog span.icon-close {
          display: inline-block;
          background-color: var(--review-rating-paper-dialog-bg-color, #ffffff);
          border: 1px solid var(--review-rating-paper-dialog-border-color, #e5e5e5);
          width: 32px;
          border-radius: 100px;
          cursor: pointer;
          position: absolute;
          right: -15px;
          top: -38px;
        }

        paper-dialog .icon-check { 
          color: var(--review-rating-icon-check-color, #5BA829);
          transform: scale(2);
          text-align: center;
          position: relative;
          top: 45px;
          border: 1px solid #5BAB29;
          border-radius: 100px;
        }

        .message {
          position: relative;
          top: var(--review-rating-message-top, 50px);
          font-size: var(--review-rating-message-font-size, 30px);
          line-height: var(--review-rating-message-line-height, 30px);
          box-sizing: border-box;
          text-align: center;
        }
      
        .check {
          text-align: center;
        }
        
        .rating-container {
          display: flex;
          flex-direction: row-reverse;
          justify-content: center;
        }

        .rating-container > input{
          display:block;
        }

        .rating-container > label {
          position: relative;
          font-size: 40px;
          line-height: 30px;
          color: var(--review-rating-star-icon-color, #FFD700);
          cursor: pointer;
        }
        .rating-container > label::before{
          content: "\u2605";
          position: absolute;
          opacity: 0;
        }

        .sr-only {
          visibility: hidden;
        }
        .rating-container > label:hover:before,
        .rating-container > label:hover ~ label:before {
          opacity: 1 !important;
        }
        .rating-container > input:checked ~ label:before{
          opacity: 1;
        }

        .btn-submit {
          width: var(--review-rating-btn-submit-width,  80px);
          color: var(--review-rating-btn-submit-color, #FFFFFF);
          background-color: var(--review-rating-btn-submit-bg-color, #3f51b5);
        }

        .btn-cancel {
          width: var(--review-rating-btn-cancel-width,  80px);
          color: var(--review-rating-btn-cancel-color, #FFFFFF);
          background-color: var(--review-rating-btn-cancel-bg-color, #9e9e9e);
        }
        
        @media screen and (max-width: 767px) {
          .btn-submit {
            width: 100%;
            margin: 10px 0;
            @apply --mixin-xs-btn-submit;
          }
          .btn-cancel {
            width: 100%;
            margin: 10px 0;
            @apply --mixin-xs-btn-cancel;
          }
        }


      </style>
    </custom-style>
  </template>
</dom-module>
    `;

document.head.appendChild(template.content);
var style = document.createElement('style');
document.head.appendChild(style);
