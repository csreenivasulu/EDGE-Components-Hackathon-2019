import { tableSorting, filterTable } from "./table.util";

describe('Table sorting', () => { 
    it('should sort the table based on column and desc order', () => {
      const tableInfo = [{name: "a"}, {name: "c"}, {name: "b"}];
      const columnName = "name";
      const order = -1;
      const expectOp = JSON.stringify([{name: "c"}, {name: "b"}, {name: "a"}]);
      tableSorting(tableInfo,columnName,order)
      console.log(tableInfo);
      expect(JSON.stringify(tableInfo)).toEqual(expectOp);
    });

    it('should sort the table based on column and asc order', () => {
      const tableInfo = [{name: "a"}, {name: "c"}, {name: "b"}];
      const columnName = "name";
      const order = 1;
      const expectOp = JSON.stringify([{name: "a"}, {name: "b"}, {name: "c"}]);
      tableSorting(tableInfo,columnName,order)
      console.log(tableInfo);
      expect(JSON.stringify(tableInfo)).toEqual(expectOp);
    });

    it('should remove sort the table based on column, order', () => {
      const tableInfo = [{name: "a"}, {name: "a"}, {name: "a"}];
      const columnName = "name";
      const order = 0;
      const expectOp = JSON.stringify([{name: "a"}, {name: "a"}, {name: "a"}]);
      tableSorting(tableInfo,columnName,order)
      console.log(tableInfo);
      expect(JSON.stringify(tableInfo)).toEqual(expectOp);
    });


    it('should filter the data based on args', () => {
        const value = [{data: "hello world",key: "a"},{data: "new keys",key: "b"}];
        const args = "world";
        const output = filterTable(value, args);
        const expectOp = [{data: "hello world", key: "a"}];
        expect(JSON.stringify(output)).toBe(JSON.stringify(expectOp));
    });

    
    it('should filter the data based on args', () => {
      const value = null;
      const args = "world";
      const output = filterTable(value, args);
      const expectOp = null;
      expect(output).toBe(null);
  });
  });