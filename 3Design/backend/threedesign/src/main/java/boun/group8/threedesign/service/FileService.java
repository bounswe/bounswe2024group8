package boun.group8.threedesign.service;

import boun.group8.threedesign.service.CDNService.CDNService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FileService {

    final CDNService cdnService;

    public String uploadFile(MultipartFile file) throws IOException {
        var folderName = "userFolders";
        return cdnService.uploadFile(file.getBytes(), folderName, file.getOriginalFilename());
    }

    public String uploadFile(MultipartFile file, String folderName) throws IOException {
        return cdnService.uploadFile(file.getBytes(), folderName, file.getOriginalFilename());
    }
}
