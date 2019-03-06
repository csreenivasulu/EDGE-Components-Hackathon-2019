import { FilterColumnPipe } from './filter-column.pipe';

describe('FilterColumnPipe', () => {
  let pipe: FilterColumnPipe;
  it('create an instance', () => {
    pipe = new FilterColumnPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the filtered data based on column wise', () => {
    const tableInfo = [
      { data: 'hello world', age: '12', name: 'lorem' }, 
      { data: 'new data', age: '35', name: 'ipsum' },
      { data: 'data', age: '45', name: 'korea' }
    ];
    const key = {data: 'data'};
    const expecOp = [
      { data: 'new data', age: '35', name: 'ipsum' },
      { data: 'data', age: '45', name: 'korea' }
    ];
    const finalOp = pipe.transform(tableInfo, key);
    expect(JSON.stringify(finalOp)).toBe(JSON.stringify(expecOp));
  });

  it('should return the whole data when column data not giving', () => {
    const tableInfo = [
      { data: 'hello world', age: '12', name: 'lorem' }, 
      { data: 'new data', age: '35', name: 'ipsum' },
      { data: 'data', age: '45', name: 'korea' }
    ];
    const key = null;
    const finalOp = pipe.transform(tableInfo, key);
    expect(JSON.stringify(finalOp)).toBe(JSON.stringify(tableInfo));
  });
});
