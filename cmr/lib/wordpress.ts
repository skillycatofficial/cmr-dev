const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://test.local';

export async function fetchAPI(endpoint: string) {
  const url = `${WORDPRESS_URL}${endpoint}`;
  const res = await fetch(url, {
    next: { revalidate: 60 }, // Cache for 60 seconds (revalidate)
  });

  if (!res.ok) {
    throw new Error(`WordPress API returned error status: ${res.status}`);
  }

  return res.json();
}

export async function getHeroSlides() {
  try {
    return await fetchAPI('/wp-json/cmr/v1/hero-slides');
  } catch (error) {
    console.error('Error fetching hero slides from WordPress:', error);
    return [];
  }
}

export async function getAllProjects() {
  try {
    return await fetchAPI('/wp-json/cmr/v1/projects');
  } catch (error) {
    console.error('Error fetching projects from WordPress:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await fetchAPI(`/wp-json/cmr/v1/projects/${slug}`);
  } catch (error) {
    console.error(`Error fetching project by slug ${slug} from WordPress:`, error);
    return null;
  }
}

export async function getAllPosts() {
  try {
    return await fetchAPI('/wp-json/cmr/v1/posts');
  } catch (error) {
    console.error('Error fetching posts from WordPress:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await fetchAPI(`/wp-json/cmr/v1/posts/${slug}`);
  } catch (error) {
    console.error(`Error fetching post by slug ${slug} from WordPress:`, error);
    return null;
  }
}

export async function getCareers() {
  try {
    return await fetchAPI('/wp-json/cmr/v1/careers');
  } catch (error) {
    console.error('Error fetching careers from WordPress:', error);
    return [];
  }
}

export async function getGalleryItems() {
  try {
    return await fetchAPI('/wp-json/cmr/v1/gallery');
  } catch (error) {
    console.error('Error fetching gallery items from WordPress:', error);
    return [];
  }
}

export async function getAwards() {
  try {
    return await fetchAPI('/wp-json/cmr/v1/awards');
  } catch (error) {
    console.error('Error fetching awards from WordPress:', error);
    return [];
  }
}
