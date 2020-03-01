<h1 align="center"> Mk-Guide</h1>
<br/> 
<p align="center"> 
  <a href="">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://www.npmjs.com/package/mk-guide">
    <img alt="npm" src="https://img.shields.io/npm/v/mk-guide">
  </a>
  <a href="https://npmjs.org/package/mk-guide">
    <img alt="npm" src="https://img.shields.io/npm/dt/mk-guide">
  </a>
</p>

- 一个轻量级制作网站新手引导的JavaScript包，原生JavaScript实现，可高亮fix元素。附[Demo](https://law-chain-hot.github.io/demo-mk-guide/) 地址
- A light JavaScript library to guide the user to focus the important part, including fix element.
- There is [Demo](https://law-chain-hot.github.io/demo-mk-guide/) with default value

<p align="center">
<img src = "https://github.com/law-chain-hot/Blog/blob/master/0-src/2-%E8%87%AA%E5%B7%B1%E5%86%99%E7%9A%84%E8%BD%AE%E5%AD%90/1-mk-guide-intro.gif" style="width:100px;")
</p>

## Install
```bash
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
        shouldFocus: true // optional: focus the element when you highlight it
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