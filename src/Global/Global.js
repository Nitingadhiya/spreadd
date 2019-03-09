//import moment from 'moment'

const GlobalVar = {
  requestTimeout: 25000,
  failedMsg: 'Poor network connection or server not responding!',
  requestFailedMsg: 'Request Failed. Please try again.',
  imageCompressionRatio: 0.7,

  // getDateTime(date) {

  //   var stillUtc = moment.utc(date).toDate();
  //   var local = moment(stillUtc).local().format('DD-MM-YYYY HH:mm:ss');

  //   return local

  // }

  validateEmail(email) {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    //   else if (!Global.validateEmail(this.state.email)) {
    //     alert('Please Enter valid email')
    // }
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(email)
  }
}

export default GlobalVar;