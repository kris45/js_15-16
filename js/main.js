$(document).ready(function () {

	var pageNumber = 1;


	function doSearch() {


		var query = $(".searchTxt").val();

		console.log('Searching for ' + query);
		
		$.ajax({
	        url: 'https://pixabay.com/api/?key=3750037-59b70644a0ea3a4147bb2a2ad&image_type=photo&q=' + query + '&page=' + pageNumber,
	        dataType: 'json',
	        success: function (data) {
	        	console.log('Success');
				var hitsCount = data.totalHits;
				var hits = data.hits;
				console.log('Found images by searching for ' + query + " : " + hitsCount);
				for (var i = 0; i < Math.min(20, hits.length); i++) {
					$(".searchResult").append("<li><a href='" + hits[i].pageURL + "'><img src='" + hits[i].previewURL + "'/></a></li>");
				}

				if(hits.length > 19) {
					$("button.loadMoreBtn").css("display", "block");
				};
	        },
			error: function(xhr){
				console.log('Error');
				console.log(xhr); 
			}  
	      });

	};



	$(".searchBtn").click(function () {
		pageNumber = 1;
		$(".searchResult").empty();
		doSearch();
	});

	$(".loadMoreBtn").click(function () {
		pageNumber++;
		doSearch();
	});

});


