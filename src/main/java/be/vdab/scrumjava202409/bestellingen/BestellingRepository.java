package be.vdab.scrumjava202409.bestellingen;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BestellingRepository {
    private final JdbcClient jdbcClient;
    public BestellingRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Bestelling> eerste5bestellingen() {
        String sql = """
                select * from bestellingen 
                inner join bestellingsstatussen bs on bestellingen.bestellingsStatusId = bs.bestellingsStatusId
                         where bs.naam = 'Klaarmaken'
                         order by bestelId
                limit 5;
                """;
        return jdbcClient.sql(sql).query(Bestelling.class).
                stream().toList();
    }

    public Bestelling findEersteBestellingMetStatusKlaarmaken() {
        var sql = """
                select *
                from Bestellingen
                where bestellingsStatusId = 4
                order by besteldatum, bestelId
                limit 1
                """;
        return jdbcClient.sql(sql)
                .query(Bestelling.class)
                .single();
    }

    long findAantalBestellingen() {
        String sql = "select count(*) from bestellingen where bestellingsStatusId = 4";
        return jdbcClient.sql(sql).query(Long.class).single();
    }

    public Bestelling findById(long bestelId){
        String sql = """
                select * from bestellingen where bestelId = ?;
                """;
        return jdbcClient.sql(sql)
                .param(bestelId)
                .query(Bestelling.class)
                .single();
    }
}