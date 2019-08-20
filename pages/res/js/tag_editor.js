
var cache = {};
function googleSuggest(request, response) {
    var term = request.term;
    if (term in cache) { response(cache[term]); return; }
    $.ajax({
        url: 'https://query.yahooapis.com/v1/public/yql',
        dataType: 'JSONP',
        data: { format: 'json', q: 'select * from xml where url="http://google.com/complete/search?output=toolbar&q='+term+'"' },
        success: function(data) {
            var suggestions = [];
            try { var results = data.query.results.toplevel.CompleteSuggestion; } catch(e) { var results = []; }
            $.each(results, function() {
                try {
                    var s = this.suggestion.data.toLowerCase();
                    suggestions.push({label: s.replace(term, '<b>'+term+'</b>'), value: s});
                } catch(e){}
            });
            cache[term] = suggestions;
            console.log(suggestions);
            response(suggestions);
        }
    });
}



$('#hero-demo').tagEditor({
    placeholder: 'Enter tags ...',
    autocomplete: { source: googleSuggest, minLength: 3, delay: 250, html: true, position: { collision: 'flip' } }
});