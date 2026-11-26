/* 11_mocks_vs_stubs_vs_spies.js

=====================================================
Mocks vs Stubs vs Spies
=====================================================

Definition (What I should say in the interview):
- "All three are 'test doubles', but they have different jobs. A **spy** watches a real
   function and records how it was called, without necessarily changing what it does. A
   **stub** replaces a function with a fake that returns a fixed, pre-programmed answer, so I
   can control the test's input. A **mock** is a fake with expectations - the test checks that
   it was called in a specific way. In Jest the line is blurry because jest.fn() can act as all
   three, but the concepts still matter."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Spy  -> "Was it called? With what? How many times?" Real behaviour can stay.
2. Stub -> "When called, return X / throw Y." Used to control indirect inputs.
3. Mock -> pre-defined expectations about calls; the test verifies interactions.
4. Fake (bonus) -> a working lightweight implementation, e.g. in-memory repository.
5. Sinon.js uses explicit names: sinon.spy(), sinon.stub(), sinon.mock().

-----------------------------------------------------
Example (Jest)
-----------------------------------------------------
const logger = { info: (msg) => console.log(msg) };
const paymentApi = { charge: async (amount) => callRealGateway(amount) };

// SPY - real logger still runs, we just observe it
const spy = jest.spyOn(logger, 'info');
logger.info('order placed');
expect(spy).toHaveBeenCalledWith('order placed');
spy.mockRestore();

// STUB - replace behaviour with a canned answer
jest.spyOn(paymentApi, 'charge').mockResolvedValue({ status: 'success' });
const result = await checkout(100);          // uses the stubbed charge
expect(result.paid).toBe(true);

// MOCK - verify the interaction itself
const sendEmail = jest.fn();
await notifyUser({ email: 'a@b.com' }, sendEmail);
expect(sendEmail).toHaveBeenCalledTimes(1);
expect(sendEmail).toHaveBeenCalledWith('a@b.com', expect.any(String));

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Double | Replaces behaviour? | Main purpose              | Assert on         |
|--------|---------------------|---------------------------|-------------------|
| Spy    | optional            | observe calls             | calls / args      |
| Stub   | yes                 | control return values     | result of the SUT |
| Mock   | yes                 | verify interactions       | expected calls    |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Asserting on too many internal calls with mocks -> tests break on every refactor even
  though behaviour is unchanged. Prefer asserting on outputs; verify calls only when the call
  IS the behaviour (e.g. "email was sent").

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: jest.fn vs jest.spyOn?
A1: jest.fn creates a new standalone fake function. jest.spyOn wraps an existing method on an
    object, keeps the original by default, and can be restored with mockRestore().

Q2: What does SUT mean?
A2: System Under Test - the unit you are actually testing; everything around it can be doubled.
*/
