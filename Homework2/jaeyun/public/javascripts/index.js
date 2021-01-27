/*
Copyright 2021 Jaewan Yun <jaeyun@ucdavis.edu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const tnse_iterations = 200;
const tsne_config = {
	'perplexity': 18,
	'verbose': true,
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
	}

	load_csv(url) {
		const self = this;
		return new Promise(function (resolve, reject) {
			const promise = $.ajax({
				type: 'GET',
				url: url,
				dataType: 'text',
			});
			promise.then(function (text) {
				self.data = self.parse_csv(text);
				resolve(self.data);
			});
		});
	}

	parse_csv(text) {
		// const delimiter = /(?![^)(]*\([^)(]*?\)\)),(?![^\[]*\])/;

		const rows = text.split('\n');
		const titles = rows[0].split(',');
		for (const i in titles)
			titles[i] = titles[i].trim();

		const data = [];
		for (const i in rows) {
			if (i === 0)
				continue;
			const row = rows[i];
			const arr = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
			const obj = {};
			for (const j in arr) {
				if (titles[j] === 'artists')
					obj[titles[j]] = arr[j].replace('[', '').replace(']', '').replace('\'', '').replace('"', '');
				else
					obj[titles[j]] = arr[j];
			}
			data.push(obj);
		}
		return data;
	}

	get_tsne_tensor(is_test=false) {
		if (is_test) {
			const data = [];
			let n = 0;
			for (let i = 0; i < 100; i++) {
				const row = [];
				for (let j = 0; j < 10; j++)
					row.push(n++);
				data.push(row);
			}
			return tf.tensor(data);
		}

		const data = [];
		for (const e of this.data) {
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

function main() {
	const dataset = new Dataset();
	dataset.load_csv('/datasets/spotify.csv')
		.then(function () {
			// const data = tf.randomUniform([4000, 20]);
			const data = dataset.get_tsne_tensor();

			// const tsne_op = tsne.tsne(data, tsne_config);
			// tsne_op.compute(tnse_iterations).then(() => {
			// 	const coordinates = tsne_op.coordinates();
			// 	coordinates.print();
			// });

			const tsne_op = tsne.tsne(data);
			async function iterate_tsne() {
				const knn_iterations = tsne_op.knnIterations();
				for (let i = 0; i < knn_iterations; i++) {
					await tsne_op.iterateKnn();
					// You can update knn progress in your ui here
				}
				for (let i = 0; i < tnse_iterations; i++) {
					await tsne_op.iterate();
					// Draw embedding
					const coordinates = tsne_op.coordinates();
					coordinates.print();
				}
			}
			iterate_tsne();
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
