package boun.group8.threedesign.model.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum Category {

    //Naming convention: ALL_CAPS_WITH_UNDERSCORES

    CHARACTERS(1L,"Characters","Models of humans, animals, and fantastical creatures for storytelling or design."),

    NATURE(2L,"Nature","Organic models like trees, plants, rocks, and natural landscapes."),

    ARCHITECTURE(3L,"Architecture","Designs of buildings, structures, interiors, and urban settings."),

    VEHICLES_AND_MACHINES(4L,"Vehicles and Machines","Cars, planes, robots, and mechanical objects in intricate detail."),

    FURNITURE_AND_HOME_DECOR(5L,"Furniture and Home Decor","Household items like chairs, tables, lamps, and other interior designs."),

    MINIMALIST_AND_ABSTRACT(6L,"Minimalist and Abstract","Simplistic or experimental models emphasizing form and creativity."),

    PRINTING_MODELS(7L,"3D Printing Models","Models optimized and prepared for 3D printing purposes."),

    STATUES_AND_SCULPTURES(8L,"Statues and Sculptures","Artistic creations, including busts, figurines, and decorative models."),

    PROPS_AND_ACCESSORIES(9L,"Props and Accessories","Everyday objects, tools, weapons, and standalone design elements."),

    FANTASY_AND_SCI_FI(10L,"Fantasy and Sci-Fi","Models inspired by futuristic, mythical, or imaginative themes.");
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
