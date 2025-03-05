document.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setInterval(updateClock, 1000);
    fetchPrayerTimes();
});

function updateClock() {
    const now = new Date();
    document.getElementById("jam").textContent = now.toLocaleTimeString("id-ID");
    document.getElementById("tanggal").textContent = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function fetchPrayerTimes() {
    const city = "Purbalingga";
    const country = "ID";
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const times = data.data.timings;
            setClock("subuh", times.Fajr);
            setClock("dzuhur", times.Dhuhr);
            setClock("ashar", times.Asr);
            setClock("maghrib", times.Maghrib);
            setClock("isya", times.Isha);
        })
        .catch(error => console.error("Gagal mengambil data: ", error));
}

function setClock(id, time) {
    const [hour, minute] = time.split(":").map(Number);
    const jamEl = document.querySelector(`#${id} .jarum.jam`);
    const menitEl = document.querySelector(`#${id} .jarum.menit`);
    
    const hourDegree = (hour % 12) * 30 + (minute / 60) * 30;
    const minuteDegree = minute * 6;

    jamEl.style.transform = `rotate(${hourDegree}deg)`;
    menitEl.style.transform = `rotate(${minuteDegree}deg)`;
}
