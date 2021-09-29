import {
  add, edit, remove, removeChecked,
} from '../src/addremove';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

beforeEach(() => {
  localStorage.setItem('stored', JSON.stringify([
    {
      index: 1,
      description: 'A project',
      completed: false,
    },
    {
      index: 2,
      description: 'Another project',
      completed: false,
    },
    {
      index: 3,
      description: 'Even another project',
      completed: false,
    },
  ]));
});

describe('The add function', () => {
  test('appends a new task to the store', () => {
    const description = 'newTask';
    const tasks = JSON.parse(localStorage.getItem('stored'));
    add(tasks, description);
    expect((JSON.parse(localStorage.getItem('stored'))).length).toBe(4);
  });
  test('description should be newTask', () => {
    const description = 'newTask';
    const tasks = JSON.parse(localStorage.getItem('stored'));
    add(tasks, description);
    const task = (JSON.parse(localStorage.getItem('stored')))[3].description;
    expect(task).toBe('newTask');
  });
});

describe('the edit function', () => {
  test('changes the description of the first task', () => {
    const task = (JSON.parse(localStorage.getItem('stored')))[0];
    edit(task, 'new description');
    expect((JSON.parse(localStorage.getItem('stored')))[0].description).toBe('new description');
  });
});

describe('The remove function', () => {
  test('deletes the last task', () => {
    const tasks = JSON.parse(localStorage.getItem('stored'));
    remove(tasks, (JSON.parse(localStorage.getItem('stored')))[2]);
    expect((JSON.parse(localStorage.getItem('stored'))).length).toBe(2);
  });
  test('updates the index of the last task after delete', () => {
    const tasks = JSON.parse(localStorage.getItem('stored'));
    remove(tasks, (JSON.parse(localStorage.getItem('stored')))[1]);
    expect(((JSON.parse(localStorage.getItem('stored')))[1]).index).toBe(2);
  });
});

describe('The Clear All function', () => {
  test('clears all done tasks, expecting index to be updated (1)', () => {
    const tasks = JSON.parse(localStorage.getItem('stored'));
    tasks[0].completed = true;
    tasks[1].completed = true;
    removeChecked(tasks);
    expect(tasks[2].index).toBe(1);
  });
  test('clear all done tasks, expect to have an array length of 1', () => {
    const tasks = JSON.parse(localStorage.getItem('stored'));
    tasks[0].completed = true;
    tasks[1].completed = true;
    removeChecked(tasks);
    expect(JSON.parse(localStorage.getItem('stored')).length).toBe(1);
  });
});
