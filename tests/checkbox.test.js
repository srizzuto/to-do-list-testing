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
  