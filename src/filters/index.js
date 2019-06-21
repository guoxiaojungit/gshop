import Vue from 'vue'
//import moment from 'moment'
import format from 'date-fns/format'
Vue.filter('dateFormat',function (value,dateStr='YYYY-MM-DD HH:mm:ss') {
    //return moment(value).format(dateStr)
    return format(value,dateStr)
})