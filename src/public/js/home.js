$(document).ready(function() {

    $(".btn-search").click(function() {
        let keyword = $("#keyword").val();

        if (keyword.length == 0) {
            clearDiv();
            return;
        }

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

    });

    function narrowChoices(data, keyword) {
        console.log("keyword is " + keyword);
        result = [];
        // loop
        for (var key in data) {
            let inner = data[key];

            if (new RegExp("\\b" + keyword + "\\b").test(inner["keywords"] + " " + inner["title"])) {

                console.log("match found");
                result.push(data[key]);
            
            }
        console.log(result);
        clearDiv();
        appendToDiv(result);
    }
}

    function clearDiv() {
        $(".item-in-result").remove();
    }
    function appendToDiv(list) {
        for (var item in list) {
           //  console.log(list[item]["body"]);
            let title = "<div class='col-md-6'>" + list[item]["title"] + "</div>";
            let myString = $("<div />").html(list[item]["body"]).text();
            let description = "<div class='col-md-6'>" + myString + "</div>";
            let full = "<div class='row item-in-result' style='margin: 0%; margin-bottom: 5%;'>" + title + description + "</div>"
            $(".top-results").append(full);
           // $("" + list[item]["body"] + "").appendTo(".top-results");
        }
    }

});