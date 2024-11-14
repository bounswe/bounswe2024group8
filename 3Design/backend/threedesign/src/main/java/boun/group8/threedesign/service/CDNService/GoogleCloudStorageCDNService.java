package boun.group8.threedesign.service.CDNService;

import com.google.cloud.storage.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoogleCloudStorageCDNService implements CDNService {

    final Storage storage;

    final String bucketName;

    public GoogleCloudStorageCDNService(@Value("${gcp.bucket.name}") String bucketName) {
        this.storage = StorageOptions.getDefaultInstance().getService();
        this.bucketName = bucketName;
    }


    @Override
    public String uploadFile(byte[] fileBytes, String folderName, String fileName) throws IOException {
        BlobId blobId = BlobId.of(bucketName, folderName + "/" + fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        var created = storage.create(blobInfo, fileBytes);

        return created.getMediaLink();


    }


}

