/*
Copyright 2021 Jaewan Yun <jaeyun@ucdavis.edu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

let fs = require('fs');
let path = require('path');

function _filter_paths_by_ext(files, ext) {
	if (!ext)
		return files;

	if (!ext.includes('.'))
		ext = '.' + ext;

	let filter = [];
	for (let i in files)
		if (path.extname(files[i]) === ext)
			filter.push(files[i].split(ext)[0]);
	return filter;
}

function _to_relative_paths(files, dir) {
	let rel_paths = [];
	for (let i in files)
		rel_paths.push(files[i].split(dir)[1]);
	return rel_paths;
}

function _get_path_stat(abs_path) {
	return new Promise(function (resolve, reject) {
		fs.stat(abs_path, function (err, stat) {
			if (err)
				reject(err);

			resolve(stat);
		});
	});
}

function _get_all_files(dir) {
	return new Promise(function (resolve, reject) {
		fs.readdir(dir, function (err, files) {
			if (err)
				reject(err);

			let all_paths = [];
			let get_path_stat_fn = [];
			for (let i in files) {
				all_paths[i] = path.join(dir, files[i]);
				get_path_stat_fn.push(_get_path_stat(all_paths[i]));
			}
			Promise.all(get_path_stat_fn)
				.then(function (stats) {
					let file_paths = [];
					let get_all_files_fn = [];
					for (let i in stats) {
						let stat = stats[i];
						if (stat.isDirectory())
							get_all_files_fn.push(_get_all_files(all_paths[i]));
						else
							file_paths.push(all_paths[i]);
					}
					Promise.all(get_all_files_fn)
						.then(function (nested_paths) {
							if (nested_paths.length > 0)
								file_paths.push(...nested_paths.flat(Infinity));
							resolve(file_paths);
						});
				});
		});
	});
}

function get_files(dir, relative=false, ext=null) {
	return new Promise(function (resolve, reject) {
		_get_all_files(dir)
			.then(function (files) {
				let file_paths = _filter_paths_by_ext(files, ext);
				if (relative)
					file_paths = _to_relative_paths(file_paths, dir);
				resolve(file_paths);
			}, reject);
	});
}

module.exports = {
	get_files: get_files,
};
