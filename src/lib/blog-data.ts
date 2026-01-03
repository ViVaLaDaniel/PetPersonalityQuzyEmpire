export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  date: string;
  read_time: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'science-behind-dog-personalities',
    title: 'The Science Behind Dog Personalities: Why Your Pup Acts That Way',
    category: 'Dog Science',
    excerpt: 'Ever wondered why some dogs are social butterflies while others are quiet observers? Science has the answer.',
    content: 'Long form content here...',
    image_url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=800',
    author: 'Dr. Emily Bark',
    date: 'Jan 3, 2026',
    read_time: '6 min read'
  },
  {
    id: 'post-2',
    slug: 'cat-body-language-guide',
    title: 'Cat Body Language: What Your Feline Is Secretly Telling You',
    category: 'Cat Care',
    excerpt: 'From tail twitches to ear positions, cats have a complex silent language. Learn to decode it!',
    content: 'Long form content here...',
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800',
    author: 'Mark Whisker',
    date: 'Jan 2, 2026',
    read_time: '4 min read'
  },
  {
    id: 'post-3',
    slug: 'most-viral-pet-trends-2026',
    title: 'Top 10 Viral Pet Trends to Look Out for in 2026',
    category: 'Trends',
    excerpt: 'From smart pet gadgets to viral challenges, 2026 is going to be the year of the "Cores" for pets.',
    content: 'Long form content here...',
    image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800',
    author: 'Sarah Paws',
    date: 'Jan 1, 2026',
    read_time: '5 min read'
  }
];
