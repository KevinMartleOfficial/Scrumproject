package be.vdab.scrumjava202409.bestellijnen;

import be.vdab.scrumjava202409.bestellingen.Bestelling;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BestellijnRepository {
    private final JdbcClient jdbcClient;
    public BestellijnRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Bestellijn> getAlleBestellijnenVanBestelling(Bestelling bestelling){
        String sql = """
                select * from bestellijnen where bestelId = ?;
                """;
        return jdbcClient.sql(sql)
                .param(bestelling.getBestelId())
                .query(Bestellijn.class).list();
    }

    public List<Bestellijn> findAllBestellijnenByBestelId(long bestelId) {
        var sql = """
                select bestellijnId, bestelId, artikelId, aantalBesteld, aantalGeannuleerd
                from Bestellijnen
                where bestelId = ?
                """;
        return jdbcClient.sql(sql)
                .param(bestelId)
                .query(Bestellijn.class)
                .list();
    }
}


