import { MagneticElementsController } from "../src";

const magneticElementsController = new MagneticElementsController({
    standalone:false,
    triggerArea: 300,
    interpolationFactor: 0.5,
    magneticForce: 0.5
});

function render(){
    magneticElementsController.update();
    requestAnimationFrame(render)
}

render();