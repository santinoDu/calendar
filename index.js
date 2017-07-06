'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    var css = '.clearfix::after,.helper::before{content:""}i{font-style:normal}.clearfix::after{display:table;clear:both}.helper::before{display:inline-block;height:100%;vertical-align:middle}.calendar{border:1px solid #ccc;font-size:16px;text-align:center;background-color:#fff}.calendar .calendar-side{float:left}.calendar .calendar-side .cs-item{border-bottom:1px solid #ddd;padding:10px;cursor:pointer}.calendar .calendar-side .cs-item-active{color:red}.calendar .calendar-box{float:left;position:relative;left:-1px;box-sizing:border-box;border-left:1px solid #ddd;width:211px}.calendar .calendar-box .c-header{font-size:12px;line-height:2;background-color:#555;color:#fff}.calendar .c-pannel{display:flex}.calendar .c-pannel .cp-list{flex:1}.calendar .c-pannel .cp-item{display:block;height:30px;line-height:30px;cursor:pointer}.calendar .c-pannel .cp-prev-month,.calendar .c-pannel .cp-prev-year{float:left;width:25px}.calendar .c-pannel .cp-next-month,.calendar .c-pannel .cp-next-year{float:right;width:25px}.calendar .c-pannel .cp-month,.calendar .c-pannel .cp-year{margin:0 25px}.calendar .c-header .ch-item{float:left;width:30px}.calendar .c-content{font-size:14px}.calendar .c-content .cc-item{float:left;box-sizing:border-box;border-top:1px solid #ddd;border-right:1px solid #ddd;width:30px;height:26px;line-height:26px;cursor:pointer}.calendar .c-content .cc-item:nth-child(7n){border-right:none}.calendar .c-content .cc-month-item{float:left;width:25%;height:52px;line-height:52px;cursor:pointer}.calendar .c-content .disabled{color:silver}.calendar .c-content .active{color:#07e007}.calendar .c-content .select{color:#fff;background-color:#f60}.calendar .c-content .cur{color:red}.calendar .c-time{border-top:1px solid #ddd;padding:5px 0;font-size:12px}.calendar .c-time input{box-sizing:border-box;padding-left:5px;width:30px}';

    var frame = '<div class="calendar clearfix"> <div class="calendar-box"> <div class="c-pannel"> <div class="cp-list"> <span class="cp-item cp-prev-year"><</span> <span class="cp-item cp-next-year">></span> <span class="cp-item cp-year"></span> </div><div class="cp-list cp-month-operator"> <span class="cp-item cp-prev-month"><</span> <span class="cp-item cp-next-month">></span> <span class="cp-item cp-month"></span> </div></div><div class="c-header clearfix"> </div><div class="c-content clearfix"> </div><div class="c-time clearfix"> <i>时间选择</i> <input type="text" value="00" min="0" max="23" class="c-hour"> <i>:</i> <input type="text" value="00" min="0" max="59" class="c-minute"> <i>:</i> <input type="text" value="00" min="0" max="59" class="c-second"> <a href="javascript:;" class="c-confirm">确定</a> </div></div></div>';

    var cssEl = document.createElement('style');
    cssEl.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(cssEl);

    var utils = {
        isBubblingToEle: function isBubblingToEle(target, type, value) {
            while (target) {
                if (type === 'id' && target.id === value) {
                    return true;
                } else if (type === 'className' && target.classList.contains(value)) {
                    return true;
                }
                target = target.parentNode;
                if (target.nodeName === 'HTML') {
                    break;
                }
            }
            return false;
        },
        getElPos: function getElPos(el) {
            var width = el.offsetWidth;
            var height = el.offsetHeight;
            var x = el.offsetLeft;
            var y = el.offsetTop;
            var offsetParent = el.offsetParent;
            // while (el) {
            //     x += el.offsetLeft
            //     y += el.offsetTop
            //     el = el.offsetParent
            // }

            return {
                left: x,
                top: y + height,
                right: offsetParent.offsetWidth - x - width,
                bottom: offsetParent.offsetHeight - y - height
            };
        },
        classNameOperator: function classNameOperator(selector, operatorType, className) {
            var nodeType = {}.toString.call(selector).slice(8, -1);
            if (nodeType === 'HTMLCollection') {
                [].slice.call(selector).forEach(function (node) {
                    node.classList[operatorType](className);
                });
            } else if (nodeType === 'NodeList' || nodeType === 'Array') {
                selector.forEach(function (node) {
                    node.classList[operatorType](className);
                });
            } else {
                selector.classList[operatorType](className);
            }
            return this;
        }
    };

    var DateMethod = function () {
        function DateMethod() {
            _classCallCheck(this, DateMethod);
        }

        _createClass(DateMethod, [{
            key: 'getDaysInMonth',
            value: function getDaysInMonth(year, month) {
                return new Date(year, month, 0).getDate();
            }
        }, {
            key: 'getDay',
            value: function getDay(date) {
                return date.getDay();
            }
        }, {
            key: 'getFirstDayOfMonth',
            value: function getFirstDayOfMonth(year, month) {
                return new Date(year, month, 1).getDay();
            }
        }, {
            key: 'getNextMonth',
            value: function getNextMonth(year, month) {
                var time = month === 11 ? {
                    month: 0,
                    year: year + 1
                } : {
                    month: month + 1,
                    year: year
                };
                return time;
            }
        }, {
            key: 'getPrevMonth',
            value: function getPrevMonth(year, month) {
                var time = month === 0 ? {
                    month: 11,
                    year: Math.max(year - 1, this.yearOrigin)
                } : {
                    month: month - 1,
                    year: year
                };
                return time;
            }
        }, {
            key: 'getDateObj',
            value: function getDateObj(date) {
                return {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate()
                };
            }
        }, {
            key: 'toDate',
            value: function toDate(value) {
                return typeof value === 'number' || typeof value === 'string' ? new Date(value) : value;
            }
        }, {
            key: 'getTime',
            value: function getTime(value) {
                return typeof value === 'number' ? value : typeof value === 'string' ? new Date(value).getTime() : value.getTime();
            }
        }, {
            key: 'getHours',
            value: function getHours(value) {
                return value.getHours();
            }
        }, {
            key: 'getMinutes',
            value: function getMinutes(value) {
                return value.getMinutes();
            }
        }, {
            key: 'getSeconds',
            value: function getSeconds(value) {
                return value.getSeconds();
            }
        }, {
            key: 'getDayBeginTime',
            value: function getDayBeginTime(date) {
                var dateObj = this.getDateObj(date);
                dateObj.month = dateObj.month + 1;
                dateObj.hour = 0;
                dateObj.minute = 0;
                dateObj.second = 0;
                return this.formatDate(dateObj);
            }
        }, {
            key: 'isBetween',
            value: function isBetween(value, start, end) {
                value = this.getTime(value);
                var isGte = start ? value >= this.getTime(start) : true;
                var isLte = end ? value <= this.getTime(end) : true;
                return isGte && isLte;
            }
        }, {
            key: 'getDays',
            value: function getDays(options, type) {
                var defaults = {
                    year: null,
                    month: null,
                    value: null,
                    rangeBegin: null,
                    rangeEnd: null,
                    disablePast: false,
                    disableFuture: false
                };
                var now = new Date();
                var nowValue = this.getDayBeginTime(now);
                options = Object.assign(defaults, options);
                if (this.options.disablePast) {
                    var rangeBegin = options.rangeBegin;
                    options.rangeBegin = rangeBegin ? Math.max(nowValue, this.getTime(rangeBegin)) : nowValue;
                }

                if (this.options.disableFuture) {
                    var rangeEnd = options.rangeEnd;
                    options.rangeEnd = rangeEnd ? Math.min(nowValue, this.getTime(rangeEnd)) : nowValue;
                }

                var year = options.year;
                var month = options.month;
                var dayStart = this.options.dayStart;

                var firstDayOfMonth = this.getFirstDayOfMonth(year, month) - dayStart;
                var lastDateOfMonth = this.getDaysInMonth(year, month + 1);
                var lastDateOfLastMonth = this.getDaysInMonth(year, month);

                firstDayOfMonth = firstDayOfMonth < 0 ? 7 + firstDayOfMonth : firstDayOfMonth;
                var i = void 0;
                var days = [];
                var temp = void 0;
                var disabled = void 0;
                var day = void 0;
                temp = this.getPrevMonth(year, month);
                for (i = 1; i <= firstDayOfMonth; i++) {
                    day = lastDateOfLastMonth - firstDayOfMonth + i;
                    var curDay = temp.year + '-' + (temp.month + 1) + '-' + day;
                    disabled = type === 'day' ? true : !this.isBetween(curDay, options.rangeBegin, options.rangeEnd);
                    days.push({
                        year: temp.year,
                        month: temp.month,
                        day: day,
                        disabled: disabled
                    });
                }

                for (i = 1; i <= lastDateOfMonth; i++) {
                    var _curDay = year + '-' + (month + 1) + '-' + i;
                    days.push({
                        year: year,
                        month: month,
                        day: i,
                        disabled: !this.isBetween(_curDay, options.rangeBegin, options.rangeEnd)
                    });
                }

                //always 6 lines
                var totalDays = 42;

                var dif = totalDays - days.length;
                temp = this.getNextMonth(year, month);
                i = 1;
                while (dif--) {
                    days.push({
                        year: temp.year,
                        month: temp.month,
                        day: i++,
                        disabled: true
                    });
                }
                return days;
            }
        }, {
            key: 'zero',
            value: function zero(n) {
                return Number(n) < 10 ? '0' + n : n;
            }
        }, {
            key: 'formatDate',
            value: function formatDate(_ref) {
                var _this = this;

                var year = _ref.year,
                    month = _ref.month,
                    day = _ref.day,
                    hour = _ref.hour,
                    minute = _ref.minute,
                    second = _ref.second;

                var str = year;
                var getStr = function getStr(val, split) {
                    return val !== undefined ? split + _this.zero(val) : '';
                };

                str += getStr(month, '-') + getStr(day, '-') + getStr(hour, ' ') + getStr(minute, ':') + getStr(second, ':');

                return str;
            }
        }, {
            key: 'yearOrigin',
            get: function get() {
                return 1970;
            }
        }]);

        return DateMethod;
    }();

    var Calendar = function (_DateMethod) {
        _inherits(Calendar, _DateMethod);

        function Calendar(el, options) {
            _classCallCheck(this, Calendar);

            var _this2 = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));

            var now = new Date();
            _this2.el = el;
            var defaults = {
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                dayNames: ['日', '一', '二', '三', '四', '五', '六'],
                dayStart: 0,
                date: now,
                pickerCb: function pickerCb() {},

                type: 'day',
                selectMode: { type: ['day'] },
                disablePast: false,
                disableFuture: false,
                timePick: false,
                defaultFill: true,
                align: 'left',
                disableSelect: false
            };

            _this2.options = Object.assign(defaults, options);

            var date = _this2.toDate(_this2.options.date);
            var dateObj = _this2.getDateObj(date);

            _this2.date = date;
            _this2.day = dateObj.day;
            _this2.activeDay = _this2.day;
            _this2.defineProperty('month', dateObj.month, function () {
                return _this2.render();
            });
            _this2.defineProperty('year', dateObj.year, function () {
                return _this2.render();
            });
            _this2.defineProperty('mode', null, function () {
                return _this2.render();
            });
            _this2.daySort = _this2.getDaySort();

            var value = void 0;
            if (_this2.options.timePick) {
                value = _this2.formatDate({
                    year: _this2.year, month: _this2.month + 1, day: _this2.day,
                    hour: _this2.getHours(date),
                    minute: _this2.getMinutes(date),
                    second: _this2.getSeconds(date)
                });
            } else {
                value = _this2.formatDate({ year: _this2.year, month: _this2.month + 1, day: _this2.day });
            }
            _this2.dateCb = {
                startYear: _this2.year,
                startMonth: _this2.month + 1,
                startDay: _this2.day,
                value: value
            };

            _this2.options.defaultFill && (_this2.el.value = value);

            _this2.init();
            _this2.initEvent();
            return _this2;
        }

        _createClass(Calendar, [{
            key: 'defineProperty',
            value: function defineProperty(key, value, changeCallback) {
                var _key = '_' + key;
                this[_key] = value;
                Object.defineProperty(this, key, {
                    get: function get() {
                        return this[_key];
                    },
                    set: function set(val) {
                        if (this[key] !== val) {
                            this[_key] = val;
                            changeCallback && changeCallback();
                        }
                    }
                });
            }
        }, {
            key: 'init',
            value: function init() {
                var _this3 = this;

                var calendarEl = document.createElement('div');
                calendarEl.innerHTML = frame;
                calendarEl.style.display = 'none';
                var sideSelectEl = this.sideSelectHandle();
                var calendarRoot = calendarEl.getElementsByClassName('calendar')[0];

                this.el.parentNode.appendChild(calendarEl
                    // document.body.appendChild(calendarEl)
                );var monthEl = calendarEl.getElementsByClassName('cp-month')[0];
                var yearEl = calendarEl.getElementsByClassName('cp-year')[0];
                var daysEl = calendarEl.getElementsByClassName('c-content')[0];
                var monthOperatorEl = calendarEl.getElementsByClassName('cp-month-operator')[0];
                var weekEl = calendarEl.getElementsByClassName('c-header')[0];

                weekEl.innerHTML = this.getHeaderHtml();

                this.calendarEl = calendarEl;
                this.monthEl = monthEl;
                this.yearEl = yearEl;
                this.daysEl = daysEl;

                this.render();
                if (sideSelectEl) {
                    calendarRoot.insertBefore(sideSelectEl, calendarRoot.children[0]);
                    sideSelectEl.addEventListener('click', function (e) {
                        var target = e.target;
                        var mode = target.getAttribute('data-type');
                        if (mode) {
                            utils.classNameOperator(sideSelectEl.querySelector('.cs-item-active'), 'remove', 'cs-item-active').classNameOperator(target, 'add', 'cs-item-active');
                            if (mode === 'month') {
                                monthOperatorEl.style.display = 'none';
                                weekEl.style.display = 'none';
                            } else {
                                monthOperatorEl.style.display = 'block';
                                weekEl.style.display = 'block';
                            }
                            _this3.mode = mode;
                        }
                    });
                    var modeEls = calendarRoot.children[0].querySelector('[data-type="' + this.mode + '"]');
                    modeEls && modeEls.click();
                }
                var index = void 0;
                this.curDays.forEach(function (val, i) {
                    if (val.month === _this3.month && (val.day && val.day === _this3.day || !val.day)) {
                        index = i;
                    }
                });
                var indexEl = this.daysEl.children[index];
                indexEl && setTimeout(function () {
                    _this3.firstPickCbFlag = true;
                    indexEl.click();
                    _this3.firstPickCbFlag = false;
                });
            }
        }, {
            key: 'initEvent',
            value: function initEvent() {
                var _this4 = this;

                var isBubblingToEle = utils.isBubblingToEle;
                var pannel = this.calendarEl.getElementsByClassName('c-pannel')[0];
                var timeEl = this.calendarEl.getElementsByClassName('c-time')[0];

                if (this.options.timePick) {
                    var inputs = timeEl.querySelectorAll('input');
                    var timesEL = [timeEl.getElementsByClassName('c-hour')[0], timeEl.getElementsByClassName('c-minute')[0], timeEl.getElementsByClassName('c-second')[0]];
                    var times = [this.getHours(this.date), this.getMinutes(this.date), this.getSeconds(this.date)];

                    inputs.forEach(function (input, index) {
                        timesEL[index].value = times[index] || 0;
                        input.addEventListener('focus', function () {
                            this.setSelectionRange(0, this.value.length);
                        });
                        input.addEventListener('input', function () {
                            var value = parseInt(this.value.replace(/[^\d.]/g, '') || 0);
                            var max = parseInt(this.getAttribute('max'));
                            var min = parseInt(this.getAttribute('min'));
                            value = value < min ? min : value > max ? max : value;
                            this.value = value;
                        });
                    });

                    var getTimeArr = function getTimeArr() {
                        return [].slice.call(inputs).map(function (input) {
                            return _this4.zero(parseInt(input.value));
                        });
                    };

                    timeEl.querySelector('.c-confirm').addEventListener('click', function () {
                        var value = _this4.formatDate({ year: _this4.year, month: _this4.month + 1, day: _this4.activeDay });
                        var timeArr = getTimeArr();
                        var hour = timeArr[0];
                        var minute = timeArr[1];
                        var second = timeArr[2];
                        value += hour + ':' + minute + ':' + second;
                        var date = Object.assign(_this4.dateCb, {
                            hour: hour,
                            minute: minute,
                            second: second,
                            value: value
                        }, { startDay: _this4.activeDay });

                        _this4.pickDone(value, date, !0);
                    });
                } else {
                    timeEl.parentNode.removeChild(timeEl);
                }

                pannel.addEventListener('click', function (e) {
                    var target = e.target;
                    if (isBubblingToEle(target, 'className', 'cp-prev-year')) {
                        _this4.prevYearHandle();
                    } else if (isBubblingToEle(target, 'className', 'cp-prev-month')) {
                        _this4.prevMonthHandle();
                    } else if (isBubblingToEle(target, 'className', 'cp-next-month')) {
                        _this4.nextMonthHandle();
                    } else if (isBubblingToEle(target, 'className', 'cp-next-year')) {
                        _this4.nextYearHandle();
                    }
                });

                this.daysEl.addEventListener('click', function (e) {
                    var target = e.target;
                    var children = _this4.daysEl.children;
                    var index = [].indexOf.call(_this4.daysEl.children, target);
                    var value = void 0;
                    var date = void 0;
                    if (_this4.mode === 'week') {
                        var rows = Math.floor(index / 7);
                        var daysBegin = _this4.curDays[rows * 7];
                        var daysEnd = _this4.curDays[rows * 7 + 6];

                        var begin = rows * 7;
                        var end = (rows + 1) * 7;
                        var i = begin;
                        var disabled = false;
                        var nodeArr = [];
                        for (; i < end; i++) {
                            if (_this4.curDays[i].disabled) {
                                disabled = true;
                                break;
                            }
                            nodeArr.push(children[i]);
                        }
                        if (!disabled) {
                            var startYear = daysBegin.year;
                            var startMonth = daysBegin.month + 1;
                            var startDay = daysBegin.day;
                            var endYear = daysEnd.year;
                            var endMonth = daysEnd.month + 1;
                            var endDay = daysEnd.day;
                            var startValue = _this4.formatDate({ year: startYear, month: startMonth, day: startDay });
                            var endValue = _this4.formatDate({ year: endYear, month: endMonth, day: endDay });
                            value = startValue + '~' + endValue;
                            date = { startYear: startYear, startMonth: startMonth, startDay: startDay, endYear: endYear, endMonth: endMonth, endDay: endDay, startValue: startValue, endValue: endValue, value: value };
                            utils.classNameOperator(children, 'remove', 'active').classNameOperator(nodeArr, 'add', 'active');
                        }
                    } else {
                        var day = _this4.curDays[index];
                        var _startYear = day.year;
                        var _startMonth = day.month + 1;
                        var _startDay = day.day;
                        if (!day.disabled) {
                            value = _this4.formatDate({ year: _startYear, month: _startMonth, day: _startDay });
                            date = { startYear: _startYear, startMonth: _startMonth, startDay: _startDay, value: value };
                            utils.classNameOperator(children, 'remove', 'active').classNameOperator(children[index], 'add', 'active');
                        }
                        _this4.activeDay = _startDay;
                    }

                    value && _this4.pickDone(value, date, !_this4.options.timePick && !_this4.firstPickCbFlag);
                });

                this.daysEl.addEventListener('mouseover', function (e) {
                    var classNameOperator = utils.classNameOperator;
                    var target = e.target;
                    var children = _this4.daysEl.children;
                    var index = [].indexOf.call(_this4.daysEl.children, target);
                    if (index === -1) return;
                    if (_this4.mode === 'week') {
                        var rows = Math.floor(index / 7);
                        var begin = rows * 7;
                        var end = (rows + 1) * 7;
                        var i = begin;
                        var disabled = false;
                        for (; i < end; i++) {
                            if (_this4.curDays[i].disabled) {
                                disabled = true;
                                break;
                            }
                        }
                        if (!disabled) {
                            for (i = begin; i < end; i++) {
                                classNameOperator(children[i], 'add', 'select');
                            }
                        }
                    } else if (_this4.mode === 'day' && !_this4.curDays[index].disabled) {
                        classNameOperator(children[index], 'add', 'select');
                    } else if (_this4.mode === 'month') {
                        if (!_this4.curDays[index].disabled) {
                            classNameOperator(children[index], 'add', 'select');
                        }
                    }
                });

                this.daysEl.addEventListener('mouseout', function () {
                    utils.classNameOperator(_this4.daysEl.querySelectorAll('.select'), 'remove', 'select');
                });

                document.addEventListener('click', this.hideCalendar.bind(this));

                this.calendarEl.addEventListener('click', function (e) {
                    e.stopPropagation();
                });

                this.el.addEventListener('click', function (e) {
                    if (_this4.options.disableSelect) return;
                    e.stopPropagation();
                    _this4.showCalendar();
                });

                window.addEventListener('resize', function () {
                    _this4.hideCalendar();
                });
            }
        }, {
            key: 'pickDone',
            value: function pickDone(value, date, hide) {
                this.el.value = value;
                if (hide) {
                    this.dateCb = date;
                    hide && this.hideCalendar();
                    date.mode = this.mode;
                    !this.firstPickCbFlag && this.options.pickerCb(date);
                }
            }
        }, {
            key: 'sideSelectHandle',
            value: function sideSelectHandle() {
                var selectMode = this.options.selectMode;
                var mode = selectMode.type;
                var text = selectMode.text;
                if (!mode) return;
                mode = typeof mode === 'string' ? [mode] : mode;

                var sideEl = void 0;
                if (mode.length !== 1) {
                    var div = document.createElement('div');
                    div.className = 'calendar-side';
                    mode.forEach(function (val, index) {
                        var item = document.createElement('div');
                        var content = void 0;
                        item.className = 'cs-item' + (index === 0 ? ' cs-item-active' : '');
                        content = text[index];
                        item.innerHTML = content;
                        item.setAttribute('data-type', val);
                        div.appendChild(item);
                    });
                    sideEl = div;
                }
                var index = mode.indexOf(this.options.type);
                this._mode = mode[index];
                return sideEl;
            }
        }, {
            key: 'showCalendar',
            value: function showCalendar() {
                var pos = utils.getElPos(this.el);
                var align = this.options.align;
                var alignValue = align === 'right' ? pos.right : pos.left;
                this.calendarEl.style.cssText = 'display: block; position: absolute; ' + align + ': ' + alignValue + 'px; top: ' + pos.top + 'px; z-index: 99999;';
            }
        }, {
            key: 'hideCalendar',
            value: function hideCalendar() {
                this.calendarEl.style.display = 'none';
            }
        }, {
            key: 'prevYearHandle',
            value: function prevYearHandle() {
                this.year = Math.max(this.yearOrigin, --this.year);
            }
        }, {
            key: 'prevMonthHandle',
            value: function prevMonthHandle() {
                var time = this.getPrevMonth(this.year, this.month);
                this.year = time.year;
                this.month = time.month;
            }
        }, {
            key: 'nextMonthHandle',
            value: function nextMonthHandle() {
                var time = this.getNextMonth(this.year, this.month);
                this.year = time.year;
                this.month = time.month;
            }
        }, {
            key: 'nextYearHandle',
            value: function nextYearHandle() {
                this.year++;
            }
        }, {
            key: 'getDaySort',
            value: function getDaySort() {
                var options = this.options;
                var dayNames = options.dayNames;
                var start = options.dayStart;
                return dayNames.slice(start).concat(dayNames.slice(0, start));
            }
        }, {
            key: 'getMonthName',
            value: function getMonthName(index) {
                return this.options.monthNames[index];
            }
        }, {
            key: 'getHeaderHtml',
            value: function getHeaderHtml() {
                var headerHtml = '';
                this.daySort.forEach(function (val) {
                    headerHtml += '<i class="ch-item">' + val + '</i>';
                });
                return headerHtml;
            }
        }, {
            key: 'getContentHtml',
            value: function getContentHtml(options) {
                var className = void 0;
                var daysHtml = '';
                var now = new Date();
                var dateObj = this.getDateObj(now);

                if (this.mode === 'month') {
                    var days = [];
                    var disabled = void 0;
                    for (var i = 1; i <= 12; i++) {
                        className = dateObj.year === this.year && dateObj.month === i - 1 ? ' cur' : '';
                        disabled = this.options.disableFuture ? !(this.year < dateObj.year || this.year === dateObj.year && i - 1 <= dateObj.month) : this.options.disablePast ? !(this.year > dateObj.year || this.year === dateObj.year && i - 1 >= dateObj.month) : false;
                        className += disabled ? ' disabled' : '';
                        daysHtml += '<i class="cc-month-item' + className + '">' + i + '</i>';
                        days.push({
                            year: this.year,
                            month: i - 1,
                            disabled: disabled
                        });
                    }
                    this.curDays = days;
                } else {
                    var _days = this.getDays(options, this.mode);
                    this.curDays = _days;
                    for (var _i = 0; _i < _days.length; _i++) {
                        var curDay = _days[_i];
                        className = dateObj.year === curDay.year && dateObj.month === curDay.month && dateObj.day === curDay.day ? ' cur' : '';
                        className += curDay.disabled ? ' disabled' : '';
                        daysHtml += '<i class="cc-item' + className + '">' + curDay.day + '</i>';
                    }
                }
                return daysHtml;
            }
        }, {
            key: 'render',
            value: function render() {
                var renderCb = this.options.renderCb;
                var conf = {
                    year: this.year,
                    month: this.month,
                    day: this.day
                };
                this.monthEl.innerHTML = this.options.monthNames[this.month];
                this.yearEl.innerHTML = this.year;
                this.daysEl.innerHTML = this.getContentHtml(conf);
                renderCb && renderCb(conf, { calendarEl: this.calendarEl });
            }
        }]);

        return Calendar;
    }(DateMethod);

    module.exports = Calendar;
}).call(undefined);

//# sourceMappingURL=index.js.map