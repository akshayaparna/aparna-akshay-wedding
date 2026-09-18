/* =========================
   LOADING
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loading = document.getElementById("loading");

        if (loading) {
            loading.classList.add("hide");
        }

    }, 700);

});


/* =========================
   OPEN INVITATION
========================= */

const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");

if (openBtn) {

    openBtn.addEventListener("click", () => {

        cover.style.opacity = "0";
        cover.style.transition = "opacity .8s ease";

        setTimeout(() => {

            cover.style.display = "none";

            invitation.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 800);

    });

}


/* =========================
   WEDDING DATE
========================= */

const weddingDate =
    new Date("2026-11-01T11:00:00+05:30");


/* =========================
   COUNTDOWN
========================= */

function updateCountdown() {

    const now = new Date();

    const difference =
        weddingDate.getTime() - now.getTime();


    if (difference <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   CALENDAR
========================= */

function createCalendar() {

    const container =
        document.getElementById("calendarDays");

    if (!container) return;


    const year = 2026;
    const month = 10; // November

    const firstDay =
        new Date(year, month, 1).getDay();

    const totalDays =
        new Date(year, month + 1, 0).getDate();


    container.innerHTML = "";


    // Empty cells before November 1
    for (let i = 0; i < firstDay; i++) {

        const empty =
            document.createElement("span");

        container.appendChild(empty);
    }


    for (let day = 1; day <= totalDays; day++) {

        const cell =
            document.createElement("span");

        cell.textContent = day;


        if (day === 1) {
            cell.classList.add("event-day");
            cell.title = "Wedding Day";
        }


        container.appendChild(cell);
    }

}


createCalendar();


/* =========================
   GOOGLE CALENDAR
========================= */

const calendarBtn =
    document.getElementById("calendarBtn");

if (calendarBtn) {

    calendarBtn.addEventListener("click", () => {

        const start = "20261101T053000Z";
        const end = "20261101T073000Z";

        const url =
            "https://calendar.google.com/calendar/render" +
            "?action=TEMPLATE" +
            "&text=Aparna%20Aji%20%26%20Akshay%20Shaji%20Wedding" +
            "&dates=" + start + "/" + end +
            "&details=Wedding%20of%20Aparna%20Aji%20and%20Akshay%20Shaji" +
            "&location=EMJ%20Auditorium%2C%20Elookara";

        window.open(
            url,
            "_blank",
            "noopener"
        );

    });

}


/* =========================
   RSVP MODAL
========================= */

const rsvpBtn =
    document.getElementById("rsvpBtn");

const rsvpModal =
    document.getElementById("rsvpModal");


if (rsvpBtn && rsvpModal) {

    rsvpBtn.addEventListener("click", () => {

        rsvpModal.classList.remove("hidden");

    });

}


/* CLOSE MODAL */

document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {

        const target =
            document.getElementById(
                button.dataset.close
            );

        if (target) {
            target.classList.add("hidden");
        }

    });

});


/* CLICK OUTSIDE */

if (rsvpModal) {

    rsvpModal.addEventListener("click", (event) => {

        if (event.target === rsvpModal) {

            rsvpModal.classList.add("hidden");

        }

    });

}


/* =========================
   RSVP
========================= */

const rsvpForm =
    document.getElementById("rsvpForm");


if (rsvpForm) {

    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const name =
            document.getElementById("rsvpName")
                .value.trim();

        const attendance =
            document.getElementById("attendance")
                .value;

        const guests =
            Number(
                document.getElementById("guestCount")
                    .value
            );

        const message =
            document.getElementById("rsvpMessageText")
                .value.trim();

        const result =
            document.getElementById("rsvpMessage");


        if (name.length < 2) {

            result.textContent =
                "Please enter your name.";

            return;
        }


        if (guests < 1 || guests > 20) {

            result.textContent =
                "Guest count must be between 1 and 20.";

            return;
        }


        /*
         * If you want this bride-side invitation
         * connected to your existing Supabase RSVP,
         * put your Supabase setup here.
         */

        result.textContent =
            "Thank you! Your response has been received.";

        rsvpForm.reset();

        document.getElementById("guestCount").value = 1;

    });

}