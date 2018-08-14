import { TestBed, inject } from '@angular/core/testing';
import { JokersApiService } from './jokers-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subscription } from 'rxjs/index';
import { environment } from '../../../environments/environment';

describe('JokersApiService', () => {
  let httpMock: HttpTestingController;
  let subscription: Subscription;
  let jokersApiService: JokersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokersApiService],
    });
  });

  beforeEach(() => {
    jokersApiService = TestBed.get(JokersApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([JokersApiService], (service: JokersApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should request for all jokers', () => {
    /* When */
    subscription = jokersApiService.findAllJokers().subscribe((res: any) => {
      /* Then */
      expect(res).toEqual([{ name: 'john doe' }, { name: 'antoine griezman' }]);
    });

    const req = httpMock.expectOne(r => r.url === `${environment.api}/jokers`);
    expect(req.request.method).toEqual('GET');
    req.flush([{ name: 'john doe' }, { name: 'antoine griezman' }]);
  });

  it('should request for add a joker', () => {
    /* When */
    subscription = jokersApiService.addJoker('john').subscribe((res: any) => {
      /* Then */
      expect(res).toEqual('added');
    });

    const req = httpMock.expectOne(r => r.url === `${environment.api}/jokers`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ name: 'john' });

    req.flush('added');
  });

  it('should request for add a joke', () => {
    /* When */
    const date = new Date();
    const joke = { date: date, joke: 'trop lol', context: 'pas le bon', id: '000x000' };
    subscription = jokersApiService.addJoke('1001', joke).subscribe((res: any) => {
      /* Then */
      expect(res).toEqual('added');
    });

    const req = httpMock.expectOne(r => r.url === `${environment.api}/jokers/1001/joke`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(joke);

    req.flush('added');
  });
});
