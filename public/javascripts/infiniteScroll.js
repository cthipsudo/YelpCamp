// =============================================
// FILE: public/javascripts/infiniteScroll.js
// =============================================

let currentPage = 1;
let isLoading = false;
let hasMore = true;

const list = document.getElementById('campground-list');
const sentinel = document.getElementById('scroll-sentinel');
const loader = document.getElementById('scroll-loader');

// Builds the card HTML to match your EJS template exactly
function buildCard(c) {
  const imgUrl = c.images && c.images.length
    ? c.images[0].url
    : 'https://res.cloudinary.com/dorflj0ap/image/upload/v1772386761/YelpCamp/c7pys7lslszlwhd8elz9.jpg';

  return `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-5 col-lg-4">
          <img class="img-fluid rounded-start" src="${imgUrl}" alt="${c.title}">
        </div>
        <div class="col-md-7 col-lg-8">
          <div class="card-body">
            <h5 class="card-title">${c.title}</h5>
            <p class="card-text">${c.description.substring(0, 80)}...</p>
            <p class="card-text">
              <small class="text-secondary">${c.location}</small>
            </p>
            <a href="/campgrounds/${c._id}" class="btn btn-primary">View ${c.title}</a>
          </div>
        </div>
      </div>
    </div>`;
}

async function loadMore() {
  if (isLoading || !hasMore) return;
  isLoading = true;
  loader.style.display = 'block';

  try {
    currentPage++;
    const res = await fetch(`/campgrounds/list?page=${currentPage}`);
    const data = await res.json();
    console.log(data)
    data.campgrounds.forEach(c => {
      list.insertAdjacentHTML('beforeend', buildCard(c));
    });

    hasMore = data.hasMore;
  } catch (err) {
    console.error('Failed to load campgrounds:', err);
  } finally {
    isLoading = false;
    loader.style.display = 'none';
  }
}

// Trigger loadMore when sentinel div comes into view (300px before it's visible)
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: '300px' });

observer.observe(sentinel);
