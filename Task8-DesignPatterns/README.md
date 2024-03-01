# TASK 8 - DESIGN PATTERN

## Task & Assignment

### For this exercise, our goal is to create a telephone package. The telephone class should expose 3 different methods to add, remove and dial numbers using the observer pattern

## Implementation

### This code has the Telephone class as the Subject class, this class has three methods which are `addPhoneNumber`, `removePhoneNumber` and `notify`

### The `addPhoneNumber` method implements a regex expression (I just added it for fun) that validates the phone number according to Nigeria phone number patterns and only accepts valid numbers that are added to the contact or returns a message indicating wrong phone number

### The `removePhoneNumber` method deletes a number only if it is in the contacts else it shows an error indicating the phone number isn't in the contact

### The `notify` method prints and dials the phonenumber by creating a new `Observer` class calling the corresponding functions if the number is in the contact list (as indicated in the question)
