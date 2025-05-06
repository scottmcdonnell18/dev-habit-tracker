const button = document.getElementById("codedTodayBtn");
const streakDisplay = document.getElementById("streakDisplay");

function getTodayDateStr() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // "2025-05-05"
}

function getStreak() {
  return JSON.parse(localStorage.getItem("streakData")) || {
    lastDate: null,
    streak: 0,
  };
}

function setStreak(data) {
  localStorage.setItem("streakData", JSON.stringify(data));
}

function updateUI(streak) {
  streakDisplay.textContent = `Current Streak: ${streak} day${streak !== 1 ? "s" : ""}`;
}

button.addEventListener("click", () => {
  const today = getTodayDateStr();
  const data = getStreak();

  if (data.lastDate === today) {
    alert("You’ve already logged coding for today!");
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak = data.streak;

  if (data.lastDate === yesterdayStr) {
    newStreak++;
  } else {
    newStreak = 1;
  }

  const updatedData = {
    lastDate: today,
    streak: newStreak,
  };

  setStreak(updatedData);
  updateUI(newStreak);
});

window.onload = () => {
  const data = getStreak();
  updateUI(data.streak);
};
