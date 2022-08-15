"use strict";
import Measurement from "./measurement.js";

const app = {
  measurements: [],
  filtered: [],
  selectedMeasurement: "all",
  init() {
   this.fetchData();
   document.getElementById("typeFilter").addEventListener("change",this.filter)
  },
  fetchData() {
    fetch('https://thecrew.cc/herexamen/measurements.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.measurements.forEach(element => {
     this.measurements.push(new Measurement(element.value,element.type,new Date(element.timestamp)));
        
      });
      this.filtered = this.measurements;
      this.render();
    })
  
  },
  filter() {
    app.selectedMeasurement = this.value;
    app.filtered  = app.measurements.filter(element => {
      if(app.selectedMeasurement =="all"){
        return true;
      }
      return app.selectedMeasurement == element.unit;
    })
  
    app.render();
  },
  renderChart() {
    document.getElementById("chart").remove();

    document.getElementById("header").insertAdjacentHTML("afterend",'<canvas id="chart" width="400" height="400"></canvas>')
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.filtered.map(element=>element.time),
            datasets: [{
                label: 'Measurements',
                data:this.filtered.map(element=>element.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  },
  render() {
    let cont = document.getElementById("measurements");
    cont.innerHTML = "";
    this.filtered.forEach(element => {
      cont.innerHTML += element.htmlString;
    });
    app.renderChart();
  }
}

app.init();