$(function() {

	var line3
	var line2;
	var line;

	create1h();
	create1w();
	create1m();

	updatelast();

	if (!getCookie('webtoken')) {
		window.location = "login.html";
	} else {
		console.log('approved!');
	}

	setInterval(function() {
		updatelast();
	}, 5000);
	setInterval(function() {
		updateSince();
	}, 1000);

	function updatelast() {
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
			},
			dataType: "json",
			url: "../api/last",
			success: function(data) {
				$("#watt").text(data[0]['watt']);
			}
		});
	}

	function updateSince() {
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
			},
			dataType: "json",
			url: "../api/timeSince",
			success: function(data) {
				$("#time").text(data + ' Sec');
			}
		});
	}

	function create1h() {
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
			},
			dataType: "json",
			url: "../api/1h",
			success: function(data) {
				var labels = [];
				var serie = [];
				if (Math.round(data.length / 25) > 3) {
					var plus = Math.round(data.length / 25);
				} else {
					var plus = 3
				}
				for (var i = 0; i < data.length; i = i + Math.round(data.length / 25)) {
					var tmp = data[i]['date'].split("T");
					var time = tmp[1].split(".");
					if (data[i]['watt'] < 4000 && data[i]['watt'] > 350) {
						serie.push(data[i]["watt"]);
						labels.push(time[0]);
					}
				}
				var series = [];
				series.push(serie);
				var points = new Array();
				points["labels"] = labels;
				points["series"] = series;
				console.log(points);
				var options = {
					ineSmooth: Chartist.Interpolation.simple({
						divisor: 6
					})

				};
				var line = new Chartist.Line('.ct-chart', points, options);
				setInterval(function() {
					update1h(line);
				}, 60000);
			}
		});
}

function update1h(line) {
	$.ajax({
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
		},
		dataType: "json",
		url: "../api/1h",
		success: function(data) {
			var labels = [];
			var serie = [];
			for (var i = 0; i < data.length; i = i + Math.round(data.length / 25)) {
				var tmp = data[i]['date'].split("T");
				var time = tmp[1].split(".");
				if (data[i]['watt'] < 4000 && data[i]['watt'] > 350) {
					serie.push(data[i]["watt"]);
					labels.push(time[0]);
				}
			}
			var series = [];
			series.push(serie);
			var points = new Array();
			points["labels"] = labels;
			points["series"] = series;
			console.log(points);
			line.update(points);
		}
	});
}

function create1w() {
	$.ajax({
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
		},
		dataType: "json",
		url: "../api/7d",
		success: function(data) {
			var labels = [];
			var serie = [];
			if (Math.round(data.length / 25) > 3) {
				var plus = Math.round(data.length / 25);
			} else {
				var plus = 3
			}
			for (var i = 0; i < data.length; i = i + Math.round(data.length / 25)) {
				var tmp = data[i]['date'].split("T");
				var time = tmp[1].split(".");
				if (data[i]['watt'] < 4000 && data[i]['watt'] > 350) {
					serie.push(data[i]["watt"]);
					labels.push(tmp[0]);
				}
			}
			var series = [];
			series.push(serie);
			var points = new Array();
			points["labels"] = labels;
			points["series"] = series;
			console.log(points);
			var options = {
				ineSmooth: Chartist.Interpolation.simple({
					divisor: 6
				})

			};
			var line2 = new Chartist.Line('#week', points, options);
			setInterval(function() {
				update1w(line2);
			}, 600000);
		}
	});
}

function update1w(line) {
	$.ajax({
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
		},
		dataType: "json",
		url: "../api/7d",
		success: function(data) {
			var labels = [];
			var serie = [];
			for (var i = 0; i < data.length; i = i + Math.round(data.length / 25)) {
				var tmp = data[i]['date'].split("T");
				var time = tmp[1].split(".");
				if (data[i]['watt'] < 4000 && data[i]['watt'] > 350) {
					serie.push(data[i]["watt"]);
					labels.push(tmp[0]);
				}
			}
			var series = [];
			series.push(serie);
			var points = new Array();
			points["labels"] = labels;
			points["series"] = series;
			console.log(points);
			line.update(points);
		}
	});
}

function create1m() {
	$.ajax({
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
		},
		dataType: "json",
		url: "../api/1m",
		success: function(data) {
			var labels = [];
			var serie = [];
			if (Math.round(data.length / 25) > 3) {
				var plus = Math.round(data.length / 25);
			} else {
				var plus = 3
			}
			for (var i = 0; i < data.length; i = i + Math.round(data.length / 25)) {
				var tmp = data[i]['date'].split("T");
				var time = tmp[1].split(".");
				if (data[i]['watt'] < 4000 && data[i]['watt'] > 350) {
					serie.push(data[i]["watt"]);
					labels.push(tmp[0]);
				}
			}
			var series = [];
			series.push(serie);
			var points = new Array();
			points["labels"] = labels;
			points["series"] = series;
			console.log(points);
			var options = {
				ineSmooth: Chartist.Interpolation.simple({
					divisor: 1
				})

			};
			var line3 = new Chartist.Line('#month', points, options);
			setInterval(function() {
				update1w(line3);
			}, 600000);
		}
	});
}

function update1m(line) {
	$.ajax({
		beforeSend: function(request) {
			request.setRequestHeader("X-Access-Token", getCookie('webtoken'));
		},
		dataType: "json",
		url: "../api/1m",
		success: function(data) {
			var labels = [];
			var serie = [];
			for (var i = 0; i < data.length; i = i + Math.round(data.length / 25)) {
				var tmp = data[i]['date'].split("T");
				var time = tmp[1].split(".");
				if (data[i]['watt'] < 4000 && data[i]['watt'] > 350) {
					serie.push(data[i]["watt"]);
					labels.push(tmp[0]);
				}
			}
			var series = [];
			series.push(serie);
			var points = new Array();
			points["labels"] = labels;
			points["series"] = series;
			console.log(points);
			line.update(points);
		}
	});
}

function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}
});