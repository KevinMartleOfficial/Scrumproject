"use strict";
import {byId, setText, toon, verberg} from "./util.js";

byId("toevoegen").onclick = async function () {
    verbergFouten();
    const lnaam = byId("lnaam");
    if (!lnaam.checkValidity()) {
        setText("storing", "leveranciersnaam niet ingevuld");
        toon("storing")
        return;
    }
    const lbnr = byId("lbnr");
    if (!lbnr.checkValidity()) {
        setText("storing", "leveranciersnummer niet ingevuld");
        toon("storing");
        return;
    }
    const lbdatum = byId("lbdatum");
    if (!lbdatum.checkValidity()) {
        setText("storing", "leveringsbon    datum niet ingevuld");
        toon("storing");
        return;
    }
    const leveringsbon = {
        leveranciersnaam: lnaam.value,
        leveringsbonNummer: lbnr.value,
        leveringsbondatum: lbdatum.value
    };
    voegToe(leveringsbon);
}

function verbergFouten() {
    verberg("storing");
}

async function voegToe(leveringsbon) {
    /* //juiste controller input geven
    const response = await fetch("leveringen",
        {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(leveringsbon)
        });

    if (response.ok) {
        window.location = "artikelLeveringen.html"
    } else {
    setText("storing", "Storing");
            toon("storing");
    }

     */
    console.log(leveringsbon);
}