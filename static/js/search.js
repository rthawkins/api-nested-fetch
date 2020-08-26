function QuerySearch() {

  // Variable holding the search query
  var search_query = document.getElementById("search-query").value;

  // Store API endpoint
  var url = 'YOUR API URL';

  // This is for the final URL string
  var base_url = 'www.yourdomain.com/?';

  // Initial query to convert search query into desired result
  var query = `
    query {
      api-parent(api-field: "${search_query}") {
        desired-api-field
      }
    }
  `;
  // API call info
  var opts = {
      method: "POST",
      headers: { "Authorization" : "Bearer YOUR_TOKEN" },
      body: JSON.stringify({query})
    };

  // Initial API call
  var result = fetch(url, opts).then(function(response) {
      return response.json(); 
    }).then(function(data) {
      // Store desired API field in variable, based on JSON
      var desired_field = data.data.api-parent.desired-api-field;
      
      // Debug value
      // console.log(desired_field, '\n');
      
      // Query for more fields based on initial result
      let query = `
        query {
          api-parent(where: {desired_field: {_eq: "${desired_field}"}}) {
            new_field1
            new_field2
          }
        }
        `;

      // This is the 2nd query request and returns a promise
      return fetch(url, {
        method: "POST",
        headers: { "Authorization" : "Bearer YOUR_TOKEN" },
        body: JSON.stringify({query})
      }); 
    })
    .then(function(response) {
      return response.json();
    })
    // Error response
    .catch(function(error) {
      console.log('Request failed', error);
      // Create URL search parameters based on fields
      // More details: https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript/49701878#49701878
      const params = new URLSearchParams({
        exe_search: search_query,
        error: "true"
      });
      // Append result to #results in index.html
      let onscreen_result = $("<p>"+base_url + params.toString()+"</p>");
      onscreen_result.appendTo("#results");
      console.log(base_url + params.toString());
    })
    // Successful response
      result.then(function(r) {
        console.log(r); // 2nd request result
        // Create URL search parameters based on fields
        // More details: https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript/49701878#49701878
        const params = new URLSearchParams({
          exe_search: search_query,
          error: "false",
          field1: r.data.api-parent[0].field1,
          field2: r.data.api-parent[0].field2
        });
        let onscreen_result = $("<p>"+base_url + params.toString()+"</p>");
        onscreen_result.appendTo("#results");
        console.log(base_url + params.toString());
      });

};
