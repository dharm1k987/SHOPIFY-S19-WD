$(document).ready(function() {

    $(".btn-search").click(function() {
        let keyword = $("#keyword").val();
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
            if (inner["keywords"].includes(keyword)) {
                console.log("match found");
                result.push(data[key]);
            }
        }
        console.log(result);
    }

});