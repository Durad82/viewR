# viewR : view renderer

## What is it

VIEWR is a basic server side view renderer for Node Server.
It relies on .viewr and .js files.
.viewr files are basically HTML-like files with viewr-specific features.
This extension is based on "html-text-basic" TextMate grammar file, and intends to highlight ${viewR_variables}.

## Requirements

- fs module.

## What it can do

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
${outerSnippet("views/partials/pageBase")}
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

### Insert a togglable snippet

### Insert a viewR component

#

## what it can’t do

- use express features for view engines
- use js in .viewr files
  
## TODO

- array handling
- loops and conditionnal
- complex snippets
- data storage in engine instance

## Release Notes

### beta 0.0.1

Initial release.
