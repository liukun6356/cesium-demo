/**
 * 时间操作工具类
 *
 * @author zwq
 *
 */
const TimeFrameUtil = {
    /**
     * 格式化日期
     * @param date {Date} 日期
     * @param pattern {string} 格式，例："yyyy-MM-dd HH:mm:ss"
     * @returns {String} 返回格式化后的日期，如："2018-01-22 18:04:30"
     */
    format: function (date, pattern) {
        var time = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in time) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? time[k] : ("00" + time[k]).substr(("" + time[k]).length));
            }
        }
        return pattern;
    },
    /**
     * 将指定时间偏移几秒
     * @param time {String} 指定时间，例："2018-01-24 17:00"
     * @param offset {Number} 偏移量，正数代表加几秒钟，负数代表减几秒钟，例：1
     * @param pattern {String} 返回时间的格式，例："yyyy-MM-dd HH:mm:ss"
     * @returns {String} 返回计算后的时间，如："2018-01-24 18:00:00"
     */
    offsetSeconds: function (time, offset, pattern) {
        var timeStamp = Date.parse(time);
        timeStamp = timeStamp + offset * 1000;
        let date = new Date(timeStamp);
        return this.format(date, pattern);
    },
    /**
     * 将指定时间偏移几分钟
     * @param time {String} 指定时间，例："2018-01-24 17:00"
     * @param offset {Number} 偏移量，正数代表加几分钟，负数代表减几分钟，例：1
     * @param pattern {String} 返回时间的格式，例："yyyy-MM-dd HH:mm:ss"
     * @returns {String} 返回计算后的时间，如："2018-01-24 18:00:00"
     */
    offsetMinutes: function (time, offset, pattern) {
        var timeStamp = Date.parse(time);
        timeStamp = timeStamp + offset * (1000 * 60);
        let date = new Date(timeStamp);
        return this.format(date, pattern);
    },
    /**
     * 将指定时间偏移几小时
     * @param time {String} 指定时间，例："2018-01-24 17:00:00"
     * @param offset {Number} 偏移量，正数代表加几小时，负数代表减几小时，例：1
     * @param pattern {String} 返回时间的格式，例："yyyy-MM-dd HH:mm:ss"
     * @returns {String} 返回计算后的时间，如："2018-01-24 18:00:00"
     */
    offsetHours: function (time, offset, pattern) {
        var timeStamp = Date.parse(time);
        timeStamp = timeStamp + offset * (1000 * 60 * 60);
        let date = new Date(timeStamp);
        return this.format(date, pattern);
    },
    /**
     * 将指定月份偏移几个月
     * @param month {String} 指定月份，例："2018-01"
     * @param offset {Number} 偏移量，负数代表上几个月，正数代表下几个月，例：1
     * @returns {String} 返回计算后的月份，如："2018-02"
     */
    offsetMonths: function (month, offset) {
        var date = new Date(Date.parse(month));
        var year = date.getFullYear();
        var month = date.getMonth();
        var preOrNextMonth = month + offset;
        return this.format(new Date(year, preOrNextMonth), "yyyy-MM");
    },
    /**
     * 获取指定日期是星期几
     * @param date {String} 指定日期,例："2018-01-23"
     * @returns {Number} 返回星期几(1-7)，如：2
     */
    dayOfWeek: function (date) {
        var time = new Date(Date.parse(date));
        var weekday = new Array(7);
        weekday[0] = 7;
        weekday[1] = 1;
        weekday[2] = 2;
        weekday[3] = 3;
        weekday[4] = 4;
        weekday[5] = 5;
        weekday[6] = 6;
        return weekday[time.getDay()];
    },
    /**
     * 获取指定月份有多少天
     * @param month {String} 指定月份：例"2018-01"
     * @returns {number} 返回指定月份有多少天，如：31
     */
    daysInMonth: function (month) {
        var date = new Date(Date.parse(month));
        var year = date.getFullYear();
        var month = date.getMonth();
        if (month == 1) {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
                return 29;
            else
                return 28;
        } else if ((month <= 6 && month % 2 == 0) || (month > 6 && month % 2 == 1))
            return 31;
        else
            return 30;
    }
};
export default TimeFrameUtil