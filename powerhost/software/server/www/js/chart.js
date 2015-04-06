// Global variables
var last7dChart, last24hChart;
var apitoken = "";
var server = "http://coolsma.synology.me:8080/api"

// default options
var options = {
    chart: {
        zoomType: 'xy',
        type: 'column',
        height: 350
    },
    xAxis: {
        type: 'datetime'
    }
};

//
// Week chart resolution 1 day
//
var last7dOptions = {
    chart: {
        renderTo: 'weekplot',
        events: {
            load: function () {        
                $.ajax({
                    url: server + "/nday/14",
                    headers:{'X-Access-Token' : apitoken},
                    complete: function(data){

                        var dataPoints = [];
                        var startEpoch = $.parseJSON(data.responseText)[0].time;
                        var startDate = new Date(startEpoch * 1000);

                        // Retrieve and construct data array
                        $.each($.parseJSON(data.responseText), function(index, value) {
                            dataPoints.push(value.ticks);
                        }); 

                        // Update series
                        last7dChart.series[0].update({
                            data: dataPoints,
                            tooltip: { valueDecimals: 0, valueSuffix: ' Wh' },
                            pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                            pointInterval: 3600 * 24 * 1000 // one hour
                        }, false);

                        var cost = [];
                        var sum = 0;
                        $.each(dataPoints, function(index, value){
                            sum += ((value/1000) * 0.21);
                            cost.push(sum);
                        });

                        last7dChart.series[1].update({
                            data: cost,
                            tooltip: { valueDecimals: 2, valueSuffix: ' €' },
                            pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                            pointInterval: 3600 * 24 * 1000 // one hour
                        }, true);
                    }
                });
            },
        },
    },
    title: {
        text: 'Energy usage and cost, last 7 days'
    },
    subtitle: {
        text: 'Source: http://coolsma.synoloy.me:8080'
    },
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value} Wh',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        title: {
            text: 'Energy usage',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Total cost',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value} €',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name : 'Energy usage this week',
        type : 'column',
        data : [0, 0, 0 ]
        // yAxis : 1
    },
    {
        name : 'Total cost',
        type : 'spline',
        data : [0, 0, 0 ],
        yAxis : 1
    }]
};

//
// Day chart, resolution 1 hour
//
var last24hOptions = {
    chart: {
        renderTo: 'dayplot',
        events: {
            load: function () {        
                $.ajax({
                    url: server + "/nhour/24",
                    headers:{'X-Access-Token' : apitoken},
                    complete: function(data){

                        var dataPoints = [];
                        var startEpochUTC = $.parseJSON(data.responseText)[0].time;
                        var startDateUTC = new Date(startEpochUTC * 1000);
                        var offset = startDateUTC.getTimezoneOffset();
                        console.log('epoch:' + startEpochUTC + ' date: ' + startDateUTC + ' offset: '
                            + offset);
                        
                        // Creates UTC ep
                        var pointStart = Date.UTC(startDateUTC.getFullYear(), startDateUTC.getMonth(), startDateUTC.getDate());
                        console.log('pointStart: ' + pointStart + " " + startDateUTC.getDate());

                        var startEpoch = $.parseJSON(data.responseText)[0].time;
                        var startDate = new Date(startEpoch * 1000);

                        // Retrieve and construct data array
                        $.each($.parseJSON(data.responseText), function(index, value) {
                            dataPoints.push(value.ticks);
                        }); 
                    
                        // pad zero's
                        var length = dataPoints.length;
                        for(var idx = 0; idx < 24-length; idx++) {
                            dataPoints.push(10);
                        }

                        // Update series
                        last24hChart.series[0].update({
                            data: dataPoints,
                            tooltip: { valueDecimals: 0, valueSuffix: ' Wh' },
                            pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                            pointInterval: 3600 * 1000 // one hour
                        }, false);

                        var cost = [];
                        var sum = 0;
                        $.each(dataPoints, function(index, value){
                            sum += ((value/1000) * 0.21);
                            cost.push(sum);
                        });

                        last24hChart.series[1].update({
                            data: cost,
                        //name: 'Watts per hour',
                            tooltip: { valueDecimals: 2, valueSuffix: ' €' },
                            pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                            pointInterval: 3600 * 1000 // one hour
                        }, true);
                    }
                });
            },
        },
    },
    title: {
        text: 'Energy usage and cost, today every hour'
    },
    subtitle: {
        text: 'Source: http://coolsma.synology.me:8080'
    },
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value} Wh',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        title: {
            text: 'Energy usage',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Total cost',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value} €',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name : 'Energy usage today',
        type : 'column',
        data : [0, 0, 0 ]
        // yAxis : 1
    },
    {
        name : 'Total cost',
        type : 'spline',
        data : [0, 0, 0 ],
        yAxis : 1
    }]
};


// Once DOM (document) is finished loading
$(document).ready(function() {

    $.post( server + "/login", {
        username:"testuser",
        password:"testpassword"
    }, function(data, status) { 
        apitoken = data.token;

        // Draw last x days plot
        last7dOptions = jQuery.extend(true, {}, options, last7dOptions);
        last7dChart = new Highcharts.Chart(last7dOptions);
       
        // Draw last 24 h plot
        last24hOptions = jQuery.extend(true, {}, options, last24hOptions);
        last24hChart = new Highcharts.Chart(last24hOptions);
    });
});

    
 
