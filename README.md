# MoneyClip

## Task List (On Top)
-> Create bar chart summarizing data by month<br>
  + Created chart and bars displaying current and previous 6 months<br>
  + Added some functions to Dashboard in order to process data before sending on as props to chart itself<br>
  - Add y axis (scaled) and x axis to chart<br>
  - Maybe some extra styling so it looks cleanish<br>
- Research using D3 charts in react-native.  Create pie chart to display on Home<br>
- Add field validation/sanitization on user input in Form<br>

### Home
- Think of different things to use the Home screen for as it seems like the Dashboard page will copy this same existing design
- Move 'Create Transaction' button to drawer navigation

### Dashboard
- Pie Chart using D3
- Paging behavior to scroll between dashboards in 'mini' view
- Styling for 'normal' view to display charts in scrollable list
- Touching any graphic on any chart will update a list of records to display underneath pertaining to the data summarized by the graphic that was selected.

### Transaction List
- TransactionList includes a collapsable header which displays summary data
- Item sort functionality
- Clicking on a record in the transaction list brings the user to an expanded view of that transaction
- User should be able to edit and delete existing transactions

### Transaction Form
- Styling is kinda shit -- doesnm't need to be a whole lot more but I think we could do better
- User input validation so we don't get weird results in database
  - Include alerts so that the user knows they made a mistake
- Fix issue where state already exists when form page is opened for a second time.
- Consider adding 'tag' recommendations to your users
- Reformat data insert functions to use proper lowercase fieldname conventions

## Other Notes
- [solved] Finally got Context working -- just need to figure out how to get my MainStack to rerender itself when new props come down. seems like it should be simple but nothing about this project has been as simple as i thought it would be.
- Got Navigation to a pretty good spot -- One navigator for normal app navigation, centered around the home screen, the other navigator to allow me to create different screens to use as modals (i.e. new transaction form)
  -  Both navigators seem to work well and also plahy nice together
- Continue Building
  - Need to work on that form next, would be nice if we could populate our database using our 'tests'
    - Got form data sending to and from a state like object using hooks -- need to see if I can install a date picker
    - Other bells and whistles that would be nice for the form are things like:
       - styling for the input boxes,
       - something like tags -- maybe another package to do styling
    - NEXT ON TOP: Send data back to firestore

## Things that would be nice
- [solved] Figure out an efficient way to 'share' the list of transactions between all components
   - At some point, we will want to add a filter, which means that the ability to manipulate data at the upper-most level will be important
     - This is the reason I started looking into using Context, though if that doesn't make sense, perhaps just a stateful Home and a smart-ish NavigationCenter will suffice.
  - CURRENT WORKING SOLUTION
      - used hooks in app.js to render navCenter ONLY if data exists
      - passing the data to each component as initialProps
      - Passing route object from Home to subcomponent in order to continue using the same address to pull my data in subcomps
- Still need to do some major research into bringing charts onto react native -- this may be make or break for the app so should spend a good amount of time on this.
