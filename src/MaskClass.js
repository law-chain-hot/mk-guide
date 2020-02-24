class MaskGuide {
    constructor(option = {}) {
        this.options = {
            // buttonColor: 'black',
            // skipButtonColor: 'firebrick',

            ...option,
        };

        // 1. init
        this.initValues()
        this.initNode()
        this.setMaskBtnNode() // add even to button
        this.initCSS()

        // 2. guides
        this.guides = null

        // 3. start
        // call start()

    }

    initValues() {
        this.offsetWidth = null
        this.offsetHeight = null
        this.getAbsoluteLeft = null
        this.getAbsoluteTop = null
        this.getAbsoluteRight = null
        this.getAbsoluteBottom = null
        this.screenWidth = null
        this.screenHeight = null

        this.count = 0;
    }

    initNode() {
        // mask
        this.docNode = document.querySelector('body')
        this.maskNode = document.createElement('div');
        this.maskNode.className = 'mask';
        this.docNode.insertAdjacentElement("beforeend", this.maskNode);

        // mask-tip
        this.maskTipNode = document.createElement('div');
        this.maskTipNode.className = 'mask-tip';
        this.maskNode.insertAdjacentElement("afterbegin", this.maskTipNode)

        // mask-des
        this.maskDesNode = document.createElement('div');
        this.maskDesNode.className = 'mask-des';
        this.maskTipNode.insertAdjacentElement("afterbegin", this.maskDesNode)

        // mask-button-group
        this.maskBtnGroupNode = document.createElement('div');
        this.maskBtnGroupNode.className = 'mask-btn-group';
        this.maskTipNode.insertAdjacentElement("beforeend", this.maskBtnGroupNode)


        // mask-button-skip
        this.maskBtnSkipNode = document.createElement('button');
        this.maskBtnSkipNode.className = 'mask-btn-skip';
        this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnSkipNode)

        // mask-button-before
        this.maskBtnBeforeNode = document.createElement('button');
        this.maskBtnBeforeNode.className = 'mask-btn-before';
        this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnBeforeNode)



        // mask-button-next
        this.maskBtnNextNode = document.createElement('button');
        this.maskBtnNextNode.className = 'mask-btn-next';
        this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnNextNode)

        // button
        this.maskButtonNode = document.querySelector('.mask .mask-tip button');
    }


    initCSS() {
        this.maskBtnGroupNode.style.display = "flex"


        // button color
        // if (this.options.skipButtonColor && this.options.buttonColor){
        //     this.options.skipButtonColor = "firebrick"
        // }
        if ( !this.options.buttonColor) {
            this.options.buttonColor = "black"
            if ( !this.options.skipButtonColor) this.options.skipButtonColor = "firebrick"
        }


        this.maskBtnNextNode.style.borderColor = this.options.buttonColor;
        this.maskBtnBeforeNode.style.borderColor = this.options.buttonColor;

        // skip button color
        this.skipButtonColor = this.options.buttonColor;
        if (this.options.skipButtonColor) this.skipButtonColor = this.options.skipButtonColor;
        this.maskBtnSkipNode.style.borderColor = this.skipButtonColor;


        //
        this.maskBtnSkipNode.style.position = "relative";
        this.maskBtnSkipNode.style.right = "22px";




        this.initMouseEvent(this.maskBtnNextNode, this.options.buttonColor);
        this.initMouseEvent(this.maskBtnBeforeNode, this.options.buttonColor);
        this.initMouseEvent(this.maskBtnSkipNode, this.skipButtonColor);


    }

    initMouseEvent(el, color) {
        el.onmouseover = () => {
            el.style.backgroundColor = color;
            el.style.color = "white";

        }
        el.onmouseout = () => {
            el.style.backgroundColor = "white";
            el.style.color = "black";
        }
    }

    setMask(el) {
        // 1. get the value of element
        this.offsetWidth = el.offsetWidth;
        this.offsetHeight = el.offsetHeight;
        this.getAbsoluteLeft = el.getBoundingClientRect().left + document.documentElement.scrollLeft;
        this.getAbsoluteTop = el.getBoundingClientRect().top + document.documentElement.scrollTop;
        this.getAbsoluteRight = el.getBoundingClientRect().right + document.documentElement.scrollRight;
        this.getAbsoluteBottom = el.getBoundingClientRect().bottom + document.documentElement.scrollBottom;

        // 2. get the value of screen
        this.screenWidth = this.docNode.scrollWidth;
        this.screenHeight = this.docNode.scrollHeight;

        // 3.1 set mask
        this.maskNode.style.boxSizing = "border-box";
        this.maskNode.style.zIndex = "900";


        // 3.2 screen
        this.maskNode.style.width = this.screenWidth + "px";
        this.maskNode.style.height = this.screenHeight + "px";

        // 3.3 border
        this.maskNode.style.borderLeft = this.getAbsoluteLeft - 10 + "px";
        this.maskNode.style.borderTop = this.getAbsoluteTop - 10 + "px";
        this.maskNode.style.borderRight = this.screenWidth - this.offsetWidth - this.getAbsoluteLeft - 10 + "px";
        this.maskNode.style.borderBottom = this.screenHeight - this.offsetHeight - this.getAbsoluteTop - 10 + "px";

        this.maskNode.style.borderColor = "rgba(0, 0, 0, 0.5)";
        this.maskNode.style.borderStyle = 'solid';
        this.maskNode.style.backgroundColor = "rgba(225, 225, 225, 0.1)";

        this.maskNode.style.position = "absolute";
        this.maskNode.style.left = 0;
        this.maskNode.style.top = 0;

        // 3.4 animation
        this.maskNode.style.transition = "all .3s ease-in-out"
    }

    setMaskTip() {
        this.maskTipNode.style.position = "absolute";
        this.maskTipNode.style.left = 10 + "px";
        this.maskTipNode.style.top = this.offsetHeight + 35 + "px";

        this.maskTipNode.style.width = "270px";
        // this.maskTipNode.style.minHeight = "120px";
        this.maskTipNode.style.backgroundColor = "white"
        this.maskTipNode.style.borderRadius = "3px"
        this.maskTipNode.style.padding = "5px"
    }

    setMaskDesNode(des) {
        this.maskDesNode.innerHTML = des
    }


    setMaskBtnNode() {

        this.maskBtnSkipNode.innerHTML = 'Skip'
        this.skip = (e) => {
            this.maskNode.style.display = "none";
        }
        this.maskBtnSkipNode.onclick = this.skip;

        // next btn
        this.maskBtnNextNode.innerHTML = 'Next→'
        this.next = (e) => {
            // clear focus
            document.querySelector(this.guides[this.count].element).blur()
            // console.log(document.body.focus());
            
            this.count++
            if (this.guides[this.count]) {
                this.maskBtnNextNode.innerHTML = 'Next→'
                this.maskBtnBeforeNode.style.visibility = "visible"
                this.maskStart(this.guides[this.count])
                if (this.count === this.guides.length - 1) this.maskBtnNextNode.innerHTML = 'Done'
            } else {
                this.maskNode.style.display = "none";
            }
        }
        this.maskBtnNextNode.onclick = this.next


        // before btn
        this.maskBtnBeforeNode.style.visibility = "hidden"
        this.maskBtnBeforeNode.innerHTML = '←Before'
        this.before = (e) => {
            // clear focus
            document.querySelector(this.guides[this.count].element).blur()

            this.count--
            this.maskBtnNextNode.innerHTML = 'Next→'
            if (this.count === 0) {
                this.maskBtnBeforeNode.style.visibility = "hidden"
                this.maskStart(this.guides[this.count])
            } else if (this.count > 0) {
                this.maskStart(this.guides[this.count])
            } else {
                this.count = 0;
            }
        }
        this.maskBtnBeforeNode.onclick = this.before;


        // keypress
        document.addEventListener('keydown', (e) => { //event is what we tap in the keyboard
            if (event.keyCode === 37 || event.which === 37) {
                this.before();
            }
            if (event.keyCode === 39 || event.which === 39) {
                this.next();
            }
            if (event.keyCode === 27 || event.which === 27) {
                this.skip();
            }
        });
    }


    maskStart(guide) {
        let ele = document.querySelector(guide.element)
        if (guide.shouldFocus) {
            ele.focus();
        }
        this.setMask(ele)
        this.setMaskTip()
        this.setMaskDesNode(guide.description)
    }

    start() {
        if (this.guides) {
            this.maskStart(this.guides[this.count])
        }
    }

}

export default MaskGuide