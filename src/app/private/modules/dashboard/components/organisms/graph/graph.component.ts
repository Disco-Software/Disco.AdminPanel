import { Component, Input, OnInit } from '@angular/core';
import { GraphSettings } from '@core/models';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() graphSettings: GraphSettings;

  data: any;

  options: any;

  ngOnInit() {
    this.data = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          backgroundColor: (context) => {
            if (!context.chart.chartArea) {
              return
            }

            const { ctx, data, chartArea: { top, bottom } } = context.chart
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
            gradientBg.addColorStop(1, this.graphSettings.color[0])
            gradientBg.addColorStop(0, this.graphSettings.color[1])
            return gradientBg;
          },
          hoverBackgroundColor: this.graphSettings.hoverColor,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
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
          events: ['click'],
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
            size: '20px',
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
    };
  }
}
