# MK-Guide

A light JavaScript library to guide the user to focus the important part, including fix element


## Install
```shell
npm install mk-guide
```

## Usage

### Import
Import the library and the CSS file

```javascript
import MkGuide from 'mk-guide'
import 'mk-guide/style.css'
```

### New a variable of guide
New a new variable `mask`
```js
let mask = new MkGuide()  // new a maskclass
```

### Initialize the route and get started
Set the route of guide, and call the `mask.start()`
```js
mask.guides = [
    {   // step 1 
        element: "#box1",               // selector
        description: "this is box 1"    // the words of tip
    },
    {   // step 2
        element: "#box2",
        description: "222"
    },
    {
        element: "#box3",
        description: "333"
    },
]

mask.start() // start the mask guide
```


## update history
### v1.0.2 1.0.3
Added the arrow into the button
### v1.0.1
Changed the color of tip