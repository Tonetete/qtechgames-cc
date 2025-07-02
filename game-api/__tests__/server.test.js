const request = require('supertest');
const fs = require('fs');

const mockGamesData = [
  { id: 'test-game-1', title: 'Test Game 1', studio: 'Test Studio', rating: 4 },
  {
    id: 'test-game-2',
    title: 'Test Game 2',
    studio: 'Another Studio',
    rating: 3,
  },
];

describe('Game API', () => {
  let readSpy;
  let writeSpy;
  let app;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();

    readSpy = jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
      return JSON.stringify(mockGamesData);
    });

    writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    app = require('../src/server');
  });

  afterEach(() => {
    jest.restoreAllMocks();

    if (app && typeof app.close === 'function') {
      app.close();
    }
  });

  describe('GET /api/games', () => {
    it('returns all games with default pagination', async () => {
      const res = await request(app).get('/api/games');
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(2);
      expect(res.body.nextPage).toBeNull();
    });

    it('handles pagination correctly', async () => {
      const res = await request(app).get('/api/games?page=0&pageSize=1');
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(1);
      expect(res.body.nextPage).toBe(1);
      expect(res.body.items[0].id).toBe('test-game-1');
    });

    it('filters by search term', async () => {
      const res = await request(app).get('/api/games?search=another');
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(1);
      expect(res.body.items[0].id).toBe('test-game-2');
    });

    it('returns 500 when fs.readFileSync throws', async () => {
      readSpy.mockImplementation(() => {
        throw new Error('File read error');
      });
      const res = await request(app).get('/api/games');
      expect(res.status).toBe(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /api/games/:id', () => {
    it('returns a game by id', async () => {
      const res = await request(app).get('/api/games/test-game-1');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe('test-game-1');
      expect(res.body.title).toBe('Test Game 1');
    });

    it('returns 404 for non-existent game', async () => {
      const res = await request(app).get('/api/games/non-existent');
      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });

    it('returns 500 when fs.readFileSync throws', async () => {
      readSpy.mockImplementation(() => {
        throw new Error('File read error');
      });
      const res = await request(app).get('/api/games/test-game-1');
      expect(res.status).toBe(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PATCH /api/games/:id/rating', () => {
    it('updates a game rating', async () => {
      const res = await request(app)
        .patch('/api/games/test-game-1/rating')
        .send({ rating: 5 });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.game.rating).toBe(5);
      expect(writeSpy).toHaveBeenCalled();
    });

    it('rejects invalid rating values', async () => {
      const res = await request(app)
        .patch('/api/games/test-game-1/rating')
        .send({ rating: 6 });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('rejects missing rating', async () => {
      const res = await request(app)
        .patch('/api/games/test-game-1/rating')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('returns 500 when fs.writeFileSync throws', async () => {
      writeSpy.mockImplementation(() => {
        throw new Error('File write error');
      });
      const res = await request(app)
        .patch('/api/games/test-game-1/rating')
        .send({ rating: 5 });
      expect(res.status).toBe(500);
      expect(res.body.error).toBeDefined();
    });
  });
});
