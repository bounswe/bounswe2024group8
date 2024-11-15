package boun.group8.threedesign.controller;

import boun.group8.threedesign.service.FileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/gcp")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GCPTestController {

    final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhoto(@RequestParam("file") MultipartFile file) {

        try {
            var url = fileService.uploadFile(file);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error while uploading photo.");
        }

    }
}
