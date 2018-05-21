/**
 * Created by mole on 2018/3/30.
 * @Name: main
 * @description:
 */

(function () {
	'use strict';

	let pluginsPath = document.getElementById('mainJs').getAttribute('data-plugins-path');
	require.config({
		baseUrl: pluginsPath,
		paths: {
			"clipboard": "clipboard/clipboard.min",
			"jquery": "jquery/jquery-3.3.1.min",
			"common": "./common"
		},
		shim: {
			"clipboard": {
				exports: 'clipboard'
			},
			"common": {
				deps: ['jquery']
			}
		}
	});
}());