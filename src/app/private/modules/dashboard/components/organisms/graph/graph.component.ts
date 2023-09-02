import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { GraphSettings } from '@core/models';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {
  @Input() height = 250
  @Input() graphSettings: GraphSettings;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  labels = ['1', '2', '3', '4', '5', '6', '7']
  originalGradient
  subPerf

  createGradientColor(ctx, colors) {
    const gradientBg = ctx.createLinearGradient(0, 0, 0, 400)
    gradientBg.addColorStop(1, colors[1])
    gradientBg.addColorStop(0, colors[0])
    return gradientBg
  }

  setBackgroundColor(ctx): string[] {
    let res = []
    const gradientBg = this.createGradientColor(ctx, this.graphSettings.color)
    this.originalGradient = gradientBg
    for (let i = 0; i < this.labels.length; i++) {
      res = [...res, gradientBg]
    }
    return res
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.subPerf = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.setBackgroundColor(this.ctx),
            hoverBackgroundColor: this.graphSettings.hoverColor,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
      options: {
        onClick: () => {
          var element = this.subPerf.getActiveElements()


          for (let i = 0; i < this.labels.length; i++) {
            this.subPerf.data.datasets[0].backgroundColor[i] = this.originalGradient
          }
          const clickGradient = this.createGradientColor(this.ctx, this.graphSettings.clickColor)
          if (element.length > 0) {
            this.subPerf.data.datasets[0].backgroundColor[element[0].index] = clickGradient

          }
          this.subPerf.update()
          // handle hover
        },
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            // make tooltip on click
            bodyFont: {
              size: 24
            },
            padding: {
              left: 20,
              right: 20,
              top: 0,
              bottom: 0
            },
            displayColors: false,
            yAlign: 'bottom',
            backgroundColor: 'rgba(194, 125, 41, 1)',
            callbacks: {
              title: function (tooltipItem) {
                return '';
              },
              label: function (tooltipItem) {
                var tooltipText = '';
                if (tooltipItem.dataset.data[tooltipItem.dataIndex] != null)
                  tooltipText = tooltipItem.dataset.data[tooltipItem.dataIndex]!.toString();
                return tooltipText;
              }
            }
          },
          title: {
            display: true,
            text: this.graphSettings.title,
            color: '#fff',
            font: {
              weight: 'normal',
              size: 20,
            }
          }
        },
        scales: {
          y: {
            display: false,
            border: {
              display: false
            },
          },
          x: {
            ticks: {
              color: "white",
              font: {
                size: 16,
              },
              padding: 10
            },
            grid: {
              display: true,
            },
            border: {
              display: true,
              color: 'white',
              width: 2,
              z: 1
            }
          },
        }
      }
    });
  }
}
