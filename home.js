document.querySelectorAll( '.clickable').forEach( clickable => {
  clickable.addEventListener('click', ( ) => {
    const targetId = clickable.getAttribute('data-target');
    const targetDiv = document.getElementById( targetId );
    targetDiv.style.display = targetDiv.style.display === 'block' ? 'none' : 'block';
    // targetDiv.style.visibility = targetDiv.style.visibility === 'visible' ? 'hidden' : 'visible';

  });
});


const projectFilters = document.querySelectorAll( '.filter-menu input[name="filter"]' );
const projectDivs = document.querySelectorAll( '.image-container .project-cover' );


projectDivs.forEach(projectDiv => {
  projectDiv.addEventListener('click', () => {
    projectDiv.classList.toggle('expanded');

    // Get the video inside the project cover
    const video = projectDiv.querySelector('#myVideo');

    // Toggle video play/pause based on 'expanded' class
    if (projectDiv.classList.contains('expanded')) {
      // When expanded, play the video
      video.play();
    } else {
      // When collapsed, stop the video 
      video.pause();
      video.currentTime = 0; // Reset video to the start
    }
  });
});



const updateFilter = event => {
  const filterValue = event.currentTarget.value;

  projectDivs.forEach( projectDiv => {
    const highlightProject = projectDiv.classList.contains( filterValue );

    projectDiv.classList.toggle( 'highlighted', highlightProject );
    projectDiv.classList.remove( 'expanded' );
  } );
}

projectFilters.forEach( projectFilter => {
  const filterValue = projectFilter.value;

  let projectsForFilter;
  if ( filterValue == 'show-all' ) {
    projectsForFilter = document.querySelectorAll( `.image-container .project-cover` );
  } else {
    projectsForFilter = document.querySelectorAll( `.image-container .project-cover.${ filterValue }` );
  }

  const filterCount = projectsForFilter.length;
  const filterCountOutput = projectFilter.nextElementSibling.nextElementSibling;
  filterCountOutput.innerHTML = `[${ filterCount}]`;

  projectFilter.addEventListener( 'change', updateFilter );
} );

// 
const slideshows = document.querySelectorAll( '.slideshow' );
slideshows.forEach( slideshow => {
  const parent = slideshow.parentNode;
  const counter = parent.querySelector( '.caption.preview-count' );

  const images = slideshow.querySelectorAll( 'img, video' );
  console.log( slideshow, counter, images.length);

  counter.innerText = `1/${ images.length }`;

  
  slideshow.addEventListener( 'scroll', event => {
    const scrollPercentage = slideshow.scrollLeft / ( ( images.length - 1 ) * slideshow.offsetWidth );
    //console.log( scrollPercentage )
    const imageIndex = Math.min( 1 + Math.floor( scrollPercentage * images.length ), images.length );
    //console.log( imageIndex, images.length );

    counter.innerText = `${ imageIndex }/${ images.length }`;

  } );
} );


