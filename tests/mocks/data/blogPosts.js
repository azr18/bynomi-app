// tests/mocks/data/blogPosts.js
export const mockBlogPosts = [
  {
    id: 'post-1',
    title: 'Setting the Perfect Table for a Dinner Party',
    slug: 'setting-perfect-table-dinner-party',
    excerpt: 'Learn how to impress your guests with a perfectly set table that creates an elegant atmosphere for your next dinner party.',
    content: `
      <h2>The Art of Table Setting</h2>
      <p>A perfectly set table creates the foundation for a memorable dinner party. It shows your guests that you've put thought and care into creating a special experience for them.</p>
      
      <h3>Start with the Basics</h3>
      <p>Begin with a clean, pressed tablecloth that complements your dining room decor. Our Classic White Tablecloth provides a timeless backdrop that works with any color scheme or occasion.</p>
      
      <h3>Layer with Placemats</h3>
      <p>Add texture and color with placemats. Our Blue Striped Placemats add a touch of coastal elegance to your table setting.</p>
      
      <h3>Napkin Presentation</h3>
      <p>Fold napkins elegantly and place them either in the center of the plate or to the left of the forks. For a special touch, use a decorative napkin ring.</p>
      
      <h3>Flatware Arrangement</h3>
      <p>Remember: Work from the outside in. Place the flatware in the order it will be used, with the first course utensils on the outside.</p>
      
      <h3>Glassware Positioning</h3>
      <p>Arrange glasses in a diagonal line from the top right of the setting, starting with the water glass, followed by wine glasses.</p>
      
      <h3>Finishing Touches</h3>
      <p>Add a low centerpiece that won't block conversation, place cards for a formal touch, and ambient lighting to create the perfect atmosphere.</p>
    `,
    author: {
      id: 'author-1',
      name: 'Emily Johnson',
      title: 'Table Setting Expert',
      avatar: '/assets/authors/emily-johnson.jpg'
    },
    categories: ['entertaining', 'table setting', 'dinner party'],
    cover_image: '/assets/blog/dinner-party-table-setting.jpg',
    published_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    reading_time: 6
  },
  {
    id: 'post-2',
    title: 'Caring for Your Tablecloths and Linens',
    slug: 'caring-for-tablecloths-linens',
    excerpt: 'Proper care and maintenance of your table linens will extend their life and keep them looking beautiful for years to come.',
    content: `
      <h2>Extending the Life of Your Table Linens</h2>
      <p>Quality table linens are an investment that can last for years with proper care. This guide will help you maintain your tablecloths, napkins, and placemats in pristine condition.</p>
      
      <h3>Washing Instructions</h3>
      <p>Always check the care label first, but most of our tablecloths can be machine washed in cold water on a gentle cycle. Use a mild detergent without bleach or optical brighteners.</p>
      
      <h3>Treating Stains</h3>
      <p>Act quickly on stains. Blot (don't rub) liquid spills immediately with a clean, white cloth. For food stains, gently scrape off excess before treating.</p>
      
      <h3>Red Wine Emergencies</h3>
      <p>For red wine spills, sprinkle salt generously over the stain to absorb the liquid, then rinse with cold water as soon as possible.</p>
      
      <h3>Drying Properly</h3>
      <p>Line drying is best for most table linens. If using a dryer, use low heat and remove while still slightly damp to minimize wrinkles.</p>
      
      <h3>Ironing Techniques</h3>
      <p>Iron linens while they're still slightly damp for best results. Use a medium-hot iron on cotton and linen fabrics, and a cooler setting for synthetics.</p>
      
      <h3>Storage Tips</h3>
      <p>Store clean linens in a cool, dry place. Avoid folding along the same lines each time to prevent permanent creases.</p>
    `,
    author: {
      id: 'author-2',
      name: 'Michael Chen',
      title: 'Textile Care Specialist',
      avatar: '/assets/authors/michael-chen.jpg'
    },
    categories: ['care instructions', 'cleaning', 'maintenance'],
    cover_image: '/assets/blog/folded-linens.jpg',
    published_at: '2024-01-28T14:30:00Z',
    updated_at: '2024-01-28T14:30:00Z',
    reading_time: 5
  },
  {
    id: 'post-3',
    title: 'Seasonal Table Decor Ideas',
    slug: 'seasonal-table-decor-ideas',
    excerpt: 'Refresh your dining space with these creative seasonal table decor ideas that celebrate each time of year.',
    content: `
      <h2>Dressing Your Table Through the Seasons</h2>
      <p>Changing your table decor with the seasons adds a fresh look to your dining space and creates a festive atmosphere for seasonal gatherings.</p>
      
      <h3>Spring Renewal</h3>
      <p>Embrace spring with fresh floral tablecloths, pastel-colored napkins, and a centerpiece of tulips or daffodils. Our Floral Pattern Tablecloth is perfect for this season.</p>
      
      <h3>Summer Brightness</h3>
      <p>For summer, opt for light, breezy fabrics in vibrant colors. Blue Striped Placemats paired with solid colored napkins create a casual, coastal feel perfect for outdoor dining.</p>
      
      <h3>Autumn Warmth</h3>
      <p>As leaves change color, bring warm earth tones to your table with amber, rust, and deep green textiles. Add natural elements like pinecones or small gourds as accents.</p>
      
      <h3>Winter Elegance</h3>
      <p>Create a festive winter table with rich, textured fabrics in deep jewel tones or classic white. Our Classic White Tablecloth paired with Gold-Plated Napkin Rings adds timeless elegance.</p>
      
      <h3>Holiday Specifics</h3>
      <p>For holidays, add themed elements while maintaining sophistication. For example, introduce small pumpkins at Thanksgiving or subtle heart accents for Valentine's Day.</p>
      
      <h3>Transitioning Between Seasons</h3>
      <p>Invest in neutral basics that can be accessorized differently as seasons change. A classic tablecloth can be transformed with seasonal napkins, rings, and centerpieces.</p>
    `,
    author: {
      id: 'author-3',
      name: 'Sophia Martinez',
      title: 'Interior Design Consultant',
      avatar: '/assets/authors/sophia-martinez.jpg'
    },
    categories: ['seasonal decor', 'table design', 'entertaining'],
    cover_image: '/assets/blog/seasonal-table-settings-collage.jpg',
    published_at: '2024-02-10T09:45:00Z',
    updated_at: '2024-02-10T09:45:00Z',
    reading_time: 8
  }
];