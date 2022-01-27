console.log("ready");

// array of blocked users
let BLOCKED = ["atticaforky"];

// interval to check once for page elements to style on load
let loadInterval = setInterval(function () {
  let primary = document.querySelector('[data-testid="primaryColumn"]');
  if (primary) {
    stylePage();
    clearInterval(loadInterval);
  }
}, 100);

// interval to constantly run to check for new tweets
let interval = setInterval(function () {
  let tweets = document.querySelectorAll("articles");
  console.log("found tweets");
  if (tweets.length > 0) {
    hideFeed(tweets);
  }
}, 500);

// function to filter ex twets from feed
function hideFeed(tweets) {
  tweets.forEach((tweet) => {
    // find <a> child element of <article>
    console.log(tweet);
    let links = tweet.quearySelectorAll("a");
    // test if <a> href includes user handle
    for (link of links) {
      console.log(link);
      if (link.href.includes("appodlachia")) {
        console.log(tweet);
        tweet.innerHTML = `<h1>Nope.</h1>`;
      }
    }
  });
}

// function to style page elements
function stylePage() {
  let banner = document.querySelector('[role="banner"]');
  banner.remove();
}
