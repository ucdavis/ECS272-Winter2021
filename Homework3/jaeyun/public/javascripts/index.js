/*
Copyright 2021 Jaewan Yun <jaeyun@ucdavis.edu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// const spotify_data_url = '/uploads/spotify/data.csv';
// const genre_data_url = '/uploads/spotify/data_w_genres.csv';
const spotify_data_url = 'https://raw.githubusercontent.com/Jaewan-Yun/spotify_dataset/master/data.csv';
const genre_data_url = 'https://raw.githubusercontent.com/Jaewan-Yun/spotify_dataset/master/data_w_genres.csv';

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

const default_perplexity = 32;
const default_tsne_iterations = 100;
const default_knn_iterations = 200;
const year_window = 4;
const max_zoom = 20;
const year = 1971;//1967;

const tsne_config = {
	'perplexity': default_perplexity,
	'verbose': false,
	'exaggeration': 4,
	'exaggerationIter': 25,
	'exaggerationDecayIter': 20,
	'momentum': 0.8,
	'applyGain': false,
	'knnMode': 'auto', // 'auto' | 'bruteForce'
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

function lerp(a, b, i) {
	return (1-i)*a + i*b;
}

function cerp(a, b, i) {
	const mu = (1 - Math.cos(i*Math.PI))/2;
	return (a*(1-mu)) + (b*mu);
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

class Dataset {
	constructor() {
		const self = this;
		self.data = [];
		self.year_data = [];
		self.year_range = [];
		self.year_start = null;
		self.year_end = null;
		self.year_window = year_window;
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
		return d3.csv(genre_data_url, d3.autoType)
			.then(function (data_w_genres) {
				// Parse genres array string
				const artists_genres = {};
				const genres_count_all = {};
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
						if (!genres_count_all.hasOwnProperty(g))
							genres_count_all[g] = 0;
						genres_count_all[g]++;
					}
				}
				// console.log(data_w_genres);

				const sorted_genres = Object.keys(genres_count_all).sort(function (a, b) {
					return genres_count_all[b] - genres_count_all[a];
				});
				// for (const g of sorted_genres)
				// 	console.log(g, ':', genres_count_all[g]);
				// console.log('genres sorted by all-time popularity', sorted_genres);

				return new Promise(function (resolve, reject) {
					d3.csv(spotify_data_url, d3.autoType)
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
				const val = e[attr];
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

		self.min = a.min(0, false);
		self.max = a.max(0, false);
		const tensor = a.sub(self.min).div(self.max.sub(self.min));
		self.min = self.min.dataSync();
		self.max = self.max.dataSync();

		// Aux info
		const mo = tf.moments(a, 0, false);
		self.mean = mo.mean.dataSync();
		self.std = mo.variance.sqrt().dataSync();

		return tensor;
	}
}

class TsneUI {
	constructor() {
		const self = this;

		// Animation queue
		self.camera_animations = [];

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
		self.padding = 0;//0.05;
		self.$window = $(window);
		self.$parent = $('#scatter_plot');
		self.$canvas = $('<canvas>').attr('id', 'tsne_canvas').appendTo(self.$parent);
		self.context = self.$canvas[0].getContext('2d');
		self.frames = 0;
		self.fps = 0;
		setInterval(self.render.bind(self), 15);
		setInterval(function () {
			self.fps = self.frames;
			self.frames = 0;
		}, 1000);
		self.recalculate();
		self.remove_selection();

		// Camera
		self.camera = new Vector(0, 0);
		self.zoom = 1;

		// Remove right click context menu
		this.$parent[0].addEventListener('contextmenu', function (e) {
			e.preventDefault();
		});

		// Mouse click
		this.$parent.on('mousedown', function (e) {
			const x = Math.ceil(e.pageX-self.display_offset.left);
			const y = Math.ceil(e.pageY-self.display_offset.top);

			if (e.button == 0) {
				// Left click
				self.remove_selection.apply(self);
				self.is_selecting = true;
				self.selection_start_x = (x/self.width-0.5)/self.zoom+0.5+self.camera.x;
				self.selection_start_y = (y/self.height-0.5)/self.zoom+0.5+self.camera.y;
			}
			else if (e.button == 2) {
				// Right click
				self.is_panning = true;
				self.pan_start_x = x / self.width;
				self.pan_start_y = y / self.height;
			}
		});
		this.$parent.on('mouseup', function (e) {
			const x = Math.ceil(e.pageX-self.display_offset.left);
			const y = Math.ceil(e.pageY-self.display_offset.top);

			if (e.button == 0) {
				self.is_selecting = false;
				self.selection_end_x = (x/self.width-0.5)/self.zoom+0.5+self.camera.x;
				self.selection_end_y = (y/self.height-0.5)/self.zoom+0.5+self.camera.y;

				// Remove selection if end is close to start
				const dx = Math.abs(self.selection_end_x - self.selection_start_x);
				const dy = Math.abs(self.selection_end_y - self.selection_start_y);
				if (dx+dy < 0.02) {
					self.remove_selection.apply(self);
				}
				else {
					// Animate to center
					const center_x = ((self.selection_start_x-0.5)+(self.selection_end_x-0.5))/2;
					const center_y = ((self.selection_start_y-0.5)+(self.selection_end_y-0.5))/2;
					if (!self.running) {
						// Clear competing animations
						self.clear_animations.apply(self);
						self.animate_camera.apply(self, [center_x, center_y, 4.5]);
					}
				}

				window.dispatchEvent(update_event);
			}
			else if (e.button == 2) {
				self.is_panning = false;
				self.pan_start_x = x / self.width;
				self.pan_start_y = y / self.height;
			}

			self.render();
		});
		this.$parent.on('mousemove', function (e) {
			const x = Math.ceil(e.pageX-self.display_offset.left);
			const y = Math.ceil(e.pageY-self.display_offset.top);

			if (self.is_selecting) {
				self.selection_end_x = (x/self.width-0.5)/self.zoom+0.5+self.camera.x;
				self.selection_end_y = (y/self.height-0.5)/self.zoom+0.5+self.camera.y;
			}

			if (self.is_panning) {
				self.pan_end_x = x / self.width;
				self.pan_end_y = y / self.height;
				const dx = self.pan_end_x - self.pan_start_x;
				const dy = self.pan_end_y - self.pan_start_y;
				self.pan_start_x = self.pan_end_x;
				self.pan_start_y = self.pan_end_y;
				self.pan.apply(self, [dx, dy]);
			}
		});

		// Mouse wheel
		$(window).bind('mousewheel DOMMouseScroll', function (e) {
			// Listen only in tsne canvas
			if (e.target.id !== 'tsne_canvas')
				return;

			if (self.running)
				return;

			const x = Math.ceil(e.pageX-self.display_offset.left);
			const y = Math.ceil(e.pageY-self.display_offset.top);

			if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
				self.zoom_in.apply(self, [x, y]);
			else
				self.zoom_out.apply(self, [x, y]);
		});

		// Event
		window.addEventListener('update', function () {
			self.$canvas.attr({
				width: 0,
				height: 0,
			});
		}, false);
	}

	clear_animations() {
		const self = this;
		if (self.cam_reset_animation != null) {
			clearInterval(self.cam_reset_animation);
			self.cam_reset_animation = null;
		}
		if (self.marker_pan_anim != null) {
			clearInterval(self.marker_pan_anim);
			self.marker_pan_anim = null;
		}
		for (const animation_id of self.camera_animations)
			clearInterval(animation_id);
		self.camera_animations = [];
	}

	remove_animation(animation_id) {
		const self = this;
		clearInterval(animation_id);
		// Remove from queue
		const i = self.camera_animations.indexOf(animation_id);
		if (i > -1)
			self.camera_animations.splice(i, 1);
	}

	animate_camera(x=null, y=null, z=null, duration=2000) {
		const self = this;
		let deltas = 0;
		let last_time = Date.now();
		const animation_id = setInterval(function () {
			const this_time = Date.now();
			deltas += this_time - last_time;
			last_time = this_time;

			let i = deltas / duration;
			if (i > 1)
				i = 1;

			if (x != null)
				self.camera.x = lerp(self.camera.x, x, i);
			if (y != null)
				self.camera.y = lerp(self.camera.y, y, i);
			if (z != null)
				self.zoom = cerp(self.zoom, z, i);

			if (i == 1 || (x == null || self.camera.x == x) && (y == null || self.camera.y == y) && (z == null || self.zoom == z))
				self.remove_animation.apply(self, [animation_id]);
		}, 15);
		self.camera_animations.push(animation_id);
		return animation_id;
	}

	pan(dx, dy) {
		const self = this;
		if (dx == 0 && dy == 0)
			return;

		// Clear competing marker animation
		self.clear_animations();

		// Zoomed panning
		const pdx = dx/self.zoom;
		const pdy = dy/self.zoom;
		self.camera.x -= pdx;
		self.camera.y -= pdy;

		// Constrained panning
		if (self.camera.x < -0.5)
			self.camera.x = -0.5;
		if (self.camera.x > 0.5)
			self.camera.x = 0.5;
		if (self.camera.y < -0.5)
			self.camera.y = -0.5;
		if (self.camera.y > 0.5)
			self.camera.y = 0.5;
	}

	// TODO: zoom in at mouse position, not cam position
	zoom_in(x, y) {
		const self = this;

		// Clear competing marker animation
		self.clear_animations();

		self.zoom += 0.1;
		self.zoom *= 1.05;
		if (self.zoom > max_zoom)
			self.zoom = max_zoom;
	}

	zoom_out(x, y) {
		const self = this;

		// Clear competing marker animation
		self.clear_animations();

		self.zoom /= 1.05;
		self.zoom -= 0.1;
		if (self.zoom < 1)
			self.zoom = 1;
	}

	has_selection() {
		const self = this;
		return self.selection_start_x != null && self.selection_start_y != null && self.selection_end_x != null && self.selection_end_y != null;
	}

	remove_selection() {
		const self = this;
		self.is_selecting = false;
		self.selection_start_x = null;
		self.selection_start_y = null;
		self.selection_end_x = null;
		self.selection_end_y = null;

		// Clear data
		for (const e of dataset.year_data)
			e.selected = false;
	}

	run() {
		const self = this;
		self.running = true;
		self.tsne_button_state = 'stop';
		self.$run_tsne_button.val('Stop');
		self.$run_tsne_button.addClass('btn-danger');
		self.$run_tsne_button.removeClass('btn-light');
		self.$tsne_perplexity.prop('disabled', true);

		// Reset camera
		self.clear_animations();
		self.camera = new Vector(0, 0);
		self.zoom = max_zoom;

		// Constrained perplexity
		if (tsne_config.perplexity > self.max_perplexity) {
			console.log('Perplexity cannot be greater than', self.max_perplexity, 'on this machine');
			tsne_config.perplexity = self.max_perplexity;
		}
		if (tsne_config.perplexity < 4)
			tsne_config.perplexity = 4;
		self.$tsne_perplexity.val(tsne_config.perplexity);
		// Send data
		const data = dataset.get_tsne_tensor();
		const tsne_op = tsne.tsne(data, tsne_config);

		async function iterate_tsne() {
			await tsne_op.iterateKnn(default_knn_iterations);

			$('#loading').addClass('hidden');
			self.$run_tsne_button.prop('disabled', false);

			for (let i = 0; i < self.tsne_iterations; ++i) {
				if (!self.running)
					return;
				// Iterate once
				await tsne_op.iterate();
				self.tsne_iter_now++;
				// console.log('tsne progress:', self.tsne_iter_now, '/', self.tsne_iterations);

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

				// // Find range
				// dataset.x_min = dataset.year_data[0].x;
				// dataset.x_max = dataset.year_data[0].x;
				// dataset.y_min = dataset.year_data[0].y;
				// dataset.y_max = dataset.year_data[0].y;
				// for (const e of dataset.year_data) {
				// 	if (dataset.x_min > e.x)
				// 		dataset.x_min = e.x;
				// 	if (dataset.x_max < e.x)
				// 		dataset.x_max = e.x;
				// 	if (dataset.y_min > e.y)
				// 		dataset.y_min = e.y;
				// 	if (dataset.y_max < e.y)
				// 		dataset.y_max = e.y;
				// }

				// Update selection window for pcoord
				if (i % 26 && self.has_selection())
					window.dispatchEvent(update_event);

				// Keep zoomed in to increase performance
				self.clear_animations();
				self.zoom = max_zoom;
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

		// NaN encountered during learning
		if (restart) {
			console.log('Increment perplexity');
			tsne_config.perplexity = (tsne_config.perplexity+1) % (self.max_perplexity+1);
			self.$tsne_perplexity.val(tsne_config.perplexity);
			self.run();
		}

		// Animate to center no zoom
		self.clear_animations();
		self.animate_camera(0, 0, 1);

		window.dispatchEvent(update_event);
	}

	reset() {
		const self = this;
		self.tsne_button_state = 'run';
		self.$run_tsne_button.val('Run');
		self.$run_tsne_button.addClass('btn-light');
		self.$run_tsne_button.removeClass('btn-warning');
		self.$tsne_perplexity.prop('disabled', false);

		self.remove_selection.apply(self);
		self.tsne_iter_now = 0;
		for (const e of dataset.year_data) {
			delete e.x;
			delete e.y;
		}

		window.dispatchEvent(update_event);
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
	}

	render() {
		const self = this;
		self.recalculate();
		self.frames++;

		// Skip if empty
		if (dataset.year_data.length === 0)
			return;

		// Draw selection
		let ssx;
		let ssy;
		let ssdx;
		let ssdy;
		if (self.has_selection()) {
			let px = (Math.min(self.selection_start_x, self.selection_end_x)-0.5-self.camera.x)*self.zoom+0.5;
			let py = (Math.min(self.selection_start_y, self.selection_end_y)-0.5-self.camera.y)*self.zoom+0.5;
			ssx = px * self.width;
			ssy = py * self.height;

			let dx = Math.abs(self.selection_end_x - self.selection_start_x);
			let dy = Math.abs(self.selection_end_y - self.selection_start_y);
			ssdx = dx * self.width * self.zoom;
			ssdy = dy * self.height * self.zoom;

			self.context.save();
			this.context.fillStyle = 'rgba(64, 255, 128, 0.2)';
			this.context.fillRect(ssx, ssy, ssdx, ssdy);
			this.context.strokeStyle = 'rgba(64, 255, 128, 0.4)';
			this.context.strokeRect(ssx, ssy, ssdx, ssdy);
			self.context.restore();
		}

		function within_selection(sx, sy) {
			return (sx >= ssx) && (sy >= ssy) && (sx <= ssx+ssdx) && (sy <= ssy+ssdy);
		}

		function draw_circle(x, y, r, genre, outline=null, animated=false) {
			let radius = r;
			if (animated) {
				let delta = (Date.now()-self.highlight_time)/500;
				if (delta > 1)
					delta = 1;
				if (delta < 0.01)
					delta = 0.01;
				radius = cerp(current_radius, r, delta);
			}
			self.context.save();
			self.context.fillStyle = '#999';
			if (genre !== 'unknown')
				self.context.fillStyle = colors[dataset.sorted_genres_year.indexOf(genre)];
			self.context.beginPath();
			self.context.arc(x, y, radius, 0, 2*Math.PI);
			if (outline != null) {
				self.context.lineWidth = 3;
				self.context.strokeStyle = outline;
				self.context.stroke();
			}
			self.context.fill();
			self.context.restore();
		}

		// Marked from table
		let mark = null;
		let marks = [];
		let marked_artists = [];
		if (dataset.marked_artists != null)
			marked_artists = dataset.marked_artists;

		// Draw data
		const current_radius = Math.ceil((self.zoom)/3)+1;
		const zscore = 3;
		let n_selected = 0;
		for (const e of dataset.year_data) {
			// const px = (e.x-dataset.x_min)/(dataset.x_max-dataset.x_min);
			// const py = (e.y-dataset.y_min)/(dataset.y_max-dataset.y_min);
			if (self.mean == undefined || self.std == undefined)
				break;

			let px = ((e.x-self.mean[0])/(self.std[0]*zscore*2)-self.camera.x)*self.zoom+0.5;
			let py = ((e.y-self.mean[1])/(self.std[1]*zscore*2)-self.camera.y)*self.zoom+0.5;
			let sx = self.width*px*(1-self.padding)+(self.width*self.padding/2);
			let sy = self.height*py*(1-self.padding)+(self.height*self.padding/2);

			// Opacity based on popularity
			// if (e.opacity == null)
			// 	e.opacity = Math.ceil(255*(e.popularity/100)).toString(16);
			// let opacity = e.opacity;

			// Set selected property
			let radius = current_radius;
			e.selected = false;
			if (self.has_selection() && within_selection(sx, sy)) {
				radius += 2;
				e.selected = true;
				n_selected++;
				// opacity = 'FF';
				// self.context.lineWidth = 2;
			}

			draw_circle(sx, sy, radius, e.likely_genre_year);

			// Draw marked songs later
			let match = false;
			for (const a of marked_artists) {
				for (const b of e.artists) {
					if (a == b) {
						match = true;
						break;
					}
				}
				if (match)
					break;
			}
			if (match)
				marks.push(e);
			if (e.marked)
				mark = e;
		}


		// Hovered on a row in table
		if (mark != null) {
			// Animate to marker
			if (!self.running) {
				if (self.last_mark == null)
					self.last_mark = mark;
				// Determine if current animation, if any, should be removed
				let is_new_animation = (self.last_mark.id != mark.id);
				if (self.last_marks != null && self.last_marks.length == marks.length) {
					for (const i in marks)
						if (self.last_marks[i] != marks[i])
							is_new_animation = true;
				}
				else {
					is_new_animation = true;
				}
				if (is_new_animation) {
					self.last_mark = mark;
					self.last_marks = marks;
					// Marker highlighting animation timer
					self.highlight_time = Date.now();
					// Target camera coordinates and zoom
					const target_x = (mark.x-self.mean[0])/(self.std[0]*zscore*2);
					const target_y = (mark.y-self.mean[1])/(self.std[1]*zscore*2);
					let target_zoom = 3;
					if (self.has_selection())
						target_zoom = 5;
					if (marks.length > 0)
						target_zoom = 1.5;
					// Start animation
					self.clear_animations();
					self.animate_camera(target_x, target_y, target_zoom);
				}
			}

			// Hovered on artist column in table
			if (marks.length > 0) {
				for (const m of marks) {
					if (m == mark)
						continue;
					const px = ((m.x-self.mean[0])/(self.std[0]*zscore*2)-self.camera.x)*self.zoom+0.5;
					const py = ((m.y-self.mean[1])/(self.std[1]*zscore*2)-self.camera.y)*self.zoom+0.5;
					const sx = self.width*px*(1-self.padding)+(self.width*self.padding/2);
					const sy = self.height*py*(1-self.padding)+(self.height*self.padding/2);
					draw_circle(sx, sy, current_radius+8, m.likely_genre_year, '#000', true);
				}
			}

			const px = ((mark.x-self.mean[0])/(self.std[0]*zscore*2)-self.camera.x)*self.zoom+0.5;
			const py = ((mark.y-self.mean[1])/(self.std[1]*zscore*2)-self.camera.y)*self.zoom+0.5;
			const sx = self.width*px*(1-self.padding)+(self.width*self.padding/2);
			const sy = self.height*py*(1-self.padding)+(self.height*self.padding/2);
			draw_circle(sx, sy, current_radius+8, mark.likely_genre_year, '#fff', true);
		}


		// Draw legend
		self.context.save();
		self.context.textAlign = 'start';
		let offset_y = 100;
		// Other genres
		let color = '#999';
		self.context.fillStyle = color;
		self.context.fillRect(10, offset_y-8, 10, 10);
		self.context.fillStyle = '#eee';
		self.context.fillText('other / unknown', 30, offset_y);
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
		self.context.fillText('Data Size: '+dataset.year_data.length, self.width-20, 50);
		self.context.fillText('Selected Points: '+n_selected, self.width-20, 70);
		self.context.restore();

		// Instructions
		self.context.save();
		self.context.font = '14px sans-serif';
		self.context.fillStyle = '#aaa';
		self.context.textAlign = 'start';
		self.context.fillText('Left mouse drag to select.', 10, 30);
		self.context.fillText('Right mouse drag to pan.', 10, 50);
		self.context.fillText('Mouse wheel to zoom.', 10, 70);
		self.context.restore();

		self.context.save();
		self.context.fillStyle = '#777';
		self.context.fillRect(0, 0, self.width, 6);
		self.context.fillStyle = '#2EE770';
		const progress = (self.tsne_iter_now+1) / self.tsne_iterations;
		self.context.fillRect(0, 0, self.width*progress, 6);
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

		self.selected_color = '#2EE770';
		self.default_color = '#44F';

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

	set_info(datum, is_artist) {
		const self = this;

		if (is_artist) {
			const artists = datum.artists;
			for (const a of artists)
				for (const d of dataset.year_data)
					if (d.artists.includes(a))
						d.pcoord_marked = true;
					else
						d.pcoord_marked = false;
		}

		self.svg.selectAll('.all_path')
			.transition()
			.duration(500)
			.style('stroke', function (d) {
				if (d.pcoord_marked)
					return 'rgb(255, 64, 64)';
				return self.default_color;
			})
			.style('stroke-width', function (d) {
				if (d.pcoord_marked)
					return '1.0';
				return '0.5';
			})
			.style('opacity', function (d) {
				if (d.pcoord_marked)
					return '1.0';
				return '0.1';
			});

		// function path(d) {
		// 	return d3.line()(self.attrs.map(function (p) {
		// 		return [self.x(p), self.y[p](d[p])];
		// 	}));
		// }

		// // Draw lines
		// self.svg.selectAll('.marked_path')
		// 	.data(data)
		// 	.enter()
		// 	.append('path')
		// 		.attr('d', path)
		// 		.attr('class', 'marked_path')
		// 		.style('fill', 'none')
		// 		.style('stroke-width', '1.0')
		// 		.style('stroke', 'rgb(255, 64, 64)')
		// 		.style('opacity', '1.0');

		// self.svg.selectAll('.marked_path')
		// 	.exit()
		// 	.remove();

		// // Animation
		// const timing = 1000 / data.length;
		// self.svg.selectAll('.marked_path')
		// 	.transition()
		// 	.duration(500)
		// 	.style('stroke-width', '1.0')
		// 	.style('stroke', 'rgb(255, 64, 64)')
		// 	.style('opacity', '1.0')
		// 	.delay((d, i) => i * timing);
	}

	render() {
		const self = this;

		// Clear UI
		self.$parent.empty();

		self.recalculate();

		// Sort data by selection so selections get drawn top
		const all_data = dataset.year_data;
		// for (const d of dataset.year_data)
		// 	if (!d.selected)
		// 		data.push(d);
		const selected_data = [];
		for (const d of dataset.year_data)
			if (d.selected)
				selected_data.push(d);

		const margin = self.margin;
		const width = self.width - margin.left - margin.right;
		const height = self.height - margin.top - margin.bottom;
		self.svg = d3.select(self.parent_id)
			.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// Linear scale for each dimension
		self.y = {};
		for (const attr of self.attrs) {
			if (attr == 'duration_ms')
				self.y[attr] = d3.scaleLog();
			else
				self.y[attr] = d3.scaleLinear();
			// self.y[attr] = d3.scaleLinear();
			self.y[attr]
				.domain(d3.extent(all_data, function (d) {return +d[attr];}))
				.range([height, 0]);
		}
		self.x = d3.scalePoint()
			.range([0, width])
			.padding(1)
			.domain(self.attrs);

		function path(d) {
			return d3.line()(self.attrs.map(function (p) {
				return [self.x(p), self.y[p](d[p])];
			}));
		}

		// Draw lines
		self.all_path = self.svg.selectAll('all_path')
			.data(all_data)
			.enter()
			.append('path')
				.attr('d', path)
				.attr('class', 'all_path')
				.style('fill', 'none')
				.style('stroke-width', '0.5')
				.style('stroke', self.default_color)
				.style('opacity', '0.1');

		// Draw lines
		self.svg.selectAll('selected_path')
			.data(selected_data)
			.enter()
			.append('path')
				.attr('d', path)
				.attr('class', 'selected_path')
				.style('fill', 'none')
				.style('stroke-width', '0')
				.style('stroke', self.default_color)
				.style('opacity', '0');

		// Animation
		const timing = 1000 / selected_data.length;
		self.svg.selectAll('.selected_path')
			.transition()
			.duration(1000)
			.style('stroke-width', '1.0')
			.style('stroke', self.selected_color)
			.style('opacity', '1.0')
			.delay((d, i) => i * timing);

		// Draw axes
		self.svg.selectAll('my_axis')
			.data(self.attrs)
			.enter()
			.append('g')
				.attr('class', 'white_axis')
				.attr('transform', function (d) {
					return 'translate(' + self.x(d) + ')';
				})
				.each(function (d) {
					d3.select(this).call(d3.axisLeft().scale(self.y[d]));
				})
				.append('text')
					.attr('y', -9)
					.text(d => d)
					.attr('transform', 'rotate(-30)')
					.style('fill', '#eee')
					.style('text-anchor', 'start');
		// Draw legend
		self.svg.append('rect')
			.attr('x', -10)
			.attr('y', 10-margin.top)
			.attr('width', 10)
			.attr('height', 10)
			.style('fill', self.default_color);
		self.svg.append('rect')
			.attr('x', -10)
			.attr('y', 30-margin.top)
			.attr('width', 10)
			.attr('height', 10)
			.style('fill', self.selected_color);
		self.svg.append('text')
			.attr('x', 10)
			.attr('y', 15-margin.top)
			.text('Songs from '+dataset.year_start+' to '+dataset.year_end)
			.style('font-size', '11px')
			.style('fill', '#fff')
			.attr('alignment-baseline', 'middle');
		self.svg.append('text')
			.attr('x', 10)
			.attr('y', 35-margin.top)
			.text('Songs selected in t-SNE')
			.style('font-size', '11px')
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
		const elem = self.$parent[0];
		setInterval(function () {
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
						// let genres = '';
						// if (e.genres.length > 0)
						// 	genres = e.genres.reduce((a, c) => a + ', ' + c);
						if (!String(e.name).toLowerCase().includes(val) && !artists.toLowerCase().includes(val))// && !genres.toLowerCase().includes(val))
							continue;
					}

					count++;
					self.create_row(e)
						.hide()
						.appendTo(self.$body)
						.fadeIn(800);
				}
			}
		}, 100);

		self.update();
		window.addEventListener('update', function () {
			self.update.apply(self);
			// Clear search bar
			self.$table_search.val('');
		}, false);

		self.$table_search.on('input change', function () {
			self.update.apply(self);
		});
	}

	create_row(datum) {
		const self = this;

		// Open spotify button
		const $spotify_button = $('<a>')
			.attr('href', 'https://open.spotify.com/track/' + datum.id)
			.attr('target', '_blank')
			.addClass('spotify_button')
			// .html('&#9658;')
			.html('&#9825;')
			.on('click', function () {
				player_ui.set_track(datum.id);
			});

		// Build artist string
		let artists = '';
		for (let i = 0; i < datum.artists.length; i++) {
			const a = datum.artists[i];
			artists += a;
			if (i < datum.artists.length-1)
				artists+= ', ';
		}

		// // Build genres string
		// let genres = '';
		// for (let i = 0; i < datum.genres.length; i++) {
		// 	const g = datum.genres[i];
		// 	if (g == '[]')
		// 		continue;
		// 	genres += g;
		// 	if (i < datum.genres.length-1)
		// 		genres+= ', ';
		// }

		// Build popularity html representation
		const max_bars = 10;
		const n_bars = Math.ceil(max_bars*datum.popularity/100);
		let pop_html = '';
		for (let i = 0; i < max_bars; i++) {
			if (i >= n_bars)
				pop_html += '&#9647;';
			else
				pop_html += '&#9646;';
		}

		const $row = $('<tr>').addClass('song_row');
		const $play_col = $('<td>').addClass('table_row').prop('nowrap', true).append($spotify_button).appendTo($row);
		const $name_col = $('<td>').addClass('table_row').addClass('highlightable').prop('nowrap', true).text(datum.name).appendTo($row);
		const $artist_col = $('<td>').addClass('table_row').addClass('highlightable').prop('nowrap', true).text(artists).appendTo($row);
		// const $genre_col = $('<td>').addClass('table_row').prop('nowrap', true).text(genres).appendTo($row);
		const $pop_col = $('<td>').addClass('table_row popularity_col').prop('nowrap', true).html(pop_html).appendTo($row);

		// Set player track
		$row.on('click', function () {
			player_ui.set_track(datum.id);
		});

		let last_marked = null;
		function on_mouse_enter(include_artists=false) {
			// De-select marked songs
			for (const datum of dataset.year_data)
				datum.marked = false;
			datum.marked = true;
			// Mark current
			if (last_marked && last_marked != datum)
				last_marked.marked = false;
			last_marked = datum;
			if (include_artists)
				dataset.marked_artists = datum.artists;
			radar_ui.set_info(datum, include_artists);
			// pcoord_ui.set_info(datum, include_artists);
		}

		$row.on('mouseenter', function () {
			// Highlight current row
			$('.table_row_highlight').removeClass('table_row_highlight');
			$row.addClass('table_row_highlight');
		});
		$row.on('mouseleave', function () {
			$row.removeClass('table_row_highlight');
			datum.marked = false;
			dataset.marked_artists = null;
			// pcoord_ui.set_info(null);
		});

		// Set marked song
		$name_col.on('mouseenter', on_mouse_enter.bind(self, false));

		// Set marked artist
		$artist_col.on('mouseenter', on_mouse_enter.bind(self, true));
		$artist_col.on('mouseleave', function () {
			dataset.marked_artists = null;
		});

		return $row;
	}

	update() {
		const self = this;
		// self.index = self.show_increment;
		self.index = 0;
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
		self.height = self.$parent.innerHeight()-8;
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
			bottom: 60,
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
			.attr('fill', '#2EE770')
			.attr('stroke', '#4EF790');

		// Bar animation
		svg.selectAll('rect')
			.transition()
			.duration(800)
			.attr('width', d =>  x(d.val) - x(0));
			// .delay((d, i) => i * 50);

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
		self.$play_pane = $('#play_pane');
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
		self.timer = 0;
		self.delay = 400;

		// Get vectors for each axis
		const n = radar_attrs.length;
		const angle = 2*Math.PI/n;
		self.vectors = [];
		let current_angle = 0;
		for (let i = 0; i < n; i++) {
			const x = Math.cos(current_angle);
			const y = Math.sin(current_angle);
			self.vectors.push(new Vector(x, y));
			current_angle += angle;
		}

		setInterval(self.render.bind(self), 15);
		setInterval(function () {
			self.fps = self.frames;
			self.frames = 0;
		}, 1000);

		window.addEventListener('update', function () {
			self.set_info.apply(self, [self.datum]);
		}, false);
	}

	set_info(datum, is_artist=false) {
		const self = this;
		if (dataset.min == null || dataset.max == null)
			return;
		if (!datum)
			return;

		// Deep copy
		self.datum = {};
		for (const attr of Object.keys(datum))
			self.datum[attr] = datum[attr];
		self.is_artist = is_artist;

		// Get mean of selected data
		const data = [];
		for (const e of dataset.year_data) {
			if (!e.selected)
				continue;
			const row = [];
			let is_valid = true;
			for (const attr of tsne_attrs) {
				const val = e[attr];
				if (isNaN(val))
					is_valid = false;
				row.push(val);
			}
			if (is_valid)
				data.push(row);
		}
		let selected_mean_raw = [];
		if (data.length > 0) {
			const a = tf.tensor(data, null, 'float32');
			const mo = tf.moments(a, 0, false);
			selected_mean_raw = mo.mean.dataSync();
		}

		// Get mean of artist songs
		if (is_artist) {
			const artists = datum.artists;
			const songs = [];
			for (const a of artists)
				for (const d of dataset.year_data)
					if (d.artists.includes(a))
						songs.push(d);
			const mean = {};
			for (const s of songs) {
				for (const attr of tsne_attrs) {
					if (!mean.hasOwnProperty(attr))
						mean[attr] = 0;
					mean[attr] += s[attr];
				}
			}
			for (const attr of tsne_attrs)
				self.datum[attr] = mean[attr]/songs.length;
		}

		// Get total mean and current song mean
		self.last_info = self.info;
		self.info = [];
		self.mean = [];
		self.selected_mean = [];
		for (const i in tsne_attrs) {
			const attr = tsne_attrs[i];
			if (!radar_attrs.includes(attr))
				continue;
			const min = dataset.min[i];
			const max = dataset.max[i];
			self.info.push((self.datum[attr]-min)/(max-min));
			self.mean.push((dataset.mean[i]-min)/(max-min));
			if (selected_mean_raw.length > 0)
				self.selected_mean.push((selected_mean_raw[i]-min)/(max-min));
		}

		// Animation parameters
		if (self.last_info == null)
			self.last_info = self.info;
		self.timer = 0;
		self.last_time = Date.now();
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
		self.context.fillStyle = '#eee';
		self.context.textAlign = 'end';
		self.context.fillText('FPS: '+self.fps, self.width-20, 20);
		self.context.restore();

		function vec_to_screen(v) {
			const padding = 0.1;
			const factor = Math.min(self.width, self.height);
			const max = Math.max(self.width, self.height);
			const offset = (max-factor)/2;
			let x = v.x*factor/2 + factor/2;
			let y = v.y*factor/2 + factor/2;
			x *= (1-padding);
			y *= (1-padding);
			x += padding*factor/2;
			y += 3*padding*factor/4;
			if (self.width > self.height)
				x += offset;
			else
				y += offset;
			return new Vector(x, y);
		}

		// Draw plot shape
		self.context.save();
		self.context.fillStyle = '#222';
		self.context.strokeStyle = '#777';
		self.context.lineWidth = '1';
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
		self.context.stroke();
		self.context.restore();

		// Draw mean info
		if (self.mean != null && self.mean.length > 0) {
			// Dots
			self.context.save();
			const ps = [];
			for (const i in self.mean) {
				const val = self.mean[i];
				const vec = self.vectors[i];
				const pos = vec.scale(val);
				const v = vec_to_screen(pos);
				ps.push(v);
				self.context.strokeStyle = '#2E70E7';
				self.context.beginPath();
				self.context.arc(v.x, v.y, 4, 0, 2*Math.PI);
				self.context.stroke();
			}
			self.context.restore();

			// Filled path
			self.context.save();
			self.context.fillStyle = 'rgba(64, 64, 255, 0.5)';
			self.context.strokeStyle = '#2E70E7';
			self.context.lineWidth = '2';
			self.context.beginPath();
			let last_vec = ps[ps.length-1];
			self.context.moveTo(last_vec.x, last_vec.y);
			for (const p of ps)
				self.context.lineTo(p.x, p.y);
			self.context.closePath();
			self.context.fill();
			self.context.stroke();
			self.context.restore();
		}

		// Draw selected mean info
		if (self.selected_mean != null && self.selected_mean.length > 0) {
			// Dots
			self.context.save();
			const ps = [];
			for (const i in self.selected_mean) {
				const val = self.selected_mean[i];
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

			// Filled path
			self.context.save();
			self.context.fillStyle = 'rgba(64, 255, 64, 0.4)';
			self.context.strokeStyle = '#2EE770';
			self.context.lineWidth = '2';
			self.context.beginPath();
			let last_vec = ps[ps.length-1];
			self.context.moveTo(last_vec.x, last_vec.y);
			for (const p of ps)
				self.context.lineTo(p.x, p.y);
			self.context.closePath();
			self.context.fill();
			self.context.stroke();
			self.context.restore();
		}

		// Draw animated info
		if (self.info != null && self.info.length > 0) {
			const this_time = Date.now();
			const delta = this_time - self.last_time;
			self.timer += delta;
			if (self.timer > self.delay)
				self.timer = self.delay;
			const progress = self.timer / self.delay;

			// Dots
			self.context.save();
			const ps = [];
			for (const i in self.info) {
				const last_val = self.last_info[i];
				const this_val = self.info[i];
				const val = lerp(last_val, this_val, progress);
				const vec = self.vectors[i];
				const pos = vec.scale(val);
				const v = vec_to_screen(pos);
				ps.push(v);
				self.context.strokeStyle = '#E72E70';
				self.context.beginPath();
				self.context.arc(v.x, v.y, 4, 0, 2*Math.PI);
				self.context.stroke();
			}
			self.last_time = this_time;
			self.context.restore();

			// Filled path
			self.context.save();
			self.context.fillStyle = 'rgba(255, 64, 64, 0.4)';
			self.context.strokeStyle = '#E72E70';
			self.context.lineWidth = '2';
			self.context.beginPath();
			let last_vec = ps[ps.length-1];
			self.context.moveTo(last_vec.x, last_vec.y);
			for (const p of ps)
				self.context.lineTo(p.x, p.y);
			self.context.closePath();
			self.context.fill();
			self.context.stroke();
			self.context.restore();
		}

		// Draw legend
		self.context.save();
		self.context.textAlign = 'start';
		let offset_y = 20;
		self.context.fillStyle = 'rgb(64, 64, 255)';
		self.context.fillRect(10, offset_y-8, 10, 10);
		self.context.fillStyle = '#eee';
		self.context.fillText('Average of songs from '+dataset.year_start+' to '+dataset.year_end, 30, offset_y);
		offset_y += 20;
		self.context.fillStyle = 'rgb(64, 255, 64)';
		self.context.fillRect(10, offset_y-8, 10, 10);
		self.context.fillStyle = '#eee';
		self.context.fillText('Average of songs selected in t-SNE', 30, offset_y);
		offset_y += 20;
		self.context.fillStyle = 'rgb(255, 64, 64)';
		self.context.fillRect(10, offset_y-8, 10, 10);
		self.context.fillStyle = '#eee';
		if (self.datum) {
			const ellipsis = '...';
			const max_len = 32;
			let name = self.datum.name;
			if (name.length > max_len)
				name = name.substring(0, max_len) + ellipsis;
			let artist = self.datum.artists[0];
			if (artist.length > max_len)
				artist = artist.substring(0, max_len) + ellipsis;
			// Display name or artist
			if (self.is_artist)
				self.context.fillText('Average of '+artist, 30, offset_y);
			else
				self.context.fillText(name+' by '+artist, 30, offset_y);
		}
		else
			self.context.fillText('Selected in table', 30, offset_y);
		offset_y += 20;
		self.context.restore();

		// Draw axis label
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
	}
}

let dataset;
let tsne_ui;
let pcoord_ui;
let table_ui;
let bar_ui;
let player_ui;
let radar_ui;
let tutorial;

function run_tsne() {
	tsne_ui.stop();
	tsne_ui.reset();
	setTimeout(function () {
		tsne_ui.run();
		player_ui.set_track(dataset.year_data[0].id);
		player_ui.update();
		radar_ui.set_info(dataset.year_data[0]);
		radar_ui.render();
	}, 1000);
}

function initialize_ui() {
	tsne_ui = new TsneUI();
	pcoord_ui = new PCoordUI();
	table_ui = new TableUI();
	bar_ui = new BarUI();
	player_ui = new PlayerUI();
	radar_ui = new RadarUI();
	tutorial = new Tutorial();

	// tutorial.skip();
	tutorial.step(0);

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
	}, 50);

	const $year_filter = $('#year_filter');
	// Create year select node
	for (let i = dataset.year_range[0]; i <= dataset.year_range[1]-dataset.year_window; i++) {
		let end_year = i + dataset.year_window;
		if (end_year > dataset.year_range[1])
			end_year = dataset.year_range[1];
		const $elem = $('<option>')
			.appendTo($year_filter)
			.val(i)
			.text(i + ' - ' + end_year);
		// if (i === dataset.year_range[1]-dataset.year_window)
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

		tsne_ui.remove_selection.apply(tsne_ui);
		run_tsne();
	});

	// First run
	dataset.year_start = year;
	dataset.year_end = year + dataset.year_window;
	dataset.update();
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

class Tutorial {
	constructor() {
		const self = this;
		self.progress = 0;
		self.max = 9;

		$('.tutorial_message').css('display', 'block');

		self.$next_button = $('#next_tutorial');
		self.$skip_button = $('#skip_tutorial');

		self.$next_button.on('click', function () {
			self.progress++;
			self.step.apply(self, [self.progress]);
		});
		self.$skip_button.on('click', function () {
			self.progress = self.max;
			self.step.apply(self, [self.progress]);
		});

		// Resize event
		window.addEventListener('update', function () {
			if (self.progress == self.max)
				return;
			self.step.apply(self, [self.progress]);
		}, false);
	}

	start() {
		const self = this;
		self.progress = 0;
		self.disable_all();
	}

	previous() {
		const self = this;
		self.progress++;
	}

	next() {
		const self = this;
		self.progress++;
	}

	skip() {
		const self = this;
		self.progress = self.max;
		self.enable_all();
		run_tsne();
	}

	step(progress) {
		const self = this;

		const $tutorial_message = $('.tutorial_message');
		const $message = $tutorial_message.find('.message');

		// Remove blur and shading
		const $step = $('[data-step="' + progress + '"]');
		const $overlay = $step.find('.shaded_overlay');
		$step.removeClass('blurred');
		$overlay.css('background-color', 'rgba(0, 0, 0, 0)');

		function display_message(message) {
			if (self.message_animation)
				clearInterval(self.message_animation);
			$message.empty();
			let $paragraph = null;
			let i = 0;
			self.message_animation = setInterval(function () {
				i++;
				if ($paragraph == null)
					$paragraph = $('<div>')
						.addClass('paragraph')
						.appendTo($message);

				const $span = $('<span>');
				let letter = message.substring(i-1, i);
				if (letter === '/') {
					i++;
					letter = message.substring(i-1, i);
					if (letter === 'n') {
						$paragraph = null;
					}
					else if (letter === 'h') {
						letter = '&#9825;';
						$span.addClass('spotify_button');
					}
				}

				if ($paragraph != null)
					$span.appendTo($paragraph)
						.html(letter)
						.hide()
						.fadeIn(200);
				if (i == message.length)
					clearInterval(self.message_animation);
			}, 40);
		}

		function move_message_to(id=null, dx=10, dy=10) {
			if (id == null) {
				// Move to center
				$tutorial_message.css({
					'top': '50%',
					'left': '50%',
					'-ms-transform': 'translate(-50%, -50%)',
					'transform': 'translate(-50%, -50%)',
				});
			}
			else {
				// Move to offset of element
				const $elem = $(id);
				const offset = $elem.offset();
				$tutorial_message.css({
					'top': offset.top + dx,
					'left': offset.left + dy,
					'-ms-transform': 'translate(0, 0)',
					'transform': 'translate(0, 0)',
				});
			}
		}

		// Clear tutorial animations
		if (self.tutorial_animation != null) {
			clearInterval(self.tutorial_animation);
			self.tutorial_animation = null;
		}

		// Reset any persistent states set by tutorial
		function reset_states() {
			// tsne plot
			delete tsne_ui.mean;
			delete tsne_ui.std;
			for (const e of dataset.year_data) {
				delete e.x;
				delete e.y;
				e.marked = false;
			}
			// tsne drag
			tsne_ui.selection_start_x = null;
			tsne_ui.selection_start_y = null;
			tsne_ui.selection_end_x = null;
			tsne_ui.selection_end_y = null;

			dataset.update();
		}

		const drag_x0 = (0.2-0.5)/tsne_ui.zoom+0.5+tsne_ui.camera.x;
		const drag_y0 = (0.2-0.5)/tsne_ui.zoom+0.5+tsne_ui.camera.y;
		const drag_x1 = (0.8-0.5)/tsne_ui.zoom+0.5+tsne_ui.camera.x;
		const drag_y1 = (0.8-0.5)/tsne_ui.zoom+0.5+tsne_ui.camera.y;
		function tutorial_animation(type) {
			if (type === 'tsne_plot') {
				dataset.year_start = year;
				dataset.year_end = year + dataset.year_window;
				dataset.update();
				dataset.get_tsne_tensor();

				tsne_ui.zoom = 1.0;
				tsne_ui.mean = [0, 0];
				tsne_ui.std = [0.3, 0.3];
				const data = [];
				const max = 1000;
				let i = 0;
				for (const e of dataset.year_data) {
					if (i++ > max)
						break;
					const a = Math.random();
					const t = Math.random();
					e.x = a*Math.cos(2*Math.PI*t);
					e.y = a*Math.sin(2*Math.PI*t);
					data.push(e);
				}
				dataset.year_data = data;
			}
			else if (type === 'scan_table_click') {
				const max = 8;
				let i = 0;
				player_ui.set_track(dataset.year_data[++i].id);
				player_ui.update();
				return setInterval(function () {
					i++;
					$('.table_row_highlight').removeClass('table_row_highlight');
					const $row = $('.song_row').eq(i%max);
					$row.addClass('table_row_highlight');
					// Select in other charts
					player_ui.set_track(dataset.year_data[i].id);
					player_ui.update();
				}, 3000);
			}
			else if (type === 'scan_table_hover') {
				for (const e of dataset.year_data)
					e.marked = false;
				const max = 8;
				let i = 0;
				return setInterval(function () {
					i++;
					$('.table_row_highlight').removeClass('table_row_highlight');
					const $row = $('.song_row').eq(i%max);
					$row.addClass('table_row_highlight');
					// Select in other charts
					dataset.year_data[i].marked = true;
					radar_ui.set_info(dataset.year_data[i]);
					radar_ui.render();
				}, 1000);
			}
			else if (type === 'tsne_drag') {
				tsne_ui.selection_start_x = drag_x0;
				tsne_ui.selection_start_y = drag_y0;
				tsne_ui.selection_end_x = drag_x0;
				tsne_ui.selection_end_y = drag_y0;
				const loop_every = 2000;
				const start_time = Date.now();
				return setInterval(function () {
					const delta = Date.now() - start_time;
					const i = (delta % loop_every) / loop_every;
					tsne_ui.selection_end_x = cerp(drag_x0, drag_x1, i);
					tsne_ui.selection_end_y = cerp(drag_y0, drag_y1, i);
				}, 20);
			}
			else if (type === 'pcoord') {
				tsne_ui.selection_start_x = drag_x0;
				tsne_ui.selection_start_y = drag_y0;
				tsne_ui.selection_end_x = drag_x1;
				tsne_ui.selection_end_y = drag_y1;
				window.dispatchEvent(update_event);
			}
		}

		if (progress === self.max) {
			reset_states();
			self.skip();
		}
		else if (progress === 0) {
			move_message_to(null);
			display_message('Please ensure that hardware acceleration is enabled in your browser./nThis dashboard may not work on mobile devices.');
			self.tutorial_animation = tutorial_animation('tsne_plot');
		}
		else if (progress === 1) {
			move_message_to('#play_pane');
			display_message('In this table, you can click a song to play in the Spotify widget./nAlternatively, you can click /h to open the Spotify app.');
			self.tutorial_animation = tutorial_animation('scan_table_click');
		}
		else if (progress === 2) {
			move_message_to('#play_pane');
			display_message('Hover on a name of song to find its location in the chart below./nWe will use this information to find songs that sound similar.');
			self.tutorial_animation = tutorial_animation('scan_table_hover');
		}
		else if (progress === 3) {
			move_message_to('#scatter_plot_container');
			display_message('This scatter plot models similar songs by nearby points and dissimilar songs by distant points.');
			// self.tutorial_animation = tutorial_animation('tsne_drag');
		}
		else if (progress === 4) {
			move_message_to('#scatter_plot_container');
			display_message('Drag with the left mouse button to select and identify similar songs in its proximity./nOther charts will update to display the songs you\'ve selected here.');
			self.tutorial_animation = tutorial_animation('tsne_drag');
		}
		else if (progress === 5) {
			move_message_to('#pcoord_plot_container');
			display_message('This parallel coordinates plot helps you to compare many attributes of a song simultaneously and shows you the relationships among them.');
			self.tutorial_animation = tutorial_animation('pcoord');
		}
		else if (progress === 6) {
			move_message_to('#radar_plot');
			display_message('Using this radar chart, you can directly compare various features and characteristics of songs.');
			// self.tutorial_animation = tutorial_animation('scan_table_hover');
		}
		else if (progress === 7) {
			move_message_to('#bar_chart_container');
			display_message('This bar chart counts the occurence of genres or artists in your selection.');
		}
		else if (progress === 8) {
			self.$next_button.hide();
			self.$skip_button.val('Let\'s Go!');
			move_message_to(null);
			display_message('You\'re good to go! Don\'t forget to select the year that you want to explore.');
		}
	}

	disable_all() {
		$('#year_filter').prop('disabled', true);
		$('#table_search').prop('disabled', true);
		$('#tsne_perplexity').prop('disabled', true);
		$('#run_tsne_button').prop('disabled', true);
		$('#pcoord_select').prop('disabled', true);
		$('#bar_group_select').prop('disabled', true);

		$('.tutorial_step').addClass('blurred');
		$('.tutorial_step .shaded_overlay').css('display', 'block');
		$('.tutorial_message_container').css('display', 'block');
	}

	enable_all() {
		$('#year_filter').prop('disabled', false);
		$('#table_search').prop('disabled', false);
		$('#tsne_perplexity').prop('disabled', false);
		$('#run_tsne_button').prop('disabled', false);
		$('#pcoord_select').prop('disabled', false);
		$('#bar_group_select').prop('disabled', false);

		$('.tutorial_step').removeClass('blurred');
		$('.tutorial_step .shaded_overlay').css('display', 'none');
		$('.tutorial_message_container').css('display', 'none');
	}
}

$(function () {
	// const tfjs_url = '/javascripts/tfjs-0.14.1.js';
	// const tsne_url = '/javascripts/project/song_recommender/tsne.js';
	const tfjs_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@0.14.3';
	const tsne_url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tsne@0.2.0';

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
