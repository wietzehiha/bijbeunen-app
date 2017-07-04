import { Component } from "@angular/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  input = {}
  logForm() {
    console.log(this.input)
  }

}
