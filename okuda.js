(function() {
	var computeBounds = function(dataset, field) {
		var minimum = null, maximum = null;
		
		for (var i = 0; i < dataset.length; i++) {
			var value = dataset[i][field];
			
			if (minimum === null || minimum > value)
				minimum = value;
			if (maximum === null || maximum < value)
				maximum = value;
		};
		
		return { min: minimum, steps: [ minimum, maximum ], max: maximum };
	};
	
	var humanizeBounds = function(bounds) {
		var threshold = 3;
		
		var exponent = Math.pow(10, Math.floor(Math.log(bounds.max - bounds.min) / Math.LN10) - 1);
		var minimum = Math.floor(bounds.min / exponent) * exponent;
		var maximum = Math.ceil(bounds.max / exponent) * exponent;
		
		var steps = [ ];
		
		if (Math.abs(minimum / exponent) % 2 == 1)
			minimum -= exponent;
		if ((maximum / exponent) % 2 == 1)
			maximum += exponent;
		
		console.log(minimum, maximum);
		
		exponent *= 10;
		
		var wasTwo = true;
		
		while (steps.length <= 5 && exponent > 0.001) {
			for (var i = minimum; i <= maximum; i += exponent) {
				if (!(steps.indexOf(i) >= 0))
					steps.push(i);
			};
			
			if (wasTwo)
				exponent /= 5;
			else
				exponent /= 2;
			wasTwo = !wasTwo;
		};
		
		if ((minimum * maximum <= 0) && !(steps.indexOf(0) >= 0))
			steps.push(0)
		
		steps.sort(function(a, b) { return a - b; });
		
		console.log(steps);
		
		return { min: minimum, max: maximum, steps: steps };
	};
	
	window.Okuda = {
		graph2D: function(options) {
			var horizontalBounds = humanizeBounds(computeBounds(
					options.data, options.independent[0].field));
			var verticalBounds = humanizeBounds(computeBounds(
					options.data, options.dependent[0].field));
			
			var mapX = function(value) {
				return (value - horizontalBounds.min) / 
					(horizontalBounds.max - horizontalBounds.min) *
					(options.canvas.width - 40) + 20;
			};
			
			var mapY = function(value) {
				return (value - verticalBounds.min) / 
					(verticalBounds.max - verticalBounds.min) *
					(options.canvas.height - 40) + 20;
			};
			
			var context = options.canvas.getContext('2d');
			
			context.save();
			context.translate(0, options.canvas.height);
			context.scale(1, -1);
			
			for (var i = 0; i < horizontalBounds.steps.length; i++) {
				var step = horizontalBounds.steps[i];
				var x = mapX(step);
				
				context.save();
				context.scale(1, -1);
				context.fillStyle = '#000';
				
				var label = Math.round(step * 1000) / 1000;
				
				if (i >= horizontalBounds.steps.length / 2) 
					context.translate(-context.measureText(label).width - 4, 0);
				
				if (Math.floor(i - horizontalBounds.steps.length / 2) != 0)
					context.fillText(label, x + 3, -5 - mapY(0));
				
				context.restore();
				
				if (i == 0)
					context.fillStyle = '#000';
				else
					context.fillStyle = 'rgba(120, 120, 120, 0.3)';
				context.fillRect(x, mapY(verticalBounds.min), 1, mapY(verticalBounds.max) - mapY(verticalBounds.min));
			};
			
			for (var i = 0; i < verticalBounds.steps.length; i++) {
				var step = verticalBounds.steps[i];
				var y = mapY(step);
				
				context.save();
				context.scale(1, -1);
				context.fillStyle = '#000';
				
				var label = Math.round(step * 1000) / 1000;
				
				if (i >= verticalBounds.steps.length / 2) 
					context.translate(0, +18);
				
				if (Math.floor(i - verticalBounds.steps.length / 2) != 0)
					context.fillText(label, 4 + mapX(horizontalBounds.min), -y - 5);
				
				context.restore();
				
				if ((step == 0) || (i == 0))
					context.fillStyle = '#000';
				else
					context.fillStyle = 'rgba(120, 120, 120, 0.3)';
				context.fillRect(mapX(horizontalBounds.min), y, mapX(horizontalBounds.max) - mapX(horizontalBounds.min), 1);
			};
			
			if (options.sequential) {
				context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
				context.beginPath();
				
				for (var i = 0; i < options.data.length; i++) {
					var element = options.data[i];
					
					var y = mapY(element[options.dependent[0].field]);
					var x = mapX(element[options.independent[0].field]);
					
					context.lineTo(x, y);
				};
				
				context.stroke();
			};
			
			for (var i = 0; i < options.data.length; i++) {
				var element = options.data[i];
				
				var y = mapY(element[options.dependent[0].field]);
				var x = mapX(element[options.independent[0].field]);
					
				context.fillStyle = 'rgba(0, 150, 230, 0.05)';
				context.beginPath();
				context.arc(x, y, 5, 2 * Math.PI, false);
				context.fill();
				
				context.fillStyle = '#000';
				context.fillRect(x - 0.5, y - 0.5, 1, 1);
			};
		},
		graph: function(options) {
			return Okuda.graph2D(options);
		}
	}
})();