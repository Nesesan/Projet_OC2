import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Olympic} from "../../core/models/Olympic";
import {take} from "rxjs";
import {NgxEchartsDirective} from "ngx-echarts";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  countryName: string = '';
  countryData: Olympic | null = null;
  medalDistribution: {year: number, medals: number}[] = [];
  lineChartOption: any;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute) {}

ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('country') || '';

  this.olympicService.getOlympics().pipe(take(1)).subscribe((olympics: Olympic[] | null ) => {
    const country = olympics?.find((c) => c.country === this.countryName);
    if (country) {
      this.countryData = country;
      this.initializeChartData(country);  // Initialiser les données du graphique
    }
  });
}
  initializeChartData(country: Olympic): void {
    const participationData = country.participations.map((participation) => ({
      year: participation.year,
      medals: participation.medalsCount,
    }));

    this.medalDistribution = participationData;

    this.lineChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'transparent',
          },
        },
      },
      xAxis: {
        name: 'Years',
        type: 'category',
        data: participationData.map((data) => data.year),
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Medals',
          type: 'line',
          data: participationData.map((data)=>data.medals),
          smooth: false,
          lineStyle: {
            color: 'black',
          },
          areaStyle: {
            color: 'white',
          },
        },
      ],
    };
}

  goBack() {
    this.router.navigate(['/']);
  }

  getTotalMedals(): number {
    return this.countryData?.participations.reduce((sum, participation) => sum + participation.medalsCount, 0) || 0 ;
  }

  getTotalAthletes(): number {
    return this.countryData?.participations.reduce((sum, participation) => sum + participation.athleteCount, 0) || 0;
  }

  getTotalParticipations(): number {
    return this.countryData?.participations.length || 0;
  }
}
