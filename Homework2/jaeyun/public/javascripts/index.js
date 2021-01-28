/*
Copyright 2021 Jaewan Yun <jaeyun@ucdavis.edu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const tnse_iterations = 1000;
const tsne_config = {
	'perplexity': 18,
	'verbose': false,
	'exaggeration': 4,
	'exaggerationIter': 300,
	'exaggerationDecayIter': 200,
	'momentum': 0.8,
};

const tsne_attrs = [
	'acousticness',
	'danceability',
	'energy',
	'duration_ms',
	'instrumentalness',
	'valence',
	'popularity',
	'tempo',
	'liveness',
	'loudness',
	'speechiness',
	'year',
];

class Dataset {
	constructor() {
		this.data = [];
		this.year_data = [];
		this.year_range = [];
		this.year = null;
	}

	update() {
		this.year_data = [];
		for (const row of this.data)
			if (row.year === this.year)
				this.year_data.push(row);
	}

	get_year_range(data) {
		let min_year = data[0].year;
		let max_year = data[0].year;
		for (const row of data) {
			if (row.year < min_year)
				min_year = row.year;
			if (row.year > max_year)
				max_year = row.year;
		}
		return [min_year, max_year];
	}

	load_csv(url) {
		const self = this;
		return new Promise(function (resolve, reject) {
			d3.csv(url, d3.autoType)
				.then(function (data) {
					self.data = data;
					self.year_range = self.get_year_range(data);
					self.year = self.year_range[1];
					self.update();
					resolve(data);
				});
		});
	}

	get_tsne_tensor() {
		const data = [];
		for (const e of this.year_data) {
			const row = [];
			let is_valid = true;
			for (const attr of tsne_attrs) {
				const val = Number(e[attr]);
				if (isNaN(val))
					is_valid = false;
				row.push(val);
			}
			if (is_valid)
				data.push(row);
		}
		return tf.tensor(data);
	}
}

let dataset;
let tsne_ui;

class PlotUI {
	constructor() {
		this.$container = $('#scatter');
		this.container_elem = this.$container.get(0);
		this.$type_dropdown = $('#plot_type_dropdown');
		this.$x_dropdown = $('#plot_x_dropdown');
		this.$y_dropdown = $('#plot_y_dropdown');
		this.$z_dropdown = $('#plot_z_dropdown');
		this.$filter = $('#plot_filter_status_container').addClass('hidden');
		this.$filter_status = $('#plot_filter_status');

		this.circle_radius = 4.0;
		this.stroke_width = 2.5;

		this.$type_dropdown.on('change', this.on_dropdown_select.bind(this));
		this.$x_dropdown.on('change', this.on_dropdown_select.bind(this));
		this.$y_dropdown.on('change', this.on_dropdown_select.bind(this));
		this.$z_dropdown.on('change', this.on_dropdown_select.bind(this));

		let self = this;
		document.addEventListener('on_import', function () {
			self.points = null;
			self.$container.empty();
			self.clear_filter.apply(self, [true]);
		});
		document.addEventListener('on_view_change', function () {
			let type = self.$type_dropdown.val();
			if (type == 'scatter' || type == 'line') {
				let x_col = self.$x_dropdown.val();
				let y_col = self.$y_dropdown.val();
				if (x_col != null && y_col != null && self.points != null)
					self.render_plot.apply(self, [self.points, self.type, self.ordinal]);
				self.clear_filter.apply(self, [false]);
			}
		});
		document.addEventListener('on_data_change', function (e) {
			if (e.detail != 'plot_gui') {
				self.create_dropdowns();
				self.clear_filter.apply(self, [true]);
			}
		});
	}

	clear_filter(is_emitted=false) {
		if (dataset) {
			dataset.set_plot_filter(null, null, null, null);
			dataset.plot_filter.enabled = false;
			if (is_emitted) {
				dataset.apply_filters();
				emit('on_data_change', 'plot_gui');
			}
		}
		this.$filter_status.text('');
		this.$filter.addClass('hidden');
	}

	create_dropdowns() {
		this.$x_dropdown.empty();
		this.$y_dropdown.empty();
		this.$z_dropdown.empty();
		let $x0 = $('<option>')
			.appendTo(this.$x_dropdown)
			.prop('selected', true)
			.prop('disabled', true);
		let $y0 = $('<option>')
			.appendTo(this.$y_dropdown)
			.prop('selected', true)
			.prop('disabled', true);
		let $z0 = $('<option>')
			.appendTo(this.$z_dropdown)
			.prop('selected', true)
			.prop('disabled', true);

		this.$x_dropdown.prop('disabled', false);
		this.$y_dropdown.prop('disabled', false);
		this.$z_dropdown.prop('disabled', false);
		this.type = this.$type_dropdown.val();

		$x0.text('Choose x axis');
		$y0.text('Choose y axis');
		$z0.text('Choose color');

		create_options(this.$x_dropdown, dataset.numeric_columns, null, this.x_col);
		create_options(this.$y_dropdown, dataset.numeric_columns, null, this.y_col);
		create_options(this.$z_dropdown, dataset.columns, null, this.z_col);

		function create_options($select, values, texts=null, selected=null) {
			for (let i = 0; i < values.length; i++) {
				let val = values[i];
				let text = texts == null ? val : texts[i];
				let $op = $('<option>').appendTo($select).val(val).text(text);
				if (selected != null && val == selected)
					$op.prop('selected', true);
			}
		}
		this.on_dropdown_select();
	}

	on_dropdown_select() {
		if (dataset == null)
			return;
		let data = dataset.filtered;

		this.clear_filter();
		this.type = this.$type_dropdown.val();
		this.x_col = this.$x_dropdown.val();
		this.y_col = this.$y_dropdown.val();
		this.z_col = this.$z_dropdown.val();
		if (this.x_col == null || this.y_col == null)
			return;

		this.points = [];
		this.ordinal = {x: false, y: false, z: false};
		this.ordinal.x = !va._is_numeric_castable(data, this.x_col);
		this.ordinal.y = !va._is_numeric_castable(data, this.y_col);
		this.ordinal.z = this.z_col == null ? false : !va._is_numeric_castable(data, this.z_col);
		let x = dataset.unpack(this.x_col, this.ordinal.x ? null : Number);
		let y = dataset.unpack(this.y_col, this.ordinal.y ? null : Number);
		let z = dataset.unpack(this.z_col, this.ordinal.z ? null : Number);
		if (x.length != y.length || y.length != z.length)
			console.error('Array length mismatch', x.length, y.length, z.length);
		for (let i = 0; i < x.length; i++) {
			if (x[i] == null || y[i] == null) continue;
			if (!x.ordinal && !Number.isFinite(x[i])) continue;
			if (!y.ordinal && !Number.isFinite(y[i])) continue;
			if (z[i] == null)
				z[i] = 0;
			this.points.push([x[i], y[i], z[i], i]);
		}
		this.render_plot(this.points, this.ordinal);
	}

	render_plot(points, ordinal) {
		this.$container.empty();
		let width = this.$container.innerWidth();
		let height = this.$container.innerHeight();
		let svg = d3.select(this.container_elem).append('svg')
			.attr('width', width)
			.attr('height', height);

		let k = height / width;
		let x0 = d3.extent(points, function (d) {return d[0];});
		let y0 = d3.extent(points, function (d) {return d[1];});
		let z0 = d3.extent(points, function (d) {return d[2];});

		if (!ordinal.x) {
			let xrange = x0[1] - x0[0];
			x0[0] -= xrange/4;
			x0[1] += xrange/4;
		}
		if (!ordinal.y) {
			let yrange = y0[1] - y0[0];
			y0[0] -= yrange/4;
			y0[1] += yrange/4;
		}

		let x, y, z;
		if (ordinal.x)
			x = d3.scaleOrdinal();
		else
			x = d3.scaleLinear();

		if (ordinal.y)
			y = d3.scaleOrdinal();
		else
			y = d3.scaleLinear();
		if (ordinal.z)
			z = d3.scaleOrdinal(d3.schemeCategory10)
				.domain(z0);
		else
			z = d3.scaleSequential()
				.domain(z0)
				.interpolator(d3.interpolateViridis);
		x = x.domain(x0).range([0, width]);
		y = y.domain(y0).range([height, 0]);

		let x_axis = d3.axisTop(x).ticks(12);
		let y_axis = d3.axisRight(y).ticks(12 * k);

		let brush = d3.brush().on('end', brushended.bind(this));
		let idle_timeout;
		let idle_delay = 500;

		svg.selectAll('circle')
			.data(points)
			.enter().append('circle')
				.attr('r', this.circle_radius)
				.attr('fill', function (d) {return z(d[2]);})
				.attr('cx', function (d) {return x(d[0]);})
				.attr('cy', function (d) {return y(d[1]);});

		svg.append('g')
			.attr('class', 'axis axis--x')
			.attr('transform', 'translate(0,' + (height - 10) + ')')
			.call(x_axis);

		svg.append('g')
			.attr('class', 'axis axis--y')
			.attr('transform', 'translate(10, 0)')
			.call(y_axis);

		svg.selectAll('.domain')
			.style('display', 'none');

		svg.append('g')
			.attr('class', 'brush')
			.call(brush);

		function brushended(event) {
			let s = event.selection;
			if (!s || dataset.plot_filter.enabled) {
				if (!idle_timeout)
					return idle_timeout = setTimeout(() => idle_timeout = null, idle_delay);
				x.domain(x0);
				y.domain(y0);
				this.clear_filter(false);
			}
			else {
				let sx = [s[0][0], s[1][0]].map(x.invert, x);
				let sy = [s[1][1], s[0][1]].map(y.invert, y);
				x.domain(sx);
				y.domain(sy);
				dataset.set_plot_filter(sx, sy, this.x_col, this.y_col);
				dataset.plot_filter.enabled = true;
				this.$filter_status.text('[' +
					sx[0].toFixed(1) + ', ' + sy[0].toFixed(1) + '] [' +
					sx[1].toFixed(1) + ', ' + sy[1].toFixed(1) + ']');
				this.$filter.removeClass('hidden');
				svg.select('.brush').call(brush.move, null);
			}
			dataset.apply_filters();
			emit('on_data_change', 'plot_gui');
			zoom();
		}

		function zoom() {
			svg.select('.axis--x').call(x_axis);
			svg.select('.axis--y').call(y_axis);
			svg.selectAll('circle')
				.attr('cx', function (d) {return x(d[0]);})
				.attr('cy', function (d) {return y(d[1]);});
		}
	}
}

class TsneUI {
	constructor() {
		const self = this;

		// Run / stop / reset tsne
		self.running = false;
		self.$run_tsne_button = $('#run_tsne_button');
		self.$run_tsne_button.prop('disabled', false);
		self.tsne_button_state = 'run';
		self.$run_tsne_button.on('click', function () {
			if (self.tsne_button_state === 'run')
				self.run.apply(self);
			else if (self.tsne_button_state === 'stop')
				self.stop.apply(self);
			else if (self.tsne_button_state === 'reset')
				self.reset.apply(self);
		});

		// Initialize canvas
		self.$window = $(window);
		self.$parent = $('#scatter_plot');
		self.$canvas = $('<canvas>').appendTo(self.$parent);
		self.context = self.$canvas[0].getContext('2d');
		self.frames = 0;
		self.fps = 0;
		setInterval(self.render.bind(self), 15);
		setInterval(function () {
			self.fps = self.frames;
			self.frames = 0;
		}, 1000);
	}

	run() {
		const self = this;
		self.running = true;
		self.tsne_button_state = 'stop';
		self.$run_tsne_button.val('Stop');
		self.$run_tsne_button.addClass('btn-outline-danger');
		self.$run_tsne_button.removeClass('btn-outline-primary');

		// const data = tf.randomUniform([4000, 20]);
		const data = dataset.get_tsne_tensor();
		const tsne_op = tsne.tsne(data, tsne_config);

		// tsne_op.compute(tnse_iterations).then(() => {
		// 	const coordinates = tsne_op.coordinates();
		// 	coordinates.print();
		// });

		async function iterate_tsne() {
			const knn_iterations = tsne_op.knnIterations();
			for (let i = 0; i < knn_iterations; i++) {
				if (!self.running)
					return;
				await tsne_op.iterateKnn();
				console.log('knn progress:', i, '/', knn_iterations);
			}
			for (let i = 0; i < tnse_iterations; i++) {
				if (!self.running)
					return;
				await tsne_op.iterate();
				// Get embedding
				const coordinates = tsne_op.coordinates();
				const vals = coordinates.dataSync();
				// console.log(coordinates.shape)
				// console.log(vals.length);
				for (let i = 0; i < vals.length/2; i++) {
					const index = i*2;
					const x = vals[index];
					const y = vals[index+1];
					dataset.year_data[i].x = x;
					dataset.year_data[i].y = y;
				}
				// Find range
				dataset.x_min = dataset.year_data[0].x;
				dataset.x_max = dataset.year_data[0].x;
				dataset.y_min = dataset.year_data[0].y;
				dataset.y_max = dataset.year_data[0].y;
				for (const e of dataset.year_data) {
					if (dataset.x_min > e.x)
						dataset.x_min = e.x;
					if (dataset.x_max < e.x)
						dataset.x_max = e.x;
					if (dataset.y_min > e.y)
						dataset.y_min = e.y;
					if (dataset.y_max < e.y)
						dataset.y_max = e.y;
				}
			}
			self.stop();
		}
		iterate_tsne();
	}

	stop() {
		const self = this;
		self.running = false;
		self.tsne_button_state = 'reset';
		self.$run_tsne_button.val('Reset');
		self.$run_tsne_button.addClass('btn-outline-warning');
		self.$run_tsne_button.removeClass('btn-outline-danger');
	}

	reset() {
		const self = this;
		self.tsne_button_state = 'run';
		self.$run_tsne_button.val('Run');
		self.$run_tsne_button.addClass('btn-outline-primary');
		self.$run_tsne_button.removeClass('btn-outline-warning');
	}

	recalculate() {
		const self = this;
		self.width = self.$canvas.innerWidth();
		self.height = self.$canvas.innerHeight()-35;

		// self.display_offset = self.$parent.offset();
		self.display_offset = self.$canvas.offset();

		// Viewport dimensions
		const window_width = self.$window.width();
		const window_height = self.$window.height();
		// if (self.width > window_width)
		// 	self.width = 0;
		if (self.height > window_height)
			self.height = 0;

		self.$canvas.attr({
			width: self.width,
			height: self.height,
		});
	}

	render() {
		const self = this;
		self.recalculate();

		// FPS
		self.frames++;
		this.context.fillStyle = '#fff';
		self.context.fillText('FPS:'+self.fps, 10, 10);

		if (dataset.year_data.length === 0)
			return;

		// if (!dataset.hasOwnProperty('x_min'))
		// 	return;

		const padding = 0.05;
		this.context.strokeStyle = '#fff';
		for (const e of dataset.year_data) {
			const px = (e.x-dataset.x_min)/(dataset.x_max-dataset.x_min);
			const py = (e.y-dataset.y_min)/(dataset.y_max-dataset.y_min);
			const sx = self.width*px * (1-padding)+(self.width*padding/2);
			const sy = self.height*py * (1-padding)+(self.height*padding/2);
			self.context.beginPath();
			self.context.arc(sx, sy, 4, 0, 2*Math.PI);
			self.context.stroke();
		}
	}
}

function initialize_ui() {
	tsne_ui = new TsneUI();

	const $year_filter = $('#year_filter');
	// Create year select node
	for (let i = dataset.year_range[0]; i < dataset.year_range[1]; i++) {
		const $elem = $('<option>')
			.appendTo($year_filter)
			.val(i)
			.text(i);
			if (i === dataset.year_range[1]-1)
				$elem.prop('selected', true);
	}
	// Filter year
	$year_filter.on('change', function () {
		const val = $year_filter.val();
		dataset.year = Number(val);
		dataset.update();
		console.log('year_data size:', dataset.year_data.length);
	});
}

function main() {
	dataset = new Dataset();
	dataset.load_csv('/datasets/spotify.csv')
		.then(function () {
			initialize_ui();
		});
}

function get_script(url) {
	return $.ajax({
		url: url,
		dataType: 'script',
		timeout: 60000,
	});
}

$(function () {
	// const tfjs_url = '/javascripts/tfjs-0.14.1.js';
	// const tsne_url = '/javascripts/tsne.js';
	const tfjs_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.14.1';
	const tsne_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tsne';

	get_script(tfjs_url)
		.then(function () {
			console.log('tfjs ready');
			return get_script(tsne_url);
		})
		.then(function () {
			console.log('tsne ready');
			main();
		})
		.catch(console.log);
});
