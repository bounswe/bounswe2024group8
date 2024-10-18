package boun.group8.threedesign.exception.custom;

public class ThreeDesignDatabaseException extends RuntimeException {

        public ThreeDesignDatabaseException(String message) {
            super(message);
        }

        public ThreeDesignDatabaseException(String message, Throwable cause) {
            super(message, cause);
        }
}
