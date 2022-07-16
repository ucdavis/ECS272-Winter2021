/*
Copyright 2021 Jaewan Yun <jaeyun@ucdavis.edu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const colors = [
	'#00C0C7',
	'#5144D3',
	'#E8871A',
	'#DA3490',
	'#9089FA',
	'#47E26F',
	'#2780EB',
	'#6F38B1',
	'#DFBF03',
	'#CB6F10',
	'#268D6C',
	'#9BEC54',
];

const default_perplexity = 20;
const default_tsne_iterations = 475;

const tsne_config = {
	'perplexity': default_perplexity,
	'verbose': false,
	'exaggeration': 4,
	'exaggerationIter': 300,
	'exaggerationDecayIter': 200,
	'momentum': 0.8,
	'applyGain': false,
	'knnMode': 'bruteForce', // 'auto' | 'bruteForce'
};

const tsne_attrs = [
	'acousticness',
	'danceability',
	'duration_ms',
	'energy',
	'instrumentalness',
	'liveness',
	'loudness',
	'popularity',
	'speechiness',
	'tempo',
	'valence',
	// 'year',
];

const pcoord_attrs = [
	'acousticness',
	'danceability',
	'duration_ms',
	'energy',
	'instrumentalness',
	'liveness',
	'loudness',
	'popularity',
	'speechiness',
	'tempo',
	'valence',
	// 'year',
];

const radar_attrs = [
	'acousticness',
	'danceability',
	// 'duration_ms',
	'energy',
	'instrumentalness',
	'liveness',
	'loudness',
	'popularity',
	'speechiness',
	'tempo',
	'valence',
	// 'year',
];

const update_event = new Event('update');

class Dataset {
	constructor() {
		const self = this;
		self.data = [];
		self.year_data = [];
		self.year_range = [];
		self.year_start = null;
		self.year_end = null;
		self.year_window = 1;
	}

	update() {
		const self = this;
		self.year_data = [];
		for (const row of self.data) {
			if (row.year >= self.year_start && row.year <= self.year_end) {
				self.year_data.push(row);
			}
		}

		// Sort descending popularity
		self.year_data.sort((a, b) => (a.popularity < b.popularity) ? 1 : ((b.popularity < a.popularity) ? -1 : 0));

		// Get genre popularity
		self.genres_count_year = {};
		for (const e of self.year_data) {
			for (const g of e.genres) {
				if (g == '[]')
					continue;
				if (!self.genres_count_year.hasOwnProperty(g))
					self.genres_count_year[g] = 0;
				self.genres_count_year[g]++;
			}
		}
		self.sorted_genres_year = Object.keys(self.genres_count_year).sort(function (a, b) {
			return self.genres_count_year[b] - self.genres_count_year[a];
		});
		// console.log('genres sorted by popularity for year', self.year, self.sorted_genres_year);
		// Update likely genre according to yearly genre distribution
		for (const e of self.year_data) {
			e.likely_genre_year = 'unknown';
			for (let i = 0; i < colors.length; i++) {
				const g = self.sorted_genres_year[i];
				if (e.genres.includes(g)) {
					e.likely_genre_year = g;
					break;
				}
			}
		}
		// console.log(self.year_data);

		window.dispatchEvent(update_event);
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

	load() {
		const self = this;
		const data_url = '/uploads/spotify/data.csv';
		const data_w_genres_url = '/uploads/spotify/data_w_genres.csv';

		const artists_genres = {};

		return d3.csv(data_w_genres_url, d3.autoType)
			.then(function (data_w_genres) {
				// Parse genres array string
				self.genres_count_all = {};
				for (const e of data_w_genres) {
					let genres = e.genres;
					genres = genres.replace(/\['/g, '');
					genres = genres.replace(/'\]/g, '');
					genres = genres.replace(/\[""/g, '');
					genres = genres.replace(/""\]/g, '');
					genres = genres.replace(/\["/g, '');
					genres = genres.replace(/"\]/g, '');
					genres = genres.replace(/', '/g, '|');
					genres = genres.replace(/""/g, '|');
					// console.log(e.genres, genres);
					// e.genres = genres.split('|');
					artists_genres[e.artists] = genres.split('|');

					for (const g of artists_genres[e.artists]) {
						if (g == '[]')
							continue;
						if (!self.genres_count_all.hasOwnProperty(g))
							self.genres_count_all[g] = 0;
						self.genres_count_all[g]++;
					}
				}
				// console.log(data_w_genres);

				const sorted_genres = Object.keys(self.genres_count_all).sort(function (a, b) {
					return self.genres_count_all[b] - self.genres_count_all[a];
				});
				// for (const g of sorted_genres)
				// 	console.log(g, ':', self.genres_count_all[g]);
				// console.log('genres sorted by all-time popularity', sorted_genres);

				return new Promise(function (resolve, reject) {
					d3.csv(data_url, d3.autoType)
						.then(function (data) {
							// Parse artists array string
							for (const e of data) {
								let artists = e.artists;
								artists = artists.replace(/\['/g, '');
								artists = artists.replace(/'\]/g, '');
								artists = artists.replace(/\[""/g, '');
								artists = artists.replace(/""\]/g, '');
								artists = artists.replace(/\["/g, '');
								artists = artists.replace(/"\]/g, '');
								artists = artists.replace(/', '/g, '|');
								artists = artists.replace(/""/g, '|');
								// console.log(e.artists, artists);
								e.artists = artists.split('|');
							}

							// Add genres
							for (const e of data) {
								e.genres = [];
								for (const artist of e.artists) {
									if (artists_genres.hasOwnProperty(artist)) {
										// e.genres = artists_genres[artist];
										const a = e.genres;
										const b = artists_genres[artist];
										e.genres = [...new Set([...a, ...b])];
									}
								}
								e.likely_genre_all = 'unknown';
								for (const g of sorted_genres) {
									if (e.genres.includes(g)) {
										e.likely_genre_all = g;
										break;
									}
								}
							}

							self.data = data;
							self.year_range = self.get_year_range(data);
							resolve(data);
						});
				});
			});
	}

	get_tsne_tensor() {
		const self = this;
		const data = [];
		for (const e of this.year_data) {
			const row = [];
			let is_valid = true;
			for (const attr of tsne_attrs) {
				const val = e[attr];// + 0.000001;
				if (isNaN(val))
					is_valid = false;
				row.push(val);
			}
			if (is_valid)
				data.push(row);
		}
		const a = tf.tensor(data, null, 'float32');

		// // Z-score standardize
		// const mo = tf.moments(a, 1, true);
		// const std = mo.variance.sqrt();
		// const b = a.sub(mo.mean);
		// const tensor = b.div(std);

		// const min = a.min(0, true);
		// const max = a.max(0, true);
		self.min = a.min(0, false).dataSync();
		self.max = a.max(0, false).dataSync();
		// console.log(a.shape, min.shape, max.shape);
		const min = a.min();
		const max = a.max();
		const tensor = a.sub(min).div(max.sub(min));

		// self.tensor = tensor.dataSync();
		// console.log('min', self.min);
		// console.log('max', self.max);
		// console.log('tensor', self.tensor);

		// tensor.print();
		return tensor;
	}

	// get_scaled(tensor) {
	// 	const self = this;
	// 	for (const i in self.year_data) {
	// 		const t = self.year_data[i];
	// 		if (t.id == tensor.id)
	// 			return [self.tensor[]]
	// 	}
	// }
}

class TsneUI {
	constructor() {
		const self = this;

		// Get maximum perplexity allowed by hardware
		self.max_perplexity = tsne.maximumPerplexity();
		console.log('Maximum perplexity allowed by hardware', self.max_perplexity);

		self.tsne_iterations = default_tsne_iterations;
		self.tsne_iter_now = 0;

		// Perplexity input
		self.$tsne_perplexity = $('#tsne_perplexity');
		self.$tsne_perplexity.val(default_perplexity);
		self.$tsne_perplexity.on('input change', function () {
			let val = Number(self.$tsne_perplexity.val());
			if (isNaN(val))
				val = default_perplexity;
			if (val > self.max_perplexity)
				val = self.max_perplexity;
			if (val < 0)
				val = 0;
			self.$tsne_perplexity.val(val);
			tsne_config.perplexity = val;
		});

		// Run / stop / reset tsne
		self.running = false;
		self.$run_tsne_button = $('#run_tsne_button');
		self.$run_tsne_button.prop('disabled', false);
		self.tsne_button_state = 'run';
		self.$run_tsne_button.on('click', function () {
			if (self.tsne_button_state === 'run') {
				$('#loading').removeClass('hidden');
				self.$run_tsne_button.prop('disabled', true);
				self.run.apply(self);
			}
			else if (self.tsne_button_state === 'stop')
				self.stop.apply(self);
			else if (self.tsne_button_state === 'reset')
				self.reset.apply(self);
		});

		// Initialize canvas
		self.padding = 0.05;
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

		// Selection
		self.recalculate();
		self.remove_selection();
		this.$parent.on('mousedown', function (e) {
			const x = e.pageX-self.display_offset.left;
			const y = e.pageY-self.display_offset.top;
			if (self.has_selection() || e.button == 2) {
				self.remove_selection();
			}
			else if (e.button == 0) {
				self.is_selecting = true;
				self.selection_start_x = x / self.width;
				self.selection_start_y = y / self.height;
			}
		});
		this.$parent.on('mouseup', function (e) {
			if (e.button == 0) {
				self.is_selecting = false;
				window.dispatchEvent(update_event);
			}
		});
		this.$parent.on('mousemove', function (e) {
			const x = e.pageX-self.display_offset.left;
			const y = e.pageY-self.display_offset.top;
			if (self.is_selecting) {
				self.selection_end_x = x / self.width;
				self.selection_end_y = y / self.height;
			}
		});
		// Right click removes selection
		this.$parent[0].addEventListener('contextmenu', function (e) {
			e.preventDefault();
		});

		window.addEventListener('update', function () {
			self.$canvas.attr({
				width: 0,
				height: 0,
			});
		}, false);
	}

	has_selection() {
		const self = this;
		return self.selection_start_x > -1 && self.selection_start_y > -1 && self.selection_end_x > -1 && self.selection_end_y > -1;
	}

	remove_selection() {
		const self = this;
		self.is_selecting = false;
		self.selection_start_x = -1;
		self.selection_start_y = -1;
		self.selection_end_x = -1;
		self.selection_end_y = -1;
	}

	run() {
		const self = this;
		self.running = true;
		self.tsne_button_state = 'stop';
		self.$run_tsne_button.val('Stop');
		self.$run_tsne_button.addClass('btn-danger');
		self.$run_tsne_button.removeClass('btn-light');
		self.$tsne_perplexity.prop('disabled', true);

		if (tsne_config.perplexity > self.max_perplexity) {
			console.log('Perplexity cannot be greater than', self.max_perplexity, 'on this machine');
			tsne_config.perplexity = self.max_perplexity;
			self.$tsne_perplexity.val(self.max_perplexity);
		}

		const data = dataset.get_tsne_tensor();
		const tsne_op = tsne.tsne(data, tsne_config);
		// const tsne_op = tsne.tsne(data);

		async function iterate_tsne() {
			await tsne_op.iterateKnn(200);

			$('#loading').addClass('hidden');
			self.$run_tsne_button.prop('disabled', false);

			for (let i = 0; i < self.tsne_iterations; ++i) {
				if (!self.running)
					return;

				await tsne_op.iterate();
				self.tsne_iter_now++;
				console.log('tsne progress:', self.tsne_iter_now, '/', self.tsne_iterations);

				// Get embedding
				const coordinates = tsne_op.coordinates(false);
				const vals = coordinates.dataSync();
				const mo = tf.moments(coordinates, 0);
				self.mean = mo.mean.dataSync();
				self.std = mo.variance.sqrt().dataSync();

				for (let i = 0; i < vals.length/2; i++) {
					const index = i*2;
					const x = vals[index];
					const y = vals[index+1];
					if (isNaN(x) || isNaN(y)) {
						console.log('NaN detected');
						self.stop(true);
						return;
					}
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

	stop(restart=false) {
		const self = this;
		self.running = false;
		self.tsne_button_state = 'reset';
		self.$run_tsne_button.val('Reset');
		self.$run_tsne_button.addClass('btn-warning');
		self.$run_tsne_button.removeClass('btn-danger');

		window.dispatchEvent(update_event);

		if (restart) {
			console.log('Increment perplexity');
			tsne_config.perplexity = (tsne_config.perplexity+1) % (self.max_perplexity+1);
			self.$tsne_perplexity.val(tsne_config.perplexity);
			self.run();
		}
	}

	reset() {
		const self = this;
		self.tsne_button_state = 'run';
		self.$run_tsne_button.val('Run');
		self.$run_tsne_button.addClass('btn-light');
		self.$run_tsne_button.removeClass('btn-warning');
		self.$tsne_perplexity.prop('disabled', false);

		self.remove_selection();
		self.tsne_iter_now = 0;
		for (const e of dataset.year_data) {
			delete e.x;
			delete e.y;
		}
	}

	recalculate() {
		const self = this;
		self.width = self.$parent.innerWidth();
		self.height = self.$parent.innerHeight() - 16;
		self.display_offset = self.$canvas.offset();
		self.$canvas.attr({
			width: self.width,
			height: self.height,
		});

		// TODO: Bug hotfix
		for (const datum of dataset.year_data)
			datum.selected = false;
	}

	render() {
		const self = this;
		self.recalculate();
		self.frames++;

		// Skip if empty
		if (dataset.year_data.length === 0)
			return;

		// Draw selection
		self.context.save();
		let ssx;
		let ssy;
		let ssdx;
		let ssdy;
		if (self.has_selection()) {
			const x = Math.min(self.selection_start_x, self.selection_end_x);
			const y = Math.min(self.selection_start_y, self.selection_end_y);
			const dx = Math.abs(self.selection_end_x - self.selection_start_x);
			const dy = Math.abs(self.selection_end_y - self.selection_start_y);
			ssx = x * self.width;
			ssy = y * self.height;
			ssdx = dx * self.width;
			ssdy = dy * self.height;
			this.context.fillStyle = 'rgba(64, 255, 128, 0.2)';
			this.context.fillRect(ssx, ssy, ssdx, ssdy);
			this.context.strokeStyle = 'rgba(64, 255, 128, 0.4)';
			this.context.strokeRect(ssx, ssy, ssdx, ssdy);
		}
		function within_selection(sx, sy) {
			return (sx >= ssx) && (sy >= ssy) && (sx <= ssx+ssdx) && (sy <= ssy+ssdy);
		}
		self.context.restore();

		// Draw data
		self.context.save();
		let n_selected = 0;
		for (const e of dataset.year_data) {
			// const px = (e.x-dataset.x_min)/(dataset.x_max-dataset.x_min);
			// const py = (e.y-dataset.y_min)/(dataset.y_max-dataset.y_min);
			if (self.mean == undefined || self.std == undefined)
				break;
			const px = (e.x-self.mean[0])/(self.std[0]*6)+0.5;
			const py = (e.y-self.mean[1])/(self.std[1]*6)+0.5;

			let sx = self.width*px * (1-self.padding)+(self.width*self.padding/2);
			let sy = self.height*py * (1-self.padding)+(self.height*self.padding/2);

			// let color = colors[colors.length-1];
			let color = '#ccc';
			if (e.likely_genre_year !== 'unknown') {
				const i = dataset.sorted_genres_year.indexOf(e.likely_genre_year);
				color = colors[i];
			}

			let radius = 2;
			self.context.lineWidth = 2;
			// self.context.strokeStyle = '#222';
			self.context.strokeStyle = color;
			e.selected = false;
			if (self.has_selection() && within_selection(sx, sy)) {
				radius = 5;
				// self.context.lineWidth = 2;
				// self.context.strokeStyle = '#F22';
				e.selected = true;
				n_selected++;
			}
			if (e.marked) {
				self.context.lineWidth = 8;
				radius = 10;
			}

			self.context.beginPath();
			self.context.arc(sx, sy, radius, 0, 2*Math.PI);
			self.context.stroke();
		}
		self.context.restore();

		// Draw legend
		self.context.save();
		self.context.textAlign = 'start';
		// Other genres
		let offset_y = 60;
		let color = '#ccc';
		self.context.fillStyle = color;
		self.context.fillRect(10, offset_y-8, 10, 10);
		self.context.fillStyle = '#eee';
		self.context.fillText('unknown', 30, offset_y);
		offset_y += 20;
		// Popular genres
		for (let i = 0; i < colors.length; i++) {
			const g = dataset.sorted_genres_year[i];
			color = colors[i];
			self.context.fillStyle = color;
			self.context.fillRect(10, offset_y-8, 10, 10);
			self.context.fillStyle = '#eee';
			self.context.fillText(g, 30, offset_y);
			offset_y += 20;
		}
		self.context.restore();

		// Misc info
		self.context.save();
		self.context.fillStyle = '#eee';
		self.context.textAlign = 'end';
		self.context.fillText('FPS: '+self.fps, self.width-20, 30);
		// self.context.fillText('TSNE Max Iteration:'+self.tsne_iterations, self.width-20, 40);
		// self.context.fillText('TSNE Iteration:'+self.tsne_iter_now, self.width-20, 60);
		self.context.fillText('Data Size: '+dataset.year_data.length, self.width-20, 50);
		self.context.fillText('Selected Points: '+n_selected, self.width-20, 70);
		self.context.restore();

		// Instructions
		self.context.save();
		self.context.font = '14px sans-serif';
		self.context.fillStyle = '#aaa';
		self.context.textAlign = 'start';
		// self.context.fillText('Drag to select. Click to de-select.', self.width-20, self.height-20);
		self.context.fillText('Drag to select. Click to de-select.', 10, 30);
		self.context.restore();

		self.context.save();
		self.context.fillStyle = '#777';
		self.context.fillRect(0, 0, self.width, 4);
		const progress = (self.tsne_iter_now+1) / self.tsne_iterations;
		self.context.fillStyle = '#2EE770';
		self.context.fillRect(0, 0, self.width*progress, 4);
		self.context.restore();
	}
}

class PCoordUI {
	constructor() {
		const self = this;

		self.parent_id = '#pcoord_plot';
		self.margin = {
			top: 80,
			right: 10,
			bottom: 20,
			left: 20,
		};
		self.$parent = $(self.parent_id);

		self.attrs = [];
		self.$pcoord_select = $('#pcoord_select');
		for (const attr of pcoord_attrs) {
			if (attr !== 'duration_ms')
				self.attrs.push(attr);
			const $o = $('<option>')
				.appendTo(self.$pcoord_select)
				.val(attr)
				.text(attr);
			if (attr !== 'duration_ms')
				$o.addClass('active');
			$o.on('click', function () {
				const val = $o.val();
				if ($o.hasClass('active')) {
					$o.removeClass('active');
					const i = self.attrs.indexOf(val);
					if (i >= 0)
						self.attrs.splice(i, 1);
				}
				else {
					$o.addClass('active');
					self.attrs.push(val);
				}
				self.render.apply(self);
			});
		}

		self.render();
		window.addEventListener('update', function () {
			self.render.apply(self);
		}, false);

	}

	recalculate() {
		const self = this;
		self.width = self.$parent.innerWidth();
		self.height = self.$parent.innerHeight();
	}

	render() {
		const self = this;

		// Clear UI
		self.$parent.empty();

		self.recalculate();
		const data = dataset.year_data;
		const margin = self.margin;
		const width = self.width - margin.left - margin.right;
		const height = self.height - margin.top - margin.bottom;
		const svg = d3.select(self.parent_id)
			.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// Linear scale for each dimension
		const y = {};
		for (const attr of self.attrs) {
			// if (attr == 'duration_ms')
			// 	y[attr] = d3.scaleLog();
			// else
			// 	y[attr] = d3.scaleLinear();
			y[attr] = d3.scaleLinear();
			y[attr]
				.domain(d3.extent(data, function (d) {return +d[attr];}))
				.range([height, 0]);
		}
		const x = d3.scalePoint()
			.range([0, width])
			.padding(1)
			.domain(self.attrs);

		function path(d) {
			return d3.line()(self.attrs.map(function (p) {
				return [x(p), y[p](d[p])];
			}));
		}

		const selected_color = '#2EE770';
		const default_color = '#44F';

		// Draw lines
		svg.selectAll('my_path')
			.data(data)
			.enter()
			.append('path')
				.attr('d', path)
				.style('fill', 'none')
				// .style('stroke', '#00F')
				.style('stroke', function (d) {
					if (d.selected)
						return selected_color;
					return default_color;
				})
				.style('stroke-width', function (d) {
					// if (d.selected)
					// 	return '1.0';
					return '0.5';
				})
				.style('opacity', function (d) {
					if (d.selected)
						return '1.0';
					return '0.05';
				});

		// Draw axes
		svg.selectAll('my_axis')
			.data(self.attrs)
			.enter()
			.append('g')
				.attr('class', 'white_axis')
				.attr('transform', function (d) {
					return 'translate(' + x(d) + ')';
				})
				.each(function (d) {
					d3.select(this).call(d3.axisLeft().scale(y[d]));
				})
				.append('text')
					.attr('y', -9)
					.text(d => d)
					.attr('transform', 'rotate(-30)')
					.style('fill', '#eee')
					.style('text-anchor', 'start');
		// Draw legend
		svg.append('circle')
			.attr('cx', 0)
			.attr('cy', 40-margin.top)
			.attr('r', 6)
			.style('fill', default_color);
		svg.append('circle')
			.attr('cx', 0)
			.attr('cy', 20-margin.top)
			.attr('r', 6)
			.style('fill', selected_color);
		svg.append('text')
			.attr('x', 10)
			.attr('y', 40-margin.top)
			.text('Not Selected')
			.style('font-size', '12px')
			.style('fill', '#fff')
			.attr('alignment-baseline', 'middle');
		svg.append('text')
			.attr('x', 10)
			.attr('y', 20-margin.top)
			.text('Selected in t-SNE')
			.style('font-size', '12px')
			.style('fill', '#fff')
			.attr('alignment-baseline', 'middle');
	}
}

class TableUI {
	constructor() {
		const self = this;
		self.$parent = $('#table');
		self.$body = self.$parent.find('tbody');
		self.$table_search = $('#table_search');

		self.show_increment = 10;
		self.index = self.show_increment;
		setInterval(function () {
			const elem = self.$parent[0];
			if (elem.scrollTop >= (elem.scrollHeight-elem.offsetHeight)-1) {
				let count = 0;
				while (self.index < dataset.year_data.length && count < self.show_increment) {
					const e = dataset.year_data[self.index];
					self.index++;

					if (tsne_ui.has_selection() && !e.selected)
						continue;

					const val = self.$table_search.val().toLowerCase();
					if (val != '') {
						let artists = '';
						if (e.artists.length > 0)
							artists = e.artists.reduce((a, c) => a + ', ' + c);
						let genres = '';
						if (e.genres.length > 0)
							genres = e.genres.reduce((a, c) => a + ', ' + c);
						if (!String(e.name).toLowerCase().includes(val) && !artists.toLowerCase().includes(val) && !genres.toLowerCase().includes(val))
							continue;
					}

					count++;
					const $row = self.create_row(e);
					$row.appendTo(self.$body);
				}
			}
		}, 100);

		self.update();
		window.addEventListener('update', function () {
			self.update.apply(self);
		}, false);

		self.$table_search.on('input change', function () {
			self.update.apply(self);
		});
	}

	create_row(datum) {
		const self = this;
		// const play_button = '<a target="_blank" href="https://open.spotify.com/track/' + datum.id + '">&#9658;</a>';
		// const song = '<a target="_blank" href="https://open.spotify.com/track/' + datum.id + '">' + datum.name + '</a>';
		const $play_button = $('<a>');
		$play_button.attr('href', 'https://open.spotify.com/track/' + datum.id);
		$play_button.attr('target', '_blank');
		$play_button.html('&#9658;');
		$play_button.on('click', function () {
			player_ui.set_track(datum.id);
		});
		let artists = '';
		let genres = '';

		for (let i = 0; i < datum.artists.length; i++) {
			const a = datum.artists[i];
			artists += a;
			if (i < datum.artists.length-1)
				artists+= ', ';
		}

		for (let i = 0; i < datum.genres.length; i++) {
			const g = datum.genres[i];
			if (g == '[]')
				continue;
			genres += g;
			if (i < datum.genres.length-1)
				genres+= ', ';
		}

		const $row = $('<tr>');
		$('<td>').addClass('table_row').prop('nowrap', true).append($play_button).appendTo($row);
		// $('<td>').prop('nowrap', true).html(play_button).appendTo($row);
		// $('<td>').prop('nowrap', true).html(song).appendTo($row);
		$('<td>').addClass('table_row').prop('nowrap', true).text(datum.name).appendTo($row);
		$('<td>').addClass('table_row').prop('nowrap', true).text(artists).appendTo($row);
		$('<td>').addClass('table_row').prop('nowrap', true).text(genres).appendTo($row);
		$('<td>').addClass('table_row').prop('nowrap', true).text(datum.popularity).appendTo($row);
		$row.on('click', function () {
			player_ui.set_track(datum.id);
		});

		let last_marked = null;
		$row.on('mouseenter', function () {
			$('.table_row_highlight').removeClass('table_row_highlight');
			$row.addClass('table_row_highlight');
			datum.marked = true;
			if (last_marked && last_marked != datum)
				last_marked.marked = false;
			last_marked = datum;
			radar_ui.set_info(datum);
		});
		$row.on('mouseleave', function () {
			$row.removeClass('table_row_highlight');
			datum.marked = false;
		});

		return $row;
	}

	update() {
		const self = this;
		self.index = self.show_increment;
		self.$body.empty();
	}
}

class BarUI {
	constructor() {
		const self = this;
		self.parent_id = '#bar_chart';
		self.$parent = $(self.parent_id);
		self.$bar_group_select = $('#bar_group_select');

		self.update();
		window.addEventListener('update', function () {
			self.update.apply(self);
		}, false);

		self.$bar_group_select.on('change', function () {
			self.update.apply(self);
		});
	}

	recalculate() {
		const self = this;
		self.width = self.$parent.innerWidth();
		self.height = self.$parent.innerHeight();
	}

	update() {
		const self = this;
		self.$parent.empty();
		self.recalculate();

		const max_groups = 20;
		const type = self.$bar_group_select.val();
		const data_obj = {};
		for (const e of dataset.year_data) {
			if (tsne_ui.has_selection() && !e.selected)
				continue;

			if (type === 'genre') {
				for (const g of e.genres) {
					if (g == '[]')
						continue;
					if (!data_obj.hasOwnProperty(g))
						data_obj[g] = 0;
					data_obj[g]++;
				}
			}
			else if (type === 'artist') {
				for (const a of e.artists) {
					if (!data_obj.hasOwnProperty(a))
						data_obj[a] = 0;
					data_obj[a]++;
				}
			}
		}
		// Re-format into arr of obj
		let data = [];
		for (const k of Object.keys(data_obj)) {
			const v = data_obj[k];
			data.push({
				'key': k,
				'val': v,
			});
		}

		// Sort bars by value
		data = data.sort(function (a, b) {
			return d3.descending(a.val, b.val);
		});
		data = data.splice(0, max_groups);

		const margin = {
			top: 15,
			right: 25,
			bottom: 50,
			left: 175,
		};
		const width = self.width;
		const height = self.height;

		const svg = d3.select(self.parent_id)
			.append('svg')
			.attr('viewBox', [0, 0, width, height]);

		const x = d3.scaleLinear()
			.domain([0, d3.max(data, d => d.val)])
			.range([margin.left, width - margin.right]);
		const y = d3.scaleBand()
			.domain(data.map(d => d.key))
			.rangeRound([margin.top, height - margin.bottom])
			.padding(0.1);

		svg.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('x', d => x(0))
			.attr('y', d => y(d.key))
			.attr('height', y.bandwidth())
			.attr('width', d =>  x(d.val) - x(0))
			.attr('fill', '#2EE770')
			.attr('stroke', '#4EF790');

		const xAxis = g => g
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.attr('class', 'white_axis')
			.call(d3.axisBottom(x).ticks(3, 'd'));
		const yAxis = g => g
			.attr('transform', `translate(${margin.left},0)`)
			.attr('class', 'white_axis')
			.call(d3.axisLeft(y));
		svg.append('g')
			.call(xAxis);
		svg.append('text')
			.attr('x', (width-margin.right-margin.left)/2 + margin.left)
			.attr('y', height - margin.bottom + 40)
			.attr('text-anchor', 'middle')
			.style('fill', 'white')
			.text('Count');
		svg.append('g')
			.attr('class', 'white_axis')
			.call(yAxis);
	}
}

class PlayerUI {
	constructor() {
		const self = this;
		self.$frame = $('#spotify_frame');
		self.$parent = $('#spotify_pane');
		self.$play_pane = $('.play_pane');
		self.src_template = 'https://open.spotify.com/embed/track/';

		self.update();
		window.addEventListener('update', function () {
			self.update.apply(self);
		}, false);

		self.$frame[0].onload = function () {
			setTimeout(function () {
				// self.$frame.contentWindow.document.querySelector('[title="Play"]').click();
				// $('button[title="Play"]')[0].click();
				self.$frame.contents().find('button[title="Play"]').click();
			}, 1000);
		};
	}

	set_track(id) {
		const self = this;
		self.$frame.attr('src', self.src_template + id);
	}

	recalculate() {
		const self = this;
		self.width = self.$parent.innerWidth();
		// self.height = self.$parent.innerHeight();
		self.height = self.$play_pane.innerHeight();
	}

	update() {
		const self = this;
		self.recalculate();
		self.$frame.attr('width', self.width);
		self.$frame.attr('height', self.height);
	}
}

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	scale(s) {
		return new Vector(this.x * s, this.y * s);
	}

	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}

	sub(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}

	mul(v) {
		return new Vector(this.x * v.x, this.y * v.y);
	}

	div(v) {
		return new Vector(this.x / v.x, this.y / v.y);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}

class RadarUI {
	constructor() {
		const self = this;

		// Initialize canvas
		self.padding = 0.05;
		self.$window = $(window);
		self.$parent = $('#radar_plot');
		self.$canvas = $('<canvas>').appendTo(self.$parent);
		self.context = self.$canvas[0].getContext('2d');
		self.frames = 0;
		self.fps = 0;

		// Get vectors for each axis
		const n = radar_attrs.length;
		const angle = 2*Math.PI / n;
		self.vectors = [];
		let current_angle = 0;
		for (let i = 0; i < n; i++) {
			const x = Math.cos(current_angle);
			const y = Math.sin(current_angle);
			self.vectors.push(new Vector(x, y));
			current_angle += angle;
			// console.log(i, x, y);
		}

		setInterval(self.render.bind(self), 15);
		setInterval(function () {
			self.fps = self.frames;
			self.frames = 0;
		}, 1000);
	}

	set_info(datum) {
		const self = this;
		const arr = [];
		for (const i in tsne_attrs) {
			const attr = tsne_attrs[i];
			if (!radar_attrs.includes(attr))
				continue;
			const min = dataset.min[i];
			const max = dataset.max[i];
			const val = (datum[attr]-min)/(max-min);
			// console.log(attr, min, max, datum[attr]);
			arr.push(val);
		}
		self.info = arr;
	}

	recalculate() {
		const self = this;
		self.width = self.$parent.innerWidth();
		self.height = self.$parent.innerHeight() - 16;
		self.$canvas.attr({
			width: self.width,
			height: self.height,
		});
	}

	render() {
		const self = this;
		self.frames++;
		self.recalculate();

		self.context.save();
		self.context.fillStyle = '#333';
		self.context.textAlign = 'end';
		self.context.fillText('FPS: '+self.fps, self.width-20, 20);
		self.context.restore();

		function vec_to_screen(v) {
			const padding = 0.05;
			const factor = Math.min(self.width, self.height);
			const max = Math.max(self.width, self.height);
			const offset = (max-factor)/2;
			let x = v.x*factor/2 + factor/2;
			let y = v.y*factor/2 + factor/2;
			x *= (1-padding);
			y *= (1-padding);
			x += padding*factor/2;
			y += padding*factor/2;
			if (self.width > self.height)
				x += offset;
			else
				y += offset;
			return new Vector(x, y);
		}

		self.context.save();
		self.context.fillStyle = '#222';
		self.context.beginPath();
		let last_vec = self.vectors[self.vectors.length-1];
		last_vec = vec_to_screen(last_vec);
		self.context.moveTo(last_vec.x, last_vec.y);
		for (let p of self.vectors) {
			p = vec_to_screen(p);
			self.context.lineTo(p.x, p.y);
			// console.log(p.x, p.y);
		}
		self.context.closePath();
		self.context.fill();
		self.context.restore();

		if (self.info) {
			const ps = [];
			self.context.save();
			for (const i in self.info) {
				const val = self.info[i];
				const vec = self.vectors[i];
				const pos = vec.scale(val);
				const v = vec_to_screen(pos);
				ps.push(v);
				self.context.strokeStyle = '#2EE770';
				self.context.beginPath();
				self.context.arc(v.x, v.y, 4, 0, 2*Math.PI);
				self.context.stroke();
			}
			self.context.restore();

			self.context.save();
			self.context.fillStyle = 'rgba(128, 255, 128, 0.5)';
			self.context.beginPath();
			let last_vec = ps[ps.length-1];
			self.context.moveTo(last_vec.x, last_vec.y);
			for (const p of ps)
				self.context.lineTo(p.x, p.y);
			self.context.closePath();
			self.context.fill();
			self.context.restore();
		}

		const n = radar_attrs.length;
		const a = 2*Math.PI/n;
		const origin = vec_to_screen(new Vector(0, 0));
		for (let i = 0; i < n; i++) {
			const attr = radar_attrs[i];
			const angle = a*i;
			self.context.save();
			self.context.fillStyle = '#eee';
			self.context.translate(origin.x, origin.y);
			self.context.rotate(angle);
			self.context.textAlign = 'start';
			self.context.fillText(attr, 40, 0);
			self.context.restore();
		}

		// self.context.save();
		// self.context.fillStyle = '#eee';
		// self.context.textAlign = 'middle';
		// self.context.fillText('TODO', self.width/2, self.height/2);
		// self.context.restore();
	}
}

let dataset;
let tsne_ui;
let pcoord_ui;
let table_ui;
let bar_ui;
let player_ui;
let radar_ui;

function run_tsne() {
	tsne_ui.stop();
	tsne_ui.reset();
	setTimeout(function () {
		tsne_ui.run();
	}, 1000);
}

function initialize_ui() {
	tsne_ui = new TsneUI();
	pcoord_ui = new PCoordUI();
	table_ui = new TableUI();
	bar_ui = new BarUI();
	player_ui = new PlayerUI();
	radar_ui = new RadarUI();

	// Window resized
	const $window = $(window);
	let window_width = $window.width();
	let window_height = $window.height();
	setInterval(function () {
		const width = $window.width();
		const height = $window.height();
		if (window_width !== width || window_height !== height) {
			window.dispatchEvent(update_event);
			window_width = width;
			window_height = height;
		}
	}, 10);

	const $year_filter = $('#year_filter');
	const year = 1968;
	// Create year select node
	for (let i = dataset.year_range[0]; i <= dataset.year_range[1]; i++) {
		let end_year = i + dataset.year_window;
		if (end_year > dataset.year_range[1])
			end_year = dataset.year_range[1];
		const $elem = $('<option>')
			.appendTo($year_filter)
			.val(i)
			.text(i + ' - ' + end_year);
		// if (i === dataset.year_range[1])
		if (i === year)
			$elem.prop('selected', true);
	}
	// Filter year
	$year_filter.on('change', function () {
		const val = $year_filter.val();
		dataset.year_start = Number(val);
		dataset.year_end = dataset.year_start + dataset.year_window;
		dataset.update.apply(dataset);
		console.log('year_data size:', dataset.year_data.length);

		run_tsne();
	});

	// First run
	dataset.year_start = year;
	dataset.year_end = year + dataset.year_window;
	dataset.update();

	run_tsne();

	player_ui.set_track(dataset.year_data[0].id);
	player_ui.update();
	radar_ui.set_info(dataset.year_data[0]);
}

function main() {
	dataset = new Dataset();
	dataset.load()
		.then(function () {
			$('.page.blurred').removeClass('blurred');
			$('#loading').addClass('hidden');
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
	const tsne_url = '/javascripts/tsne.js';
	// const tfjs_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.14.1';
	const tfjs_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@0.14.3';
	// const tsne_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tsne@0.2.0';

	get_script(tfjs_url)
		.then(function () {
			console.log('tfjs ready');

			// const a = tf.randomUniform([2000, 10]);
			// a.min().print();
			// a.max().print();
			// console.log(a.min(), a.max());

			// const mo = tf.moments(a, 1, true);
			// const mean = mo.mean;
			// const std = mo.variance.sqrt();
			// const b = a.sub(mean);
			// const c = b.div(std);

			return get_script(tsne_url);
		})
		.then(function () {
			console.log('tsne ready');
			main();
		})
		.catch(console.log);
});
