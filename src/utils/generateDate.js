import moment from 'moment'

export default () => {
  let format = 'ddd_DD-MMM-YYYY_hh:mm:ss_A'
  let now = moment().toDate()
  return moment(now).format(format)
}
