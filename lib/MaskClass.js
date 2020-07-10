'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debounce = function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, delay);
        }
    };
};

var MaskGuide = function () {
    function MaskGuide() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, MaskGuide);

        this.options = _extends({
            // buttonColor: 'black',
            // skipButtonColor: 'firebrick',
            mouseHover: 'true'
        }, option);

        // // 1. init
        // this.initValues()
        // this.initNode()
        // this.setMaskBtnNode() // add even to button
        // this.initCSS()
        this.isStart = false;

        // 2. guides
        this.guides = null;
        this.intro = false;

        // 3. online the mask node
        // this.maskNode.style.display = 'block';
    }

    _createClass(MaskGuide, [{
        key: 'initValues',
        value: function initValues() {
            this.offsetWidth = null;
            this.offsetHeight = null;
            this.getAbsoluteLeft = null;
            this.getAbsoluteTop = null;
            this.getAbsoluteRight = null;
            this.getAbsoluteBottom = null;
            this.screenWidth = null;
            this.screenHeight = null;

            this.count = 0;
        }
    }, {
        key: 'initNode',
        value: function initNode() {
            // mask
            this.docNode = document.querySelector('body');
            this.maskNode = document.createElement('div');
            this.maskNode.className = 'mask';
            this.docNode.insertAdjacentElement("beforeend", this.maskNode);
            // offline the mask node
            this.maskNode.style.display = 'none';

            // mask-tip
            this.maskTipNode = document.createElement('div');
            this.maskTipNode.className = 'mask-tip';
            this.maskNode.insertAdjacentElement("afterbegin", this.maskTipNode);

            // mask-des
            this.maskDesNode = document.createElement('div');
            this.maskDesNode.className = 'mask-des';
            this.maskTipNode.insertAdjacentElement("afterbegin", this.maskDesNode);

            // mask-header
            this.maskHeaderNode = document.createElement('h1');
            this.maskHeaderNode.className = 'mask-header';
            this.maskTipNode.insertAdjacentElement("afterbegin", this.maskHeaderNode);

            // mask-pic
            this.maskPicNode = document.createElement('img');
            this.maskPicNode.className = 'mask-img-0230';
            this.maskPicNode.style.display = 'none';
            this.maskTipNode.insertAdjacentElement("afterbegin", this.maskPicNode);

            // mask-button-group
            this.maskBtnGroupNode = document.createElement('div');
            this.maskBtnGroupNode.className = 'mask-btn-group';
            this.maskTipNode.insertAdjacentElement("beforeend", this.maskBtnGroupNode);

            // mask-button-skip
            this.maskBtnSkipNode = document.createElement('button');
            this.maskBtnSkipNode.className = 'mask-btn-skip';
            this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnSkipNode);

            // mask-button-before
            this.maskBtnBeforeNode = document.createElement('button');
            this.maskBtnBeforeNode.className = 'mask-btn-before';
            this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnBeforeNode);

            // mask-button-next
            this.maskBtnNextNode = document.createElement('button');
            this.maskBtnNextNode.className = 'mask-btn-next';
            this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnNextNode);

            // button
            this.maskButtonNode = document.querySelector('.mask .mask-tip button');
        }
    }, {
        key: 'initCSS',
        value: function initCSS() {

            // mask content
            // this.docNode.style

            // this.maskBtnGroupNode.style.display = "flex"
            this.maskBtnGroupNode.width = "270px";

            // button color
            if (!this.options.buttonColor) {
                this.options.buttonColor = "black";
                if (!this.options.skipButtonColor) this.options.skipButtonColor = "firebrick";
            }

            this.maskBtnNextNode.style.borderColor = this.options.buttonColor;
            this.maskBtnBeforeNode.style.borderColor = this.options.buttonColor;

            // skip button color
            this.skipButtonColor = this.options.buttonColor;
            if (this.options.skipButtonColor) this.skipButtonColor = this.options.skipButtonColor;
            this.maskBtnSkipNode.style.borderColor = this.skipButtonColor;

            this.maskBtnSkipNode.style.position = "relative";
            this.maskBtnSkipNode.style.right = "22px";

            if (this.options.mouseHover !== "false") {
                this.initMouseEvent(this.maskBtnNextNode, this.options.buttonColor);
                this.initMouseEvent(this.maskBtnBeforeNode, this.options.buttonColor);
                this.initMouseEvent(this.maskBtnSkipNode, this.skipButtonColor);
            } else {
                this.maskBtnNextNode.style.backgroundColor = this.options.buttonColor;
                this.maskBtnNextNode.style.color = "white";
                this.maskBtnBeforeNode.style.backgroundColor = this.options.buttonColor;
                this.maskBtnBeforeNode.style.color = "white";
                this.maskBtnSkipNode.style.backgroundColor = this.options.buttonColor;
                this.maskBtnSkipNode.style.color = "white";
            }
        }
    }, {
        key: 'initMouseEvent',
        value: function initMouseEvent(el, color) {
            el.onmouseover = function () {
                el.style.backgroundColor = color;
                el.style.color = "white";
            };
            el.onmouseout = function () {
                el.style.backgroundColor = "white";
                el.style.color = "black";
            };
        }
    }, {
        key: 'setMask',
        value: function setMask(el) {
            // 1. get the value of element
            this.offsetWidth = el.offsetWidth;
            this.offsetHeight = el.offsetHeight;
            this.getAbsoluteLeft = el.getBoundingClientRect().left + (document.documentElement.scrollLeft || 0);
            this.getAbsoluteTop = el.getBoundingClientRect().top + (document.documentElement.scrollTop || 0);
            this.getAbsoluteRight = el.getBoundingClientRect().right + (document.documentElement.scrollRight || 0);
            this.getAbsoluteBottom = el.getBoundingClientRect().bottom + (document.documentElement.scrollBottom || 0);

            // 2. get the value of screen
            this.screenWidth = this.docNode.scrollWidth;
            this.screenHeight = this.docNode.scrollHeight;

            // 3.1 set mask
            // this.maskNode.style.boxSizing = "border-box";
            this.maskNode.style.zIndex = "1200";

            // 3.2 screen
            this.maskNode.style.width = this.screenWidth + "px";
            this.maskNode.style.height = this.screenHeight + "px";

            // 3.3 border
            var left = this.getAbsoluteLeft - 10;
            var top = this.getAbsoluteTop - 10;
            var bottom = this.screenHeight - this.offsetHeight - this.getAbsoluteTop - 10;
            var right = this.screenWidth - this.offsetWidth - this.getAbsoluteLeft - 10;
            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (bottom < 0) bottom = 0;
            if (right < 0) right = 0;
            this.maskNode.style.borderLeft = left + "px";
            this.maskNode.style.borderTop = top + "px";
            this.maskNode.style.borderBottom = bottom + "px" + " solid";
            this.maskNode.style.borderRight = right + "px" + " solid";
            this.maskNode.style.borderColor = "rgba(0, 0, 0, 0.5)";
            this.maskNode.style.borderStyle = 'solid';

            this.maskNode.style.backgroundColor = "rgba(225, 225, 225, 0.20)";
            this.maskNode.style.position = "absolute";
            this.maskNode.style.left = 0;
            this.maskNode.style.top = 0;

            // 3.4 animation
            this.maskNode.style.transition = "all .3s ease-in-out";
        }
    }, {
        key: 'setMaskTip',
        value: function setMaskTip() {
            this.maskTipNode.style.position = "absolute";
            this.maskTipNode.style.display = "flex";
            this.maskTipNode.style.flexDirection = "column";
            this.maskTipNode.style.alignItems = "center";

            this.maskTipNode.style.top = this.offsetHeight + 35 + "px";

            var diff = this.getAbsoluteLeft + 410;
            if (diff > document.documentElement.clientWidth) {
                var move = diff - document.documentElement.clientWidth + 20;
                this.maskTipNode.style.left = -move + 'px';
            } else {
                this.maskTipNode.style.left = "1px";
            }

            var diffTop = this.getAbsoluteBottom + 200;
            if (diffTop > document.documentElement.clientHeight) {
                var move = diffTop - document.documentElement.clientHeight + 20 + this.offsetHeight; //this.maskTipNode.offsetHeight
                this.maskTipNode.style.top = -move + 'px';
            }

            this.maskTipNode.style.borderRadius = "3px";
            this.maskTipNode.style.padding = "15px";
            this.maskTipNode.style.minWidth = "390px";
            this.maskTipNode.style.maxWidth = "400px";
            this.maskTipNode.style.boxShadow = "rgba(0, 0, 0, 0.36) 1px 2px 13px 2px";

            if (this.options.mode === 'dark') {
                this.maskTipNode.style.backgroundColor = "rgba(53, 53, 53, 0.97)";
                this.maskTipNode.style.color = 'whitesmoke';
                // console.log("initCSS -> this.maskTipNode.style.color", this.maskTipNode.style.color)
            } else {
                this.maskTipNode.style.backgroundColor = "white";
                this.maskTipNode.style.color = 'black';
                // console.log("initCSS -> this.maskTipNode.style.color", this.maskTipNode.style.color)
            }
        }
    }, {
        key: 'setIntro',
        value: function setIntro() {
            // 1. get the value of screen
            this.screenWidth = this.docNode.scrollWidth;
            this.screenHeight = this.docNode.scrollHeight;

            // 1. get the value of screen
            this.clientWidth = this.docNode.clientWidth;
            this.clientHeight = this.docNode.clientHeight;

            // 2.1 set mask
            this.maskNode.style.boxSizing = "border-box";
            this.maskNode.style.zIndex = "900";

            // 2.2 screen
            this.maskNode.style.width = this.screenWidth + "px";
            this.maskNode.style.height = this.screenHeight + "px";

            this.maskNode.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            this.maskNode.style.position = "absolute";
            this.maskNode.style.left = 0;
            this.maskNode.style.top = 0;

            // setMaskTip() for intro
            this.maskTipNode.style.position = "absolute";
            this.maskTipNode.style.display = "flex";
            this.maskTipNode.style.flexDirection = "column";
            this.maskTipNode.style.alignItems = "center";

            this.maskTipNode.style.top = this.clientHeight / 6 + "px";
            this.maskTipNode.style.left = this.clientWidth / 10 * 3 + "px";

            this.maskTipNode.style.backgroundColor = "white";
            this.maskTipNode.style.borderRadius = "3px";
            this.maskTipNode.style.padding = "15px";
            this.maskTipNode.style.width = "40%";
            this.maskTipNode.style.boxShadow = "rgba(0, 0, 0, 0.36) 1px 2px 13px 2px";

            if (this.options.mode === 'dark') {
                this.maskTipNode.style.backgroundColor = "rgba(53, 53, 53, 0.97)";
                this.maskTipNode.style.color = 'whitesmoke';
                // console.log("initCSS -> this.maskTipNode.style.color", this.maskTipNode.style.color)
            } else {
                this.maskTipNode.style.backgroundColor = "white";
                this.maskTipNode.style.color = 'black';
                // console.log("initCSS -> this.maskTipNode.style.color", this.maskTipNode.style.color)
            }
        }
    }, {
        key: 'setMaskDesNode',
        value: function setMaskDesNode(des) {
            this.maskDesNode.width = "80%";
            this.maskDesNode.innerHTML = des || null;
            this.maskDesNode.style.wordWrap = "break-word";
            this.maskDesNode.style.textAlign = "center";
        }
    }, {
        key: 'setMaskHeaderNode',
        value: function setMaskHeaderNode(header) {
            if (header) {
                this.maskHeaderNode.style.display = 'block';
                this.maskHeaderNode.width = "80%";
                this.maskHeaderNode.innerHTML = header || null;
                this.maskHeaderNode.style.wordWrap = "break-word";
                this.maskHeaderNode.style.padding = '10px';
            } else {
                this.maskHeaderNode.innerHTML = null;
                this.maskHeaderNode.style.padding = '0px';
                this.maskHeaderNode.style.display = 'none';
            }
        }
    }, {
        key: 'setMaskPicNode',
        value: function setMaskPicNode(imgURL) {
            if (imgURL) {
                // header 
                this.maskPicNode.style.padding = '10px';
                this.maskPicNode.src = imgURL;
                this.maskPicNode.style.display = 'block';
                // this.maskPicNode.style.width = '100%'
                if (this.count == 0 && this.intro == false && this.guides[0].intro) {
                    this.maskPicNode.style.maxWidth = '99%';
                } else {
                    this.maskPicNode.style.maxWidth = '370px';
                }
            } else {
                this.maskPicNode.style.padding = '0px';
                this.maskPicNode.style.display = 'none';
            }
        }
    }, {
        key: 'setMaskBtnNode',
        value: function setMaskBtnNode() {
            var _this = this;

            var refreshMask = debounce(function () {
                console.log('resize');

                if (_this.count == 0 && _this.guides[0].intro) {
                    _this.introStart();
                }
                if (!_this.guides[0].intro || _this.count > 0) {
                    _this.maskStart(_this.guides[_this.count]);
                }
                // console.log('==');
            }, 1000);

            // let refreshMaskWithContext = refreshMask.bind(this);

            // add event resize
            window.addEventListener('resize', refreshMask);
            window.addEventListener('scroll', refreshMask);

            var clearEvent = function clearEvent() {
                remove();
                // document.removeEventListener('keydown', keyEventMKGuide);
                window.removeEventListener('resize', refreshMask);
                window.addEventListener('scroll', refreshMask);
            };

            this.maskBtnSkipNode.innerHTML = 'Skip';
            this.skip = function (e) {
                // document.removeEventListener('keydown', keyEvent);
                clearEvent();
                _this.maskNode.style.display = "none";
            };
            this.maskBtnSkipNode.onclick = this.skip;

            // next btn
            this.maskBtnNextNode.innerHTML = 'Next→';
            this.next = function (e) {
                _this.maskBtnNextNode.focus();
                if (_this.guides[0].intro) _this.intro = true;
                // if (this.guides[this.count].element) {
                //     // clear focus
                //     document.querySelector(this.guides[this.count].element).blur()
                // }

                // console.log(document.body.focus());
                _this.count++;
                if (_this.guides[_this.count]) {
                    _this.maskBtnNextNode.innerHTML = 'Next→';
                    _this.maskBtnBeforeNode.style.visibility = "visible";
                    if (_this.intro == true && _this.count == 1) {
                        _this.maskBtnBeforeNode.style.visibility = "hidden";
                    }
                    _this.maskStart(_this.guides[_this.count]);
                    if (_this.count === _this.guides.length - 1) _this.maskBtnNextNode.innerHTML = 'Done';
                } else {
                    clearEvent();
                    _this.maskNode.style.display = "none";
                }
            };
            this.maskBtnNextNode.onclick = this.next;

            // before btn
            this.maskBtnBeforeNode.style.visibility = "hidden";
            this.maskBtnBeforeNode.innerHTML = '←Before';
            this.before = function (e) {
                // // clear focus
                // document.querySelector(this.guides[this.count].element).blur()
                if (_this.intro == true) {
                    if (_this.count > 1) {
                        _this.count--;
                    }
                } else {
                    _this.count--;
                }
                _this.maskBtnNextNode.innerHTML = 'Next→';
                if (_this.count === 0 || _this.intro == true && _this.count == 1) {
                    _this.maskBtnBeforeNode.style.visibility = "hidden";
                    _this.maskStart(_this.guides[_this.count]);
                } else if (_this.count > 0) {
                    _this.maskStart(_this.guides[_this.count]);
                } else {
                    _this.count = 0;
                }
            };
            this.maskBtnBeforeNode.onclick = this.before;

            // keypress
            var keyEventMKGuide = function keyEventMKGuide(event) {
                //event is what we tap in the keyboard
                if (event.keyCode === 37 || event.which === 37) {
                    _this.before();
                }
                if (event.keyCode === 39 || event.which === 39) {
                    _this.next();
                }
                if (event.keyCode === 27 || event.which === 27) {
                    _this.skip();
                }
            };
            // document.addEventListener('keydown', keyEventMKGuide);

            var remove = function remove() {
                // var elem = document.querySelector('.mask-0230');
                _this.maskNode.parentNode.removeChild(_this.maskNode);
            };
        }
    }, {
        key: 'maskStart',
        value: function maskStart(guide) {
            console.log("maskStart -> guide.element", guide.element);
            if (guide.element !== 'undefined') {
                // console.log("=========")
                this.maskTipNode.style.display = 'none';
                var ele = document.querySelector(guide.element);
                // if (guide.shouldFocus) {
                //     ele.focus();
                // }
                console.dir(ele);
                this.setMask(ele);
                this.setMaskTip();
                this.setMaskDesNode(guide.description);
                this.setMaskHeaderNode(guide.header);
                this.setMaskPicNode(guide.imgURL);
            }
        }
    }, {
        key: 'start',
        value: function start() {

            if (!this.isStart) {
                // 1. init
                this.initValues();
                this.initNode();
                this.setMaskBtnNode(); // add even to button
                this.initCSS();

                this.isStart = true;
            }

            this.maskNode.style.display = 'block';
            if (this.guides[0].intro) {
                this.introStart();
            } else if (this.guides) {
                this.maskStart(this.guides[this.count]);
            }
            this.maskBtnNextNode.focus();
        }
    }, {
        key: 'introStart',
        value: function introStart() {
            // this.maskBtnNextNode.focus()
            this.setIntro();
            // this.setMaskTip()
            this.setMaskDesNode(this.guides[0].description);
            this.setMaskHeaderNode(this.guides[0].header);
            this.setMaskPicNode(this.guides[0].imgURL);
            this.maskBtnNextNode.focus();
        }
    }]);

    return MaskGuide;
}();

exports.default = MaskGuide;