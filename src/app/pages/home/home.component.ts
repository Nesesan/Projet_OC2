import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import {Participation} from "../../core/models/Participation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);

  pieChartOptions: any;
  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();


    this.olympics$.subscribe((olympics) => {
      if (olympics) {
        this.initializePieChart(olympics);
      }
    });
  }

  initializePieChart(olympics: Olympic[]): void {

    const medalDistribution = olympics.map((country) => {
      const totalMedals = country.participations.reduce(
        (sum, participation) => sum + participation.medalsCount,
        0
      );
      return { name: country.country, value: totalMedals };
    });

    const colors = ['#876065', '#bccae5', '#8fa0d8', '#6b3f53', '#907f9e'];


    this.pieChartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ',
      },
      series: [
        {
          name: 'Total Medals',
          type: 'pie',
          radius: '90%',
          data: medalDistribution,
          color: colors,
          label: {
            show: true,
            fontSize:30,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

  }
  getOlympicGamesCount(olympics: Olympic[]): number {
    const olympicYears = new Set<number>();

    olympics.forEach((country: Olympic) => {
      country.participations.forEach((participation: Participation) => {
        olympicYears.add(participation.year);
      });
    });

    return olympicYears.size;
  }

  onChartClick(event: any): void {
    const countryName = event.name;
    this.router.navigate(['/details', countryName]);
  }
}
