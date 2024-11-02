package boun.group8.threedesign.model.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum Category {

    //Naming convention: ALL_CAPS_WITH_UNDERSCORES

//    TEST_1(1L,"Testing","This is a test category"),

//    TEST_3(4L,"Testing7","This is a test category 2")




    ;

    //Represents the database id of the category
    final Long id;

    final String name;

    final String description;

    Category(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static Category getById(Long id) {
        for (Category category : Category.values()) {
            if (category.getId().equals(id)) {
                return category;
            }
        }
        return null;
    }

}
