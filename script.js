document.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setInterval(updateClock, 1000);
    fetchPrayerTimes();
});

let countdownInterval; // Menyimpan interval hitung mundur

function updateClock() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Format HH:MM

    document.getElementById("jam").textContent = now.toLocaleTimeString("id-ID");
    document.getElementById("tanggal").textContent = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    
    const prayerTimes = [
        document.getElementById("subuh").textContent,
        document.getElementById("dzuhur").textContent,
        document.getElementById("ashar").textContent,
        document.getElementById("maghrib").textContent,
        document.getElementById("isya").textContent
    ];

    if (prayerTimes.includes(currentTime)) {
        startCountdown(7 * 60); // Mulai hitung mundur 7 menit
    }
}

function startCountdown(duration) {
    clearInterval(countdownInterval); // Hentikan hitungan sebelumnya jika ada
    let remainingTime = duration;
    document.getElementById("jam").style.color = "red"; // Ubah warna jam jadi merah

    countdownInterval = setInterval(() => {
        console.log("Sisa waktu:", remainingTime);
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        document.getElementById("jam").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (remainingTime <= 3) {
            playBeep(); // Bunyi beep pada 3 detik terakhir
        }

        if (remainingTime === 0) {
            clearInterval(countdownInterval);
            document.getElementById("jam").style.color = "yellow"; // Kembalikan warna normal
            updateClock(); // Tampilkan kembali jam normal
        }

        remainingTime--;
    }, 1000);
}

function playBeep() {
    let beep = new Audio("beep-04.mp3"); // Ganti dengan suara beep yang sesuai
    beep.play();
}

function fetchPrayerTimes() {
    const city = "Purbalingga";
    const country = "ID";
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const times = data.data.timings;
            // setClock("subuh", times.Fajr);
            // setClock("dzuhur", times.Dhuhr);
            // setClock("ashar", times.Asr);
            // setClock("maghrib", times.Maghrib);
            // setClock("isya", times.Isha);
            document.getElementById("subuh").textContent = times.Fajr;
            document.getElementById("dzuhur").textContent = times.Dhuhr;
            document.getElementById("ashar").textContent = times.Asr;
            document.getElementById("maghrib").textContent = times.Maghrib;
            document.getElementById("isya").textContent = times.Isha;
        })
        .catch(error => console.error("Gagal mengambil data: ", error));
}



// function setClock(id, time) {
//     const [hour, minute] = time.split(":").map(Number);
//     const jamEl = document.querySelector(`#${id} .jarum.jam`);
//     const menitEl = document.querySelector(`#${id} .jarum.menit`);
    
//     const hourDegree = (hour % 12) * 30 + (minute / 60) * 30;
//     const minuteDegree = minute * 6;

//     jamEl.style.transform = `rotate(${hourDegree}deg)`;
//     menitEl.style.transform = `rotate(${minuteDegree}deg)`;
// }
