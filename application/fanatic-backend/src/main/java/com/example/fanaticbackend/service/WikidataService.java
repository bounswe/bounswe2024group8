package com.example.fanaticbackend.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WikidataService {

    //wikidata search "Galatasaray" , sehri, text
    //Bu textler ile postlar arasinda arama yapilacak
    //Sehir ve Takim.


    public String search(String keyword) {
        String teamSearch = searchTeam(keyword);
        if (!teamSearch.isEmpty()) {
            return teamSearch;
        }
        String playerSearch = searchPlayer(keyword);
        if (!playerSearch.isEmpty()) {
            return playerSearch;
        }

        return "No results found for keyword: " + keyword;
    }





    public String searchTeam(String keyword) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT DISTINCT ?team ?teamLabel ?teamDesc ?locationLabel ?yearFounded ?coachLabel ?logo WHERE {\n" +
                "    ?team wdt:P31 wd:Q476028;\n" +
                "          wdt:P118 wd:Q485568;\n" +
                "          schema:description ?teamDesc.\n" +
                "          FILTER(lang(?teamDesc) = \"en\")\n" +
                "    ?team rdfs:label ?teamLabel.\n" +
                "    OPTIONAL { ?team wdt:P154 ?logo.}\n" +
                "    OPTIONAL { ?team wdt:P571 ?yearFounded. }\n" +
                "    OPTIONAL { ?team wdt:P286 ?coach.\n" +
                "               ?coach rdfs:label ?coachLabel.\n" +
                "               FILTER(lang(?coachLabel) = \"en\") }\n" +
                "    OPTIONAL { ?team wdt:P159 ?location.\n" +
                "               ?location rdfs:label ?locationLabel.\n" +
                "               FILTER(lang(?locationLabel) = \"en\") }\n" +
                "    FILTER(lang(?teamLabel) = \"en\" && contains(lcase(?teamLabel), \"" + keyword.toLowerCase() + "\"))\n" +
                "}";

        // Execute SPARQL query
        QueryExecution queryExec = QueryExecutionFactory.sparqlService("https://query.wikidata.org/sparql", sparqlQuery);
        ResultSet resultSet = queryExec.execSelect();

        // Process results
        StringBuilder result = new StringBuilder();
        while (resultSet.hasNext()) {
            QuerySolution solution = resultSet.nextSolution();
            result.append("Team: ").append(solution.get("teamLabel")).append("\n");
            result.append("Description: ").append(solution.get("teamDesc")).append("\n");
            result.append("Year Founded: ").append(solution.get("yearFounded")).append("\n");
            result.append("Coach: ").append(solution.get("coachLabel")).append("\n");
            result.append("Logo: ").append(solution.get("logo")).append("\n\n");
        }

        // Close query execution
        queryExec.close();

        return result.toString();
    }

    public String searchPlayer(String keyword) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT DISTINCT ?player ?playerLabel ?position ?team ?teamLabel WHERE {\n" +
                "    ?player wdt:P31 wd:Q5;\n" +
                "            wdt:P106 wd:Q937857;\n" +
                "            rdfs:label ?playerLabel.\n" +
                "    OPTIONAL { ?player wdt:P413 ?position. }\n" +
                "    OPTIONAL { ?player wdt:P54 ?team.\n" +
                "               ?team rdfs:label ?teamLabel.\n" +
                "               FILTER(lang(?teamLabel) = \"en\") }\n" +
                "    FILTER(lang(?playerLabel) = \"en\" && contains(lcase(?playerLabel), \"" + keyword.toLowerCase() + "\"))\n" +
                "}";

        // Execute SPARQL query
        QueryExecution queryExec = QueryExecutionFactory.sparqlService("https://query.wikidata.org/sparql", sparqlQuery);
        ResultSet resultSet = queryExec.execSelect();

        // Process results
        StringBuilder result = new StringBuilder();
        while (resultSet.hasNext()) {
            QuerySolution solution = resultSet.nextSolution();
            result.append("Player: ").append(solution.get("playerLabel")).append("\n");
            result.append("Position: ").append(solution.get("position")).append("\n");
            result.append("Team: ").append(solution.get("teamLabel")).append("\n\n");
        }

        // Close query execution
        queryExec.close();

        return result.toString();
    }




}