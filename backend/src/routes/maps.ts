import express from 'express';

const router = express.Router();

// Search places (mock data - replace with Amap API)
router.get('/search', async (req: express.Request, res: express.Response) => {
  try {
    const { query, lat, lng, type } = req.query;

    // Mock data for demonstration
    const mockPlaces = [
      {
        id: '1',
        name: 'Tiananmen Square',
        name_en: 'Tiananmen Square',
        name_local: '天安门广场',
        category: 'attraction',
        rating: 4.8,
        reviews_count: 50000,
        address: 'Dongcheng District, Beijing',
        location: { lat: 39.9042, lng: 116.4074 },
      },
      {
        id: '2',
        name: 'Forbidden City',
        name_en: 'Forbidden City',
        name_local: '故宫',
        category: 'attraction',
        rating: 4.9,
        reviews_count: 80000,
        address: 'Dongcheng District, Beijing',
        location: { lat: 39.9163, lng: 116.3972 },
      },
      {
        id: '3',
        name: 'Great Wall of China',
        name_en: 'Great Wall of China',
        name_local: '长城',
        category: 'attraction',
        rating: 4.8,
        reviews_count: 100000,
        address: 'Mutianyu, Huairou District, Beijing',
        location: { lat: 40.4319, lng: 116.5704 },
      },
    ];

    // Filter based on query
    let places = mockPlaces;
    if (query) {
      const searchTerm = (query as string).toLowerCase();
      places = mockPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.name_en.toLowerCase().includes(searchTerm) ||
          p.name_local.includes(searchTerm)
      );
    }

    // Filter by type
    if (type) {
      places = places.filter((p) => p.category === type);
    }

    res.json({ places });
  } catch (error) {
    console.error('Places search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get nearby places
router.get('/nearby', async (req: express.Request, res: express.Response) => {
  try {
    const { lat, lng, radius, type } = req.query;

    // Mock nearby places
    const nearbyPlaces = [
      {
        id: 'nearby_1',
        name: 'Nearest Metro Station',
        name_en: 'Metro Station',
        name_local: '地铁站',
        category: 'transport',
        distance: '200m',
        location: { lat: 39.9042, lng: 116.4074 },
      },
      {
        id: 'nearby_2',
        name: 'Local Restaurant',
        name_en: 'Local Restaurant',
        name_local: '本地餐厅',
        category: 'food',
        distance: '500m',
        location: { lat: 39.9042, lng: 116.4074 },
      },
    ];

    res.json({ places: nearbyPlaces });
  } catch (error) {
    console.error('Nearby places error:', error);
    res.status(500).json({ error: 'Failed to get nearby places' });
  }
});

// Get directions
router.get('/directions', async (req: express.Request, res: express.Response) => {
  try {
    const { origin, destination, mode } = req.query;

    // Mock directions response
    const mockRoute = {
      distance: '5.2 km',
      duration: '25 mins',
      steps: [
        { instruction: 'Head north on Main Street', distance: '500m' },
        { instruction: 'Turn right onto First Avenue', distance: '1.2 km' },
        { instruction: 'Continue straight', distance: '2.5 km' },
        { instruction: 'Turn left onto Destination Road', distance: '1 km' },
      ],
    };

    res.json({ route: mockRoute });
  } catch (error) {
    console.error('Directions error:', error);
    res.status(500).json({ error: 'Failed to get directions' });
  }
});

// Get place details
router.get('/place/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    // Mock place details
    const place = {
      id,
      name: 'Sample Attraction',
      name_en: 'Sample Attraction',
      name_local: '示例景点',
      category: 'attraction',
      rating: 4.5,
      reviews_count: 1000,
      address: 'Sample Address, Beijing',
      location: { lat: 39.9042, lng: 116.4074 },
      opening_hours: '8:30 AM - 5:00 PM',
      phone: '+86 10 1234 5678',
      website: 'https://example.com',
      description: 'This is a sample attraction description.',
    };

    res.json({ place });
  } catch (error) {
    console.error('Place details error:', error);
    res.status(500).json({ error: 'Failed to get place details' });
  }
});

// Save favorite place
router.post('/favorites', async (req: express.Request, res: express.Response) => {
  try {
    const { placeId } = req.body;
    
    res.json({
      message: 'Place saved to favorites',
      placeId,
    });
  } catch (error) {
    console.error('Save favorite error:', error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// Get favorite places
router.get('/favorites', async (req: express.Request, res: express.Response) => {
  try {
    // Mock favorites
    const favorites = [];
    
    res.json({ places: favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Failed to get favorites' });
  }
});

export default router;
