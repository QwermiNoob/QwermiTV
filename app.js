const animation_elements = document.querySelectorAll('.animate-on-scroll, .more-delay, .animate-on-scroll-delayed, .animate-top-down');

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
		} else {
			entry.target.classList.remove('animate');
		}
	})
}, {
	threshold: 0.5
});

for (let i = 0; i < animation_elements.length; i++) {
	const el = animation_elements[i];

	observer.observe(el);
}

// Video data: Add more videos here if needed
const videos = [
	{ title: "Mord ist nichts für junge Jungs", thumbnail: "images/video1.png", url: "https://youtu.be/Djic08UGMAE?si=oRbCKyF8DZtn8zCt" },
	{ title: "MrBeast - The Movie", thumbnail: "images/video2.png", url: "https://youtu.be/Q2FKQPiUWrM" },
	{ title: "NAi News", thumbnail: "images/video3.png", url: "https://youtu.be/fmNz9JrlfJQ" },
	{ title: "Der Besuch der jungen Dame", thumbnail: "images/video4.png", url: "https://youtu.be/OI_pu3cYd78" },
	{ title: "Le BG8", thumbnail: "images/video5.jpg", url: "https://youtu.be/3MIdgFknsAk" },
	{ title: "Der Piaristler - Podcast", thumbnail: "images/video6.jpg", url: "https://youtu.be/23qhzTZV3DQ" }
  ];

  let currentIndex = 0; // Tracks the current video index
  let autoplayInterval; // Interval for autoplay

  // DOM Elements
  const videoTitle = document.getElementById('video-title');
  const videoThumbnail = document.getElementById('video-thumbnail');
  const videoLink = document.getElementById('video-link');
  const progressBar = document.getElementById('progress-bar');
  const prevArrow = document.getElementById('prev-arrow');
  const nextArrow = document.getElementById('next-arrow');

  // Function to create the progress bar segments
  function createProgressBar() {
	progressBar.innerHTML = ''; // Clear existing segments
	videos.forEach((_, index) => {
	  const segment = document.createElement('div');
	  segment.classList.add('progress-segment');
	  if (index === currentIndex) {
		segment.classList.add('active');
	  }
	  segment.addEventListener('click', () => {
		currentIndex = index; // Jump to the clicked video
		updateVideo();
	  });
	  progressBar.appendChild(segment);
	});
  }

  // Function to update the video display
  function updateVideo() {
	const currentVideo = videos[currentIndex];
	videoTitle.textContent = currentVideo.title;
	videoThumbnail.src = currentVideo.thumbnail;
	videoLink.href = currentVideo.url;

	// Update progress bar
	const segments = document.querySelectorAll('.progress-segment');
	segments.forEach((segment, index) => {
	  segment.classList.toggle('active', index === currentIndex);
	});
  }


  // Event listener for previous arrow
  prevArrow.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + videos.length) % videos.length; // Circular navigation
	updateVideo();
  });

  // Event listener for next arrow
  nextArrow.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % videos.length; // Circular navigation
	updateVideo();
  });

  // Initialize the menu
  createProgressBar();
  updateVideo();
  startAutoplay(); // Start autoplay
