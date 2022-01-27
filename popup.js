document.addEventListener("DOMContentLoaded", () => {
  const settings = document.getElementById("settings");
  settings.addEventListener("submit", (e) => handleForm(e));
});

function handleForm(e) {
  e.preventDefault();
  BLOCKED = document.getElementById("user").value;
  MINUTES = document.getElementById("time").value;

  //Send info to web page in tab
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      user: `${BLOCKED}`,
      time: `${MINUTES}`,
    });
  });

  document.getElementById("settings").reset();
  self.close();
}
