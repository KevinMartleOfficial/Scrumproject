"use strict";
import {byId, toon, verberg} from "./util.js";

// tijdelijke leveringsbonNummer
// byId("leveringsbonNummer").innerText = sessionStorage.getItem("leveringsbonNummer");
byId("leveringsbonNummer").innerText = 1;

// tijdelijke leveringsboninhoud
// const leveringsbonLijst = sessionStorage.getItem("leveringsbonLijst");
const leveringsbonLijst = [
    {
        "artikelId": 4,
        "artikelNaam": "keukenstoel",
        "artikelEannummer": 5499999000040,
        "aantal": 5
    },
    {
        "artikelId": 29,
        "artikelNaam": "kruk",
        "artikelEannummer": 5499999000293,
        "aantal": 8
    },
    {
        "artikelId": 39,
        "artikelNaam": "TV-meubel",
        "artikelEannummer": 5499999000392,
        "aantal": 12
    },
    {
        "artikelId": 64,
        "artikelNaam": "Staande lamp",
        "artikelEannummer": 5499999000644,
        "aantal": 7
    },
    {
        "artikelId": 94,
        "artikelNaam": "Cirkelzaag 400W",
        "artikelEannummer": 5499999000941,
        "aantal": 4
    }
];

vulTabel(leveringsbonLijst);

byId("buttonBevestig").onclick = async () => {
    maakLeveringTeBevestigen();
    const leveringTeBevestigen = JSON.parse(sessionStorage.getItem("leveringTeBevestigen"));
    console.log(leveringTeBevestigen);
    try {
        const response = await fetch(`inkomendeleveringslijn/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(leveringTeBevestigen)
        });
        if (response.ok) {
            window.location = "./leveringsbonOverzicht.html";
        } else {
            toon("storing");
            const errorMessage = await response.text();
            console.error("Error from server:", errorMessage);
            alert("Error: " + errorMessage);
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("An unexpected error occurred. Please try again.");
    }
}

function vulTabel(leveringsbonLijst) {
    const tabel = byId("tabelLeveringsBonOverzicht");
    for (const artikel of leveringsbonLijst) {
        const tr = tabel.insertRow();
        const a = document.createElement("a");
        a.setAttribute("class", artikel.artikelId);
        a.innerHTML = artikel.artikelNaam;
        a.href = "";
        a.addEventListener("click", event => {
            event.preventDefault();
            sessionStorage.setItem("artikelId", artikel.artikelId);
            window.location = "./artikelOverzicht.html"
        });
        tr.insertCell().appendChild(a);
        tr.insertCell().textContent = artikel.artikelEannummer;
        tr.insertCell().textContent = artikel.aantal;
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", 0);
        input.setAttribute("max", artikel.aantal);
        input.className = "aantalGoedgekeurd";
        tr.insertCell().appendChild(input);
        const afgekeurdSpan = document.createElement("span");
        afgekeurdSpan.className = "aantalAfgekeurd";
        afgekeurdSpan.innerText = Number(artikel.aantal - input.value);
        tr.insertCell().appendChild(afgekeurdSpan);
        input.onchange = () => {
            afgekeurdSpan.innerText = Number(artikel.aantal - input.value);
            telGoedgekeurd();
        }
    }
    // Onderstaande zorgt ervoor dat magazijnier nooit een waarde kan ingeven dat lager of hoger ligt dan min en max
    document.querySelectorAll('input.aantalGoedgekeurd').forEach(input => {
        input.addEventListener('input', function() {
            let min = parseInt(input.min);
            let max = parseInt(input.max);
            let value = parseInt(input.value);

            if (value < min) {
                input.value = min;
            } else if (value > max) {
                input.value = max;
            }
        });
    });
}

function telGoedgekeurd() {
    const aantalGoedgekeurdList = document.getElementsByClassName("aantalGoedgekeurd");
    var ingevuld = 0

    for (let i = 0; i < aantalGoedgekeurdList.length; i++) {
        if (aantalGoedgekeurdList[i].value.trim() !== "") {
            ingevuld++;
        }
    }

    if (ingevuld === aantalGoedgekeurdList.length) {
        toon("buttonBevestig");
    } else {
        verberg("buttonBevestig");
    }
}

function maakLeveringTeBevestigen() {
    const aantalGoedgekeurdList = document.getElementsByClassName("aantalGoedgekeurd");
    const aantalAfgekeurdList = document.getElementsByClassName("aantalAfgekeurd");
    if (sessionStorage.getItem("leveringTeBevestigen")) {
        sessionStorage.removeItem("leveringTeBevestigen")
    }
    const leveringTeBevestigen = [];
    for (let i = 0; i < leveringsbonLijst.length; i++) {
        const inkomendeLeveringsId = 1; // Op te halen: sessionStorage.getItem("leveringsbonNummer");
        const artikelId = leveringsbonLijst[i].artikelId;
        const aantalGoedgekeurd = aantalGoedgekeurdList[i].value;
        const aantalTeruggestuurd = aantalAfgekeurdList[i].innerText;
        const leveringsbonLijn = {
            inkomendeLeveringsId: parseInt(inkomendeLeveringsId),
            artikelId: parseInt(artikelId),
            aantalGoedgekeurd: parseInt(aantalGoedgekeurd),
            aantalTeruggestuurd: parseInt(aantalTeruggestuurd)
        }
        leveringTeBevestigen.push(leveringsbonLijn);
    }
    sessionStorage.setItem("leveringTeBevestigen", JSON.stringify(leveringTeBevestigen));
}