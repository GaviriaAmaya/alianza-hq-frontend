$(document).ready(function () {
    const page_obj = new page();
    if($("body").attr('id') == 'courses') {
        page_obj.load_courses("https://smileschool-api.hbtn.info/courses");
        $(document.body).on('keyup', $("#search"), function(event) {
            if(event.keyCode == 13) { // 13 = Enter Key
                $(".normal_section .container-md #cont_products").html("");
                page_obj.load_courses("https://smileschool-api.hbtn.info/courses");
            }
        });
        $("#topics").change(function() {
            $(".normal_section .container-md #cont_products").html("");
            page_obj.load_courses("https://smileschool-api.hbtn.info/courses");
        });
        $("#sort").change(function() {
            $(".normal_section .container-md #cont_products").html("");
            page_obj.load_courses("https://smileschool-api.hbtn.info/courses");
        });
    }
});

// GENERIC FUNCTIONS ========================
let stars_calification = function (calf, max_stars) {
    html_stars_tags = "";
    for (let y=0;y<calf;y++){
        html_stars_tags = html_stars_tags + '<img class="img-fluid " src="./images/star_on.png" />';
    }
    for (let z=0;z<(max_stars-calf);z++){
        html_stars_tags = html_stars_tags + '<img class="img-fluid " src="./images/star_off.png" />';
    }
    return html_stars_tags;
};
function capitalizeFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
// ==END GENERIC FUNCTIONS
class page {
    constructor() {

    }

    load_courses(url_api) {
        $(".normal_section .container-md #cont_products").append('<div class="loader"></div>');
        console.log($("#search").val(),$( "#topics option:selected" ).text(),$( "#sort option:selected" ).text());
        $.get( url_api, { q: $("#search").val(), topic: $( "#topics option:selected" ).val(), sort: $( "#sort option:selected" ).val() } )
            .done(function( data ) {
                let html_content1 = "";
                if ($("#topics").html() === "" && $("#sort").html() === ""){
                    data.topics.forEach(function (element, i) {
                        $("#topics").append('<option class="text-capitalize" value="'+data.topics[i]+'">'+capitalizeFL(data.topics[i].replace("_", " "))+'</option>');
                    });
                    data.sorts.forEach(function (element, i) {
                        $("#sort").append('<option class="text-capitalize" value="'+data.sorts[i]+'">'+capitalizeFL(data.sorts[i].replace("_", " "))+'</option>');
                    });
                    console.log("categorys filled");
                }

                $("#label_products").html(data.courses.length + " products");
            data.courses.forEach(function (element, i) {
                html_content1 = `<!-- CAROUSEL ITEM - `+element.title+` -->
                                <div class="col-md-3 col-sm-4 col-12 mb-5">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="">
                                            <a class="youtube" href="https://www.youtube.com/watch?v=3ymwOvzhwHs">
                                                <img class="img-fluid" src="`+element.thumb_url+`"
                                                    alt="{ video title here }" />
                                            </a>
                                        </div>
                                        <h5 class="card-title font-weight-bold">`+element.title+`</h5>
                                        <p class="card-text">
                                            <span>`+element["sub-title"]+`</span>
                                        </p>
                                        <!-- VIDEO REVIEWER -->
                                        <div class="row mb-3">
                                            <div class="col-3 user_review">
                                                <img class="rounded-circle img-fluid " src="`+element.author_pic_url+`" />
                                            </div>
                                            <div class="col-9 d-lg-flex justify-content-lg-start align-items-lg-center">
                                                <span class="highlight_text1 font-weight-bold">`+element.author+`</span>
                                            </div>
                                        </div>
                                        <!-- VIDEO CALIFICATION -->
                                        <div class="row text-center">
                                            <div class="col-7">
                                                <div class="d-flex justify-content-lg-center">`+stars_calification(element.star,5)+`</div>
                                            </div>
                                            <div class="col-5">
                                                <span class="highlight_text1 font-weight-bold">`+element.duration+`</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                $(".normal_section .container-md #cont_products").append($.parseHTML(html_content1));
            });
            if ($(".normal_section .container-md #cont_products").html() !== "") {
                $(".normal_section .container-md #cont_products .loader").css('display', 'none');
            } 
            console.log(data);
        });
    }
}


