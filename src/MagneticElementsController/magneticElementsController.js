export default class MagneticElementsController{
    /**
     * @param {Object} options
     * @param {Boolean|undefined} [options.standalone] Set to true if you are using your own external RAF loop.
     * @param {Number|undefined} [options.triggerArea] The size of the area around the elements to trigger the magnetic effect.
     * @param {Number|undefined} [options.interpolationFactor] The interpolation factor used by the lerp function.
     * @param {Number|undefined} [options.magneticForce] The strength of the magnetic effect.
     */
    constructor(options){
        this.standalone = options?.standalone ?? false;
        this.triggerArea = options?.triggerArea ?? 200;
        this.interpolationFactor = options?.interpolationFactor ?? 0.8
        this.magneticForce = options?.magneticForce ?? 0.3;

        this.validateOptions(options);
        this.initEvents();

        //vars
        this.mouse = {
            x:0,
            y:0,
        };

        this.magneticElements = document.querySelectorAll("[magnetic-element]");

        this.onResize();

        this.time = performance.now();
        if(!this.standalone) this.update();
        
    }
    validateOptions = (options) => {
        if(typeof this.standalone !== 'boolean') throw new Error("standalone value must be a boolean");

        if(typeof this.triggerArea !=='number') throw new Error("triggerArea valu muast be a numeric value greater or equal to 0.")
        if(this.interpolationFactor < 0) throw new Error("interpolationFactor value must be greater or equal than 0.");

        if(typeof this.interpolationFactor !== 'number') throw new Error("interpolationFactor value must be a numeric value between 0 and 1.");
        if(this.interpolationFactor <= 0) throw new Error("interpolationFactor value must be greater than 0.");
        if(this.interpolationFactor > 1) throw new Error("interpolationFactor value must be less than 1.");

        if(typeof this.magneticForce !== 'number') throw new Error("magneticForce value must be a numeric value between 0 and 1.");
        if(this.magneticForce <= 0) throw new Error("magneticForce value must be greater than 0.");
        if(this.magneticForce > 1) throw new Error("magneticForce value must be less than 1.");
    }
    lerp = (current,target,factor,delta) => {
        const fpsAwareFactor = 1- Math.pow(factor, delta/100);
        return current * (1-fpsAwareFactor) + target *fpsAwareFactor;
    }
    initEvents = () => {
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onResize);
        
    }
    destroy = () => {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("resize", this.onResize)
    }
    onMouseMove = (e) =>{
        this.mouse.x = e.pageX;
        this.mouse.y = e.pageY;
    }
    onResize = () => {
        this.lerpingData= []
        for (let i = 0; i < this.magneticElements.length; i++) {
            this.lerpingData.push({
                boundingClientRect : this.magneticElements[i].getBoundingClientRect(),
                x:{
                    current:0,
                    target:0
                },
                y:{
                    current:0,
                    target:0
                }
            })
        };
    }
    calculateDistance = (x1,y1,x2,y2) => {
        return Math.hypot(x1-x2,y1-y2);
    }
    update = () => {
        //console.log(this.lerpingData)
        const delta = performance.now() - this.time;
        this.time = performance.now();
        for (let i = 0; i < this.lerpingData.length; i++) {
            //if(i > 0) return requestAnimationFrame(this.update)
            const element = this.lerpingData[i];
            const distanceFromMouse = this.calculateDistance(
                this.mouse.x,
                this.mouse.y,
                element.boundingClientRect.left  + element.boundingClientRect.width / 2,
                element.boundingClientRect.top + element.boundingClientRect.height / 2
            );

            const targetPosition = {x:0,y:0};
            if(distanceFromMouse < this.triggerArea){
                targetPosition.x = this.mouse.x - (element.boundingClientRect.left + element.boundingClientRect.width /2);
                targetPosition.y = this.mouse.y - (element.boundingClientRect.top + element.boundingClientRect.height /2);
            }

            element.x.target = targetPosition.x * this.magneticForce;
            element.y.target = targetPosition.y * this.magneticForce;

            if(Math.abs(element.x.current) < .01 && element.x.target == 0) element.x.current = 0;
            if(Math.abs(element.y.current) < .01 && element.y.target == 0) element.y.current = 0;
            
            element.x.current = this.lerp(element.x.current,element.x.target,this.interpolationFactor,delta);
            element.y.current = this.lerp(element.y.current,element.y.target,this.interpolationFactor,delta);

            this.magneticElements[i].style.transform = `translate(${element.x.current}px,${element.y.current}px)`;

        }
        if(!this.standalone) requestAnimationFrame(this.update);
    }
}