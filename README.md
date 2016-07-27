
#anDigital Exercise
---
### What is it?

 A nice simple frontend for searching venues with FourSquare API, using [ReactFluxFoundationBoilerplate](https://github.com/daragao/ReactFluxFoundationBoilerplate).
 There are no buttons, you just need to type.
 
### How to build and run

```
npm install  
bower install
gulp build
gulp serve //it will serve the frontend at http://localhost:8080
```

### How it was built

 The whole frontend was built using an old project of mine as boilerplate [ReactFluxFoundationBoilerplate](https://github.com/daragao/ReactFluxFoundationBoilerplate). The ReactFluxFoundationBoilerplate is basically only a simple boilerplate frontend with a test example, following the Flux design, using React and Foundation.
  
  The exercise is basically solved by this function:

```javascript
  search(value) {
        let urlBase = 'https://api.foursquare.com/v2/venues/search?';
        let clientId = 'VL44Y2W002XNCQFDA21OZO3MJ5W1NEOI0SDG205POYMXV33O';
        let clientSecret = 'RQRI1NCKW3FALYZAF5KFE0IYMQQXRUQRLOYG1JB5WSZONYAG';
        let paramsObj = {
            client_id: clientId,
            client_secret: clientSecret,
            v: '20160727',
            query: value
        };
        if(this.state.geo) {
            let coords = this.state.geo.coords;
            paramsObj.ll = coords.latitude + ',' + coords.longitude;
        } else {
            paramsObj.near = 'London';
        }
        let params = $.param(paramsObj);
        let url = urlBase + params;
        let searchPromise = $.get(url);
        $.when(searchPromise)
        .then((response) => { //refresh the venue list
            this.state.refreshing = true;
            Dispatcher.dispatch({
                type: Constants.REFRESH_VENUES,
                data: response[0].response.venues
            });
        });
        //console.log('SEARCH:',url);
    }
```

 The search() function makes a GET request to the Foursquare API with a query value and a location. The location can be either determined by the users browser, or predefined as London. Depending if the user accepts or not his browser to share location.
 
 Because the UI is using React (which is one way binding) and the React classes are subscribed in the stores, every time there is a change in the store state an event is emitted that triggers the UI to be rendered with the new data. So basically everytime anyone writes something on the search box (after 500 milliseconds) and request with the query will be made.

### Things I wanted to have done better

 There 2 main points I missed to deliver on the exercise:

  1. Don't over engineer
  2. Do testing
 
 About 1. I got too excited to show you things I've done in the past, and ended up using a canon to kill a fly, I hope I have taken care of the fly just the same, but clearly this could all be much shorter.

 About 2. I wanted to do testing, and show you just how obsessive I have become with this on my day to day, but the truth is my experience with Javascript testing has only came recently with Angular and Jasmine, and I still didn't feel comfortable to deal with this on an exercise that I am due to deliver.