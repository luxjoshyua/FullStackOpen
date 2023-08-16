import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BlogForm } from './BlogForm';

describe('<BlogForm /> component', () => {
	test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
		// https://jestjs.io/docs/mock-functions
		const createBlog = jest.fn();
		const user = userEvent.setup();

		const { container } = render(<BlogForm createBlog={createBlog} />);

		// screen.debug(container)

		const titleInput = container.querySelector('.title input');
		const authorInput = container.querySelector('.author input');
		const urlInput = container.querySelector('.url input');
		const likesInput = container.querySelector('.likes input');

		const submitButton = screen.getByText('create');

		await user.type(titleInput, 'test blog title');
		await user.type(authorInput, 'josh');
		await user.type(urlInput, 'www.google.com');
		await user.type(likesInput, '5');

		await user.click(submitButton);

		expect(createBlog.mock.calls).toHaveLength(1);

		expect(createBlog.mock.calls[0][0].title).toBe('test blog title');
		expect(createBlog.mock.calls[0][0].author).toBe('josh');
		expect(createBlog.mock.calls[0][0].url).toBe('www.google.com');
		expect(createBlog.mock.calls[0][0].likes).toBe('5');
	});
});
