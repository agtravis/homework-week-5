# Day Planner

## How to use this app

![choose-date](https://github.com/agtravis/homework-week-5/blob/master/assets/images/choose-date.PNG)

On load the planner will load the current date, and as with everything in this app, the time zone is local to wherever the user is.

The date is displayed at the top, in U.S. MM/DD/YYYY format.

The date can be changed to consecutive days either by clicking on the Previous or Next buttons, or by using the left and right arrow keys on the user's keyboard. Assuming plans have been made, plan changes from day to day will be visible in the time slots.

A date can also be chosen from the selection boxes. The year will always default to the current year, but the month and date will be set to January 1st. Choosing the date from the selection boxes means the user is unable to enter a false date, or a date in the wrong format, and the days of the month is calculated when the user changes month. Leap years are accounted for, and the fact that leap years do not occur at the turn of centuries unless that century is divisible by 400 (i.e. 1900 and 2100 are not leap years, but 2000 is).

![time-slot](https://github.com/agtravis/homework-week-5/blob/master/assets/images/time-slot.PNG)

![plan-input](https://github.com/agtravis/homework-week-5/blob/master/assets/images/plan-input.PNG)

The user makes plans by clicking with the mouse on a time period, which will change color as the cursor hovers over it. A dialogue box pops up asking for specifics, and if there are already plans in the box, this text will be displayed, and the cursor jumps to the input field. The user can type what they wish, and either push the return carriage key (enter) while the field still has the focus, or click the submit button, and the plans will be stored in local storage. If the user clicks cancel all plans, the field empties, and the user can also close the dialogue pop-up without making any changes by clicking the 'X'.

All plans are stored with a custom key for that date in the format YYYYMMDD, and each time slot is a property of that stringified object. If a date has no plans, a key does not exist. Keys are only created for the first time a user makes a plan for that date.

Throughout the day, the time slots will change color as they are either in the future, are the current period, or in the past. This functionality is repeated on past or future days deliberatley to enable the user to directly compare with ease.

This app is written using Bootstrap (purely for responsive ease), jQuery, and Moment.JS.

## App creation

I first wrote this app using plain JavaScript, and not styles. This can be seen in the file `test.html`. Once I had the functionality working, I started writing it again, but converting to jQuery as I went. Once I had it systematically functional in jQuery, any further edits were made in jQuery.

I knew that I wanted this app to be able to store multiple days worth of plans, and so I constructed it from the beginning with this in mind, creating a key based on output from Moment.js.

If I were to write this app again, however, I would try to exclusively use JavaScript, and I would probably try to use JavaScript's own native `Date` object functionality. I do see the benefit to Moment.js, and I don't know how successful that attempt would be until I try it. This would be so I could not depend on the exterior libraries, and also so that I could write the app offline, without downloading the whole library first (I wrote some of this app on a plane, not having internet access).

I would also like to incorporate using only one key, and that key would have properties for each date which would in turn have an array of objects representing each time slot. I tried to get that system up and running but was unable to successfully implement it. I also do not know if that would be more efficient than having multiple objects (stringified) in local storage, or less efficient.

I have tried to keep my code as `DRY` as possible. One area I could probably improve this is generating my time slots with JavaScript or jQuery, as opposed to having them hard coded with ID's in the HTML.

I have deliberately left one comment in my code - this is to indicate a line (commented out) that sets the hour of the day to always be a time period that will show all 3 colors applied to different time slots. This is so that I can edit after 5pm or before 9am and still see that the code is functioning correctly.

I have kept the JavaScript for calculating the days in the month in a separate file to the main JavaScript to avoid confusion while writing additional code for different functionality.
