'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaskGuide = function () {
    function MaskGuide() {
        _classCallCheck(this, MaskGuide);

        // 1. init
        this.initValues();
        this.initNode();
        this.setMaskBtnNode(); // add even to button
        this.initCSS();

        // 2. guides
        this.guides = null;

        // 3. start
        // call start()
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

            // mask-tip
            this.maskTipNode = document.createElement('div');
            this.maskTipNode.className = 'mask-tip';
            this.maskNode.insertAdjacentElement("afterbegin", this.maskTipNode);

            // mask-des
            this.maskDesNode = document.createElement('div');
            this.maskDesNode.className = 'mask-des';
            this.maskTipNode.insertAdjacentElement("afterbegin", this.maskDesNode);

            // mask-button-group
            this.maskBtnGroupNode = document.createElement('div');
            this.maskBtnGroupNode.className = 'mask-btn-group';
            this.maskTipNode.insertAdjacentElement("beforeend", this.maskBtnGroupNode);

            // mask-button-before
            this.maskBtnBeforeNode = document.createElement('button');
            this.maskBtnBeforeNode.className = 'mask-btn-before';
            this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnBeforeNode);

            // mask-button-next
            this.maskBtnNextNode = document.createElement('button');
            this.maskBtnNextNode.className = 'mask-btn-next';
            this.maskBtnGroupNode.insertAdjacentElement("beforeend", this.maskBtnNextNode);
        }
    }, {
        key: 'initCSS',
        value: function initCSS() {
            this.maskBtnGroupNode.style.display = "flex";
        }
    }, {
        key: 'setMask',
        value: function setMask(el) {
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
            this.maskNode.style.transition = "all .3s ease-in-out";
        }
    }, {
        key: 'setMaskTip',
        value: function setMaskTip() {
            this.maskTipNode.style.position = "absolute";
            this.maskTipNode.style.left = 10 + "px";
            this.maskTipNode.style.top = this.offsetHeight + 35 + "px";

            this.maskTipNode.style.width = "200px";
            this.maskTipNode.style.minHeight = "100px";
            this.maskTipNode.style.backgroundColor = "white";
            this.maskTipNode.style.borderRadius = "3px";
            this.maskTipNode.style.padding = "5px";
        }
    }, {
        key: 'setMaskDesNode',
        value: function setMaskDesNode(des) {
            this.maskDesNode.innerHTML = des;
        }
    }, {
        key: 'setMaskBtnNode',
        value: function setMaskBtnNode() {
            var _this = this;

            // next btn
            this.maskBtnNextNode.innerHTML = 'Next→';
            this.next = function (e) {
                _this.count++;
                if (_this.guides[_this.count]) {
                    _this.maskBtnNextNode.innerHTML = 'Next→';
                    _this.maskBtnBeforeNode.style.visibility = "visible";
                    _this.maskStart(_this.guides[_this.count]);
                    if (_this.count === _this.guides.length - 1) _this.maskBtnNextNode.innerHTML = 'Done';
                } else {
                    _this.maskNode.style.display = "none";
                }
            };
            this.maskBtnNextNode.onclick = this.next;

            // before btn
            this.maskBtnBeforeNode.style.visibility = "hidden";
            this.maskBtnBeforeNode.innerHTML = '←Before';
            this.before = function (e) {
                _this.count--;
                _this.maskBtnNextNode.innerHTML = 'Next→';
                if (_this.count === 0) {
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
            document.addEventListener('keydown', function (e) {
                //event is what we tap in the keyboard
                if (event.keyCode === 37 || event.which === 37) {
                    _this.before();
                }
                if (event.keyCode === 39 || event.which === 39) {
                    _this.next();
                }
            });
        }
    }, {
        key: 'maskStart',
        value: function maskStart(guide) {
            var ele = document.querySelector(guide.element);
            this.setMask(ele);
            this.setMaskTip();
            this.setMaskDesNode(guide.description);
        }
    }, {
        key: 'start',
        value: function start() {
            if (this.guides) {
                this.maskStart(this.guides[this.count]);
            }
        }
    }]);

    return MaskGuide;
}();

exports.default = MaskGuide;