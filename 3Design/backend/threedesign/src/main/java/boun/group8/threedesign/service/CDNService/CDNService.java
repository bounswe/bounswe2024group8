package boun.group8.threedesign.service.CDNService;

import java.io.IOException;

public interface CDNService {

    String uploadFile(byte[] fileBytes, String folderName, String fileName) throws IOException;

}
