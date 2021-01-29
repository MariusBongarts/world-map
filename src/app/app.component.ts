import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from './shared/services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'world-map';

  @ViewChild('drawer')
  private drawerRef!: MatDrawer;

  constructor(private drawerService: DrawerService) {

  }

  public ngAfterViewInit() {
    this.drawerService.init(this.drawerRef);
  }


}
