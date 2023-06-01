import { Chart } from "chart.js/auto";
import { DataManager } from "./DataManager";

type DataPoint = {x: number, y: number};

export class PlotManager {
    tempCanvas: HTMLCanvasElement;
    tempChart: Chart;
    tempData: DataPoint[];
    avgTempData: DataPoint[];

    pressureCanvas: HTMLCanvasElement;
    pressureChart: Chart;
    pressureData: DataPoint[];
    avgPressureData: DataPoint[];

    humidityCanvas: HTMLCanvasElement;
    humidityChart: Chart;
    humidityData: DataPoint[];
    avgHumidityData: DataPoint[];

    lightCanvas: HTMLCanvasElement;
    lightChart: Chart;
    lightData: DataPoint[];
    avgLightData: DataPoint[];

    speedCanvas: HTMLCanvasElement;
    speedChart: Chart;
    speedData: DataPoint[];
    avgSpeedData: DataPoint[];

    dataManager: DataManager;

    constructor(
        dataManager: DataManager, 
        eraseButton: HTMLButtonElement,
        avgSlider: HTMLInputElement,
        avgText: HTMLParagraphElement,

        tempCanvas: HTMLCanvasElement, 
        pressureCanvas: HTMLCanvasElement,
        humidityCanvas: HTMLCanvasElement,
        lightCanvas: HTMLCanvasElement,
        speedCanvas: HTMLCanvasElement,
    ) {
        eraseButton.onclick = () => {
            this.resetData();
        }

        this.dataManager = dataManager;
        this.tempCanvas = tempCanvas;
        this.tempData = [];
        this.avgTempData = [];
        this.tempChart = new Chart(
            this.tempCanvas,
            {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: "Temperature (C)",
                            data: this.tempData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 0, 0, 1)',
                            pointRadius: 0,
                        },
                        {
                            label: "Avg Temperature (C)",
                            data: this.avgTempData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderDash: [4, 8],
                            pointRadius: 0,
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Time (s)"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Temperature (C)"
                            }
                        },
                    }
                }
            }
        );

        this.pressureCanvas = pressureCanvas;
        this.pressureData = [];
        this.avgPressureData = [];
        this.pressureChart = new Chart(
            this.pressureCanvas,
            {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: "Pressure (Pa)",
                            data: this.pressureData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 128, 0, 1)',
                            pointRadius: 0,
                        },
                        {
                            label: "Avg Pressure (Pa)",
                            data: this.avgPressureData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 128, 0, 1)',
                            borderDash: [4, 8],
                            pointRadius: 0,
                        }

                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Time (s)"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Pressure (Pa)"
                            }
                        },
                    }
                }
            }
        );

        this.humidityCanvas = humidityCanvas;
        this.humidityData = [];
        this.avgHumidityData = [];
        this.humidityChart = new Chart(
            this.humidityCanvas,
            {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: "Humidity (% RH)",
                            data: this.humidityData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 0, 128, 1)',
                            pointRadius: 0,
                        },
                        {
                            label: "Avg Humidity (% RH)",
                            data: this.avgHumidityData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 0, 128, 1)',
                            borderDash: [4, 8],
                            pointRadius: 0,
                        }

                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Time (s)"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Humidity (% RH)"
                            }
                        },
                    }
                }
            }
        );

        this.lightCanvas = lightCanvas;
        this.lightData = [];
        this.avgLightData = [];
        this.lightChart = new Chart(
            this.lightCanvas,
            {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: "Light (lx)",
                            data: this.lightData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(200, 200, 0, 1)',
                            pointRadius: 0,
                        },
                        {
                            label: "Avg Light (lx)",
                            data: this.avgLightData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(200, 200, 0, 1)',
                            borderDash: [4, 8],
                            pointRadius: 0,
                        }

                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Time (s)"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Light Level (lx)"
                            }
                        },
                    }
                }
            }
        );

        this.speedCanvas = speedCanvas;
        this.speedData = [];
        this.avgSpeedData = [];
        this.speedChart = new Chart(
            this.speedCanvas,
            {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: "Wind Speed (km/h)",
                            data: this.speedData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 128, 128, 1)',
                            pointRadius: 0,
                        },
                        {
                            label: "Avg Wind Speed (km/h)",
                            data: this.avgSpeedData,
                            showLine: true,
                            fill: false,
                            borderColor: 'rgba(0, 128, 128, 1)',
                            borderDash: [4, 8],
                            pointRadius: 0,
                        }

                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Time (s)"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Wind Speed (km/h)"
                            }
                        },
                    }
                }
            }
        );



        this.updateMovingAvg(avgSlider, avgText);
        avgSlider.oninput = () => {
            this.updateMovingAvg(
                avgSlider,
                avgText
            );
        }

    }

    public updateDataArrays(
        thisData: DataPoint[], 
        refData: number[], 
        thisAvgData: DataPoint[], 
        refAvgData: number[]
    ) {
        for (let i = thisData.length; i < refData.length; i++) {
            let date = this.dataManager.dates[i];
            let data = refData[i];
            thisData.push({x: date, y: data});
        }
        thisAvgData.length = 0;
        for (let i = 0; i < refData.length; i++) {
            let date = this.dataManager.dates[i];
            let avgData = refAvgData[i];
            thisAvgData.push({x: date, y: avgData});
        }
    }

    public updateTempData() {
        this.updateDataArrays(
            this.tempData, 
            this.dataManager.temps,
            this.avgTempData,
            this.dataManager.avg_temps
        );
        this.tempChart.update();
    }

    public updatePressureData() {
        this.updateDataArrays(
            this.pressureData, 
            this.dataManager.pressures,
            this.avgPressureData,
            this.dataManager.avg_pressures
        );

        this.pressureChart.update();
    }

    public updateHumidityData() {
        this.updateDataArrays(
            this.humidityData, 
            this.dataManager.humidities,
            this.avgHumidityData,
            this.dataManager.avg_humidities
        );

        this.humidityChart.update();
    }

    public updateLightData() {
        this.updateDataArrays(
            this.lightData, 
            this.dataManager.lights,
            this.avgLightData,
            this.dataManager.avg_lights
        );

        this.lightChart.update();
    }

    public updateSpeedData() {
        this.updateDataArrays(
            this.speedData, 
            this.dataManager.wind_speeds,
            this.avgSpeedData,
            this.dataManager.avg_wind_speeds
        );

        this.speedChart.update();
    }


    public updateData() {
        this.updateTempData();
        this.updatePressureData();
        this.updateHumidityData();
        this.updateLightData();
        this.updateSpeedData();
    }

    public updateMovingAvg(
        avgSlider: HTMLInputElement,
        avgText: HTMLParagraphElement,
    ) {
        let newVal = Number(avgSlider.value);
        if (this.dataManager.getMovingAvgLength() != newVal) {
            this.dataManager.setMovingAvgLength(newVal);
            avgText.innerText = 'Moving Average Length: ' + newVal;
            this.updateData();
        }
    }

    public resetData() {
        this.tempData.length = 0;
        this.avgTempData.length = 0;

        this.pressureData.length = 0;
        this.avgPressureData.length = 0;

        this.humidityData.length = 0;
        this.avgHumidityData.length = 0;

        this.lightData.length = 0;
        this.avgLightData.length = 0;

        this.speedData.length = 0;
        this.avgSpeedData.length = 0;

        this.dataManager.resetData();
        this.updateData();
    }
}
