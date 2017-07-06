// import frame from './../template/frame.js'
// import css from './../css/style.css'
const frame = `<div class="calendar clearfix">
    <div class="calendar-box">
        <div class="c-pannel">
            <div class="cp-list">
                <span class="cp-item cp-prev-year"><</span>
                <span class="cp-item cp-next-year">></span>
                <span class="cp-item cp-year"></span>
            </div>
            <div class="cp-list cp-month-operator">
                <span class="cp-item cp-prev-month"><</span>
                <span class="cp-item cp-next-month">></span>
                <span class="cp-item cp-month"></span>
            </div>
        </div>
        <div class="c-header clearfix"></div>
        <div class="c-content clearfix"></div>
        <div class="c-time clearfix">
            <i>时间选择</i>
            <input type="text" value="00" min="0" max="23" class="c-hour">
            <i>:</i>
            <input type="text" value="00" min="0" max="59" class="c-minute">
            <i>:</i>
            <input type="text" value="00" min="0" max="59" class="c-second">
            <a href="javascript:;" class="c-confirm">确定</a>
        </div>
    </div>
</div>`

const utils = {
    isBubblingToEle (target, type, value) {
        while(target){
            if (type === 'id' && target.id === value) {
                return true
            } else if (type === 'className' && target.classList.contains(value)) {
                return true
            }
            target = target.parentNode
            if(target.nodeName === 'HTML'){
                break
            }
        }
        return false
    },
    getElPos (el) {
        let width = el.offsetWidth
        let height = el.offsetHeight
        let x = el.offsetLeft
        let y = el.offsetTop
        let offsetParent = el.offsetParent
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
        }
    },
    classNameOperator (selector, operatorType, className) {
        let nodeType = {}.toString.call(selector).slice(8, -1)
        if (nodeType === 'HTMLCollection') {
            [].slice.call(selector).forEach((node) => {
                node.classList[operatorType](className)
            })
        } else if (nodeType === 'NodeList' || nodeType === 'Array') {
            selector.forEach((node) => {
                node.classList[operatorType](className)
            })
        } else {
            selector.classList[operatorType](className)
        }
        return this
    }
}

class DateMethod {
    getDaysInMonth (year, month) {
        return new Date(year, month, 0).getDate()
    }

    getDay (date) {
        return date.getDay()
    }

    getFirstDayOfMonth (year, month) {
        return new Date(year, month, 1).getDay()
    }

    get yearOrigin () {
        return 1970
    }

    getNextMonth (year, month) {
        let time = month === 11 ? {
                month: 0,
                year: year + 1
            } : {
                month: month + 1,
                year
            }
        return time
    }

    getPrevMonth (year, month) {
        let time = month === 0 ? {
                month: 11,
                year: Math.max(year - 1, this.yearOrigin)
            } : {
                month: month - 1,
                year
            }
        return time
    }

    getDateObj (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate()
        }
    }

    toDate (value) {
        return typeof value === 'number' || typeof value === 'string' ? new Date(value) : value
    }

    getTime (value) {
        return typeof value === 'number' ? value :
            typeof value === 'string' ? new Date(value).getTime() : value.getTime()
    }

    getHours (value) {
        return value.getHours()
    }

    getMinutes (value) {
        return value.getMinutes()
    }

    getSeconds (value) {
        return value.getSeconds()
    }

    getDayBeginTime (date) {
        let dateObj = this.getDateObj(date)
        dateObj.month = dateObj.month + 1
        dateObj.hour = 0
        dateObj.minute = 0
        dateObj.second = 0
        return this.formatDate(dateObj)
    }

    isBetween (value, start, end) {
        value = this.getTime(value)
        let isGte = start ? value >= this.getTime(start) : true
        let isLte = end ? value <= this.getTime(end) : true
        return isGte && isLte
    }

    getDays (options, type) {
        let defaults = {
            year: null,
            month: null,
            value: null,
            rangeBegin: null,
            rangeEnd: null,
            disablePast: false,
            disableFuture: false
        }
        let now = new Date()
        let nowValue = this.getDayBeginTime(now)
        options = Object.assign(defaults, options)
        if (this.options.disablePast) {
            let rangeBegin = options.rangeBegin
            options.rangeBegin = rangeBegin ? Math.max(nowValue, this.getTime(rangeBegin)) : nowValue
        }

        if (this.options.disableFuture) {
            let rangeEnd = options.rangeEnd
            options.rangeEnd = rangeEnd ? Math.min(nowValue, this.getTime(rangeEnd)) : nowValue
        }

        let year = options.year
        let month = options.month
        let dayStart = this.options.dayStart

        let firstDayOfMonth = this.getFirstDayOfMonth(year, month) - dayStart
        let lastDateOfMonth = this.getDaysInMonth(year, month + 1)
        let lastDateOfLastMonth = this.getDaysInMonth(year, month)

        firstDayOfMonth = firstDayOfMonth < 0 ? 7 + firstDayOfMonth : firstDayOfMonth
        let i
        let days = []
        let temp
        let disabled
        let day
        temp = this.getPrevMonth(year, month)
        for (i = 1; i <= firstDayOfMonth; i++) {
            day = lastDateOfLastMonth - firstDayOfMonth + i
            let curDay = `${temp.year}-${temp.month + 1}-${day}`
            disabled = type === 'day' ? true : !this.isBetween(curDay, options.rangeBegin, options.rangeEnd)
            days.push({
                year: temp.year,
                month: temp.month,
                day,
                disabled
            })
        }

        for (i = 1; i <= lastDateOfMonth; i++) {
            let curDay = `${year}-${month + 1}-${i}`
            days.push({
                year,
                month,
                day: i,
                disabled: !this.isBetween(curDay, options.rangeBegin, options.rangeEnd)
            })
        }

        //always 6 lines
        const totalDays = 42

        let dif = totalDays - days.length
        temp = this.getNextMonth(year, month)
        i = 1
        while (dif--) {
            days.push({
                year: temp.year,
                month: temp.month,
                day: i++,
                disabled: true
            })
        }
        return days
    }

    zero (n) {
        return Number(n) < 10 ? '0' + n : n
    }

    formatDate ({year, month, day, hour, minute, second}) {
        let str = year
        let getStr = (val, split) => {
            return val !== undefined ? split + this.zero(val) : ''
        }

        str += getStr(month, '-') + getStr(day, '-') + getStr(hour, ' ') + getStr(minute, ':') + getStr(second, ':')

        return str
    }
}

class Calendar extends DateMethod {
    constructor (el, options) {
        super()
        let now = new Date()
        this.el = el
        let defaults = {
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['日', '一', '二', '三', '四', '五', '六'],
            dayStart: 0,
            date: now,
            pickerCb () {},
            type: 'day',
            selectMode: { type: ['day'] },
            disablePast: false,
            disableFuture: false,
            timePick: false,
            defaultFill: true,
            align: 'left',
            disableSelect: false
        }

        this.options = Object.assign(defaults, options)

        let date = this.toDate(this.options.date)
        let dateObj = this.getDateObj(date)

        this.date = date
        this.day = dateObj.day
        this.activeDay = this.day
        this.defineProperty('month', dateObj.month, () => this.render())
        this.defineProperty('year', dateObj.year, () => this.render())
        this.defineProperty('mode', null, () => this.render())
        this.daySort = this.getDaySort()

        let value
        if (this.options.timePick) {
            value = this.formatDate(
                {
                    year: this.year, month: this.month + 1, day: this.day,
                    hour: this.getHours(date),
                    minute: this.getMinutes(date),
                    second: this.getSeconds(date)
                })
        } else {
            value = this.formatDate({year: this.year, month: this.month + 1, day: this.day})
        }
        this.dateCb = {
            startYear: this.year,
            startMonth: this.month + 1,
            startDay: this.day,
            value
        }

        this.options.defaultFill && (this.el.value = value)

        this.init()
        this.initEvent()
    }

    defineProperty (key, value, changeCallback) {
        let _key = '_' + key
        this[_key] = value
        Object.defineProperty(this, key, {
            get () {
                return this[_key]
            },
            set (val) {
                if (this[key] !== val) {
                    this[_key] = val
                    changeCallback && changeCallback()
                }
            }
        })
    }

    init () {
        let calendarEl = document.createElement('div')
        calendarEl.innerHTML = frame
        calendarEl.style.display = 'none'
        let sideSelectEl = this.sideSelectHandle()
        let calendarRoot = calendarEl.getElementsByClassName('calendar')[0]

        this.el.parentNode.appendChild(calendarEl)
        // document.body.appendChild(calendarEl)
        let monthEl = calendarEl.getElementsByClassName('cp-month')[0]
        let yearEl = calendarEl.getElementsByClassName('cp-year')[0]
        let daysEl = calendarEl.getElementsByClassName('c-content')[0]
        let monthOperatorEl = calendarEl.getElementsByClassName('cp-month-operator')[0]
        let weekEl = calendarEl.getElementsByClassName('c-header')[0]


        weekEl.innerHTML = this.getHeaderHtml()

        this.calendarEl = calendarEl
        this.monthEl = monthEl
        this.yearEl = yearEl
        this.daysEl = daysEl

        this.render()
        if (sideSelectEl) {
            calendarRoot.insertBefore(sideSelectEl, calendarRoot.children[0])
            sideSelectEl.addEventListener('click', (e) => {
                let target = e.target
                let mode = target.getAttribute('data-type')
                if (mode) {
                    utils.classNameOperator(sideSelectEl.querySelector('.cs-item-active'), 'remove', 'cs-item-active')
                        .classNameOperator(target, 'add', 'cs-item-active')
                    if (mode === 'month') {
                        monthOperatorEl.style.display = 'none'
                        weekEl.style.display = 'none'
                    } else {
                        monthOperatorEl.style.display = 'block'
                        weekEl.style.display = 'block'
                    }
                    this.mode = mode
                }
            })
            let modeEls = calendarRoot.children[0].querySelector('[data-type="'+ this.mode +'"]')
            modeEls && modeEls.click()
        }
        let index
        this.curDays.forEach((val, i) => {
            if (val.month === this.month && (val.day && val.day === this.day || !val.day)) {
                index = i
            }
        })
        let indexEl = this.daysEl.children[index]
        indexEl && (setTimeout(() => {
            this.firstPickCbFlag = true
            indexEl.click()
            this.firstPickCbFlag = false
        }))
    }

    initEvent () {
        const isBubblingToEle = utils.isBubblingToEle
        let pannel = this.calendarEl.getElementsByClassName('c-pannel')[0]
        let timeEl = this.calendarEl.getElementsByClassName('c-time')[0]

        if (this.options.timePick) {
            let inputs = timeEl.querySelectorAll('input')
            let timesEL = [
                timeEl.getElementsByClassName('c-hour')[0],
                timeEl.getElementsByClassName('c-minute')[0],
                timeEl.getElementsByClassName('c-second')[0]
            ]
            let times = [
                this.getHours(this.date),
                this.getMinutes(this.date),
                this.getSeconds(this.date)
            ]

            inputs.forEach((input, index) => {
                timesEL[index].value = times[index] || 0
                input.addEventListener('focus', function () {
                    this.setSelectionRange(0, this.value.length)
                })
                input.addEventListener('input', function () {
                    let value = parseInt(this.value.replace(/[^\d.]/g, '') || 0)
                    let max = parseInt(this.getAttribute('max'))
                    let min = parseInt(this.getAttribute('min'))
                    value = value < min ? min :
                        value > max ? max : value
                    this.value = value
                })
            })

            let getTimeArr = () => {
                return [].slice.call(inputs).map(input => this.zero(parseInt(input.value)))
            }

            timeEl.querySelector('.c-confirm').addEventListener('click', () => {
                let value = this.formatDate({year: this.year, month: this.month + 1, day: this.activeDay})
                let timeArr = getTimeArr()
                let hour = timeArr[0]
                let minute = timeArr[1]
                let second = timeArr[2]
                let timeStr = `${hour}:${minute}:${second}`
                value += ` ${timeStr}`
                let date = Object.assign(this.dateCb, {
                    hour,
                    minute,
                    second,
                    value
                }, { startDay: this.activeDay})

                this.pickDone(value, date, !0)
            })
        } else {
            timeEl.parentNode.removeChild(timeEl)
        }

        pannel.addEventListener('click', (e) => {
            let target = e.target
            if (isBubblingToEle(target, 'className', 'cp-prev-year')) {
                this.prevYearHandle()
            } else if (isBubblingToEle(target, 'className', 'cp-prev-month')) {
                this.prevMonthHandle()
            } else if (isBubblingToEle(target, 'className', 'cp-next-month')) {
                this.nextMonthHandle()
            } else if (isBubblingToEle(target, 'className', 'cp-next-year')) {
                this.nextYearHandle()
            }
        })

        this.daysEl.addEventListener('click', (e) => {
            let target = e.target
            let children = this.daysEl.children
            let index = [].indexOf.call(this.daysEl.children, target)
            let value
            let date
            if (this.mode === 'week') {
                let rows = Math.floor(index / 7)
                let daysBegin = this.curDays[rows * 7]
                let daysEnd = this.curDays[rows * 7 + 6]

                let begin = rows * 7
                let end = (rows + 1) * 7
                let i = begin
                let disabled = false
                let nodeArr = []
                for (; i < end; i++) {
                    if (this.curDays[i].disabled) {
                        disabled = true
                        break
                    }
                    nodeArr.push(children[i])
                }
                if (!disabled) {
                    let startYear = daysBegin.year
                    let startMonth = daysBegin.month + 1
                    let startDay = daysBegin.day
                    let endYear = daysEnd.year
                    let endMonth = daysEnd.month + 1
                    let endDay = daysEnd.day
                    let startValue = this.formatDate({year: startYear, month: startMonth, day: startDay})
                    let endValue = this.formatDate({year: endYear, month: endMonth, day: endDay})
                    value = startValue + '~' + endValue
                    date = {startYear, startMonth, startDay, endYear, endMonth, endDay, startValue, endValue, value}
                    utils.classNameOperator(children, 'remove', 'active').classNameOperator(nodeArr, 'add', 'active')
                }

            } else {
                let day = this.curDays[index]
                let startYear = day.year
                let startMonth = day.month + 1
                let startDay = day.day
                if (!day.disabled) {
                    value = this.formatDate({year: startYear, month: startMonth, day: startDay})
                    date = {startYear, startMonth, startDay, value}
                    utils.classNameOperator(children, 'remove', 'active').classNameOperator(children[index], 'add', 'active')
                }
                this.activeDay = startDay
            }

            value && this.pickDone(value, date, !this.options.timePick && !this.firstPickCbFlag)
        })

        this.daysEl.addEventListener('mouseover', (e) => {
            const classNameOperator = utils.classNameOperator
            let target = e.target
            let children = this.daysEl.children
            let index = [].indexOf.call(this.daysEl.children, target)
            if (index === -1) return
            if (this.mode === 'week') {
                let rows = Math.floor(index / 7)
                let begin = rows * 7
                let end = (rows + 1) * 7
                let i = begin
                let disabled = false
                for (; i < end; i++) {
                    if (this.curDays[i].disabled) {
                        disabled = true
                        break
                    }
                }
                if (!disabled) {
                    for (i = begin; i < end; i++) {
                        classNameOperator(children[i], 'add', 'select')
                    }
                }
            } else if (this.mode === 'day' && !this.curDays[index].disabled) {
                classNameOperator(children[index], 'add', 'select')
            } else if (this.mode === 'month') {
                if (!this.curDays[index].disabled) {
                    classNameOperator(children[index], 'add', 'select')
                }
            }
        })

        this.daysEl.addEventListener('mouseout', ( ) => {
            utils.classNameOperator(this.daysEl.querySelectorAll('.select'), 'remove', 'select')
        })

        document.addEventListener('click', this.hideCalendar.bind(this))

        this.calendarEl.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        this.el.addEventListener('click', (e) => {
            if (this.options.disableSelect) return
            e.stopPropagation()
            this.showCalendar()
        })

        window.addEventListener('resize', () => {
            this.hideCalendar()
        })
    }

    pickDone (value, date, hide) {
        this.el.value = value
        if (hide) {
            this.dateCb = date
            hide && this.hideCalendar()
            date.mode = this.mode
            !this.firstPickCbFlag && this.options.pickerCb(date)
        }

    }

    sideSelectHandle () {
        let selectMode = this.options.selectMode
        let mode = selectMode.type
        let text = selectMode.text
        if (!mode) return
        mode = typeof mode === 'string' ? [mode] : mode

        let sideEl
        if (mode.length !== 1) {
            let div = document.createElement('div')
            div.className = 'calendar-side'
            mode.forEach((val, index) => {
                let item = document.createElement('div')
                let content
                item.className = 'cs-item' + (index === 0 ? ' cs-item-active' : '')
                content = text[index]
                item.innerHTML = content
                item.setAttribute('data-type', val)
                div.appendChild(item)
            })
            sideEl = div
        }
        let index = mode.indexOf(this.options.type)
        this._mode = mode[index]
        return sideEl
    }

    showCalendar () {
        let pos = utils.getElPos(this.el)
        let align = this.options.align
        let alignValue = align === 'right' ? pos.right : pos.left
        this.calendarEl.style.cssText = `display: block; position: absolute; ${align}: ${alignValue}px; top: ${pos.top}px; z-index: 99999;`
    }

    hideCalendar () {
        this.calendarEl.style.display = 'none'
    }

    prevYearHandle () {
        this.year = Math.max(this.yearOrigin, --this.year)
    }

    prevMonthHandle () {
        let time = this.getPrevMonth(this.year, this.month)
        this.year = time.year
        this.month = time.month
    }

    nextMonthHandle () {
        let time = this.getNextMonth(this.year, this.month)
        this.year = time.year
        this.month = time.month
    }

    nextYearHandle () {
        this.year++
    }

    getDaySort () {
        let options = this.options
        let dayNames = options.dayNames
        let start = options.dayStart
        return dayNames.slice(start).concat(dayNames.slice(0, start))
    }

    getMonthName (index) {
        return this.options.monthNames[index]
    }

    getHeaderHtml () {
        let headerHtml = ''
        this.daySort.forEach(val => {
            headerHtml += `<i class="ch-item">${val}</i>`
        })
        return headerHtml
    }

    getContentHtml (options) {
        let className
        let daysHtml = ''
        let now = new Date()
        let dateObj = this.getDateObj(now)

        if (this.mode === 'month') {
            let days = []
            let disabled
            for (let i = 1; i <= 12; i++) {
                className = (dateObj.year === this.year && dateObj.month === i - 1) ? ' cur' : ''
                disabled =  this.options.disableFuture ? !(this.year < dateObj.year || this.year === dateObj.year && i - 1 <= dateObj.month)
                            : this.options.disablePast ? !(this.year > dateObj.year || this.year === dateObj.year && i - 1 >= dateObj.month)
                            : false
                className += disabled ? ' disabled' : ''
                daysHtml += `<i class="cc-month-item${className}">${i}</i>`
                days.push({
                    year: this.year,
                    month: i - 1,
                    disabled
                })
            }
            this.curDays = days
        } else {
            let days = this.getDays(options, this.mode)
            this.curDays = days
            for (let i = 0; i < days.length; i++) {
                let curDay = days[i]
                className = (dateObj.year === curDay.year && dateObj.month === curDay.month && dateObj.day === curDay.day) ? ' cur' : ''
                className += curDay.disabled ? ' disabled' : ''
                daysHtml += `<i class="cc-item${className}">${curDay.day}</i>`
            }
        }
        return daysHtml
    }

    render () {
        const renderCb = this.options.renderCb
        let conf = {
            year: this.year,
            month: this.month,
            day: this.day
        }
        this.monthEl.innerHTML = this.options.monthNames[this.month]
        this.yearEl.innerHTML = this.year
        this.daysEl.innerHTML = this.getContentHtml(conf)
        renderCb && renderCb(conf, {calendarEl: this.calendarEl})
    }
}

window.Calendar = Calendar



