$('#testimonials_gallery ul')
.after('<a href="#" id="testimonials_gallery_prev"></a>')
.after('<a href="#" id="testimonials_gallery_next"></a>')
.cycle({
  'pause': 1,
  'timeout': 8000,
  'prev': '#testimonials_gallery_prev',
  'next': '#testimonials_gallery_next'
});
