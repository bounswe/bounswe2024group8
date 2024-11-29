## Table of Contents
* [1 Requirements addressed in this milestone](#1-requirements-addressed-in-this-milestone)

* [2 Deliverables](#2-deliverables)
    * [2.1 List and status of deliverables](#21-list-and-status-of-deliverables)
    * [2.2 UX Design](#22-ux-design)
    * [2.3 W3C Standard](#23-w3c-standard)
    * [2.4 API Documentation](#24-api-documentation)   
* [3 Testing](#3-testing)
    * [3.1 The general test plan for the project](#31-the-general-test-plan-for-the-project)
    * [3.2 Generated unit test reports](#32-generated-unit-test-reports)
        * [3.2.1 Backend](#321-backend)
        * [3.2.2 Frontend](#322-frontend)
        * [3.2.3 Mobile](#323-mobile)

* [4 Planning and team process](#4-planning-and-team-process)
    * [4.1 Changes since first milestone](#41-changes-since-first-milestone)
    * [4.2 Plan for completing the project](#42-plan-for-completing-the-project)
    * [4.3 Project plan](#43-project-plan)

* [5 Evaluation](#5-evaluation)
    * [5.1 Summary of customer feedback and reflections](#51-summary-of-customer-feedback-and-reflections)
    * [5.2 Evaluation of the status of project deliverables](#52-evaluation-of-the-status-of-project-deliverables)
    * [5.3 Evaluation of tools and processes](#53-evaluation-of-tools-and-processes)

* [6 Individual Contributions](#6-individual-contributions)



# 1 Requirements addressed in this milestone

_1.1.2.1 Users shall be able to:_

_1.1.2.1.3 Change their username once a month._

_1.1.2.1.5 Delete their account._

Except the two requirements above, we have fulfilled all the specified [requirements](https://github.com/bounswe/bounswe2024group8/wiki/CMPE451-%E2%80%90-Requirements) for the second customer milestone.  


# 2 Deliverables

## 2.1 List and status of deliverables

| Deliverable | Status |
|-|-|
|[Project Repository](https://github.com/bounswe/bounswe2024group8)|Completed & Maintained|
|[Issues](https://github.com/bounswe/bounswe2024group8/issues)|Completed & Maintained|
|[Weekly Meeting and Lab Notes](https://github.com/bounswe/bounswe2024group8/wiki)|Completed|
|[RAM](https://github.com/bounswe/bounswe2024group8/wiki/CMPE-451-%E2%80%90-Responsibility-Assignment-Matrix-(RAM))|Completed|
|[Second Customer Milestone Report](https://github.com/bounswe/bounswe2024group8/wiki/Second-Customer-Milestone-Report)|Completed|
|[Deployed Backend](http://34.32.44.43:8080/)|Completed|
|[Deployed Frontend](http://34.32.44.43:3000/)|Completed|
|[Mobile Apk](https://github.com/bounswe/bounswe2024group8/releases/tag/customer-milestone-2)|Completed |
|[Release Version](https://github.com/bounswe/bounswe2024group8/releases/tag/customer-milestone-2)|Completed |

## 2.2 UX Design
### 1. User Journey
**Onboarding Experience:**
- Target Audience: 3D modeling enthusiasts, ranging from hobbyists to professionals.
- Key Focus: Platform entrance and ease of use. Account creation or login.


### 2. Domain-Specific Features
#### 2.1 Visual Posts: 3D Model Showcase
**3D Viewer:**
- Interactive, browser-compatible viewer with intuitive zoom and rotate gestures.
- Supports industry-standard formats like .obj, .stl, and .fbx.


#### 2.2 Tournaments and Challenges
**Leaderboard UI:**
- Clear and simple design, with links to posts and users from tournament.


#### 2.3 Semantic Search
- Semantic search delivers relevant items in a clear and easily understandable format.

### 3. Engagement & Interaction Design
#### 3.1 Social Interactions
**Post Engagement:**
- Like, dislike, and bookmark buttons are visually distinct but cohesive with the platform's aesthetic.

**Annotations:**
- Highlighted text annotations with W3C compliance.

#### 3.2 User Profiles
- Display Tournament points prominently to inspire participation.
- Showcase followers, achievements, and recent posts in a visually appealing manner.


### 4. Cross-Platform UX Consistency
- Harmonizing mobile and web designs to improve the user experience.

## 2.3 W3C Standard

We decided to use the annotation W3C standard for our project. Our implementation leverages the W3C Web Annotation Data Model to provide a robust annotation system. The backend server is designed with three core entities: Annotation, Body, and Target. The Body entity is represented as a simple string to store annotation content. The Target entity utilizes the Text Position Selector, with attributes like start, end, id, type, post, and comment, enabling precise text selection. The Annotation entity captures metadata such as id, type, motivation, target, body, creator, created, and modified timestamps. On the frontend and mobile applications, users can select text within a post and create annotations. Once the annotation is confirmed, a POST request is sent to the backend with a JSON payload containing target, body, access token, and either a post id or comment id. An example of the response JSON structure from the backend is as follows:

```json
{
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "http://example.org/anno6",
  "type": "Annotation",
  "bodyValue": "Comment text",
  "creator": {
    "id": "http://example.org/user1",
    "type": "Person",
    "nickname": "pseudo"
  },
  "created": "2021-06-01T12:00:00Z",
  "target": {
    "source": "http://example.org/ebook1",
    "selector": {
      "type": "TextPositionSelector",
      "start": 412,
      "end": 795
    }
  }
}
```
To enhance the user experience, the frontend allows users to toggle annotations visibility by enabling an annotation view mode. Once enabled, annotations are highlighted within the text. Clicking on a highlighted section reveals detailed annotation data, including the author's identity and the annotation content.

This implementation ensures seamless annotation management, enhancing content interaction and supporting collaborative annotation workflows.

## 2.4 API Documentation
We created a swagger to provide documentation for our API. Here is the [link](http://34.32.44.43:8080/swagger-ui/index.html) . 
Now an example on how to use it:
First you should login or signup with an account in this endpoint:

<img width="1430" alt="image" src="https://github.com/user-attachments/assets/c448ccee-f5c3-40e3-9be5-ff13ac96142f">

Here is the response:

<img width="1426" alt="image" src="https://github.com/user-attachments/assets/997053f2-1eae-46a1-a905-c0a3fc524a67">

Now we can get the accessToken and use it to authorize. The authorization is also configured for swagger you can use the button at the top:

<img width="188" alt="image" src="https://github.com/user-attachments/assets/15ef9a4c-894f-46c2-9c65-b48505b62a91">

You should put your response's accessToken here and after that you can try any endpoint like we just send request for register endpoint.


# 3 Testing

## 3.1 The general test plan for the project

For backend we divided the vital backend services to each of us who are in the backend part of our project. We decided to use JUnit and Mockito to write unit tests.

For frontend we used Jest with TypeScript to test the main parts of the frontend. We focused on testing important components like UI and key features to make sure they work correctly. The tests check if everything behaves as expected and handle different situations properly.


## 3.2 Generated unit test reports

### 3.2.1 Backend
We wrote unit tests for these services: CommentService, FileService, PostService, UserService, TournamentService.
Our main focus was to test exceptions and valid requests to methods of these services.

<img width="687" alt="image" src="https://github.com/user-attachments/assets/497af469-59a2-4a98-b85b-5193bf713dbe">

Here is the coverage result of our tests. We prioritized the most used and vital methods.

### 3.2.2 Frontend
We wrote unit tests for these components: TournamentInfo, TournamentLeaderboard, SearchResults, Comments. 
All tests are successfull, our components work as expected.

<img width="687" alt="image" src="https://i.ibb.co/f4MKY2g/imgg.jpg">

Here is the coverage result of our tests. We prioritized the most used and vital components.

### 3.2.3 Mobile

As our mobile app still lacks several features, our tests are not ready yet.


# 4 Planning and team process

## 4.1 Changes since first milestone

By far, the most significant changes on our work methodologies are about the communication quality and frequency. All three teams were always in touch during the implementation phase, which prevented any potential bottlenecks. Frontend and mobile teams being able to run the latest state of the backend on their local machines saved us a lot of time, as they no longer had to wait until deployment to finalize their implementations. Moreover, we have also managed to divide and prioritize the responsibilities in a more efficient manner, compared to the first milestone. Finally, we have spent a lot more effort for the presentation this time, which we think helped properly expressing what our application is.

## 4.2 Plan for completing the project
Our goal by the second milestone was to showcase all the essential requirements. In our presentation, we demonstrated the key functionalities outlined in the requirements. We also listened to feedback from both our professor and assistants regarding areas that were incomplete or could be improved. After our upcoming planning meeting, we aim to address these gaps based on the reviews we received and complete the project in a way that satisfies both our expectations and standards by the third milestone.

## 4.3 Project plan

We are still utilizing GitHub Project and its roadmap functionality since it is very easy to connect them to issues opened, and we could organize them by date in the roadmap page, allowing us to see the future, past, and present progress and move accordingly. Details can be seen [here](https://github.com/orgs/bounswe/projects/68/views/3).

# 5 Evaluation

## 5.1 Summary of customer feedback and reflections

### 5.1.1 Design Improvements
- **Current Issue**: The design of the model viewer screen and its ratio do not fully meet user expectations, and the perspective options are limited.
- **Suggested Improvement**: 
   - Change the closed screen of the model viewer.
   - Adjust the ratio of the model viewer for better presentation.
   - Add a "reset perspective" feature for users to easily return to the default view.

### 5.1.2 Tournament
- **Current Issue**: The current tournament measurement criteria may not adequately reflect the full range of participant abilities and achievements.
- **Suggested Improvement**: Introduce different measurement criteria for tournaments to evaluate various aspects like creativity, technical skills, and user engagement.

### 5.1.3 Create Post
- **Current Issue**: Users may not always provide enough context or details when sharing their designs.
- **Suggested Improvement**: Add design tags or a form that encourages users to provide more information about their design, fostering a more informative and engaging sharing process.

## 5.2 Evaluation of the status of project deliverables

After the first milestone, we were able to increase our pace significantly, which helped introducing plenty of new features in the second milestone. Therefore, we are satisfied with our performance overall, yet there are still room for improvement in certain processes. For backend and frontend development, we have managed to implement all the features we were initially planning. On the other hand, our current mobile implementation still lacks several major features. Furthermore, since we have shifted our focus to the development for this milestone, certain documentation work became outdated and incomplete.

## 5.3 Evaluation of tools and processes

### 3.1 Swagger

We used Swagger to automate API documentation and testing. It provided a clear, interactive interface for exploring and validating our RESTful endpoints, improving development efficiency and ensuring better API clarity.

### 3.2 Communication Media

Due to the ongoing ban on Discord in our country, we primarily used WhatsApp for text communication, making it easy to share updates and coordinate tasks quickly. For more detailed discussions, meetings, and work reviews, we turned to Google Meet, which offered a reliable platform for face-to-face collaboration. This combination of tools helped us stay connected and work together efficiently, even with the challenges we faced.

### 3.3 Project Plan

We used GitHub Project and its roadmap functionality since it is very easy to connect them to issues opened, and we could organize them by date in the roadmap page, allowing us to see the future, past, and present progress and move accordingly.

### 3.4 Backend

We used Spring Boot as it is a trusted and well-built backend framework with great built-in libraries for authorization, organization, and more.

### 3.5 Database

We used PostgreSQL because it integrates well with Spring Boot, offering reliability, ACID compliance, and a strong support community. Its ability to handle complex queries and indexing also made it an ideal choice for our highly relational database structure.

### 3.6 Frontend

We are using React JS with webpack package bundler for our frontend application. React is currently the most popular library for frontend applications. Users create and publish several UI libraries, components for React. This makes it so much easier to make applications smooth and functional.

### 3.7 Mobile

We are using React Native as the mobile framework, and we utilize Expo to simplify the development and build process. Both of these are widely regarded as very dependable options by the community, and it makes perfect sense for us to use this stack.

### 3.8 Cloud and Deployment

We used Docker containers which are deployed on Google Cloud Platform (GCP) VM instances because of ease of stable version management, CI/CD processes and quality of these tools.

# 6 Individual Contributions
## [Yekta Ercul](https://github.com/bounswe/bounswe2024group8/wiki/Yekta-Eren-Ercul)


- Responsibilities:
I primarily worked on designing and implementing autonomous backend services, including category creation and integrity maintenance in the database, tournament scheduling with prize assignments, and GCP bucket file services. Additionally, I developed features like annotations and user-category followings, ensuring backend compliance with documentation standards.
- Main Contributions:
First I finalized the backend entity layer, and created an autonomous category initialization structure to streamline the live Categories we have to database layer [#274](https://github.com/bounswe/bounswe2024group8/issues/274).
I started by designing the Annotation Web Model structure with Oğuz Kağnıcı, followed by implementing it myself [#324](https://github.com/bounswe/bounswe2024group8/issues/324), [#276](https://github.com/bounswe/bounswe2024group8/issues/276). This ensured compliance with web annotation standards and robust functionality. I then contributed to tournament service development, including scheduling, entry scoring, and prize assignments. These features were designed with scalability, failure handling and required detailed logic for autonomous operations [#310](https://github.com/bounswe/bounswe2024group8/issues/310), [#347](https://github.com/bounswe/bounswe2024group8/issues/347).Furthermore, I implemented the GCP bucket file service, addressing a critical project need [#291](https://github.com/bounswe/bounswe2024group8/issues/291) since our whole theme is showing 3d files and for profile pictures.Finally, I developed user followings and category followings features, enabling users to follow each other and specific categories with robust backend support [#321](https://github.com/bounswe/bounswe2024group8/issues/321), [#333](https://github.com/bounswe/bounswe2024group8/issues/333). To enhance developer experience, I set up Swagger for backend API documentation [#377](https://github.com/bounswe/bounswe2024group8/issues/377). Finally I wrote unit tests for TournamentService [#389](https://github.com/bounswe/bounswe2024group8/issues/389)

- API Contributions:
I have written the annotation web model endpoints and whole structure according to the documents. To implement these endpoints I have implemented these layers: Controller -> to expose the endpoint, Service -> Actual implementation of the endpoint, Repository and Model -> Needed database model and repository methods that are gonna be used in service layer. These endpoints are: add annotation, get annotations (of a post or comment) , get annotation by id.
Here is an example request and response of get annotations:

Rq: {{baseURL}}/api/v1/annotations/get?postId=1

Rs: 

```
[
    {
        "id": "http://localhost:8080/api/v1/annotations/1",
        "type": "Annotation",
        "bodyValue": "This is an annotation comment.",
        "creator": {
            "id": "http://localhost:8080/api/v1/users/4",
            "type": "Person",
            "nickname": "yektaercul"
        },
        "created": "2024-11-29T13:21:02.092+00:00",
        "target": {
            "source": "http://localhost:8080/api/v1/posts/1",
            "selector": {
                "type": "TextPositionSelector",
                "start": 2,
                "end": 15
            }
        },
        "@context": "http://www.w3.org/ns/anno.jsonld"
    }
]
```
Other endpoints with service, controller and repository layers I have implemented are these:

in /api/v1/users:

POST /follow, DELETE /unfollow, GET /followers/{userId}, GET /following/{userId}, POST /profile-picture/upload

in /api/v1/tournaments:

GET /leaderboard/{categoryId}, GET /category/{categoryId}

in /api/v1/categories:
GET /get/{id}, POST /follow/{id}, DELETE /unfollow/{id}

To access all of the documentations of the api endpoints I have created a swagger. Here is the [link](http://34.32.44.43:8080/swagger-ui/index.html)

- Code-related significant issues:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Implement Annotation Web Model	| [#324](https://github.com/bounswe/bounswe2024group8/issues/324), [#276](https://github.com/bounswe/bounswe2024group8/issues/276)	| [#326](https://github.com/bounswe/bounswe2024group8/pull/326)
| Category Initialization Structure |	[#274](https://github.com/bounswe/bounswe2024group8/issues/274)	| [#267](https://github.com/bounswe/bounswe2024group8/pull/267)
| Implement Tournament Service	| [#310](https://github.com/bounswe/bounswe2024group8/issues/310), [#308](https://github.com/bounswe/bounswe2024group8/issues/308)	| [#309](https://github.com/bounswe/bounswe2024group8/pull/309)
| Implement GCP Bucket File Service	|[#291](https://github.com/bounswe/bounswe2024group8/issues/291)	|[#290](https://github.com/bounswe/bounswe2024group8/pull/290)
| Implement User Followings	|[#321](https://github.com/bounswe/bounswe2024group8/issues/321)	| [#309](https://github.com/bounswe/bounswe2024group8/pull/309)
|Implement Category Followings |	[#333](https://github.com/bounswe/bounswe2024group8/issues/333)	| [#336](https://github.com/bounswe/bounswe2024group8/pull/336)
| Implement Tournament Prize Assignments	| [#347](https://github.com/bounswe/bounswe2024group8/issues/347)	| [#348](https://github.com/bounswe/bounswe2024group8/pull/348)
|Set Up Swagger| 	[#377](https://github.com/bounswe/bounswe2024group8/issues/377)	| [#376](https://github.com/bounswe/bounswe2024group8/pull/376)
| Refactor category service methods | | [#281](https://github.com/bounswe/bounswe2024group8/pull/281)
| Refactor post service methods | | [#282](https://github.com/bounswe/bounswe2024group8/pull/282)
| Refactor create post endpoint | | [#306](https://github.com/bounswe/bounswe2024group8/pull/306)

- Management-related significant issues:

| Summary | Issue |
| :-----: | :---: |
| Collaborated on Annotation Design	| [#324](https://github.com/bounswe/bounswe2024group8/issues/324)
| Managed and finalized tournament logic|	[#310](https://github.com/bounswe/bounswe2024group8/issues/310)
| Designed category and all db entity structures	|[#274](https://github.com/bounswe/bounswe2024group8/issues/274)
  

- Pull Requests:
Additional to those prs I have mentioned above I have created and reviewed, these are the pr's I have reviewed and directly merged:
[#293](https://github.com/bounswe/bounswe2024group8/pull/293), [#320](https://github.com/bounswe/bounswe2024group8/pull/320), [#344](https://github.com/bounswe/bounswe2024group8/pull/344), [#346](https://github.com/bounswe/bounswe2024group8/pull/346) , [#386](https://github.com/bounswe/bounswe2024group8/pull/386). And made suggestions to refactor or fix the issues related to these prs:
[#312](https://github.com/bounswe/bounswe2024group8/pull/312) , [#332](https://github.com/bounswe/bounswe2024group8/pull/332) . I have come accross some merges with conflicts and handled them by using github's compare interface and resolved them by hand.

- Additional Information:
I have participated in all meetings.

## [Eren Donmez](https://github.com/bounswe/bounswe2024group8/wiki/Eren-Donmez)

- Responsibilities:
As part of the mobile team, I was mainly responsible for implementing features as specified in the requirements document, and implementing backend integration for the mobile app.


- Main Contributions:
After the first customer milestone, I implemented a post creation screen for the mobile app, as part of Lab 6 ([#288](https://github.com/bounswe/bounswe2024group8/issues/288)). During Lab 7, as part of UI/UX improvements, I implemented a return to login button to the register screen ([#318](https://github.com/bounswe/bounswe2024group8/issues/318)). I implemented the profile screen, showing some details about the user and their last posts ([#319](https://github.com/bounswe/bounswe2024group8/issues/319), [#372](https://github.com/bounswe/bounswe2024group8/issues/372)). I connected the feed page that was prepared before the first customer milestone to the backend ([#351](https://github.com/bounswe/bounswe2024group8/issues/351)). I implemented the follow, comment, like/dislike, and 3D model file upload/download features and connected them to their respective endpoints in the backend([#354](https://github.com/bounswe/bounswe2024group8/issues/354), [#357](https://github.com/bounswe/bounswe2024group8/issues/357), [#367](https://github.com/bounswe/bounswe2024group8/issues/367)). Finally, I connected the category feature to the backend ([#369](https://github.com/bounswe/bounswe2024group8/issues/369)).


- API Usages:
I have used the following API endpoints in their respective environments:

| Endpoint | Issue | PR |
| :-----: | :---: | :-: |
| Create Post | [#288](https://github.com/bounswe/bounswe2024group8/issues/288) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295) |
| Get Feed | [#351](https://github.com/bounswe/bounswe2024group8/issues/351) | [#350](https://github.com/bounswe/bounswe2024group8/pull/350)|
| Get Posts in Category | [#351](https://github.com/bounswe/bounswe2024group8/issues/351) | [#350](https://github.com/bounswe/bounswe2024group8/pull/350)|
| Get Posts by User | [#372](https://github.com/bounswe/bounswe2024group8/issues/372) | [#373](https://github.com/bounswe/bounswe2024group8/pull/373)|
| Follow Category | [#354](https://github.com/bounswe/bounswe2024group8/issues/354) | [#356](https://github.com/bounswe/bounswe2024group8/pull/356)|
| Create Comment | [#357](https://github.com/bounswe/bounswe2024group8/issues/357) | [#358](https://github.com/bounswe/bounswe2024group8/pull/358)|
| React to Post | [#357](https://github.com/bounswe/bounswe2024group8/issues/357) | [#358](https://github.com/bounswe/bounswe2024group8/pull/358)|
| React to Comment | [#357](https://github.com/bounswe/bounswe2024group8/issues/357) | [#358](https://github.com/bounswe/bounswe2024group8/pull/358)|
| Get All Categories | [#369](https://github.com/bounswe/bounswe2024group8/issues/369) | [#370](https://github.com/bounswe/bounswe2024group8/pull/370)|

- Code-related significant issues:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Implement post creation | [#288](https://github.com/bounswe/bounswe2024group8/issues/288) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295) |
| Implement profile screen | [#319](https://github.com/bounswe/bounswe2024group8/issues/319), [#372](https://github.com/bounswe/bounswe2024group8/issues/372) | [#350](https://github.com/bounswe/bounswe2024group8/pull/350)|
| Connect feed page to backend | [#351](https://github.com/bounswe/bounswe2024group8/issues/351) | [#350](https://github.com/bounswe/bounswe2024group8/pull/350)|
| Implement follow category | [#354](https://github.com/bounswe/bounswe2024group8/issues/354) | [#356](https://github.com/bounswe/bounswe2024group8/pull/356)|
| Implement comments | [#357](https://github.com/bounswe/bounswe2024group8/issues/357) | [#358](https://github.com/bounswe/bounswe2024group8/pull/358)|
| Implement 3D model file upload/download | [#367](https://github.com/bounswe/bounswe2024group8/issues/367) | [#368](https://github.com/bounswe/bounswe2024group8/pull/368)|
| Connect categories page to backend | [#369](https://github.com/bounswe/bounswe2024group8/issues/369) | [#370](https://github.com/bounswe/bounswe2024group8/pull/370)|


- Pull Requests:
I have participated in the following pull requests: [#295](https://github.com/bounswe/bounswe2024group8/pull/295), [#330](https://github.com/bounswe/bounswe2024group8/pull/330), [#350](https://github.com/bounswe/bounswe2024group8/pull/350),
[#356](https://github.com/bounswe/bounswe2024group8/pull/356),
[#358](https://github.com/bounswe/bounswe2024group8/pull/358), [#370](https://github.com/bounswe/bounswe2024group8/pull/370), [#373](https://github.com/bounswe/bounswe2024group8/pull/373). The contents of each PR are summarized in the tables above.

## [Ersel Çanakçılı](https://github.com/bounswe/bounswe2024group8/wiki/Ersel-%C3%87anak%C3%A7%C4%B1l%C4%B1)

- Responsibilities: 
I was responsible for creating post components, creating separate post pages, implementing comment feature and implementing like, dislike and bookmark interactions of both posts and comments. Also I was responsible for connecting these features to corresponding backend endpoints.

- Main Contributions: 
First, we implemented a separate page for each post to enable users to see much more information about a specific post [#287](https://github.com/bounswe/bounswe2024group8/issues/287).Then, with Deniz we divided the feed into tabs to prevent users from becoming addicted [#298](https://github.com/bounswe/bounswe2024group8/issues/298). Then we continued to update our create post feature by adding select menu for choosing category and tags while creating a post [#322](https://github.com/bounswe/bounswe2024group8/issues/322). After implementing these, I switched to my part which is implementing remaining features of post page and implementing comments. I added profile picture of user, username, category info etc. to the post page [#262](https://github.com/bounswe/bounswe2024group8/issues/262). Then, I implemented commenting feature by adding comment box and comments container [#258](https://github.com/bounswe/bounswe2024group8/issues/258). Finally I connected these parts to corresponding backend endpoints [#364](https://github.com/bounswe/bounswe2024group8/issues/364) and [#365](https://github.com/bounswe/bounswe2024group8/issues/365).

- API Contributions:
We used Axios to connect our frontend components to the corresponding backend endpoints. Specifically, I implemented the connection for interaction buttons (like, dislike, and bookmark), as well as for adding comments and fetching them from the backend API.

| Endpoint | Issue/Commit/PR | 
| :-----: | :---: |
|Connect Post|[#365](https://github.com/bounswe/bounswe2024group8/issues/365)|
|Add Comment|[#364](https://github.com/bounswe/bounswe2024group8/issues/364)|
|Fetch Comments|[#364](https://github.com/bounswe/bounswe2024group8/issues/364)|
|Like,Dislike,Bookmark|[#364](https://github.com/bounswe/bounswe2024group8/issues/364) and [#365](https://github.com/bounswe/bounswe2024group8/issues/365)|

   
- Code-related significant issues:

| Summary | Issue | 
| :-----: | :---: |
|Implement Post Page|[#287](https://github.com/bounswe/bounswe2024group8/issues/287)|
|Implement Feed Tabs|[#298](https://github.com/bounswe/bounswe2024group8/issues/298)|
|Complete Create Post|[#364](https://github.com/bounswe/bounswe2024group8/issues/322)|
|Connect Posts to Backend|[#364](https://github.com/bounswe/bounswe2024group8/issues/364)|
|Connect Comments to Backend|[#365](https://github.com/bounswe/bounswe2024group8/issues/365)|

   

- Management-related significant issues:

| Summary | Issue|
| :-----: | :---: |
|Update Ram|[#395](https://github.com/bounswe/bounswe2024group8/issues/2395)|
  

- Pull Requests:

| Summary | PR |
| :-----: | :---: |
|Comments Implemented|[#313](https://github.com/bounswe/bounswe2024group8/pull/313)|
|Create Post Feature Completed|[#323](https://github.com/bounswe/bounswe2024group8/pull/323)|
|Backend Connection of Posts and Comments|[#353](https://github.com/bounswe/bounswe2024group8/pull/353)|
|Post and Comments Completed|[#359](https://github.com/bounswe/bounswe2024group8/pull/359)|
|Post Like Dislike Fix|[#363](https://github.com/bounswe/bounswe2024group8/pull/363)|
  

- Additional Information:
I attended almost all meetings and labs. Also, I reviewed my teammates' code and work whenever needed.
   

## [Oğuz Kağnıcı](https://github.com/bounswe/bounswe2024group8/wiki/Oğuz-Kağnıcı)

- Responsibilities:
I was mainly working on user-post interaction features for backend, including reactions, comments, search, achievements.


- Main Contributions:
I have spent most of my time doing development and implementing core features in backend. After the first customer milestone, I have started by finalizing Wikidata queries for semantic search and incorporating it to the post search function. [#307](https://github.com/bounswe/bounswe2024group8/issues/307) Then, I have implemented comment feature that allows users to interact with the existing posts. [#270](https://github.com/bounswe/bounswe2024group8/issues/270) Afterwards, I have also implemented reactions (like, dislike, bookmark), which was a tedious experience, as it was heavily dependent on post and comment features and therefore required careful version control management [#269](https://github.com/bounswe/bounswe2024group8/issues/269). I have also done several documentation work in Labs. For instance, I have written one of the user stories representing several UX decisions [#296](https://github.com/bounswe/bounswe2024group8/issues/296). Regarding Labs, I have also managed our branch and version control structure to be able to create desired deliverables [#315](https://github.com/bounswe/bounswe2024group8/issues/315). Next, I have implemented the user achievement feature, which allows users to earn points based on their activities on our app and fixed minor bugs before completing our deliverable [#343](https://github.com/bounswe/bounswe2024group8/issues/343), [#349](https://github.com/bounswe/bounswe2024group8/issues/349), [#361](https://github.com/bounswe/bounswe2024group8/issues/361), [#362](https://github.com/bounswe/bounswe2024group8/issues/362). Then, I have implemented unit tests for post and user services. Finally, I have decided which categories to include and also prepared the scenario for the customer milestone demo.

- API Contributions:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Implement Comments | [#270](https://github.com/bounswe/bounswe2024group8/issues/270) | [#273](https://github.com/bounswe/bounswe2024group8/pull/273) |
| Implement Reactions | [#269](https://github.com/bounswe/bounswe2024group8/issues/269) | [#293](https://github.com/bounswe/bounswe2024group8/pull/293)|
| Implement Achievements | [#343](https://github.com/bounswe/bounswe2024group8/issues/343) | [#344](https://github.com/bounswe/bounswe2024group8/pull/344)|
| Implement Post Retrieval Endpoints | [#307](https://github.com/bounswe/bounswe2024group8/issues/307) | [#320](https://github.com/bounswe/bounswe2024group8/pull/320)|

As the table suggests, I have worked on creating several endpoints regarding comments, reactions, achievements and post retrieval.

in /api/v1/achievements:

GET /, GET /user/{userId}

in /api/v1/comments:

GET /post/{postId}

in /api/v1/posts:

GET /, GET /new/{id}, POST /{postId}/react, POST /comment, POST /comment/{commentId}/react, GET /feed, GET /category/{categoryId}/visual, GET /category/{categoryId}/nonvisual, GET /user/{userId}, GET /user/{userId}/reacted, GET /user/{userId}/bookmarked

in /api/v1/users:

PUT /{userId}/change-password


Example Request & Response

Req:
```
{{deployedURL}}/api/v1/posts?param=figure
```


Resp:

```
[
    {
        "postId": 3,
        "text": "here is the figureeee",
        "user": {
            "id": 3,
            "email": "oguz5@gmail.com",
            "password": "$2a$10$NRq3JBNd7brwikGzBat3veSCBP1Fx3Q/rTvScDTWX5kLwxHj4Z/.G",
            "nickName": "oguz5",
            "profilePictureUrl": null,
            "role": "USER",
            "experience": 20,
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "authorities": [
                {
                    "authority": "USER"
                }
            ],
            "username": "oguz5@gmail.com"
        },
        "title": "my new workkkk",
        "likes": 1,
        "dislikes": 0,
        "comments": 0,
        "categoryId": 1,
        "isVisualPost": false,
        "fileUrl": null,
        "challengedPostId": null,
        "tags": [],
        "createdAt": "2024-11-29T18:47:02.318+00:00",
        "reactionId": 2,
        "reactionType": "LIKE",
        "bookmark": false
    },
    {
        "postId": 2,
        "text": "here is the figure",
        "user": {
            "id": 1,
            "email": "oguz3@gmail.com",
            "password": "$2a$10$UMPBpNi4LuUoGAa5.JPhfuYy0aPnTKBRfyInRbf3ZZqcljjD0z2JG",
            "nickName": "oguz3",
            "profilePictureUrl": null,
            "role": "USER",
            "experience": 30,
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "authorities": [
                {
                    "authority": "USER"
                }
            ],
            "username": "oguz3@gmail.com"
        },
        "title": "my new work",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "categoryId": 1,
        "isVisualPost": false,
        "fileUrl": null,
        "challengedPostId": null,
        "tags": [],
        "createdAt": "2024-11-24T09:26:34.181+00:00",
        "reactionId": -1,
        "reactionType": "NONE",
        "bookmark": false
    }
]
```


To access all of the documentations of the api endpoints our swagger can be visited. Here is the [link](http://34.32.44.43:8080/swagger-ui/index.html)




- Code-related significant issues:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Review Tournament Implementation PR | | [#309](https://github.com/bounswe/bounswe2024group8/pull/309)|
| Review User Followings Implementation PR | | [#325](https://github.com/bounswe/bounswe2024group8/pull/325)|
| Review Annotation Implementation PR | | [#326](https://github.com/bounswe/bounswe2024group8/pull/326)|
| Write unit tests for Post and User services | [#366](https://github.com/bounswe/bounswe2024group8/issues/366) | |




- Management-related significant issues:

| Summary | Issue |
| :-----: | :---: |
| Writing user story for UX | [#296](https://github.com/bounswe/bounswe2024group8/issues/296) |
| Creating&Maintaining branches for Lab 7 | [#315](https://github.com/bounswe/bounswe2024group8/issues/315) |
| Preparing scenarios for customer milestone 2 presentation | [#384](https://github.com/bounswe/bounswe2024group8/issues/384) |
| Choosing categories for the app | [#371](https://github.com/bounswe/bounswe2024group8/issues/371) |

- Pull Requests:
As mentioned above, I have reviewed the pull requests regarding tournament, user following and annotation endpoint implementations. [#309](https://github.com/bounswe/bounswe2024group8/pull/309), [#325](https://github.com/bounswe/bounswe2024group8/pull/325), [#326](https://github.com/bounswe/bounswe2024group8/pull/326) Then, I have implemented comments, reactions, achievements, post retrieval and created a pull requests. [#273](https://github.com/bounswe/bounswe2024group8/pull/273), [#293](https://github.com/bounswe/bounswe2024group8/pull/293), [#344](https://github.com/bounswe/bounswe2024group8/pull/344), [#320](https://github.com/bounswe/bounswe2024group8/pull/320).

- Additional Information:
I have also conducted a research about implementation of the web annotation model standard and participated in all meetings.


## [Onur Çerli](https://github.com/bounswe/bounswe2024group8/wiki/Onur-%C3%87erli)
- Responsibilities: 
 I was part of the mobile team and my main responsibility was implementing post creation screen, making backend integration with post creation endpoint, taking apk build and providing feedback for other features for this milestone.

- Main Contributions:
After the first customer milestone, I participated in the documentation of our selected W3C standard ([#275](https://github.com/bounswe/bounswe2024group8/issues/275)). Also, I implemented an initial post creation screen with Eren ([#288](https://github.com/bounswe/bounswe2024group8/issues/288)). Later, I updated the post creation screen design to comply with backend endpoint([#337](https://github.com/bounswe/bounswe2024group8/issues/337)) and made the backend integration as well([#338](https://github.com/bounswe/bounswe2024group8/issues/338)). Additionally, I have tested the application and reviewed the feature implementations, pull requests and issues of the mobile team. Lastly, I have taken the apk build of the application.

- API Contributions:
  | Summary | Issue | PR |
  | :-----: | :---: | :-: |
  | Backend Integration For Post Creation Screen | [#338](https://github.com/bounswe/bounswe2024group8/issues/338) | [#340](https://github.com/bounswe/bounswe2024group8/pull/340) |


- Code-related significant issues:
| Summary | Issue | PR |
  | :-----: | :---: | :-: |
  | Implement Initial Scren Design For Post Creation | [#288](https://github.com/bounswe/bounswe2024group8/issues/288) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295) |
  | Update Scren Design For Post Creation | [#337](https://github.com/bounswe/bounswe2024group8/issues/337) | [#340](https://github.com/bounswe/bounswe2024group8/pull/340) |
  | Backend Integration For Post Creation | [#338](https://github.com/bounswe/bounswe2024group8/issues/338) | [#340](https://github.com/bounswe/bounswe2024group8/pull/340) |
  
- Management-related significant issues:
| Summary | Issue |
  | :-----: | :---: |
  | Implement Initial Scren Design For Post Creation | [#275](https://github.com/bounswe/bounswe2024group8/issues/275) |
 

- Pull Requests:  
    I have participated in the following pull requests: [#295](https://github.com/bounswe/bounswe2024group8/pull/295), [#340](https://github.com/bounswe/bounswe2024group8/pull/340), [#375](https://github.com/bounswe/bounswe2024group8/pull/375), [#378](https://github.com/bounswe/bounswe2024group8/pull/378).

## [Deniz Ulaş Poyraz](https://github.com/bounswe/bounswe2024group8/wiki/Deniz-Ula%C5%9F-Poyraz)

- Responsibilities:
My main responsibilities for milestone 2 were ensuring the frontend application gets completed, completing key components (Search Results, Tournaments, Annotations) and connecting several components to our backend application (Feed, categories, annotations, create post, change profile picture, change password).

- Main Contributions:
After splitting our tasks to complete the frontend application, I was assigned to several functionality tasks. Until milestone 1, our frontend app displayed all 3D models as soon as the feed loaded. This behaviour caused our app to freeze/lag for several seconds. To fix this I made our posts render 3D models conditionally [#259](https://github.com/bounswe/bounswe2024group8/issues/259). We also didnt have the generic feed to show recommended posts, I implemented it [#263](https://github.com/bounswe/bounswe2024group8/issues/263). Our sidebar and feed were not properly working with the app categories, I made them display the current category [#264](https://github.com/bounswe/bounswe2024group8/issues/264). After that I implemented the download 3d model function [#266](https://github.com/bounswe/bounswe2024group8/issues/266). For our lab 5 pull request, I initalized our annotation logic with proper interfaces [pr277](https://github.com/bounswe/bounswe2024group8/pull/277). I then initialized the vertical menu that allows users to access several functionalities [#278](https://github.com/bounswe/bounswe2024group8/issues/278). In lab 6 Ersel and I started working on post pages [#287](https://github.com/bounswe/bounswe2024group8/issues/287) and feed tabs [#298](https://github.com/bounswe/bounswe2024group8/issues/298). We completed almost every feature that week. In lab 7 Ersel and I decided to complete the post creation component [#322](https://github.com/bounswe/bounswe2024group8/issues/322). After that I connected the component to backend [#334](https://github.com/bounswe/bounswe2024group8/issues/334). I completed the display logic of annotations [#342](https://github.com/bounswe/bounswe2024group8/issues/342) along with annotation creation dialog that lied in the vertical menu [#341](https://github.com/bounswe/bounswe2024group8/issues/341). Towards the end I completed the tournament information component and the leaderboard pages [#355](https://github.com/bounswe/bounswe2024group8/issues/355). The last day our goal was to complete our application as soon as possible, therefore as the frontend group we didn't want to open issues and waste time. Therefore, I'm going to refer to my commits for some of my contributions. I completed the challenge post function and connected to backend [(Commit)](https://github.com/bounswe/bounswe2024group8/commit/bed378c2ba880576867931c0ca49509ef242ab18). I connected change profile photo function to backend [(Commit)](https://github.com/bounswe/bounswe2024group8/commit/a0a5174c0fa3332c54bcb32c6712fb016eac93d7) and I added the achievements dialog to profile pages [(Commit)](https://github.com/bounswe/bounswe2024group8/commit/742ee81b9b9741765a6923d4b00aef4e44c6e0ff).


- API Contributions:
We used axios api to send requests to our backend server. Since our components were implemented with backend considerations, connecting them wasn't hard for us. Therefore there aren't many issues about them, I will put links to my api commits when there is no issue.

| Endpoint | Issue/Commit/PR | 
| :-----: | :---: |
| Get Feed | [Commit](https://github.com/bounswe/bounswe2024group8/commit/6ef944bee750ca4f36456d54a1ebc22c67102133) | 
| Get Tournament | [#355](https://github.com/bounswe/bounswe2024group8/issues/355) | 
| Get Tournament Entry | [#355](https://github.com/bounswe/bounswe2024group8/issues/355) | 
| Post Create Post | [#334](https://github.com/bounswe/bounswe2024group8/issues/334) | 
| Post Profile Picture | [Commit](https://github.com/bounswe/bounswe2024group8/commit/a0a5174c0fa3332c54bcb32c6712fb016eac93d7)| 
| Put Change Password | [Commit](https://github.com/bounswe/bounswe2024group8/commit/504f0806a4afe956d691cddaa761ba2e1aec52a4) | 
| Get Annotation | [#342](https://github.com/bounswe/bounswe2024group8/issues/342) | 
| Post Annotation | [#342](https://github.com/bounswe/bounswe2024group8/issues/342) | 
| Post Follow Category | [PR352](https://github.com/bounswe/bounswe2024group8/pull/352) | 
| Delete Unfollow Category | [PR352](https://github.com/bounswe/bounswe2024group8/pull/352) |

- Code-related significant issues:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Conditional rendering of 3D model files on feed | [#259](https://github.com/bounswe/bounswe2024group8/issues/259) | [PR265](https://github.com/bounswe/bounswe2024group8/pull/265) |
| Search Results Page | [#260](https://github.com/bounswe/bounswe2024group8/issues/260) | [PR339](https://github.com/bounswe/bounswe2024group8/pull/339) |
| Tournament Components | [#355](https://github.com/bounswe/bounswe2024group8/issues/355) | [PR360](https://github.com/bounswe/bounswe2024group8/pull/360) |
| Annotation For Post Bodies | [#342](https://github.com/bounswe/bounswe2024group8/issues/342) | [PR345](https://github.com/bounswe/bounswe2024group8/pull/345) |
| Complete The Vertical Menu For Posts | [#341](https://github.com/bounswe/bounswe2024group8/issues/341) | [PR283](https://github.com/bounswe/bounswe2024group8/pull/283) |
| Connecting Post Creation/Challenge Post Component To Backend | [#334](https://github.com/bounswe/bounswe2024group8/issues/334) | [PR335](https://github.com/bounswe/bounswe2024group8/pull/335) |
 | Connecting Category Follow/Unfollow To Backend | [#264](https://github.com/bounswe/bounswe2024group8/issues/264) | [PR352](https://github.com/bounswe/bounswe2024group8/pull/352) |

- Management-related significant issues:
We didn't create many issues for management, we usually set up meetings to decide on code structures, code logic and UI designs. I tried my best to communicate with every frontend member and get their opinions before moving on. And I also gave my feedback to them. 

| Summary | Issue |
| :-----: | :---: |
| Write the document for W3C Standard | [#275](https://github.com/bounswe/bounswe2024group8/issues/275) |

- Pull Requests:
Until last week, I always created new branches and made pull requests to our frontend branch. Here are all pull requests that contain my features: 
[PR265](https://github.com/bounswe/bounswe2024group8/pull/265)
[PR268](https://github.com/bounswe/bounswe2024group8/pull/268)
[PR283](https://github.com/bounswe/bounswe2024group8/pull/283)
[PR284](https://github.com/bounswe/bounswe2024group8/pull/284)
[PR305](https://github.com/bounswe/bounswe2024group8/pull/305)
[PR335](https://github.com/bounswe/bounswe2024group8/pull/335)
[PR339](https://github.com/bounswe/bounswe2024group8/pull/339)
[PR345](https://github.com/bounswe/bounswe2024group8/pull/345)
[PR352](https://github.com/bounswe/bounswe2024group8/pull/352)
[PR360](https://github.com/bounswe/bounswe2024group8/pull/360)
And here are the PRs I created to update branches:
[PR272](https://github.com/bounswe/bounswe2024group8/pull/272)
[PR285](https://github.com/bounswe/bounswe2024group8/pull/285)
[PR304](https://github.com/bounswe/bounswe2024group8/pull/304)
[PR331](https://github.com/bounswe/bounswe2024group8/pull/331)
[PR383](https://github.com/bounswe/bounswe2024group8/pull/383)
Lastly, here are the feature PRs I reviewed and merged:
[PR277](https://github.com/bounswe/bounswe2024group8/pull/277)
[PR359](https://github.com/bounswe/bounswe2024group8/pull/359)
[PR363](https://github.com/bounswe/bounswe2024group8/pull/363)
[PR374](https://github.com/bounswe/bounswe2024group8/pull/374)

## [Ali Alperen Sönmez](https://github.com/bounswe/bounswe2024group8/wiki/Ali-Alperen-S%C3%B6nmez)
- **Responsibilities:**
As a member of the mobile team, I was responsible for implementing the search screen and adding the search button to the tab navigator. Additionally, I developed the Leaderboard screen and designed the Tournament boxes for the category pages. I also contributed to the UI/UX consistency.


- **Main Contributions:**
For this milestone, I focused on aligning the mobile application's design with the frontend's UI and UX standards [#292](https://github.com/bounswe/bounswe2024group8/issues/292). Collaborating with Türker, I implemented several key updates, including replacing the "signup" button with a "create an account" button, revising the registration process by removing the first and last name fields, and reordering the input fields on the register screen [#299](https://github.com/bounswe/bounswe2024group8/issues/299) [#300](https://github.com/bounswe/bounswe2024group8/issues/300). Additionally, I revised the tab navigator by replacing the gallery and discussion buttons with search and categories options, developed the search screen, and developed the initial version of the categories screen [#301](https://github.com/bounswe/bounswe2024group8/issues/301) [#302](https://github.com/bounswe/bounswe2024group8/issues/302) [#316](https://github.com/bounswe/bounswe2024group8/issues/316) [#317](https://github.com/bounswe/bounswe2024group8/issues/317). Furthermore, I played a key role in implementing tournament features in mobile, which included designing and developing the tournament box for categories and creating the leaderboard screen [#379](https://github.com/bounswe/bounswe2024group8/issues/379) [#380](https://github.com/bounswe/bounswe2024group8/issues/380) [#381](https://github.com/bounswe/bounswe2024group8/issues/381)
[#382](https://github.com/bounswe/bounswe2024group8/issues/382).




- API Usages:
I have used the following API endpoints in their respective environments:

| Endpoint | Issue | PR |
| :-----: | :---: | :-: |
| Get Tournament | [#382](https://github.com/bounswe/bounswe2024group8/issues/382) | [#375](https://github.com/bounswe/bounswe2024group8/pull/375)|
| Get Tournament | [#380](https://github.com/bounswe/bounswe2024group8/issues/380) | [#375](https://github.com/bounswe/bounswe2024group8/pull/375)|


- **Code-related Significant Issues:**

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Implementing Tournament Box | [#379](https://github.com/bounswe/bounswe2024group8/issues/379) | [#375](https://github.com/bounswe/bounswe2024group8/pull/375)|
| Implementing Leaderboard Screen | [#381](https://github.com/bounswe/bounswe2024group8/issues/381) | [#375](https://github.com/bounswe/bounswe2024group8/pull/375)|
| Implementing Search Bar | [#316](https://github.com/bounswe/bounswe2024group8/issues/316) | [#330](https://github.com/bounswe/bounswe2024group8/pull/330)|
| Adding Search Button to Tab Navigator | [#317](https://github.com/bounswe/bounswe2024group8/issues/317) | [#330](https://github.com/bounswe/bounswe2024group8/pull/330)|
| Reorganize Signup Screen | [#299](https://github.com/bounswe/bounswe2024group8/issues/299) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295)|
| Rename Signup Button | [#300](https://github.com/bounswe/bounswe2024group8/issues/300) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295)|
| Add Categories Screen | [#301](https://github.com/bounswe/bounswe2024group8/issues/301) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295)|
| Reorganize Tab Navigator | [#302](https://github.com/bounswe/bounswe2024group8/issues/302) | [#295](https://github.com/bounswe/bounswe2024group8/pull/295)|


- **Management-related Significant Issues:**
I organized meetings to ensure alignment within the team, identify issues, and assign tasks to mobile team members.


- **Pull Requests:**
I have participated in the following pull requests: [#295](https://github.com/bounswe/bounswe2024group8/pull/295), [#327](https://github.com/bounswe/bounswe2024group8/pull/327), [#330](https://github.com/bounswe/bounswe2024group8/pull/330),
[#375](https://github.com/bounswe/bounswe2024group8/pull/375),
[#378](https://github.com/bounswe/bounswe2024group8/pull/378)


## [Mehmet Tuluyhan Sözen](https://github.com/bounswe/bounswe2024group8/wiki/Mehmet-Tuluyhan-Sozen)

- Responsibilities: My focus in the second milestone continued to revolve around implementing core backend services, ensuring code, reviewing teammates issues and pull requests, and supporting the team’s documentation efforts. My responsibilities included:

Adapting and extending the backend architecture.
Implementing backend services such as post management and category handling.
Writing and refining user stories to ensure that features met functional requirements.
Contributing to unit testing to ensure the reliability of the system.
Documenting key processes and architectural decisions.
Summarizing customer feedback and ensuring alignment with the team's development approach.

- Main Contributions: In the second milestone, I focused on implementing key backend functionalities, improving system quality through documentation and testing, and actively reviewing teammates' work. I participated in the Backend Architecture Review meeting [#271](https://github.com/bounswe/bounswe2024group8/issues/271), where we discussed the architecture and made adjustments to align with our design goals. I worked on the implementation of the category functionality across all layers [#279](https://github.com/bounswe/bounswe2024group8/issues/279) and implment the Post endpoint, which is central to our post management system [#280](https://github.com/bounswe/bounswe2024group8/issues/280). I also wrote the user story, ensuring it accurately captured the requirements and use cases for smoother development [#294](https://github.com/bounswe/bounswe2024group8/issues/294). I refined the post creation functionality, addressing key feedback to enhance the user experience [#311](https://github.com/bounswe/bounswe2024group8/issues/311). I contributed to the documentation of the Software Quality Plan, outlining our approach to meet testing standards[#328](https://github.com/bounswe/bounswe2024group8/issues/328). I wrote and implemented unit tests for the Comment and File Services, enhancing code reliability and coverage [#388](https://github.com/bounswe/bounswe2024group8/issues/388). Additionally, I summarized customer feedback and reflections, ensuring our development was aligned with user needs [#391](https://github.com/bounswe/bounswe2024group8/issues/391). I also reviewed teammates' issues and pull requests, providing feedback to ensure alignment with project goals and maintaining high code quality across the team.



- API Contributions:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Implement Category| [#279](https://github.com/bounswe/bounswe2024group8/issues/271) | [#281](https://github.com/bounswe/bounswe2024group8/pull/281) |
| Implement Post| [#280](https://github.com/bounswe/bounswe2024group8/issues/279) | [#282](https://github.com/bounswe/bounswe2024group8/pull/282)|
| Refine Post Create Endpoint | [#311](https://github.com/bounswe/bounswe2024group8/issues/311) | [#310](https://github.com/bounswe/bounswe2024group8/pull/344) [#312](https://github.com/bounswe/bounswe2024group8/pull/344)|



- Code-related significant issues:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Review Implement GCP Bucket File service PR |[#291](https://github.com/bounswe/bounswe2024group8/issues/291) | |
| Review Unit tests for Tournament Service PR | [#390](https://github.com/bounswe/bounswe2024group8/issues/390) | [389](https://github.com/bounswe/bounswe2024group8/pull/389)|
| Write unit tests for Comment services | [#388](https://github.com/bounswe/bounswe2024group8/issues/388) | [#386](https://github.com/bounswe/bounswe2024group8/pull/386) |
| Write unit tests for File services | [#388](https://github.com/bounswe/bounswe2024group8/issues/388) | [#387](https://github.com/bounswe/bounswe2024group8/issues/387) | 




- Management and documentation related significant issues:

| Summary | Issue |
| :-----: | :---: |
| Backend Architecture Review for Milestone | [#271](https://github.com/bounswe/bounswe2024group8/issues/271) |
| Creating User Stories | [#294](https://github.com/bounswe/bounswe2024group8/issues/294) |
| Documentation of Software Quality Plan | [#328](https://github.com/bounswe/bounswe2024group8/issues/328) |
| Summary of Customer Feedback and Reflections | [#391](https://github.com/bounswe/bounswe2024group8/issues/391) |


- Additional Information:
I have also reviewed teammates issues, contributed researches about implementation of the web annotation model standard and participated in all meetings except for one due to illness.



## [Huseyin Turker Erdem](https://github.com/bounswe/bounswe2024group8/wiki/Huseyin-Turker-Erdem)
- Responsibilities: In this milestone, my main responsibilities were creating profile and search results pages, and fixes in the deployment process. In addition, I was expected to review some commits and pull requests that are created by my teammates and preparing meeting notes and lab reports (lab PR documents).
  
- Main Contributions: I created another GCP deployment structure, creating necessary network definitions and vm instances, preapring file system as buckets in GCP cloud storage, and revised docker image creation steps. I also did prepare profile page in the frontend.

- API Contributions:

| Summary | Issue | PR |
| :-----: | :---: | :-: |
| Profile Page| [#261](https://github.com/bounswe/bounswe2024group8/issues/261) | [#374](https://github.com/bounswe/bounswe2024group8/pull/374) |


- Management-related significant issues:

| Summary | Issue |
| :-----: | :---: |
| GCP Fixes | No issue for this task |
| Lab 6 Meeting Notes | [#289](https://github.com/bounswe/bounswe2024group8/issues/289) |
| UI/UX consistency check | [#292](https://github.com/bounswe/bounswe2024group8/issues/292) |

