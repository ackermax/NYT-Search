$(document).ready(function () {
    $("#article-search-submit").click(function (e) {
        e.preventDefault();

        $("#search-results").empty();

        $("#loading").removeClass("hide");
        setTimeout(function(){
            $("#loading").addClass("hide");
        }, 5000);
    
        var searchResult = $("#article-search-input").val();
        $("#article-search-input").val("");
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "505393d94c704fa78afbf75c9235fe4c",
            'q': searchResult,
            'sort': "newest"
        });
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (result) {
          
            //store the result in a variable "r"
            var r = result.response.docs;
            //run this for every headline returned
           
            var topHolder = $("<div class='row text-center' id='top-holder'>").html("<h1 class='text-left' id='top-stories'><i class='fa fa-newspaper-o fa-2x' aria-hidden='true'></i> Top Stories</h1><div class='col-md-12' id='article-holder'></div>");
            $(topHolder).appendTo("#search-results");
            for (var i = 0; i < r.length; i++) {
                //but only for the first 10 articles
                if (i < 10) {
                    //make a div with the class of row
                    var divRow = $("<div class='row'>")
                    //make an h1 tag with the headline in it
                    var headline = $("<h1>").html("<a href=" + r[i].web_url + " target='_blank'>" +r[i].headline.main + "</a>");
                    //make an h3 tag with the author in it
                    var byline = $("<h3>").text(r[i].byline.original);

                    $(headline).appendTo(divRow);
                    $(byline).appendTo(divRow);
                    $(divRow).appendTo("#article-holder");
                }
            }
        }).fail(function (err) {
            $("#spinner").addClass("hide");
            throw err;
        });
    })
});