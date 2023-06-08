import { Component } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  template: `
    <app-sidebar-cmp />
  `
})
export class StandaloneComponent {

}
