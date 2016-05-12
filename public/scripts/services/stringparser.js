/**
 * Created by kellysmith on 4/12/16.
 *
 * 2016 pokingBears.com
 */

// Parser service
function StringParser(){

	return function(str, line, word, rem) {
		line = line || "\n";
		word = word || /[-"]/gi;
		rem = rem || /["\[\]]/gi;

		return str.trim().split(line).map(function(l){
			return l.split(word).map(function(w){
				return w.trim().replace(rem,'');
			});
		});
	};

};

// D3 Key Classifier

function Classifier(d3Service){
	return function(data, key){
		return d3Service.nest()
			.key(key)
			.entries(data)
			.map(function(d){
				return {
					x: d.key,
					y: d.values.length
				};
			});
	};
};


angular.module('kbyteApp')
	.factory('StringParser', StringParser)
	.factory('Classifier', Classifier);

module.exports = StringParser;
module.exports = Classifier;
