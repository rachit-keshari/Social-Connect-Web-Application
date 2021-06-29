import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, OnChanges, ViewChild, TemplateRef, NgModule, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Chart } from 'chart.js';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-covid-info',
  templateUrl: './covid-info.component.html',
  styleUrls: ['./covid-info.component.css']
})
export class CovidInfoComponent implements OnInit, OnDestroy {

  myControl = new FormControl();
  selectedOption: string = '';

  country = {
    Country: "Global",
    NewConfirmed: 136532,
    TotalConfirmed: 175651866,
    NewDeaths: 3472,
    TotalDeaths: 3798026,
    NewRecovered: 236414,
    TotalRecovered: 113892535,
    Date: "2021-06-14T06:17:45.975Z"
  }

  covidInfo = {
    Global: {
      NewConfirmed: 136532,
      TotalConfirmed: 175651866,
      NewDeaths: 3472,
      TotalDeaths: 3798026,
      NewRecovered: 236414,
      TotalRecovered: 113892535,
      Date: "2021-06-14T06:17:45.975Z"
    },
    Countries: [
      {
        ID: "3a92bf7f-5063-40c4-9bdc-57c873c6aece",
        Country: "Afghanistan",
        CountryCode: "AF",
        Slug: "afghanistan",
        NewConfirmed: 0,
        TotalConfirmed: 89861,
        NewDeaths: 0,
        TotalDeaths: 3527,
        NewRecovered: 0,
        TotalRecovered: 61410,
        Date: "2021-06-14T06:17:45.975Z",
      },]
  }

  barChartData = {
    type: 'bar',
    data: {
      labels: ['New Confirmed', 'Total Confirmed', 'New Deaths', 'Total Deaths', 'New Recovered', 'Total Recovered'],
      datasets: [{
        label: this.country.Country + ':Covid-19 Data',
        data: [this.country.NewConfirmed,
        this.country.TotalConfirmed,
        this.country.NewDeaths,
        this.country.TotalDeaths,
        this.country.NewRecovered,
        this.country.TotalRecovered],
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
      }
    }
  }

  doughnutChartData = {
    type: 'doughnut',
    data: {
      labels: ['New Confirmed', 'Total Confirmed', 'New Deaths', 'Total Deaths', 'New Recovered', 'Total Recovered'],
      datasets: [{
        label: this.country.Country + ':Covid-19 Data',
        data: [this.country.NewConfirmed,
        this.country.TotalConfirmed,
        this.country.NewDeaths,
        this.country.TotalDeaths,
        this.country.NewRecovered,
        this.country.TotalRecovered],
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
      }
    }
  }

  mediaSub!: Subscription;
  findLocDy: any;
  findLocTextDy: any;
  locValDy: any;
  covValDy: any;
  selectSizeDy: any;
  chartDy: any;

  constructor(public loginService: LoginService,
    public userService: UserService,
    private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.userService.getCovidInfo().subscribe(
      (data: any) => {
        this.covidInfo = data;
      }, (error) => { console.log(error); }
    );

    var barChartData = {
      type: 'bar',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered',],
        datasets: [{
          label: this.country.Country + ':Covid-19 Data',
          data: [this.country.NewConfirmed,
          this.country.NewDeaths,
          this.country.NewRecovered,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',

          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
        }
      }
    }

    var doughnutChartData = {
      type: 'doughnut',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered',],
        datasets: [{
          label: this.country.Country + ':Covid-19 Data',
          data: [this.country.NewConfirmed,
          this.country.NewDeaths,
          this.country.NewRecovered,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',

          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,

        }]
      },
      options: {
        scales: {
        }
      }
    }

    var myChart1 = new Chart("barChart", barChartData);
    var myChart2 = new Chart("doughnutChart", doughnutChartData);


    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.findLocDy = {
            'width.px': 340, 'margin': '0 auto',
            'text-align': 'center', 'color': 'black'
          };
        }
        else if (change.mqAlias == 'sm') {
          this.findLocDy = {
            'width.px': 620, 'margin': '0 auto',
            'text-align': 'center', 'color': 'black'
          };
        }
        else if (change.mqAlias == 'lg') { this.findLocDy = { 'text-align': 'center', 'color': 'black' }; }

        if (change.mqAlias == 'xs') {
          this.findLocTextDy = {
            'width.px': 340, 'margin': '0 auto',
            'text-align': 'center'
          };
        }
        else if (change.mqAlias == 'lg') { this.findLocTextDy = { 'text-align': 'center' }; }

        if (change.mqAlias == 'xs') {
          this.locValDy = {
            'width.px': 340, 'margin': '0 auto',
            'text-align': 'center'
          };
        }
        else if (change.mqAlias == 'sm') {
          this.locValDy = {
            'width.px': 620, 'margin': '0 auto',
            'text-align': 'center'
          };
        }
        else if (change.mqAlias == 'lg') { this.locValDy = {}; }

        if (change.mqAlias == 'xs') { this.covValDy = { 'width.px': 340, 'height.px': 280, 'margin': '0 auto', 'text-align': 'center' }; }
        else if (change.mqAlias == 'sm') { this.covValDy = { 'width.px': 300, 'height.px': 280, 'margin': '0 auto', 'text-align': 'center' }; }
        else if (change.mqAlias == 'lg') {
          this.covValDy = {
            'margin.px': 10, 'width.px': 410,
            'height.px': 310
          };
        }

        if (change.mqAlias == 'xs') { this.selectSizeDy = { 'width.px': 320, 'margin': '0 auto' }; }
        else if (change.mqAlias == 'lg') { this.selectSizeDy = { 'width.px': 320, 'margin': '0 auto' }; }

        if (change.mqAlias == 'xs') { this.chartDy = { 'width.px': 280, 'height.px': 320, 'margin': '0 auto' }; }
        else if (change.mqAlias == 'sm') { this.chartDy = { 'width.px': 320, 'height.px': 300, 'margin': '0 auto' }; }
        else if (change.mqAlias == 'lg') { this.chartDy = { 'width.px': 400, 'height.px': 300 }; }
      }
    );

  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

  flagOnce:boolean=true;


  ngOnChanges(): void {
    if(this.flagOnce==true){ this.flagOnce=false;
      this.country.Country = this.covidInfo.Countries[0].Country;
        this.country.NewConfirmed = this.covidInfo.Countries[0].NewConfirmed;
        this.country.TotalConfirmed = this.covidInfo.Countries[0].TotalConfirmed;
        this.country.NewDeaths = this.covidInfo.Countries[0].NewDeaths;
        this.country.TotalDeaths = this.covidInfo.Countries[0].TotalDeaths;
        this.country.NewRecovered = this.covidInfo.Countries[0].NewRecovered;
        this.country.TotalRecovered = this.covidInfo.Countries[0].TotalRecovered;
        this.country.Date = this.covidInfo.Countries[0].Date;
    }
    var barChartData = {
      type: 'bar',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered',],
        datasets: [{
          label: this.country.Country + ':Covid-19 Data',
          data: [this.country.NewConfirmed,
          this.country.NewDeaths,
          this.country.NewRecovered,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',

          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
        }
      }
    }

    var doughnutChartData = {
      type: 'doughnut',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered',],
        datasets: [{
          label: this.country.Country + ':Covid-19 Data',
          data: [this.country.NewConfirmed,
          this.country.NewDeaths,
          this.country.NewRecovered,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',

          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
        }
      }
    }

    var myChart1 = new Chart("barChart", barChartData);
    var myChart2 = new Chart("doughnutChart", doughnutChartData);
    myChart1.render();
    myChart2.render();

  }

  selectOptionClick() {
    for (let c in this.covidInfo.Countries) {
      if (this.covidInfo.Countries[c].Country == this.selectedOption) {
        this.country.Country = this.covidInfo.Countries[c].Country;
        this.country.NewConfirmed = this.covidInfo.Countries[c].NewConfirmed;
        this.country.TotalConfirmed = this.covidInfo.Countries[c].TotalConfirmed;
        this.country.NewDeaths = this.covidInfo.Countries[c].NewDeaths;
        this.country.TotalDeaths = this.covidInfo.Countries[c].TotalDeaths;
        this.country.NewRecovered = this.covidInfo.Countries[c].NewRecovered;
        this.country.TotalRecovered = this.covidInfo.Countries[c].TotalRecovered;
        this.country.Date = this.covidInfo.Countries[c].Date;
        this.ngOnChanges();
        console.log(this.country);
        break;
      }
    }
  }

}
