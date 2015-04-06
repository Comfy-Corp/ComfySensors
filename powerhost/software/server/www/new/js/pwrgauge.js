
var apitoken = "";
var server = "http://coolsma.synology.me:8080/api";

var powerGaugeOtions = {
    
    chart: {
        renderTo: 'ipu',
        type: 'solidgauge',
        // alignTicks: false,
        // plotBackgroundColor: null,
        // plotBackgroundImage: null,
        // plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'Power Usage [Watt]'
    },
    
    pane: {
        center: ['50%', '50%'],
        size: '100%',
        startAngle: -180,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    }, 

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    },

    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.6, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 5,
        // title: {
        //     text: 'Power',
        //     y: -70
        // },
        // labels: {
        //     x: 20,
        //     y: 25
        // },
        min: 0,
        max: 10000
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Power',
        data: [0],
         dataLabels: {
            format: '<div style="text-align:center">' +
                    '<span><h1><p>{y:.0f}</p></h1></span>' + 
                    '<span><h4><p>Watt</p></h4></span>' +
                    '</div>',
                    y : -40
        },
        tooltip: {
            enabled: false,
            valueSuffix: ' Watt'
        }
    }]  
};



// Once DOM (document) is finished loading
$(document).ready(function() {

    $.post( server + "/login", {
        username:"testuser",
        password:"testpassword"
    }, function(data, status) { 
        
        // Save API token
        apitoken = data.token;

        // Create gauge
        var gauge = new Highcharts.Chart(powerGaugeOtions);
        
        // Periodic update IPU
        setInterval(function () 
        {
            $.ajax({
                url: server + "/ipu",
                headers:{'X-Access-Token' : apitoken},
                complete: function(data){
                    var ipu;
                    $.each($.parseJSON(data.responseText), function(index, value) {
                        (gauge.series[0].points[0]).update(value.ipu);
                    });
                }
            });
         }, 2000);
    });
});

    
 
