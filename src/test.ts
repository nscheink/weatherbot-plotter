import { Chart } from "chart.js/auto";

let slowRequestData = async (label: number, data: number): Promise<[number, number]> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return new Promise((resolve, reject) => {
        resolve([label, data]);
    });
}

let asyncUpdate = async(chart: Chart): Promise<void> => {
    let requestedData = await slowRequestData(2012.5, 35);
    updateFunc(chart, requestedData);
    return new Promise((res, rej) => {});
}


let updateFunc = function(chart: Chart, data: [number, number]): void {
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push({x: data[0], y: data[1]});
    });
    chart.update();
}

export let testFunc = function(): void {
    let ctx = document.getElementById("chart-canvas") as HTMLCanvasElement;
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
    ];
    let chart = new Chart(
        ctx,
        {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => {return {x: row.year, y: row.count}})
                    }
                ]
            }
        }
    );
    setInterval(() => {asyncUpdate(chart)}, 1000);
}
