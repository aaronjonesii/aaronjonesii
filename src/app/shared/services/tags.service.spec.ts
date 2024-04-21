import { TestBed } from '@angular/core/testing';
import { TagsService } from "./tags.service";

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    service = TestBed.inject(TagsService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of removed tags', () => {
    const previousTags = ['tag1', 'tag2'];
    const currentTags = ['tag2', 'tag3'];
    const removedTags = service.removedTags(previousTags, currentTags);
    expect(removedTags).toEqual(['tag1']);
  });

  it('should return an array of added tags', () => {
    const previousTags = ['tag1', 'tag2'];
    const currentTags = ['tag2', 'tag3'];
    const addedTags = service.addedTags(previousTags, currentTags);
    expect(addedTags).toEqual(['tag3']);
  });
});
