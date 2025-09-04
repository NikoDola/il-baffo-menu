window.addEventListener("load", function () {

  // document.getElementById("fontawesomecss").removeAttribute("disabled");


  inicijalizirajAOS();
})


function inicijalizirajAOS() {
  AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,

    offset: 60,
    delay: 0,
    duration: 700,
    easing: 'ease-in-out-quad',
    once: true,
    mirror: true,
    anchorPlacement: 'top-bottom',
  });
}


function onNavClick() {
  document.querySelectorAll(".nav-toggle").forEach(el => {
    el.classList.toggle("opened");
  })
  // alert(2);
  document.querySelector(".mobile-menu-content").classList.toggle("opened");

  document.querySelector('body').classList.toggle("overlay");

  if (document.querySelector("body").classList.contains("overlay")) {
  }
  setTimeout(() => {
    if (document.querySelector("body").classList.contains("overlay")) {
      document.querySelector("body").setAttribute("onclick", "onNavClick();");
    } else {
      document.querySelector("body").removeAttribute("onclick");
    }
  }, 100);
}


function handleScroll() {
  const mobileNav = document.querySelector('.nav');

  if (window.innerWidth < 780) {
    if (window.scrollY > 60) {
      mobileNav.classList.add('scrolled');
    } else {
      mobileNav.classList.remove('scrolled');
    }
  }
}
window.addEventListener('scroll', handleScroll);

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function verticalLoop(items, config) {
  try {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
          length = items.length,
          startY = items[0].offsetTop,
          times = [],
          heights = [],
          yPercents = [],
          curIndex = 0,
          pixelsPerSecond = (config.speed || 1) * 100,
          snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
          totalHeight, curY, distanceToStart, distanceToLoop, item, i;

      gsap.set(items, {
          yPercent: (i, el) => {
              let h = heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
              yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / h * 100 + gsap.getProperty(el, "yPercent"));
              return yPercents[i];
          }
      });

      gsap.set(items, { y: 0 });

      totalHeight = items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], "scaleY") + (parseFloat(config.paddingBottom) || 0);

      for (i = 0; i < length; i++) {
          item = items[i];
          curY = yPercents[i] / 100 * heights[i];
          distanceToStart = item.offsetTop + curY - startY;
          distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");

          tl.to(item, { yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
              .fromTo(item, { yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100) }, { yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
              .add("label" + i, distanceToStart / pixelsPerSecond);

          times[i] = distanceToStart / pixelsPerSecond;
      }

      function toIndex(index, vars) {
          vars = vars || {};
          (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);

          let newIndex = gsap.utils.wrap(0, length, index),
              time = times[newIndex];

          if (time > tl.time() !== index > curIndex) {
              vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
              time += tl.duration() * (index > curIndex ? 1 : -1);
          }

          curIndex = newIndex;
          vars.overwrite = true;
          return tl.tweenTo(time, vars);
      }

      tl.next = vars => toIndex(curIndex + 1, vars);
      tl.previous = vars => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance

      if (config.reversed) {
          tl.vars.onReverseComplete();
          tl.reverse();
      }

      return tl;
  } catch (err) { }
}

function horizontalLoop(items, config) {
  try {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    // Set initial xPercent values for items
    gsap.set(items, {
      xPercent: (i, el) => {
        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
        xPercents[i] = snap(
          parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    totalWidth =
      items[length - 1].offsetLeft +
      xPercents[length - 1] / 100 * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);

    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }

      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];

      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }

      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }

    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance

    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }

    return tl;
  } catch (err) {
    console.error("Error in horizontalLoop:", err);
  }
}

window.addEventListener("load", function () {
  try {
      let loop = horizontalLoop(".for-scroll", { speed: 1.5, reversed: 1, repeat: -1, paddingBottom: 20 });

      loop2.direction = -1;

  } catch (err) {
      console.log(err);
  }
})

