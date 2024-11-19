package boun.group8.threedesign.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnotationResponse {

    @JsonProperty("@context")
    private String context;
    private String id;
    private String type;
    private String bodyValue;
    private CreatorDTO creator;
    private Timestamp created;
    private TargetDTO target;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class CreatorDTO {
        String id;
        String type;
        String nickname;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class TargetDTO {
        String source;
        SelectorDTO selector;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class SelectorDTO {
        String type;
        Integer start;
        Integer end;
    }
}
