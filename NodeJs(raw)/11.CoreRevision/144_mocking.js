/* 3_mocking.js

=====================================================
Mocking
=====================================================

Definition (What I should say in the interview):
- "Mocking means replacing a real dependency - like a database call, an email service or a
   third-party API - with a fake version that I control during a test. This keeps the test
   fast and deterministic and lets me simulate cases that are hard to reproduce, like the API
   timing out. In Jest I mainly use **jest.fn** for fake functions, **jest.mock** to replace a
   whole module, and **jest.spyOn** to watch or override one method on a real object."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. jest.fn() -> standalone mock function; records calls, can return values.
2. jest.mock('module') -> auto-mocks every export of a module (hoisted above imports).
3. jest.spyOn(obj, 'method') -> wraps a real method; can keep or replace the implementation.
4. Control behaviour: mockReturnValue, mockResolvedValue, mockRejectedValue, mockImplementation.
5. Reset between tests: jest.clearAllMocks() / resetAllMocks() / restoreAllMocks().

-----------------------------------------------------
Example
-----------------------------------------------------
// services/userService.js
const User = require('../models/User');
const mailer = require('../utils/mailer');
async function register(data) {
  const user = await User.create(data);
  await mailer.sendWelcome(user.email);
  return user;
}

// tests/userService.test.js
jest.mock('../models/User');
jest.mock('../utils/mailer');
const User = require('../models/User');
const mailer = require('../utils/mailer');
const { register } = require('../services/userService');

afterEach(() => jest.clearAllMocks());

test('creates user and sends welcome mail', async () => {
  User.create.mockResolvedValue({ id: 1, email: 'a@b.com' });
  await register({ email: 'a@b.com' });
  expect(mailer.sendWelcome).toHaveBeenCalledWith('a@b.com');
});

test('does not send mail if DB fails', async () => {
  User.create.mockRejectedValue(new Error('DB down'));
  await expect(register({ email: 'x@y.com' })).rejects.toThrow('DB down');
  expect(mailer.sendWelcome).not.toHaveBeenCalled();
});

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Over-mocking: mocking the very thing you are trying to test.
- Forgetting to clear mocks -> call counts leak from one test into the next.
- Mocking time: use jest.useFakeTimers() instead of real waits with setTimeout.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between clearAllMocks, resetAllMocks and restoreAllMocks?
A1: clear -> resets call history only; reset -> also removes mocked return values/implementations;
    restore -> additionally puts back the original implementation for spyOn mocks.

Q2: How do you mock an HTTP API like axios?
A2: jest.mock('axios') and set axios.get.mockResolvedValue({ data: ... }), or use a library
    like nock to intercept HTTP requests at the network level.
*/
