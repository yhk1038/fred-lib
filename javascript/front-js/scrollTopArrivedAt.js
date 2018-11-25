/*
 * scrollTopArrivedAt.js
 * @description
 *  It's a *boilerplate function* that enable to execute your function when
 *  the scroll position arrived specific offset from the window's bottom.
 *  Also, It supports lockable options to avoid duplicate calls due to
 *  unnecessary scrolling changes.
 * 
 * - bottomOffset: number        | optional | (px) default: 0
 * - func:         function      | required | (Your Awesome Function) default: <If it doesn't exist, return false>
 * - lockMarker:   string        | optional | (class name) default: 'lockScroll'
 * - lockTarget:   ElementObject | optional | (Where marker classes will be placed) default: '<body>'
 * - lockIgnore:   boolean       | optional | (Whether or not to use lockable) default: undefined
 * 
 * @author Yonghyun Kim (yhkks1038@gmail.com)
 * @licence MIT, 2018
 */
function scrollTopArrivedAt(bottomOffset, func, lockMarker, lockTarget, lockIgnore) {
  if (!func)          return;
  if (!bottomOffset)  bottomOffset = 0;

  if (!lockIgnore) { // If 'lockIgnore' isn't set, it means lockable.
    if (!lockMarker)    lockMarker = 'lockScroll';
    if (!lockTarget)    lockTarget = document.getElementsByTagName('body')[0];
  }

  
  window.addEventListener('scroll', function(){
    var scrollTop = window.scrollY;
    var windowHeight = window.innerHeight;
    var documentHeight = document.body.clientHeight;

    if( scrollTop + windowHeight + bottomOffset > documentHeight ) {
      if (!locked()) {
        func();
	lock();
      }
    }
    else {
      if (locked()) {
        unlock();
      }
    }
  });


  function lock() {
    if (lockIgnore) return false;
    lockTarget.classList.add(lockMarker);
  }
  function unlock() {
    if (lockIgnore) return false;
    lockTarget.classList.remove(lockMarker);
  }
  function locked() {
    if (lockIgnore) return false;
    return lockTarget.classList.contains(lockMarker);
  }
}

