package boun.group8.threedesign.service;

import boun.group8.threedesign.service.CDNService.CDNService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class FileServiceTest {

    @Mock
    private CDNService cdnService;

    @InjectMocks
    private FileService fileService;

    @Mock
    private MultipartFile file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUploadFile_withDefaultFolder() throws IOException {
        // Arrange
        byte[] fileBytes = "file content".getBytes();
        String fileName = "file.txt";
        String expectedResponse = "https://cdn.example.com/userFolders/file.txt";

        when(file.getBytes()).thenReturn(fileBytes);
        when(file.getOriginalFilename()).thenReturn(fileName);
        when(cdnService.uploadFile(fileBytes, "userFolders", fileName)).thenReturn(expectedResponse);

        // Act
        String result = fileService.uploadFile(file);

        // Assert
        assertEquals(expectedResponse, result);
        verify(cdnService, times(1)).uploadFile(fileBytes, "userFolders", fileName);
    }

    @Test
    void testUploadFile_withCustomFolder() throws IOException {
        // Arrange
        byte[] fileBytes = "file content".getBytes();
        String fileName = "file.txt";
        String folderName = "customFolder";
        String expectedResponse = "https://cdn.example.com/customFolder/file.txt";

        when(file.getBytes()).thenReturn(fileBytes);
        when(file.getOriginalFilename()).thenReturn(fileName);
        when(cdnService.uploadFile(fileBytes, folderName, fileName)).thenReturn(expectedResponse);

        // Act
        String result = fileService.uploadFile(file, folderName);

        // Assert
        assertEquals(expectedResponse, result);
        verify(cdnService, times(1)).uploadFile(fileBytes, folderName, fileName);
    }

    @Test
    void testUploadFile_withIOException() throws IOException {
        // Arrange
        byte[] fileBytes = "file content".getBytes();
        String fileName = "file.txt";

        when(file.getBytes()).thenReturn(fileBytes);
        when(file.getOriginalFilename()).thenReturn(fileName);
        when(cdnService.uploadFile(fileBytes, "userFolders", fileName)).thenThrow(new IOException("Upload failed"));

        // Act & Assert
        assertThatThrownBy(() -> fileService.uploadFile(file))
                .isInstanceOf(IOException.class)
                .hasMessage("Upload failed");

        verify(cdnService, times(1)).uploadFile(fileBytes, "userFolders", fileName);
    }
}
