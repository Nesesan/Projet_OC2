import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { ECElementEvent } from 'echarts';
import {CallbackDataParams} from "echarts/types/dist/shared";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public isLoading$: Observable<boolean> | undefined;
  public errorMessage$: Observable<string | null> | undefined;

  pieChartOptions!: EChartsOption;

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    this.isLoading$ = this.olympicService.getLoadingStatus();
    this.errorMessage$ = this.olympicService.getErrorMessage();
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe((olympics) => {
      if (olympics) {
        this.initializePieChart(olympics);
      }
    });

    this.olympicService.loadInitialData().subscribe();
  }

  initializePieChart(olympics: Olympic[]): void {
    const medalDistribution = olympics.map((country) => ({
      name: country.country,
      value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0),
    }));

    const colors = ['#876065', '#bccae5', '#8fa0d8', '#6b3f53', '#907f9e'];

    this.pieChartOptions = {
      tooltip: {
        trigger: 'item',
        backgroundColor: '#4e828e',
        borderColor: '#4e828e',
        textStyle: { color: 'white', fontSize: 20 },
        formatter: function (params: CallbackDataParams | CallbackDataParams[]) {
          if (Array.isArray(params)) {
            const param = params[0];
            return `${param.name} <br/> <img src="assets/medaille.png" alt="medal" style="width: 24px; height: 24px; vertical-align: middle;" /> ${param.value}`;
          }

          return `
                  ${params.name} <br/> <img src="assets/medaille.png" alt="medal" style="width: 24px; height: 24px; vertical-align: middle;" />${params.value}`;
        },
      },
      series: [
        {
          name: 'Total Medals',
          type: 'pie',
          radius: '90%',
          data: medalDistribution,
          color: colors,
          label: { show: true, fontSize: 30 },
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
    return new Set(olympics.flatMap((c) => c.participations.map((p) => p.year))).size;
  }

  onChartClick(event: ECElementEvent): void {
    const countryName = event.name; // ✅ Type correct
    if (countryName) {
      this.router.navigate(['/details', countryName]);
    }
  }
}
