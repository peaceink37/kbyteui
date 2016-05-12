/**
 * Created by kellysmith on 4/6/16.
 *
 * 2016 pokingBears.com
 */


function userLocations(){



	return {
		restrict:'E',
		replace:true,
		scope:{},
		controller:UsageVisualController,
		controllerAs:usagec,
		bindToController:{
			data:'='
		},
		template:['<div><svg></svg></div>'].join(),
		link:link

	}



}
