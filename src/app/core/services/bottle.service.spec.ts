import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BottleService } from './bottle.service';
import { Bottle } from '../../shared/models/bottle.model';

const mockBottle: Bottle = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Château Margaux',
  appellation: 'Margaux',
  region: 'BORDEAUX',
  vintage: 2015,
  type: 'RED',
  quantity: 6,
  price: 250,
  score: 98,
  notes: 'Exceptionnel',
  creationDate: new Date('2024-01-01'),
};

const mockBottles: Bottle[] = [
  mockBottle,
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    name: 'Pouilly-Fumé',
    appellation: 'Pouilly-Fumé',
    vintage: 2022,
    type: 'WHITE',
    quantity: 12,
  },
];

describe('BottleService', () => {
  let service: BottleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BottleService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BottleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should fetch all bottles via GET /bottle', () => {
      service.getAll().subscribe((bottles) => {
        expect(bottles.length).toBe(2);
        expect(bottles[0].name).toBe('Château Margaux');
      });

      const req = httpMock.expectOne('/bottle');
      expect(req.request.method).toBe('GET');
      req.flush(mockBottles);
    });

    it('should return an empty array when no bottles exist', () => {
      service.getAll().subscribe((bottles) => {
        expect(bottles.length).toBe(0);
      });

      httpMock.expectOne('/bottle').flush([]);
    });
  });

  describe('getById', () => {
    it('should fetch a single bottle via GET /bottle/:id', () => {
      const id = mockBottle.id;

      service.getById(id).subscribe((bottle) => {
        expect(bottle.id).toBe(id);
        expect(bottle.name).toBe('Château Margaux');
        expect(bottle.type).toBe('RED');
      });

      const req = httpMock.expectOne(`/bottle/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBottle);
    });
  });

  describe('create', () => {
    it('should post a new bottle and return it with an id', () => {
      const { id, ...newBottle } = mockBottle;

      service.create(newBottle).subscribe((bottle) => {
        expect(bottle.id).toBe(mockBottle.id);
        expect(bottle.name).toBe(newBottle.name);
      });

      const req = httpMock.expectOne('/bottle');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newBottle);
      req.flush(mockBottle);
    });
  });

  describe('update', () => {
    it('should update a bottle via PUT /bottle/:id', () => {
      const id = mockBottle.id;
      const patch: Partial<Bottle> = { quantity: 3, score: 95 };
      const updated = { ...mockBottle, ...patch };

      service.update(id, patch).subscribe((bottle) => {
        expect(bottle.quantity).toBe(3);
        expect(bottle.score).toBe(95);
      });

      const req = httpMock.expectOne(`/bottle/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(patch);
      req.flush(updated);
    });
  });

  describe('delete', () => {
    it('should delete a bottle via DELETE /bottle/:id', () => {
      const id = mockBottle.id;

      service.delete(id).subscribe((result) => {
        expect(result).toBeUndefined();
      });

      const req = httpMock.expectOne(`/bottle/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
