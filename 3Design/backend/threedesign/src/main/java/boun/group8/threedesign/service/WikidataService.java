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
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WikidataService {
    // Örnek, Statue -> Figure
    // Star -> Constellation
    // Lion -> Bee

    public Map<String, String> fetchParentClasses(String keyword) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT DISTINCT ?parentClass ?parentLabel WHERE {\n" +
                "  ?searchedItem rdfs:label \"" + keyword + "\"@en;\n" +
                "                wdt:P279 ?parentClass.\n" +
                "  ?parentClass rdfs:label ?parentLabel.\n" +
                "  FILTER(lang(?parentLabel) = \"en\")\n" +
                "}";

        // Execute SPARQL query
        QueryExecution queryExec = QueryExecutionFactory.sparqlService("https://qlever.cs.uni-freiburg.de/api/wikidata", sparqlQuery);
        ResultSet resultSet = queryExec.execSelect();

        // Process results
        Map<String, String> parentClasses = new HashMap<>();
        while (resultSet.hasNext()) {
            QuerySolution solution = resultSet.nextSolution();
            if (solution.contains("parentClass") && solution.contains("parentLabel")) {
                parentClasses.put(solution.get("parentClass").toString(), solution.get("parentLabel").toString());
            }
        }

        // Close query execution
        queryExec.close();

        return parentClasses;
    }

    public List<String> fetchSiblings(String parentClass, String keyword) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT DISTINCT ?sibling ?siblingLabel WHERE {\n" +
                "  ?sibling wdt:P279 <" + parentClass + ">;\n" +
                "           rdfs:label ?siblingLabel.\n" +
                "  FILTER(lang(?siblingLabel) = \"en\")\n" +
                "  FILTER(?siblingLabel != \"" + keyword + "\"@en)\n" +
                "} LIMIT 5";

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

    public List<String> getAllSiblings(String keyword) {
        Map<String, String> parentClasses = fetchParentClasses(keyword);
        List<String> allSiblings = new ArrayList<>();

        for (String parentClass : parentClasses.keySet()) {
            List<String> siblings = fetchSiblings(parentClass, keyword);
            allSiblings.addAll(siblings);
        }

        return allSiblings;
    }
}