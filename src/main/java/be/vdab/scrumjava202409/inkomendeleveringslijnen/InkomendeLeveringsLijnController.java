package be.vdab.scrumjava202409.inkomendeleveringslijnen;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("inkomendeleveringslijn")
public class InkomendeLeveringsLijnController {

    private InkomendeLeveringsLijnService inkomendeLeveringsLijnService;

    public InkomendeLeveringsLijnController(InkomendeLeveringsLijnService inkomendeLeveringsLijnService){
        this.inkomendeLeveringsLijnService = inkomendeLeveringsLijnService;
    }

    @PostMapping("add")
    public void voegInkomendeLeveringsLijnenToe(@RequestBody @Valid List<InkomendeLeveringsLijnGeenMagazijnId> inkomendeLeveringsLijnList){

        inkomendeLeveringsLijnService.voegInkomendeLeveringsLijnenToe(inkomendeLeveringsLijnList);
    }

    @GetMapping("{inkomendeLeveringsId}")
    public List<DTOArtikelNaamInkomendeLeveringsLijnAantalGoedgekeurdEnMagazijnPlaats>findAllInkomendeLeveringsLijnenByInkomendeLeveringsId(@PathVariable long inkomendeLeveringsId){
        return inkomendeLeveringsLijnService.findAllInkomendeLeveringsLijnenByInkomendeLeveringsId(inkomendeLeveringsId);
    }

    //LEV-5.3 updaten voorraad in de tabel artikelen, en bij de tabel magazijnplaatsen
    @PostMapping("verhoog")
    public void verhoogVoorraden(@RequestBody @Valid long inkomendeLeveringsId){
        inkomendeLeveringsLijnService.verhoogVoorraden(inkomendeLeveringsId);
    }
}
