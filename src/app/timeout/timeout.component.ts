
import {
    Input,
    Component,
    ViewEncapsulation,
    OnInit,
    ElementRef,
    Output,
    EventEmitter, ViewChild
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'timeout-notification',
    templateUrl: './timeout.component.html',
    styleUrls: ['./timeout.component.css']
})

export class TimeoutComponent implements OnInit {
    @Input() duration: number;
    @Input() timeoutmessage: string;
    @Input() successurl: any;
    @Input() cancelurl: any;
    @Output() newEvent = new EventEmitter<string>();
    public IDLE_TIMEOUT: number;
    public _idleSecondsCounter: number = 0;
    public myInterval: any;
    public timeOutFlag: boolean = false;
    public closeResult: string;
    public btnCancelText: string = " Cancel";
    public btnOkText: string = "Ok"
    @ViewChild('timeout') timeout: ElementRef;
    constructor(private modalService: NgbModal) {

        document.addEventListener('keyup', () => {
            this._idleSecondsCounter = 0;
        });
        document.addEventListener('mousemove', () => {
            this._idleSecondsCounter = 0;
        });
        document.addEventListener('keypress', () => {
            this._idleSecondsCounter = 0;
        });
        document.addEventListener('click', () => {
            this._idleSecondsCounter = 0;
        });
        document.addEventListener('mousewheel', () => {
            this._idleSecondsCounter = 0;
        });
    }

    ngOnInit() {
        this.IDLE_TIMEOUT = this.duration;
        setInterval(() => {
            this.CheckIdleTime();
            console.log(this._idleSecondsCounter);
        }, 1000);
    }
    /* *
     * Represents a openVerticallyCentered.
     *  @param {content} content - The content  is the Reference of session timeout modal.
     * it will open the session timeout modal
     */
    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true });

    }
    /* *
     * Represents a CheckIdleTime.
     * Check Inactive Time Interval and Trigger the session timeout modal
     */
    CheckIdleTime() {
        this._idleSecondsCounter++;
        if (this._idleSecondsCounter == this.IDLE_TIMEOUT) {
            window.clearInterval(this.myInterval);
            this.openVerticallyCentered(this.timeout);

        }
    }
    /* *
     * Represents a close.
     * @param {ElementRef} id - An id  is the Reference of cross mark.
     * Close The Session  Timeout modal when click event trigger on cross mark
     */
    close(id) {
        this.modalService.dismissAll(id);
        this._idleSecondsCounter = 0;

    }
    /* *
     * Represents a accept.
     * Redirect to 
     */
    accept() {
        console.log(window.location.href);
        console.log(this.successurl);
        window.location.href = this.successurl;
    }
    /* *
     * Represents a decline.
     * Redirect to 
     */
    decline() {
        console.log(window.location.href);
        console.log(this.cancelurl);
        window.location.href = this.cancelurl;
    }
}