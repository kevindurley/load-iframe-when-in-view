# load-iframe-when-in-view
Load iframes src attribute only when they scroll into view.

## example

http://durley.net/load-iframe-when-in-view/

## usage

1) Copy repository

	git clone https://github.com/kevindurley/load-iframe-when-in-view.git

2) Copy the js file into your project

	js/loadiframewheninview.js
	
3) Add references to the js filesto your project

```html
  <script src="js/loadiframewheninview.js"></script>
```
  
4) Add the iframe(s) to your html with src="" and data-src="YOUR-IFRAME-SRC"

```html
.
.
.
        <div class="external"><iframe src="" data-src="http://www.bbc.co.uk" frameborder="0" scrolling="no" allowfullscreen=""></iframe></div>
    </div>
    <div class="itemHolder">
        <div class="internal">1</div>
        <div class="external"><iframe src="" data-src="http://www.samsung.com" frameborder="0" scrolling="no" allowfullscreen=""></iframe></div>
.
.
.
```

5) Initialise the loadIframeWhenInView within your document ready

```javascript
$(document).ready(function () {

    $('.external iframe').loadIframeWhenInView({});

});
```

6) Options that can be passed to loadIframeWhenInView during initialisation are - tbc

```javascript
    // options
    // debug: false,
    // percentageToBeVisible: 25,
    // unloadIframeWhenOutOfView: true
    $('.external iframe').loadIframeWhenInView({
        debug: false,
        percentageToBeVisible: 10,
        unloadIframeWhenOutOfView: true
    });
```



