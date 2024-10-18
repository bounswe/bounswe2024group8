package boun.group8.threedesign.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WikidataService {
    // Örnek, Statue -> Figure
    // Star -> Constellation
    // Lion -> Bee

    public List<String> searchSiblings(String keyword) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT DISTINCT ?searchedItem ?parentClass ?parentLabel ?sibling ?siblingLabel WHERE {\n" +
                "  ?searchedItem rdfs:label \"" + keyword + "\"@en;\n" +
                "                wdt:P279 ?parentClass.\n" +
                "  ?parentClass rdfs:label ?parentLabel.\n" +
                "  ?sibling wdt:P279 ?parentClass;\n" +
                "           rdfs:label ?siblingLabel.\n" +
                "  FILTER(lang(?parentLabel) = \"en\")\n" +
                "  FILTER(lang(?siblingLabel) = \"en\")\n" +
                "  FILTER(?sibling != ?searchedItem)\n" +
                "} LIMIT 10";

        // Execute SPARQL query
        QueryExecution queryExec = QueryExecutionFactory.sparqlService("https://qlever.cs.uni-freiburg.de/api/wikidata", sparqlQuery);
        ResultSet resultSet = queryExec.execSelect();

        // Process results
        List<String> siblingLabels = new ArrayList<>();
        while (resultSet.hasNext()) {
            QuerySolution solution = resultSet.nextSolution();
            if (solution.contains("siblingLabel")) {
                siblingLabels.add(solution.get("siblingLabel").toString());
            }
        }

        // Close query execution
        queryExec.close();

        return siblingLabels;
    }
}