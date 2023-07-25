const initialTime = 2 * 60 * 60;
let remainingTime = initialTime;
const timerElement = document.getElementById("timer");
const currentTimeElement = document.getElementById("currentTime");
let timerActive = false;

function initTtsDemo() {
  if (!('speechSynthesis' in window)) {
    alert(
      '현재 웹 브라우저는 Web Speech API를 지원하지 않습니다. 최신 버전의 크롬 또는 파이어폭스를 사용해주세요.',
    );
  }

  const startButton = document.getElementById('startButton');

  startButton.addEventListener('click', function (e) {
    timerActive = !timerActive;
    if (timerActive) {
      startButton.textContent = '정지';
    } else {
      startButton.textContent = '시작';
    }
  });

  setInterval(updateTimer, 1000);
}
  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    timerActive = !timerActive;
    if (timerActive) {
      startButton.textContent = "정지";
    } else {
      startButton.textContent = "시작";
    }
  });

  setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!timerActive) {
    return;
  } else {
    remainingTime -= 1;
  }

  if (remainingTime <= 0) {
    remainingTime = initialTime;
  }

  const hours = Math.floor(remainingTime / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");

  timerElement.textContent = `남은 시간: ${hours}:${minutes}:${seconds}`;
    const progressBarInnerElement = document.getElementById('progress-inner');
    const progressPercentage = (100 * remainingTime) / initialTime;
    progressBarInnerElement.style.width = `${progressPercentage}%`;

  const alerts = {
    c5sec: { time: 5, message: "테스트용 알람" },
    c100sec: { time: 100, message: "메소먹어라" },
    c10min: { time: 600, message: "10분 유니온 행운, 유니온 메소 사용" },
    c15min: { time: 900, message: "15분 경험치 쿠폰 사용" },
    c20min: { time: 1200, message: "20분 유니온 행운, 유니온 메소 사용" },
    c30min: { time: 1800, message: "30분 경험치 쿠폰 사용" },
  };

  for (const alertId in alerts) {
    const alertElement = document.getElementById(alertId);
    if (
      alertElement.checked &&
      (initialTime - remainingTime) % alerts[alertId].time === 0
    ) {
      speakTts(alerts[alertId].message);
    }
  }
}

function speakTts(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    window.speechSynthesis.cancel(); // 현재 음성을 중단하고 새 음성 합성 시작
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Web Speech API를 지원하지 않는 브라우저입니다.");
  }
}