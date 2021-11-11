# viewR : view renderer

## What is it

VIEWR is a basic server side view renderer for Node Server.
It relies on .viewr and .js files, and doesn’t need Express.
.viewr files are basically HTML-like files with viewr-specific features.

## Requirements

- fs module.
- axios.


## What viewR can’t do

- use express features for view engines
- use js in .viewr files
- 
## What viewR can do

### Inject data via variables

```html
<body>
    <main>
        ${myVariable}
    </main>
</body>
```

### Make a reusable wrapping snippet

#### Wrapping snippet

With, for example, path : views/partials/pageBase.viewr.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>viewR Demo</title>
    <link rel="stylesheet" href="/css/site-styles.css">
</head>
<body>
<header class="header">
<h1 class="title">
viewR <span class="title__baseline">Demo</span>
</h1>
<div class="header__separator"></div>
</header>
<div class="wrapper">
  <<INSERTION-POINT>>
<footer class="footer">
©Adrien Durup
</footer>
  </div>
</body>
</html>
```

#### Inserted snippet at INSERTION-POINT

at views/index.viewr path.

```html
${wrapperSnippet("views/partials/pageBase")}
<main>
  <div>
    Hello world !
  </div>
</main>
```

#### In route controller (example with express)

Can be used in node .end() as well.

```javascript
function controller(req, res) {
            res.status(200).send(viewr.render("views/index",
                {
                    data: {
                        firstName: "Robert",
                        lastName: "Plant"
                    }
                }));
        }
```

### Insert one or more snippets into a snippet

#### Parent snippet

snippet(path:string [ , data:object ])

```html
${outerSnippet("views/partials/pagebase")}
<main>
  <div>
    Hello World !
  <div>
  <div>
    ${snippet("views/partials/card",card)}
  <div>  
</main>
```

#### Child snippet

```html
<article>
<div>First Name : ${firstName}</div>
<div>Last Name : ${lastName}</div>
</article>
```

### Insert a repetition of a snippet with data array

#### Parent snippet

```html
${wrapperSnippet("views/partials/pagebase")}
<main>
${loopSnippet("views/partials/card",cards)}
</main>
```

#### Child snippet

```html
<article>
<div>First Name : ${firstName}</div>
<div>Last Name : ${lastName}</div>
</article>
```

### Insert a togglable snippet

${togglable("path",data,dataKeyForToggle)}
togglable() takes a third argument, which is the state value (boolean). Must be passed in data object of renderSync(), as shown bellow.

#### JS side (example with express)

```javascript
app.get("/loop",(req, res) => {
        res.status(200).send(viewr.renderSync("views/loop",
            {
                cards: users,
            }));
    } 
);
```

#### Parent snippet

```html
${wrapperSnippet("views/partials/pagebase")}
<main>
<div class="toggleTestBox">
<a href="/outerinner/?toggleVar=true">On</a>/<a href="/outerinner/?toggleVar=false">Off</a>
${togglable("views/partials/card",card,toggle)}
<div>
</main>
```

#### Child snippet

```html
<article>
<div>First Name : ${firstName}</div>
<div>Last Name : ${lastName}</div>
</article>
```

### Insert a viewR component

-- Things become interesting here. You can have more control on rendering using viewR components.

#### What is a viewR component ?

viewR Conponent is a combination of a viewR snippet and a JS Class that can fetch data for snippet rendering. a viewR Component is made of – at least – a folder, a viewR snippet,
 and a JS file containing a class extending VRComponent. Folder, .viewr and .js have to wear the same name (camelCase). Component class name must be the same, first letter uppercase.

#### Parent

 ```html
 ${wrapperSnippet("views/partials/pagebase")}
<main class="main_gamelaunch">
<div class="main__formwrapper">
${component("views/partials/cardComponent")}
<div>
</main>
```

#### cardComponent.viewr

```html
<article>
<img src="${picture}">
<div>${first_name} ${last_name}</div>
<div>from ${city}</div>
</article>
```

#### cardComponent.js

```javascript
/* startCard component */
const { VRComponent } = require("../../../core/viewr");
const axios = require("axios");

class CardComponent extends VRComponent {
  queryOptions = {
    /* url for data request via http request (axios) */
    url: "http://localhost:4000/msg",
  }
  /*   
  //you can define a data wrapper object and pass it to base class methods.
  //default is 
  dataReceiver={data:undefined}; */
  /*
  //property that stores ViewR string from component File
   viewr="";
   //property that stores in-construction HTML string
  constructedView="";
   */
  constructor() {
    /* super constructor needs script path for ViewR to access component files */
    super(CardComponent.queryOptions, __dirname);
  }

  /*   You can override methods and pnoperties :
    async queryData(dataReceiver) {
      // Performs HTTP.get query via axios in order to fetch data, 
      // and launch constructWith() in order to inject data into viewR string
    };
  
    constructWith=(data)=> { 
  
     // transform viewR string into a HTML string with data incorporated if any.
     // returns an HTML string. 
     };
  
    transformation=(viewRstring,data=undefined)=>{ 
  //    is executed inside this.constructWith();
    //  performs custom operations before constructWith() returns its string.
    //  returns an HTML string. 
    };
    async render(){
      // Async method called inside ViewR.render();
      // Calls this.queryData()
      // and returns final value of this.constructedView
    }
  */
}

module.exports = CardComponent;
```

## TODO

- array handling
- Object.child handling debug
- Add VRComponent queryDataSync and renderSync
- data storage in engine instance

## Release Notes

### beta 0.0.1

Initial release.
