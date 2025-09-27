import type { NotifyUser } from './types';

const baseUrl = 'http://localhost:3000';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const getNotifyUsers = async (): Promise<NotifyUser[]> => {
  const response = await fetch(`${baseUrl}/notify/users`);
  return handleResponse<NotifyUser[]>(response);
};

export const sendNotifications = async (userIds: number[]): Promise<void> => {
  const response = await fetch(`${baseUrl}/notify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userIds }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Failed to send notifications. Status ${response.status}${
        errorText ? ` - ${errorText}` : ''
      }`,
    );
  }
};
