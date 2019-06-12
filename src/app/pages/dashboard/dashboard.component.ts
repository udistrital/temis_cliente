import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { NbAccessChecker } from '@nebular/security';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { CoreModule } from '../../@core/core.module';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  create: boolean;
  view: boolean;
  delete: boolean;
  edit: boolean;

  private alive = true;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.lightCard,
          type: 'warning',
        },
        {
          ...this.rollerShadesCard,
          type: 'primary',
        },
        {
          ...this.wirelessAudioCard,
          type: 'danger',
        },
        {
          ...this.coffeeMakerCard,
          type: 'secondary',
        },
      ],
    };

  constructor(private themeService: NbThemeService,
    public accessChecker: NbAccessChecker,
    public roleProvider: NbRoleProvider) {

    this.get_access_rights()

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  get_access_rights() {
    let roles

    this.roleProvider.getRole().subscribe(res => {
      roles = res
      console.log(typeof res, res)
    })

    this.accessChecker.isGranted('create', roles).subscribe(res => {
      this.create = res
      console.log(res)
    })

    this.accessChecker.isGranted('view', roles).subscribe(res => {
      this.view = res
      console.log(res)
    })

    this.accessChecker.isGranted('edit', roles).subscribe(res => {
      this.edit = res
      console.log(res)
    })

    this.accessChecker.isGranted('delete', roles).subscribe(res => {
      this.delete = res
      console.log(res)
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
