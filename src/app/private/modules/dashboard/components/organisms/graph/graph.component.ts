import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {GraphSettings} from '@core/models';
import * as Chart from 'chart.js'; // Використовуємо * as Chart для імпорту Chart.js

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnChanges {
  @Input() height = 250;
  @Input() graphSettings: GraphSettings;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  subPerf;


  ngAfterViewInit() {
    this.createGraph()
  }

  createGraph() {
    if (this.mychart) {
      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.subPerf = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: this.createLabels(this.graphSettings?.data),
          datasets: [
            {
              backgroundColor: this.createGradientColor(this.ctx, this.graphSettings.color, 200),
              hoverBackgroundColor: this.createGradientColor(this.ctx, this.graphSettings.hoverColor, 400),
              data: this.graphSettings?.data,
            },
          ],
        },
        options: {
          events: ['click'],
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          legend: {
            display: false,
          },
          tooltips: {
            bodyFontSize: 24,
            bodySpacing: 0,
            displayColors: false,
            yPadding: 5,
            xPadding: 20,
            titleAlign: 'center',
            bodyAlign: 'center',
            cornerRadius: 2,
            yAlign: 'bottom',
            backgroundColor: 'rgba(194, 125, 41, 1)',
            callbacks: {
              title: function (tooltipItem) {
                return '';
              },
              label: function (tooltipItem) {
                let tooltipText = '';
                if (tooltipItem.yLabel !== null) {
                  tooltipText = tooltipItem.yLabel.toString();
                }
                return tooltipText;
              },
            },
          },
          title: {
            display: true,
            text: this.graphSettings.title,
            fontColor: '#fff',
            fontSize: 20,

          },
          scales: {
            yAxes: [
              {
                display: false,
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  drawOnChartArea: false,
                  display: false
                }
              },
            ],
            xAxes: [
              {

                ticks: {
                  fontColor: 'white',
                  fontSize: 16,
                  padding: 10,
                },
                gridLines: {
                  drawTicks: false,
                  drawOnChartArea: false,
                  display: true,
                  color: 'white',
                  lineWidth: 2,
                  z: 1,
                },
              },
            ],
          },
        },
      });
    }
  }

  createGradientColor(ctx, colors, percent) {
    const gradientBg = ctx.createLinearGradient(0, 0, 0, percent);
    gradientBg.addColorStop(1, colors[1]);
    gradientBg.addColorStop(0, colors[0]);

    return gradientBg;
  }

  createLabels(data: number[]): number[] {
    const result = []
    for (let i = 1; i <= data?.length; i++) {
      result.push(i);
    }
    return result
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createGraph()
  }
}
