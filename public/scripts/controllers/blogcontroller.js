/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */
'use strict'

function BlogController($state, $q, $sce, ContentApis, ChatSocket, UserAuthService) {

	var UserInfo = ContentApis;
	var _this = this;

	_this.submit = false;
    _this.setEntryMessage = "We'll see how it goes."
	_this.formInfo = {};
	_this.userIdChange = "";
	_this.formInfo.title = " da book of mack ";
	_this.formInfo.comments = " don't hurt em hammer ";
	_this.formInfo.bodyBooty = " blah blah doop ";
	_this.formInfo.hidden = false;
	_this.formInfo.userComments = [];
	_this.formInfo.userName = "Kelly";


	ChatSocket.on('content-update', function(){

		console.log(' new entry detected ');
	})

	_this.submitUserEntry = function () {

		if(_this.submit === false){
			return;
		} else {
			_this.submit = false;
		}

		_this.formInfo.userId = "1234";
		//_this.userIdChange;

		var entryMessage = "";

		$(".content-entry").append('<div class="elementdate">'+Date.now()+'</div>');

		_this.formInfo.comments = $(".content-entry").html();


		UserInfo.setEntry(_this.formInfo)

			.success(function (data) {
				if (data.Result === true) {
					entryMessage = "Well, this thing worked.";
					_this.retreiveUserEntries();
				} else {
					entryMessage = "Something bad happened on the validation side";
				}
				setEntryMessage(entryMessage);
				$(".content-entry").empty();
			})
			.error(function (data) {
				console.error('could not retrieve user data', data);
			});

	}

	
	_this.retreiveUserEntries = function () {
		checkAuthToken();
	}

	
	function retrieveUserEntries(){	
		console.log(' zero in the arguments object '+arguments[0].displayname);
		UserInfo.retrieveEntries(arguments[0])
			.then(function (data) {
				angular.forEach(data, function (v, k) {
					//console.log(" retrieve com  " + data[k].uid + "  " + data[k]+"  "+v);
					var userAndComment = {};
					userAndComment.user = data[k].uid;
					var textToHtml;

					try{ textToHtml = data[k].comments.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");}
					catch(err){
						textToHtml = err.message;
					}

					
					userAndComment.comment = textToHtml;
					userAndComment.author = data[k].author;
					//console.log(" textToHTML var " + textToHtml);
					_this.formInfo.userComments.push(userAndComment);

				})
				// put all the comments into an array and then join them up

			})
	};

	function setEntryMessage(msg) {

		_this.setEntryMessage = msg;

	};

	function setComments(com) {
		console.log(" retrieve com  " + com);
		_this.userComments = com;
	}

	function checkAuthToken() {

		var authObj = UserAuthService.getAuthObject();
		_this.formInfo.userName = authObj.displayname;
		console.log(" new display name "+authObj.displayname);
		retrieveUserEntries(authObj);

	}

	checkAuthToken();
};

angular.module('kbyteApp')
	.controller('BlogController', BlogController);



module.exports = BlogController;