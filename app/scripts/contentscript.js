setTimeout(function() {
  addVoteToggle();
  makeTimerDraggable();
  watchForTimerStarted();
}, 3000);

let timer, timerRunning, initialX, initialY, currentX, currentY, xOffset, yOffset, active, container;

/**
 * Create a MutationObserver which will make the time draggable immediately
 * upon a new timer being started and added to the page.
 */
watchForTimerStarted = () => {
  const callback = function(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        if (timerRunning) {
          alert("Time's up!");
          timerRunning = false;
        } else {
          makeTimerDraggable();
        }
      }
    });
  };

  const targetNode = document.querySelector('.menu-controls');
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
};

/**
 * Add a button to the settings sidebar to hide/show your own votes.
 */
addVoteToggle = () => {
  const sidebar = document.querySelector('.sidebar-body');
  const button = document.createElement('button');
  button.innerHTML = '<i class="fa fa-check "></i>Show/hide votes';
  button.setAttribute('class', 'normal-button toggle-votes');
  sidebar.appendChild(button);

  button.onclick = function() {
    document.querySelectorAll('.message-votes').forEach(function(el) {
      el.classList.toggle('show-vote-count');
      el.classList.toggle('hide-vote-count');
    });
    document.querySelectorAll('.unvote-link').forEach(function(el) {
      el.classList.toggle('show-vote-count');
      el.classList.toggle('hide-vote-count');
    });
  }
};

/**
 * If a timer is running on the page, make it giant and draggable around the page.
 *
 * Most of the code below was taken from https://www.kirupa.com/html5/drag.htm
 */
makeTimerDraggable = () => {
  timer = document.querySelector("p.timer");
  if (!timer) {
    return;
  }
  setTimeout(function() {
    timerRunning = true;
  }, 1000);
  timer.setAttribute('draggable', 'true');
  timer.style.fontSize = "200px";
  timer.style.width = 'auto';
  timer.style.padding = '20px';
  timer.style.zIndex = '100';
  timer.style.position = 'absolute';
  timer.style.left = '50%';
  container = document.querySelector("#main");

  active = false;
  xOffset = 0;
  yOffset = 0;

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);
  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);
};

dragStart = (e) => {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === timer) {
    active = true;
  }
};

dragEnd = (e) => {
  initialX = currentX;
  initialY = currentY;

  active = false;
};

drag = (e) => {
  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, timer);
  }
};

setTranslate = (xPos, yPos, el) => {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
};