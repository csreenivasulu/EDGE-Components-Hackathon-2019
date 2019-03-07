import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';
import '@polymer/neon-animation/neon-animations.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import './review-rating-styles.js';


/**
 * `review-rating`
 * A simple review-rating component using polymer 3.0 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ReviewRating extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="review-rating-styles"></style>

      <div class="review-container">
        <div class="rating-container" >
          <template is="dom-repeat" items="{{ratings}}">
            <input type="radio" 
              class="sr-only"
              name="rating" 
              value="[[item.value]]" 
              id="star_[[item.id]]" 
              checked="{{item.checked::tap}}">
              <label for$=star_[[item.id]] id="label_[[item.id]]">☆</label>
              <paper-tooltip for$="label_[[item.id]]p">
                <slot name="slot-[[item.id]]"></slot>
              </paper-tooltip>
            </template>
        </div>

        <div class="feedback-container">
          <template is="dom-if" if="[[isFeedbackAvailable]]">
            <paper-textarea 
              label="[[label]]" 
              char-counter 
              maxlength="[[maxFeedbackLength]]" 
              value="{{feedbackText}}">
            </paper-textarea>
          </template>
        </div>

        <template is="dom-if" if="[[isFeedbackAvailable]]">
          <paper-button raised 
            class="btn-submit" 
            on-tap="openDialog">
            [[localize('submitBtnText')]]
          </paper-button>
          <paper-button raised 
            class="btn-cancel" 
            on-tap="resetRating">
            [[localize('resetBtnText')]]
          </paper-button>
        </template>
      </div>

      <paper-dialog id="dialog" 
        modal 
        entry-animation="scale-up-animation" 
        exit-animation="scale-down-animation" 
        with-backdrop>
          <span class="icon-close no-padding">
            <iron-icon icon="close" 
            on-tap="closeDialog"></iron-icon>
          </span>
          <div class="check">
            <iron-icon class="icon-check" icon="check"></iron-icon>
          </div>
          <div class="message">
            [[localize('successMessage')]]
          </div>
      </paper-dialog>
    `;
  }

  static get properties() {
    return {
      ratings : {
        type: Array,
        value: () => {
          return [
              { 'id': 5, 'checked': false, 'value': '5'},
              { 'id': 4, 'checked': false, 'value': '4'},
              { 'id': 3, 'checked': false, 'value': '3'},
              { 'id': 2, 'checked': false, 'value': '2'},
              { 'id': 1, 'checked': false, 'value': '1'}
          ];
        }
      },
      currentRating: {
        type: Number,
        value: 0,
        notify: true
      },
      isFeedbackAvailable: {
        type: Boolean,
        value: false
      },
      label:String,
      feedbackText: String,
      maxFeedbackLength: {
        type: Number,
        value: 150
      },
      genericEvent: {
        type: Object,
        value: { bubbles: true, composed: true }
      },
      language: {
        type: String,
        value: 'en'
      },
      resources: {
        type: Object,
        value:() =>  ({
          'en': {
            'successMessage': 'Thanks for your feedback',
            'submitBtnText' : 'Submit your feedback',
            'resetBtnText': 'Reset'
          }
        })
      }
    };
  }

  static get observers() {
    return ['_ratingsChanged(ratings.*)'] ;
  }

  _ratingsChanged(changeRecord) {
    for(let item in this.ratings) {
      this.ratings[item].checked = false;
    }
    let pattern = /\d+/;
    let placeHolder = pattern.exec(changeRecord.path);
    if(placeHolder && placeHolder.length > 0) {
      this.ratings[placeHolder[0]].checked = true;
      this.currentRating = this.ratings[placeHolder[0]].value;
      this.isFeedbackAvailable = true;
    }
  }

  static get is() {
    return 'review-rating';
  }
  
  openDialog() {
    this.$.dialog.opened=true;
    const {currentRating, feedbackText} = this;
    const detail = {currentRating, feedbackText};
    this.dispatchEvent(new CustomEvent('feedback-submitted', {detail}, this.genericEvent));
  }
  
  closeDialog() {
    this.$.dialog.opened=false;
  }

  resetRating() {
    if(this.currentRating){
      let path;
      let ratings = [];
      for(let item in this.ratings) {
        ratings[item] = this.ratings[item];
        if(ratings[item].checked){
          ratings[item].checked = false;
          path = `ratings.${item}.checked`;
        }
      }
      this.notifyPath(path);
      this.set('ratings', ratings);
      
      this.currentRating = 0;
      this.feedbackText = '';
      this.isFeedbackAvailable = false;
    }
  }
}

window.customElements.define(ReviewRating.is, ReviewRating);
