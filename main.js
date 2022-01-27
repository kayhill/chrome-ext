console.log("ready");

// blocked user
let BLOCKED = "notTodaySatan";
let MINUTES = 30;

// Event Listeners

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  BLOCKED = request.user;
  MINUTES = request.time;
  let tweets = document.querySelectorAll("article");
  hideFeed(tweets);
  setTimer();
});

// interval to check once for page elements to style on load
let loadInterval = setInterval(function () {
  let primary = document.querySelector('[data-testid="primaryColumn"]');
  if (primary) {
    stylePage(primary);
    clearInterval(loadInterval);
  }
}, 100);

// interval to constantly run to check for new tweets
let interval = setInterval(function () {
  let tweets = document.querySelectorAll("article");
  if (tweets.length > 0) {
    hideFeed(tweets);
  }
}, 500);

// function to filter ex tweets from feed
function hideFeed(tweets) {
  tweets.forEach((tweet) => {
    // find <a> child element of <article>
    let links = tweet.querySelectorAll("a");
    // test if <a> href includes user handle
    for (link of links) {
      // this is where we need to add our BLOCKED user variable-->
      if (link.href.includes(BLOCKED)) {
        tweet.innerHTML = `<h1>Nope.</h1>`;
      }
    }
  });
}

// function to style page elements
function stylePage(primary) {
  const style = document.createElement("style");
  style.innerHTML = `
    main[role="main"] {
      align-items: center !important;
      overflow-x: clip !important;
    }
    [data-testid="primaryColumn"] {
      width: 900px !important;
      max-width: 900px !important;
      margin: 0 auto !important;
    }
    `;
  document.head.appendChild(style);

  let sideBar = document.querySelector('[data-testid="sidebarColumn"]');
  let banner = document.querySelector('[role="banner"]');

  sideBar.remove();
  banner.remove();
}

// set timer to let user use page for their preferred amount of time
function setTimer() {
  const timeSpent = Math.floor(MINUTES * 60000);
  setTimeout(() => {
    alert("You have 1 minute remaining.");
  }, timeSpent - 60000);

  setTimeout(() => {
    alert("Time to get back to living your best life.");
    let primary = document.querySelector('[data-testid="primaryColumn"]');
    primary.remove();

  }, timeSpent);
}
