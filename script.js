// Przykładowe dane lekcji
const mySchedule = {
  Monday: [
    { time: "08:00", subject: "Polski", room: "208", building: "B" },
    { time: "09:40", subject: "Fizyka", room: "204", building: "B" },
  ],
  // Dodaj resztę tygodnia...
};

const friendSchedule = {
  Monday: [
    { time: "08:00", subject: "Grafika", room: "8", building: "B" },
    { time: "09:40", subject: "EDB", room: "209", building: "B" },
  ],
  // Dodaj resztę tygodnia...
};

function getCurrentLesson(schedule) {
  const now = new Date();
  const day = now.toLocaleDateString("pl-PL", { weekday: "long" });
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  const todayLessons = schedule[day] || [];
  return todayLessons.find(lesson => lesson.time === currentTime);
}

function updateLessonInfo() {
  const myLesson = getCurrentLesson(mySchedule);
  const friendLesson = getCurrentLesson(friendSchedule);
  const lessonDiv = document.getElementById("lesson-info");

  if (myLesson && friendLesson) {
    const sameFloor = Math.floor(myLesson.room / 100) === Math.floor(friendLesson.room / 100);
    const sameBuilding = myLesson.building === friendLesson.building;

    lessonDiv.innerHTML = `
      <p>Ty: ${myLesson.subject} (${myLesson.room}${myLesson.building})</p>
      <p>Kolega: ${friendLesson.subject} (${friendLesson.room}${friendLesson.building})</p>
    `;
    if (sameFloor && sameBuilding) {
      lessonDiv.classList.add("green");
      document.getElementById("break-info").innerText = "🟢 Możecie się spotkać!";
    }
  } else {
    lessonDiv.innerText = "Brak lekcji w tej chwili.";
  }
}

updateLessonInfo();
