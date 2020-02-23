class MaskGuide {
    constructor() {
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


        // mask-button-before
        this.maskBtnBeforeNode = document.createElement('button');
        this.maskBtnBeforeNode.className = 'mask-btn-before';
        this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnBeforeNode)



        // mask-button-next
        this.maskBtnNextNode = document.createElement('button');
        this.maskBtnNextNode.className = 'mask-btn-next';
        this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnNextNode)
    }


    initCSS() {
        this.maskBtnGroupNode.style.display = "flex"
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

        this.maskTipNode.style.width = "200px";
        this.maskTipNode.style.minHeight = "100px";
        this.maskTipNode.style.backgroundColor = "white"
        this.maskTipNode.style.borderRadius = "3px"
        this.maskTipNode.style.padding = "5px"
    }

    setMaskDesNode(des) {
        this.maskDesNode.innerHTML = des
    }


    setMaskBtnNode() {
        // next btn
        this.maskBtnNextNode.innerHTML = 'Next→'
        this.next = (e) => {
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
        });
    }


    maskStart(guide) {
        let ele = document.querySelector(guide.element)
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