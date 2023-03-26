# Magnetic elements
Lightweight library to add smooth scrolling to your website.
Fixes problems with appearing/disappearing browsers UI (ex. url section on Chrome/Safari).

## Features

- Lightweight
- No dependencies
- Optionally use your own external RAF loop to increase performance
- Fps aware lerping
## Demo 
[Magnetic elements demo](https://magnetic-elements.netlify.app/).
## Installation
### npm
```sh
npm i @toon.rombaut/magnetic-elements
```
### yarn
```sh
yarn add @toon.rombaut/magnetic-elements
```

## Usage

1. Add the 'magnetic-element' tag to your html elements that you want to make magnetic
```html
<body>
    <div class="container">
        <button magnetic-element>I'm a magnetic button</button>
        <p magnetic-element>I'm a magnetic paragraph</p>
    </div>
</body>
```

3. Import and initiaze in javascript
```javascript
//import
import { MagneticElementsController } from "@toon.rombaut/magnetic-elements";

//Initialize
const magneticElementsController = new MagneticElementsController();
```
4. If you don't need the magnetic elements anymore, or you want to re-initialize, don't forget to use the destroy method on the current instance.
This is also adviced when changing pages in an SPA.
```javascript
magneticElementsController.destroy();
```
## Options

| Parameter | Type | Required| Default | Description |
| ------ | ------ | ------ | ------ | ------ |
| standalone | Boolean | No | false | Set to true if you are using your own external RAF loop. Can be used to increase performance. |
| triggerArea | Number | No | 200 | The size of the area around the elements to trigger the magnetic effect. |
| interpolationFactor | Number | No | 0.8 | The interpolation factor used by the lerp function. Value between 0 and 1. |
| magneticForce | Number | No | 0.3 | The strength of the magnetic effect. Value between 0 and 1. |

## Methods

Methods that can be executed on the EzSmoothScroll instance.

| Method | Parameters | Description |
| ------ | ------ | ------ |
| onResize() | / | Manually trigger the resize method. |
| update() | / | Manually trigger an update of the magnetic elements. Useful if you use your own external RAF. |
| destroy | / | Destroy the eventlisteners inside the instance. Important to execute if you want to re-initialize or to increase performance when you don't need the instance anymore. |

## External RAF
You can use your own external RAF loop.

```javascript
//import
import { MagneticElementsController } from "@toon.rombaut/magnetic-elements";

//Initialize
const magneticElementsController = new MagneticElementsController({
    standalone:false,
    triggerArea: 300,
    interpolationFactor: 0.5,
    magneticForce: 0.5
});

//render function,
render = () => {
    magneticElementsController.update();
    //do you other stuff here

    requestAnimationFrame(render);
}
//kickstart your own external RAF loop
render();
```

## Support
I appreciate all feedback and comments.
<a href="https://www.buymeacoffee.com/toonrombaut" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
### Socials
Instagram: @toon.rombaut
Email: toon.rombaut@hotmail.com
