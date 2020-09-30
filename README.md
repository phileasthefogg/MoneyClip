# MoneyClip

## On top
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
