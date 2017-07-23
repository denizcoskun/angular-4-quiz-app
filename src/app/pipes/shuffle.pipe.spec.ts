import { ShufflePipe } from './shuffle.pipe';

describe('ShufflePipe', () => {
  it('create an instance', () => {
    const pipe = new ShufflePipe();
    expect(pipe).toBeTruthy();
  });
  it('should shuffle array', () => {
    const pipe = new ShufflePipe();
    expect(pipe.transform([{Index: 0, text: 'A'}])).toBeTruthy()
  })
});
