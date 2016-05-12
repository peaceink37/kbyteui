/**
 * Created by kellysmith on 4/11/16.
 *
 * 2016 pokingBears.com
 */

describe('Scatter Chart application', function() {

	beforeEach(function() {
		browser.get('index.html');
	});

	it('has 4 charts', function() {

		var charts = element.all(by.css('svg'));
		expect(charts.count()).toEqual(2);
	});
});