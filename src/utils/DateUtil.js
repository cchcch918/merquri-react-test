import moment from 'moment';

const DateUtil = {
    formatDate: function(date, format) {
        return moment(new Date(date)).format(format);
    }
};

export default DateUtil;
