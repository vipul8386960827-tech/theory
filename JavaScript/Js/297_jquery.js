/* 297_jquery.js

=====================================================
jQuery in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "jQuery is a fast, small, and feature-rich JavaScript library that simplifies 
  HTML DOM traversal, manipulation, event handling, animation, and Ajax."

Key Points to Highlight:
- Provides cross-browser compatibility
- Simplifies selectors with CSS-like syntax
- Easy event handling and DOM manipulation
- Supports Ajax requests with simple methods
- Lightweight and widely used in legacy projects

Examples:

// Select element and change text
$('#myDiv').text('Hello World');

// Add click event
$('#myButton').on('click', function() {
  alert('Button clicked!');
});

// Ajax request
$.ajax({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: function(data) {
    console.log('Data received:', data);
  },
  error: function(err) {
    console.error('Error:', err);
  }
});

Code Explanation:
- $ is shorthand for jQuery
- Select elements with CSS-like selectors
- on() attaches event listeners
- ajax() handles HTTP requests with simplified syntax

Real-Life Analogy:
- jQuery is like a toolkit that simplifies complex DOM tasks and event handling 
  that would otherwise require verbose JavaScript code

Example / Usage:

// Hide element with animation
$('#box').fadeOut(500);

// Toggle class on click
$('#toggleBtn').click(function() {
  $('#menu').toggleClass('active');
});

Follow-Up Interview Questions:
- Q1: Difference between jQuery and vanilla JS?
  A1: jQuery simplifies syntax, provides cross-browser support, and adds utilities; 
      vanilla JS is native and faster for modern browsers.
- Q2: Is jQuery still necessary?
  A2: Less necessary with modern browsers supporting querySelector, fetch, etc.
- Q3: Can jQuery work with Ajax?
  A3: Yes, via $.ajax(), $.get(), $.post() methods.
- Q4: How to select elements by ID and class in jQuery?
  A4: By ID: $('#id'), by class: $('.class')
- Q5: How to attach multiple event listeners?
  A5: Use .on('click mouseenter', function() {...})
*/
