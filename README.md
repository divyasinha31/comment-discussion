# 8-tile-puzzle
Assignment for LightMetrics

## Plan
1. Create interfaces required for the comment section.
2. Create dummy data.
3. Create template in HTML and read the dummy data.
4. With the dummy data, add CSS wherever required for beautification and usablity.
5. Set up online storage with https://jsonbin.io/.
6. Integrate Bins API (https://jsonbin.io/api-reference/bins/get-started) with the application.

## Hosting application with Github pages
1. Build application in AOT.
2. Creating repository with the format "<username>.github.io".
3. Push the build files in "dist" folder to the created repo.

---

## Function details
1. constructor()
    > Creating necessary dependency injections.
    >
    > Initializing the form.
    >
    > Initializing the heading on the left section.


2. ngOnInit()
    > Angular lifecycle hook called at the time of component initialization.
    >
    > Calling function to get list of comments.


3. getComments()
    > Calling service method to get comments.
    >
    > Assigning data to the comments array.


4. resetViewReplies()
    > Resetting the view replies for each comment to false.
    >
    > For every update in the comments array, we need to reset the show reply option of each comment to false for keeping the view on comments section to show the main comments only.


5. addNewComment()
    > Creating constant variable which holds the value of the most recent comment to be posted by the user.
    >
    > Pushing the new value to the existing array.
    >
    > Resetting all the view reply option of each comment to false.
    >
    > Sending this updated list to the service to update the list online.
    >
    > Resetting the form values along with index values only if response is success.
    >
    > In case of error, the last value in comments array holds the new comment so it is popped out of array.


6. updateComment()
    > Creating constant variable which holds the value of the updated comment.
    >
    > Replacing the comment at the current editing index value with the updated value.
    >
    > Resetting all the view reply option of each comment to false.
    >
    > Sending this updated list to the service to update the list online.
    >
    > Resetting the form values along with index values only if response is success.


7. addReply()
    > Creating constant variable which holds the value of the reply.
    >
    > Pushing this reply to the replies array of the comment at the current replying index.
    >
    > Resetting all the view reply option of each comment to false.
    >
    > Sending this updated list to the service to update the list online.
    >
    > Resetting the form values along with index values only if response is success.
    >
    > In case of error, the last value in the replies array of comment at current replying index holds the latest reply so it is popped out of array.


8. resetValues()
    > Resetting the heading text and button text.
    >
    > Resetting the form.
    >
    > Resetting the edit index and reply index.


9. openReply()
    > Function called with the index to set the current reply index.
    >
    > Update the heading and button text to appropriate string value.


10. editComment()
    > Function called with the index and comment to set the current edit index and the form fields.
    >
    > Update the heading and button text to appropriate string value.


11. post()
    > If value at current reply index is present then the user action is a reply to a comment so, addResply() is called.
    >
    > Otherwise if value at current edit index is present then the user action is editting an existing comment so, updateComment() is called.
    >
    > If neither indices don't have value then the user action is posting a new comment so, addNewComment() is called.


---

## File Details
1. app-constants.ts
    > Includes all the constants used in the application to avoid hard coded string values.
    >
    > These constants are exported at a single point.


2. model.ts
    > Includes all the interfaces used in the application.
    >
    > These interfaces are exported at a single point.