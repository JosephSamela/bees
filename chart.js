const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August'
];

const data = {
    labels: labels,
    datasets: [{
        backgroundColor: '#ffd76e',
        borderColor: '#fbc411',
        color: "#ffffff",
        data: [0, 10, 5, 2, 20, 30, 45, 24],
    }]
};

const config = {
    type: 'line',
    data,
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Weight (lbs)'
                }
            }]
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    tooltips: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                }
            },
            title: {
                display: true,
                position: 'bottom',
                text: (ctx) => 'Zoom: ' + zoomStatus() + ', Pan: ' + panStatus()
            }
        },
    }
};

var myChart = new Chart(
    document.getElementById('chart').getContext('2d'),
    config
);