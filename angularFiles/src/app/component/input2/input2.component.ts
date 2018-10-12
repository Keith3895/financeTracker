import { Component, forwardRef, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Input2Component),
    multi: true
};

@Component({
    selector: 'app-input2',
    templateUrl: './input2.component.html',
    styleUrls: ['./input2.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]

})
export class Input2Component implements ControlValueAccessor {
    @Input() placeholder;
    @Input() required: any;
    @Input() error: any;
    @Input() type: any;
    @Input() errorToggle;
    @Input() id;
    @ViewChild('input') nativeElement: ElementRef;
    @Output() el: ElementRef;
    @Output() keyups: EventEmitter<any> = new EventEmitter();
    constructor() { }
    //The internal data model
    private innerValue: any = '';
    showError;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }
    onKeyup(event) {
        this.keyups.emit(event);
        if(this.errorToggle)
            if (this.errorToggle.status === 'INVALID' || this.errorToggle.value === '') {
                this.showError = true;
            } else {
                this.showError = false;
            }
    }
    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


}
