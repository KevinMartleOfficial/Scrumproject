"use strict";
import {byId, setText, toon, verberg} from "./util.js";
const leverancierNamen = await fetchLeveranciers();
maakDropdown(leverancierNamen);
byId("toevoegen").onclick = async function () {
    verbergFouten();
    const lnaam = byId("namen");
    if (!lnaam.checkValidity()) {
        setText("storing", "Leveranciersnaam niet ingevuld.");
        toon("storing")
        return;
    }
    const lbnr = byId("lbnr");
    if (!lbnr.checkValidity()) {
        setText("storing", "Leveringsbonnummer niet ingevuld.");
        toon("storing");
        return;
    }
    const lbdatum = byId("lbdatum");
    if (!lbdatum.checkValidity()) {
        setText("storing", "Leveringsbondatum niet ingevuld.");
        toon("storing");
        return;
    }
    const leveringsbon = {
        naam: lnaam.value,
        leveringsbonNummer: lbnr.value,
        leveringsbondatum: lbdatum.value
    };
    sessionStorage.setItem("leveringsbonNummer", lbnr.value);
    voegToe(leveringsbon);

}

function verbergFouten() {
    verberg("storing");
}
async function fetchLeveranciers(){
    const response = await fetch("leveranciers");
    if (response.ok){
        const leveranciersNamen = await response.json();
        console.log(leveranciersNamen);
        return leveranciersNamen;
    }
}
async function voegToe(leveringsbon) {
    const response = await fetch("inkomende-leveringen/toevoegen",
        {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(leveringsbon)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setText("storing", "Storing");
                toon("storing");
            }
        });

    sessionStorage.setItem("inkomendeLeveringsId", response);
    window.location = "./artikelsLeveringen.html";
}
function maakDropdown(leveranciersNamen){
        for (const naam of leveranciersNamen){
            console.log(naam);
            const option = document.createElement("option");
            option.innerHTML = naam;
            option.value = naam;
            const select = byId("namen");
            select.appendChild(option)
        }


}