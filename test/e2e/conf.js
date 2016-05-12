/**
 * Created by kellysmith on 4/11/16.
 *
 * 2016 pokingBears.com
 */

// conf.js
exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./**/*.e2e.js'],
	baseUrl: 'http://127.0.0.1:8000',

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true, // Use colors in the command line report.
	}
}
