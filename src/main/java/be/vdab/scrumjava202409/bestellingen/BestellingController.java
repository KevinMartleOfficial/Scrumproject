package be.vdab.scrumjava202409.bestellingen;

import be.vdab.scrumjava202409.artikelen.ArtikelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Stream;
import java.util.List;

@RequestMapping
@RestController
class BestellingController {
    private final BestellingService bestellingService;
    private final ArtikelService artikelService;

    public BestellingController(BestellingService bestellingService, ArtikelService artikelService) {
        this.bestellingService = bestellingService;
        this.artikelService = artikelService;
    }

    @GetMapping("bestelling/tv")
    public List<BestellingTVDTO> eerste5bestellingenTV() {
        return bestellingService.eerste5bestellingenTV();
    }

    @GetMapping("bestellingen/aantal")
    long findAantalBestellingen() {
        return bestellingService.findAantalBestellingen();
    }

    @GetMapping("bestellingen/eerste")
    Stream<ArtikelAantal> alleArtikelenMetAantalVanEersteBestelling() {
        return bestellingService.findAllBestellijnenVanEersteBestelling()
                .stream()
                .map(bestellijn -> new ArtikelAantal(
                        artikelService.getArtikelById(bestellijn.getArtikelId()).getNaam(),
                        bestellijn.getAantalBesteld(), "Algoritme in aanmaak"));

    }
}
