$(document).ready(function() {

    $(".btn-search").click(function() {
        handleBtnEvent($("#keyword").val());
    });


    // map key by key
    $('#keyword').keyup(function(e){
        let keyword = $("#keyword").val();
        //console.log(keyword.length);
        if (keyword.length == 0) { clearDiv(); return; }
        // enter
        if(e.keyCode == 13)
        {
            clearDiv();
            let keyword = $("#keyword").val();
            handleBtnEvent(keyword);
        }
    });

    function handleBtnEvent(keyword) {
        $.ajax({
            type: 'GET',
            url: 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000',
            data: {},
            success: function(response) {
                narrowChoices(response, keyword);
                // reroute them based on the location data provides
            },
            error: function(response) {
                console.log("error");
            }
        });
    }



    function narrowChoices(data, keyword) {
        if (keyword.length == 0) { clearDiv(); return; }
        console.log("keyword is " + keyword);
        result = [];
        // loop
        for (var key in data) {
            let inner = data[key];

            if (new RegExp("\\b" + keyword + "\\b").test(inner["keywords"] + " " + inner["title"])) {

                console.log("match found");
                result.push(data[key]);
                
            
            }
        
        
        }
        console.log(result);
        appendToDiv(result);
}

    function clearDiv() {
        $(".item-in-result").remove();
    }
    function appendToDiv(list) {
        for (var item in list) {
           //  console.log(list[item]["body"]);
            let title = "<div class='col-md-6'>" + list[item]["title"] + "</div>";
            let myString = $("<div />").html(list[item]["body"]).text();
            let description = "<div class='col-md-4'>" + myString + "</div>";
            
            // not all the data points have an id, so we cannot base our favourites on this
            let divId = list[item]["title"];
            var star = "<div class='col-md-2'><div class='star' id='star-fav'></div></div>";

            // the star should be coloured from the start
            let data = {"id": divId};
            $.ajax({
                type: 'POST',
                url: '/checkFav',
                data: data,
                success: function(response) {
                    console.log("success");
                    star = "<div class='col-md-2'><div class='star' style='background-color:lightgray;' id='star-fav'></div></div>";
                    let full = "<div class='row item-in-result'" + "id='" + divId + "'style='margin: 0%; margin-bottom: 5%;'>" + title + description + star + "</div>";
                    console.log(star);
                    $(".top-results").append(full);
                   
                },
                error: function(response) {
                    console.log("something not right.");
                    star = "<div class='col-md-2'><div class='star' style='background-color:yellow;' id='star-fav'></div></div>";
                    let full = "<div class='row item-in-result'" + "id='" + divId + "'style='margin: 0%; margin-bottom: 5%;'>" + title + description + star + "</div>";
                    console.log(star);
                    $(".top-results").append(full);
                }
            });


           // $("" + list[item]["body"] + "").appendTo(".top-results");
        }
    }

    document.addEventListener('click',function(e){
        console.log(e);
        if(e.target && e.target.id== 'star-fav'){//do something}}
            console.log(e.target.parentNode.parentElement.id);

        // send favourite/unfavourite request to database
        let data = {"id": e.target.parentNode.parentElement.id};
        $.ajax({
            type: 'POST',
            url: '/fav',
            data: data,
            success: function(response) {
                console.log("success");
                // change the colour
                e.target.style.backgroundColor = "yellow";
               
            },
            error: function(response) {
                console.log("something not right.");
                e.target.style.backgroundColor = "lightgray";
            }
        });
    }});



});