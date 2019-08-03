$(document).ready(function(){

    // Temporarily keeping this commented out
    $('body').on('click', '.vid_modal', function(){
        return true;
        var url = $(this).attr('data-id'),
            name = $(this).attr('data-name'),
            title = $(this).attr('data-title')

        var titleHtml = '<h1>'+ name +' - ' + title + '</h1>';
        titleHtml += "<div class='share_sheet'>";
        titleHtml += '<div><strong>Share: </strong><input type="text" value="https://quipvid.com/watch/'+ url +'"></div>';
        titleHtml += '<div><strong>Embed: </strong><input type="text" value="&lt;iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;https://quipvid.com/embed/'+ url +'&quot; frameborder=&quot;0&quot; allowfullscreen&gt;&lt;/iframe&gt;" /></div>';
        titleHtml += "</div>";

        $.fancybox({
            href: '/embed/' + url,
            type: 'iframe',
            width: 770,
            height: 495,
            padding: 0,
            title: titleHtml,
            helpers : {
                title: {
                    type: 'outside'
                }
            }
        });

        return false;
    });

    $('.video_modal_trigger').click(function(){
        var modalID = $(this).attr('href');
        $(modalID).modal()
            .on('shown', function(){
                var video = $('.modal-body .test_video', this);
                playVideo(video.attr('id'));
            }).on('hidden', function(){
            var video = $('.modal-body .test_video', this);
            unprepareVideo(video.attr('id'));
        });
        return false;
    });


    // $('#select-movie').selectize({
    //    plugins: ['no_results'],
    //     valueField: 'quip_title',
    //     labelField: 'quip_title',
    //     searchField: ['quip_title', 'video_title', 'script'],
    //     options: [],
    //     create: false,
    //     render: {
    //         option: function(item, escape) {
    //             // var actors = [];
    //             // for (var i = 0, n = item.abridged_cast.length; i < n; i++) {
    //             //     actors.push('<span>' + escape(item.abridged_cast[i].name) + '</span>');
    //             // }
    // 			console.log(item);
    //             return '<div class="quip_search_result" data-idmask="' + escape(item.id_mask) + '">' +
    //                 //'<img src="' + escape(item.posters.thumbnail) + '" alt="">' +
    //                 '<span class="title">' +
    //                     '<span class="name">' + escape(item.quip_title) + ' - </span>' +
    //                 '</span>' +
    //                 '<span class="description">' + escape(item.video_title) + '</span>' +
    //                 //'<span class="actors">' + (actors.length ? 'Starring ' + actors.join(', ') : 'Actors unavailable') + '</span>' +
    //             '</div>';
    //         }
    //     },
    //     load: function(query, callback) {
    //         if (!query.length) return callback();
    //         $.ajax({
    //             url: '/quip-search',
    //             type: 'GET',
    //             data: {
    //                 q: query
    //             },
    //             error: function() {
    //                 callback();
    //             },
    //             success: function(res) {
    //                var hits = _.map(res.hits, function(num){ return num._source; });
    //                 callback(hits);
    //             }
    //         });
    //     },
    //     onItemAdd: function(value, item)
    //     {
    //     	console.log(value);
    //  	var cell = $($(this)[0].$wrapper).parent();
    //  	var quip = cell.find('.quip_search_result.selected');
    //  	window.location.href = "/watch/" + quip.data('idmask');
    //     }
    // });
    //
    //
    //             return '<div class="quip_search_result" data-idmask="' + escape(item.id_mask) + '">' +
    //                 //'<img src="' + escape(item.posters.thumbnail) + '" alt="">' +
    //                 '<span class="title">' +
    //                     '<span class="name">' + escape(item.quip_title) + ' - </span>' +
    //                 '</span>' +
    //                 '<span class="description">' + escape(item.video_title) + '</span>' +
    //                 //'<span class="actors">' + (actors.length ? 'Starring ' + actors.join(', ') : 'Actors unavailable') + '</span>' +
    //             '</div>';
    //         }
    //     },
    //     load: function(query, callback) {
    //         if (!query.length) return callback();
    //         $.ajax({
    //             url: '/quip-search',
    //             type: 'GET',
    //             data: {
    //                 q: query
    //             },
    //             error: function() {
    //                 callback();
    //             },
    //             success: function(res) {
    //                $('.selectize-control').removeClass('fetching');
    //                var hits = _.map(res.hits, function(num){ return num._source; });
    //                callback(hits);
    //             }
    //         });
    //     },
    //     onItemAdd: function(value, item)
    //     {
    //     	console.log(value);
    //  	var cell = $($(this)[0].$wrapper).parent();
    //  	var quip = cell.find('.quip_search_result.selected');
    //  	window.location.href = "/watch/" + quip.data('idmask');
    //     }
    // });
    //
    //
    //
    // $('#footer').onScreen({
    //     container: window,
    //     direction: 'vertical',
    //     doIn: function() {
    //
    //         if(!$('#load').hasClass('is_finished'))
    //         {
    //             var page = $('#load').data('page');
    //
    //             $.get('/api/quips/', function(data){
    //                 $('#load').data('page', page + 1);
    //                 var newPage = $('#load').data('page'),
    //                     startResult = newPage * 12 + 1,
    //                     endResult = startResult + 12;
    //
    //                 if(data.length > endResult)
    //                 {
    //                     console.log('in view');
    //                     _.templateSettings.variable = "rc";
    //                     var template = _.template(
    //                         $( "script.quip_template" ).html()
    //                     );
    //                     var templateData = {
    //                         quips: data.slice(startResult, endResult)
    //                     };
    //                     $('.latest').append(template(templateData));
    //                 }else{
    //                     $('#load').addClass('is_finished');
    //                 }
    //             });
    //         }
    //     },
    //     doOut: function() {
    //
    //     },
    //     tolerance: 0,
    //     throttle: 50
    // });


    // Custom quip player control
    var quip_player = $('#quip_player'),
        quip_video = $('video', quip_player);

    quip_video.css('cursor', 'pointer');

    quip_video.on('ended', function(){
        quip_player.addClass('is_stopped');
    });

    quip_video.on('pause', function(){
        quip_player.addClass('is_paused');
    });

    quip_video.on('playing', function(){
        quip_player.removeClass('is_stopped');
    });

    quip_video.on('click', function(){
        if (quip_video[0].paused == false) {
            quip_video[0].pause();
        } else {
            quip_player.removeClass('is_stopped');
            quip_video[0].play();
        }
    });

    $('.replay', quip_player).on('click', function() {
        quip_video[0].play();
    });

    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };
    $("select#omdbID").select2({
        ajax: {
            url: "/omdb-search/",
            dataType: 'json',
            delay: 250,
            type: 'GET',

            //processData: false,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                var hits = data.hits;

                var items = _.map(hits, function(hit){
                    return {
                        id: hit._id,
                        text: hit._source.Title,
                        poster:  hit._source.Poster,
                        image: "http://img.omdbapi.com/?i="+ hit._source.imdbID +"&apikey=12d8f016"
                    };
                });

                return {
                    results: items,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        language: { noResults: function (term) { return '<a href="/contact/quip-request">Sorry, no results :( If you were itching to see something specific, click here to let the Quippers know!</a>'; } },


        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 1,
        templateResult: formatQuip,
        templateSelection: formatQuipSelection
    });
    $("#select-movie").select2({
        ajax: {
            url: "/quip-search/",
            dataType: 'json',
            delay: 250,
            type: 'GET',

            //processData: false,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                var hits = data.hits;

                var items = _.map(hits, function(hit){
                    return {
                        id: '/watch/' + hit._source.id_mask,
                        text: hit._source.quip_title + ' - ' + hit._source.omdb.Title,
                        poster:  hit._source.omdb.Poster,
                        image: "https://s3.amazonaws.com/djquipvid/" + hit._source.id_mask + "_1.jpg"
                    };
                });

                return {
                    results: items,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        language: { noResults: function (term) { return '<a href="/contact/quip-request">Sorry, no results :( If you were itching to see something specific, click here to let the Quippers know!</a>'; } },

        placeholder: "Search...",

        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 1,
        templateResult: formatQuip,
        templateSelection: formatQuipSelection
    });

    $('.video video').bind('contextmenu',function() { return false; });

    var $eventSelect = $("#select-movie");

    $eventSelect.on("select2:select", function (e) {
        //console.log("select2:select", e); console.log(e.target.value);
        if (e.target.value) {
            window.location.href = e.target.value;
        }
    });
    //$("select#omdbID").change(function() {
    //
    //	$.get( "http://104.131.63.142:9200/omdb/omdb/" + $(this).val(), function( data ) {
    //		$('.cover').attr('src', "http://img.omdbapi.com/?i="+ data._source.imdbID +"&apikey=12d8f016");
    //	});
    //
    //});


    function formatQuip (quip) {
        // console.log(quip);
        if (quip.loading) return quip.text;

        var markup = "<div class='select2-result-repository__title' style='display: flex; align-items: center'>";

        if(quip.poster) {
            markup += "<img src='" + quip.image + "' style='width: 50px;' />";
        }

        markup += "<span style='margin-left: 1em'>"+ quip.text +"</span></div>";

        return markup;
    }

    function formatQuipSelection (repo) {
        return repo.full_name || repo.text;
    }
});

function playVideo(playerID)
{
    sublime.prepare(playerID, function(player) {
        player.play();
    });
}

function unprepareVideo(playerID)
{
    sublime.unprepare(playerID);
    $("#" + playerID).show();
}

function isFlashEnabled()
{
    var hasFlash = false;
    try
    {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(fo) hasFlash = true;
    }
    catch(e)
    {
        if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
    }
    return hasFlash;
}