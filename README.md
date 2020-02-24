# MK-Guide

A light JavaScript library to guide the user to focus the important part, including fix element.

There is [Demo](https://law-chain-hot.github.io/demo-mk-guide/) with default value


## Install
```shell
npm install mk-guide
or npm i mk-guide
or yarn add mk-guide
```

## Usage

### Import
Import the library and the CSS file

```javascript
import MkGuide from 'mk-guide'
import 'mk-guide/style.css'
```

### Creat a variable of guide
Input a new variable `mask`
```js
// New a maskclass with default value
let mask = new MkGuide()  
```
Or you could customize it with color:
```js
// Customize it
let mask = new MkGuide({ 
    buttonColor: "gold" // optional: 
    skipButtonColor: "firebrick" // optional: 
})  
```

### Initialize the route and get started
Set the route of guide, and call the `mask.start()`.
```js
// example with 3 step, and it will focus the element of step2
mask.guides = [
    {   
        element: "#step1",                // querySelector
        description: "this is step 1"    // the words of tip
    },
    {   
        element: ".step2",
        description: "Tap in here, and focus it (shouldFocus: true)"
        shouldFocus: ture // optional: focus the element when you highlight it
    },
    {
        element: "box3",
        description: "You can control it with'→ ← ESC'"
    },
]

mask.start() // start the mask guide
```

### 


## update history
### v1.1.0
Added customized color API and shouldFocus API

### v1.0.2 
Added the arrow into the button
### v1.0.1
Changed the color of tip