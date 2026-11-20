import { createTutorClient } from './tutorClient';
import { getUsage, sendPrompt } from './tutorApi';
import { getGuestUsage, sendGuestPrompt } from './guestTutor';

jest.mock('./tutorApi', () => ({ getUsage: jest.fn(), sendPrompt: jest.fn() }));
jest.mock('./guestTutor', () => ({ getGuestUsage: jest.fn(), sendGuestPrompt: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

test('routes guest and authenticated callers to the right implementation', async () => {
  const guest = createTutorClient(null);
  await guest.getUsage();
  await guest.sendPrompt('Explain routing', []);
  expect(getGuestUsage).toHaveBeenCalled();
  expect(sendGuestPrompt).toHaveBeenCalledWith('Explain routing', []);
  expect(getUsage).not.toHaveBeenCalled();
  expect(sendPrompt).not.toHaveBeenCalled();

  const authenticated = createTutorClient('token-a');
  await authenticated.getUsage();
  await authenticated.sendPrompt('Explain routing', []);
  expect(getUsage).toHaveBeenCalledWith('token-a', undefined);
  expect(sendPrompt).toHaveBeenCalledWith('token-a', 'Explain routing', [], undefined);
});
