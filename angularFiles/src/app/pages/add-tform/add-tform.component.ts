
import { DatepickerOptions } from '../../component/ng-datepicker/component/ng-datepicker.component';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import { ElementRef, NgZone, OnInit, ViewChild, Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
declare var google: any;
@Component({
  selector: 'app-add-tform',
  templateUrl: './add-tform.component.html',
  styleUrls: ['./add-tform.component.scss']
})
export class AddTformComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  @Output() close = new EventEmitter();
  bankAccount = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
    'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
    'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
    'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
    'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
    'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros'];
  date: Date = new Date();
  options: DatepickerOptions = {
    locale: enLocale
  };
  type;
  categoryList = [
    'investment',
    'food',
    'entertainment',
    'fuel',
    'emi',
    'medical',
    'travel',
    'groceries',
    'shopping'
  ];
  showMap = false;
  acc;
  overide = false;
  categorySelected="";
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {

  }
  locationLogic() {
    if (this.showMap) {
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      this.setCurrentPosition();
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  /**
   * method is called on click of event on the map. we use the lat long values.
   * @param $event click event data
   */
  placeMarker($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
  /**
   *  This method is called when form is submitted.
   * @param addTrans: ngForm object
   */
  addTransaction(addTrans) {
    if (addTrans.valid && this.validateForm(addTrans)) {
      // call the service.
      let sendObject = addTrans.value;
      if (addTrans.value.showMap) {
        sendObject.geoLocation = {
          address: addTrans.address,
          latitude: this.latitude,
          longitude: this.longitude
        }
      }
      console.log(sendObject);
      this.close.emit(false); // false value is to close the modal.
    }
  }
  /**
   * 
   * This method is called to validate the form.
   * 
   * @param addTrans :ngForm Object.
   */
  validateForm(addTrans) {
    if (!addTrans.valid)
      return addTrans.valid;
    if (typeof addTrans.value.type == 'string')
      if (addTrans.value.type.length <= 0)
        return false;
    if (addTrans.value.Amount <= 0)
      return false;
    if (!addTrans.value.acc)
      return false;
    else {
      if (addTrans.value.acc.length <= 0)
        return false;
    }
    if (addTrans.value.overide) {
      if (addTrans.value.balance <= 0)
        return false;
    }
    if (addTrans.value.showMap) {
      if (!this.latitude || !this.longitude)
        return false;
    }
    if (this.categorySelected.length <= 0)
      return false;
    return true;
  }
}
