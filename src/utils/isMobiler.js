/*
 * 判断是不是手机端
 */

let isMobiler = (() => {
    var isMobile = false;

    ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'].map(function (terminal) {
        if (window.navigator.userAgent.indexOf(terminal) > 0) {
            isMobile = true;
        }
        return terminal;
    })

    return isMobile
})();
  
export default isMobiler
  