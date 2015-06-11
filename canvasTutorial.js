// Created by amisnik on 11.06.2015.

function draw() {
	var canvas = document.getElementById('tutorial');

	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
		ctx.fillRect(40, 40, 200, 150);

		ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		ctx.fillRect(80, 80, 200, 150);

		ctx.fillStyle = 'rgba(0, 200, 0, 0.5)';
		ctx.fillRect(60, 0, 200, 150);


		ctx.fillStyle = 'rgba(0, 200, 0, 0.5)';
		ctx.fillRect(360, 0, 200, 150);

		ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
		ctx.fillRect(340, 40, 200, 150);

		ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		ctx.fillRect(380, 80, 200, 150);
	}
}

