package com.example.fanaticbackend.service;

import com.example.fanaticbackend.dto.WikidataTeamDto;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.stereotype.Service;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.util.HashMap;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WikidataService {

    //wikidata search "Galatasaray" , sehri, text
    //Bu textler ile postlar arasinda arama yapilacak
    //Sehir ve Takim.


    public WikidataTeamDto search(String keyword) {
        HashMap<String, String> teamSearch = searchTeam(keyword);
        if (!teamSearch.isEmpty()) {
            return WikidataTeamDto.builder().teamName(teamSearch.get("teamLabel").replace("@en", ""))
                    .year(Integer.parseInt(teamSearch.get("yearFounded").substring(0, 4)))
                    .coachName(teamSearch.get("coachLabel").replace("@en", ""))
                    .logoUrl(teamSearch.get("logo"))
                    .location(teamSearch.get("locationLabel").replace("@en", ""))
                    .build();
        }
        HashMap<String, String> playerSearch = searchPlayer(keyword);
        if (!playerSearch.isEmpty()) {
            return WikidataTeamDto.builder().teamName(playerSearch.get("teamLabel").replace("@tr", ""))
                    .build();
        }


        //return "No results found for keyword: " + keyword;
        return null;
    }





    public HashMap<String, String> searchTeam(String keyword) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT DISTINCT ?team ?teamLabel ?locationLabel ?yearFounded ?coachLabel ?logo WHERE {\n" +
                "    ?team wdt:P31 wd:Q476028;\n" +
                "          wdt:P118 wd:Q485568;\n" +
                //"          schema:description ?teamDesc.\n" +
                //"          FILTER(lang(?teamDesc) = \"en\")\n" +
                "          rdfs:label ?teamLabel.\n" +
                "  FILTER(lang(?teamLabel) = \"en\")\n" +
                "    OPTIONAL { ?team wdt:P154 ?logo.}\n" +
                "    OPTIONAL { ?team wdt:P571 ?yearFounded. }\n" +
                "    OPTIONAL { ?team wdt:P286 ?coach.\n" +
                "               ?coach rdfs:label ?coachLabel.\n" +
                "               FILTER(lang(?coachLabel) = \"en\") }\n" +
                "    OPTIONAL { ?team wdt:P159 ?location.\n" +
                "               ?location rdfs:label ?locationLabel.\n" +
                "               FILTER(lang(?locationLabel) = \"en\") }\n" +
                "    FILTER(CONTAINS(LCASE(?teamLabel), \"" + keyword.toLowerCase() + "\"@en))\n" +
                "}";

        // Execute SPARQL query
        QueryExecution queryExec = QueryExecutionFactory.sparqlService("https://qlever.cs.uni-freiburg.de/api/wikidata", sparqlQuery);
        ResultSet resultSet = queryExec.execSelect();

        // Process results
        //StringBuilder result = new StringBuilder();
        HashMap<String, String> result = new HashMap<>();
        while (resultSet.hasNext()) {
            QuerySolution solution = resultSet.nextSolution();
            //result.append("Team: ").append(solution.get("teamLabel")).append("\n");
            if (solution.contains("teamLabel")) {
                result.put("teamLabel", solution.get("teamLabel").toString());
            }
            //result.append("Year Founded: ").append(solution.get("yearFounded")).append("\n");
            if (solution.contains("yearFounded")) {
                result.put("yearFounded", solution.get("yearFounded").toString());
            }
            //result.append("Coach: ").append(solution.get("coachLabel")).append("\n");
            if (solution.contains("coachLabel")) {
                result.put("coachLabel", solution.get("coachLabel").toString());
            }
            //result.append("Logo: ").append(solution.get("logo")).append("\n\n");
            if (solution.contains("logo")) {
                result.put("logo", solution.get("logo").toString());
            }

            if (solution.contains("locationLabel")) {
                result.put("locationLabel", solution.get("locationLabel").toString());
            }
        }

        // Close query execution
        queryExec.close();

        return result;
    }

    public HashMap<String, String> searchPlayer(String keyword) {
        String sparqlQuery = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "SELECT DISTINCT ?player ?playerLabel ?team ?teamLabel\n" +
                "WHERE {\n" +
                "  ?player rdfs:label ?playerLabel.\n" +
                "  ?player wdt:P106 wd:Q937857.\n" +
                "  ?player wdt:P2458 [].\n" +
                "  ?player wdt:P54 ?team.\n" +
                "  ?team rdfs:label ?teamLabel.\n" +
                "  FILTER(lang(?teamLabel) = \"tr\")\n" +
                "  FILTER(lang(?playerLabel) = \"en\")\n" +
                "  FILTER(CONTAINS(LCASE(?playerLabel), \"" + keyword.toLowerCase() + "\"@en))\n" +
                "}\n" +
                "LIMIT 1";

        // Execute SPARQL query
        QueryExecution queryExec = QueryExecutionFactory.sparqlService("https://qlever.cs.uni-freiburg.de/api/wikidata", sparqlQuery);
        ResultSet resultSet = queryExec.execSelect();

        // Process results
        HashMap<String, String> result = new HashMap<>();
        while (resultSet.hasNext()) {
            QuerySolution solution = resultSet.nextSolution();
            if (solution.contains("playerLabel")) {
                result.put("playerLabel", solution.get("playerLabel").toString());
            }
            if (solution.contains("teamLabel")) {
                result.put("teamLabel", solution.get("teamLabel").toString());
            }
        }

        // Close query execution
        queryExec.close();

        return result;
    }




}
