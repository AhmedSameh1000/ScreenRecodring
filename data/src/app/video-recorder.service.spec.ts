import { TestBed } from '@angular/core/testing';

import { VideoREcorderService } from './video-recorder.service';

describe('VideoREcorderService', () => {
  let service: VideoREcorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoREcorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
