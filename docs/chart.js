function main(xdata, ydata) {

    const zoomOptions = {
        zoom: {
            wheel: {
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
    };

    const data = {
        labels: xdata,
        datasets: [{
            data: ydata,
            backgroundColor: '#ffd76e',
            borderColor: '#fbc411',
            color: "#ffffff",
            fill: true,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    ticks: {
                        autoSkip: true,
                        autoSkipPadding: 50,
                        maxRotation: 0
                    },
                },
                y: {
                    min: 0,
                    max: 200,
                    title: {
                        display: true,
                        text: 'Weight (lbs)'
                    }
                },
            },
            plugins: {
                zoom: zoomOptions,
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: 'Honey Production'
                }
            }
        },
    };

    var myChart = new Chart(
        document.getElementById('chart').getContext('2d'),
        config
    );
}

fetch('http://192.168.1.5:5000/data')
    .then((response) => {
        return response.json();
    })
    .then((rsp) => {
        main(rsp.labels, rsp.data);
    });