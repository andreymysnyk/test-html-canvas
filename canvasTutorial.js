// Created by amisnik on 11.06.2015.

var rootCoef = 0.03;
var subBranchMinLength = 10;
var subBranchLength = 300;
var subBranchNeighbour = 0.7;

var drawInProgress = false;

function draw(age) {
	var canvas = document.getElementById('tutorial');

	if (canvas.getContext && !drawInProgress) {
		var ctx = canvas.getContext('2d');

		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.rect(0, 0, 600, 600);
		ctx.fill();

		drawInProgress = true;

		drawBranch(ctx, {x: -180 + age, y: 600}, {x: 780 - age, y: 600}, 0);

		drawInProgress = false;
	}
}

function drawBranch(ctx, start, end, level) {
	if (level > 10) return;

	var left = getPointAt(start, end, 0.5 - rootCoef);
	var right = getPointAt(start, end, 0.5 + rootCoef);
	var top = getPermPointAt(start, end, -0.6);

	ctx.fillStyle = 'rgb(160, 85, 45)';

	ctx.beginPath();
	ctx.moveTo(left.x, left.y);
	ctx.lineTo(top.x, top.y);
	ctx.lineTo(right.x, right.y);
	ctx.closePath();

	ctx.fill();

	// left branch
	drawBranchInnerLeft(ctx, left, top, 0.1, level);

	// right branch
	drawBranchInnerRight(ctx, top, right, 0.05, level);
}

function drawBranchInnerLeft(ctx, start, end, initialOffset, level) {
	var length = distance(start, end);

	if (length > subBranchMinLength) {
		var koef = length > subBranchLength ? length / subBranchLength : 1;
		var subBranch = getPointAt(start, end, subBranchNeighbour + initialOffset);

		drawBranch(ctx, start, subBranch, level + 1);

		var middle = getPointAt(start, subBranch, 0.5);

		drawBranchInnerLeft(ctx, middle, end, 0, level);
	} else {
		drawLeaf(ctx, start, end);
	}
}

function drawBranchInnerRight(ctx, start, end, initialOffset, level) {
	var length = distance(start, end);

	if (length > subBranchMinLength) {
		var koef = length > subBranchLength ? length / subBranchLength : 1;
		var subBranch = getPointAt(start, end, (1 - subBranchNeighbour) - initialOffset);

		drawBranch(ctx, subBranch, end, level + 1);

		var middle = getPointAt(subBranch, end, 0.5);

		drawBranchInnerRight(ctx, start, middle, 0, level);
	} else {
		drawLeaf(ctx, start, end);
	}
}

function drawLeaf(ctx, start, end) {
	var middle = getPointAt(start, end, 0.5);

	ctx.fillStyle = 'rgba(0, 160, 0, 0.1)';

	ctx.beginPath();
	ctx.arc(middle.x, middle.y, subBranchMinLength, 0, 2 * Math.PI);

	ctx.closePath();

	ctx.fill();
}

function distance(start, end) {
	return Math.max(Math.abs(start.x - end.x), Math.abs(start.y - end.y));
}

function getPointAt(start, end, t) {
	return {
		x: (end.x - start.x) * t + start.x,
		y: (end.y - start.y) * t + start.y
	};
}

function getPermPointAt(start, end, t) {
	var middle = getPointAt(start, end, 0.5);

	return {
		x: (start.y - end.y) * t + middle.x,
		y: (end.x - start.x) * t + middle.y
	}
}