///////////////////////////////////////////////////////////////// Display Doughnut Chart ///////////////////////////////////////////////////////////////////////////////////

module.exports.doughnutChart = (ctx, localDeaths, localActive, localRecovered) => {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Death', 'Active', 'Recovered' ],
            datasets: [{
                label: 'Country Breakdown',
                data: [localDeaths, localActive, localRecovered],
                backgroundColor: [
                    'rgb(255, 23, 68)',
                    'rgb(255, 111, 0)',
                    'rgb(0, 200, 83)',
                ],
                borderColor: [
                    'rgb(255, 23, 68)',
                    'rgb(255, 111, 0)',
                    'rgb(0, 200, 83)',
                ],
                borderWidth: 1,
                hoverOffset: 10,
                cutout: "55%",
            }]
        },
        options: {
            animation: {
                animateRotate: true,
                duration: 1800
            },
            plugins: {
                legend: {
                    labels: {
                        generateLabels: (chart) => {
                            const datasets = chart.data.datasets;
                            const totalCase = countryData.cases; 
                            return datasets[0].data.map((data, i) => ({
                                text: `${chart.data.labels[i]} (${((data/totalCase)*100).toFixed(1)}%)`,
                                fillStyle: datasets[0].backgroundColor[i],
                            }))
                        },
                        color: "black",
                        padding: 5,
                        boxWidth: 20,
                        font: {
                        size: 13
                        },
                    },
                    align: 'start',
                }
            },
        },
        plugins: [{
            id: 'text',
            beforeDraw: function(chart, a, b) {
                const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
        
                ctx.restore();
                const fontSize = (height / 220).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
        
                const text1 = ("Country"),
                text1X = Math.round((width - ctx.measureText(text1).width) / 2),
                text1Y = height / 1.9;
                const text2 = ("Breakdown"),
                text2X = Math.round((width - ctx.measureText(text2).width) / 2),
                text2Y = height / 1.6;
        
                ctx.fillText(text1, text1X, text1Y);
                ctx.fillText(text2, text2X, text2Y);
                ctx.save();
            }
        }]
    })
}

///////////////////////////////////////////////////////////////// Display Bar Chart1 ///////////////////////////////////////////////////////////////////////////////////

module.exports.myBarChart1 = (ctx, globalCases, localCases) => { 
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Cases"],
            datasets: [{
                indexAxis: 'y',
                label: "First",
                backgroundColor: 'rgb(255, 145, 0)', // Orange global case
                borderWidth: 1,
                data: [globalCases],
                barThickness: 54,
                order:2
            }, {
                indexAxis: 'y',
                label: "Second",
                backgroundColor: 'rgb(255, 234, 0)', // Yellow local cases
                borderWidth: 1,
                data: [localCases],
                barThickness: 32,
                order:1
            }],
        },
        options: {
            animation: {
                duration: 1800
            },
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        callback: function(value, index, values) {
                            return value/1000000 + ('mil');
                            },
                            color: 'black'
                        },
                    },
                y: {
                    stacked: true,
                }
            }
        },
    })
}

///////////////////////////////////////////////////////////////// Display Bar Chart2 ///////////////////////////////////////////////////////////////////////////////////

module.exports.myBarChart2 = (ctx, globalDeaths, localDeaths) => {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Deaths"],
            datasets: [{
                indexAxis: 'y',
                label: "First",
                backgroundColor: 'rgb(255, 145, 0)', // Orange global case
                borderWidth: 1,
                data: [globalDeaths],
                barThickness: 54,
                order:2
            }, {
                indexAxis: 'y',
                label: "Second",
                backgroundColor: 'rgb(255, 234, 0)', // Yellow local cases
                borderWidth: 1,
                data: [localDeaths],
                barThickness: 32,
                order:1
            }],
            hoverOffset: 10,
        },
        options: {
            animation: {
                duration: 1800
            },
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        callback: function(value, index, values) {
                            return value/1000000 + ('mil');
                            },
                        color: 'black'
                        }
                    },
                y: {
                    stacked: true,
                }
            }
        },
    });
}