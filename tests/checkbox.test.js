import { JSDOM } from 'jsdom';
import { isCompleted } from '../src/status';

const dom = new JSDOM();
global.document = dom.window.document;

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

describe('The checkbox', () => {
  test('is checked so the task is completed', () => {
    const tasks = JSON.parse(localStorage.getItem('stored'));
    const task = (JSON.parse(localStorage.getItem('stored')))[0];
    const checkbox = document.createElement('INPUT');
    checkbox.setAttribute('type', 'checkbox');
    task.completed = true;
    isCompleted(checkbox.checked, tasks[0]);
    localStorage.setItem('stored', JSON.stringify(tasks));
    expect(task.completed).toBe(true);
  });
});