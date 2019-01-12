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
            let description = "<div class='col-md-6'>" + myString + "</div>";
            let full = "<div class='row item-in-result' style='margin: 0%; margin-bottom: 5%;'>" + title + description + "</div>"
            $(".top-results").append(full);
           // $("" + list[item]["body"] + "").appendTo(".top-results");
        }
    }

});