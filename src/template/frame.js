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
        <div class="c-header clearfix">

        </div>
        <div class="c-content clearfix">

        </div>
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

export default frame

