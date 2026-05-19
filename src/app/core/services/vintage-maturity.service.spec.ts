import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { VintageChartService, VintageInfo } from './vintage-maturity.service';

const mockChart: Record<string, Record<string, VintageInfo>> = {
  BORDEAUX: {
    '2015': { score: 98, maturity: 'R' },
    '2020': { score: 91, maturity: 'T' },
    '2005': { score: 95, maturity: 'C' },
    '2010': { score: 99, maturity: 'E' },
  },
  BOURGOGNE: {
    '2018': { score: 93, maturity: 'R' },
  },
};

describe('VintageChartService', () => {
  let service: VintageChartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VintageChartService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(VintageChartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // --- loadChart ---

  describe('loadChart', () => {
    it('should load the vintage chart from assets', async () => {
      const promise = service.loadChart();

      const req = httpMock.expectOne('assets/vintage-chart.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockChart);

      await promise;
    });

    it('should populate the chart so getStatus works after loading', async () => {
      const promise = service.loadChart();
      httpMock.expectOne('assets/vintage-chart.json').flush(mockChart);
      await promise;

      const status = service.getStatus('BORDEAUX', 2015);
      expect(status.score).toBe(98);
    });
  });

  // --- getStatus ---

  describe('getStatus — before loading', () => {
    it('should return unknown if chart is empty', () => {
      const status = service.getStatus('BORDEAUX', 2015);
      expect(status.status).toBe('unknown');
    });
  });

  describe('getStatus — after loading', () => {
    beforeEach(async () => {
      const promise = service.loadChart();
      httpMock.expectOne('assets/vintage-chart.json').flush(mockChart);
      await promise;
    });

    it('should return unknown for an unknown region', () => {
      const status = service.getStatus('CHAMPAGNE', 2015);
      expect(status.status).toBe('unknown');
    });

    it('should return unknown for an unknown vintage', () => {
      const status = service.getStatus('BORDEAUX', 1900);
      expect(status.status).toBe('unknown');
    });

    it('should return not-ready for maturity T', () => {
      const status = service.getStatus('BORDEAUX', 2020);
      expect(status.status).toBe('not-ready');
      expect(status.maturity).toBe('T');
    });

    it('should return ready for maturity R', () => {
      const status = service.getStatus('BORDEAUX', 2015);
      expect(status.status).toBe('ready');
      expect(status.maturity).toBe('R');
      expect(status.score).toBe(98);
    });

    it('should return ready for maturity E', () => {
      const status = service.getStatus('BORDEAUX', 2010);
      expect(status.status).toBe('ready');
      expect(status.maturity).toBe('E');
    });

    it('should return past-peak for maturity C', () => {
      const status = service.getStatus('BORDEAUX', 2005);
      expect(status.status).toBe('past-peak');
      expect(status.maturity).toBe('C');
    });

    it('should work for a different region', () => {
      const status = service.getStatus('BOURGOGNE', 2018);
      expect(status.status).toBe('ready');
      expect(status.score).toBe(93);
    });
  });
});
