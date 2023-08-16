import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Blog } from './Blog';

describe('<Blog /> component', () => {
	test('renders the blogs title and author, but not url or likes, by default', () => {
		const blog = {
			title: 'test blog title',
			author: 'josh',
			url: 'www.google.com',
			likes: 5
		};

		const { container } = render(<Blog blog={blog} />);

		const title = container.querySelector('.title');
		const author = container.querySelector('.author');

		expect(title).toBeDefined();
		expect(author).toBeDefined();

		const url = container.querySelector('.url');
		const likes = container.querySelector('.likes');

		expect(url).toBeNull();
		expect(likes).toBeNull();
	});

	test('blogs url and number of likes are shown when button showing details has been clicked', async () => {
		const blog = {
			title: 'test blog title',
			author: 'josh',
			url: 'www.google.com',
			likes: 5
		};

		const { container } = render(<Blog blog={blog} />);

		const user = userEvent.setup();

		const button = screen.getByText('view');

		await user.click(button);

		const url = container.querySelector('.url');
		const likes = container.querySelector('.likes');

		expect(url).toBeDefined();
		expect(likes).toBeDefined();
	});

	test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
		const blog = {
			title: 'test blog title',
			author: 'josh',
			url: 'www.google.com',
			likes: 5
		};

		const mockHandler = jest.fn();

		const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />);

		const user = userEvent.setup();
		const viewButton = screen.getByText('view');
		await user.click(viewButton);

		const likeButton = container.querySelector('#like-btn');
		await user.click(likeButton);

		expect(mockHandler.mock.calls).toHaveLength(1);

		await user.click(likeButton);

		expect(mockHandler.mock.calls).toHaveLength(2);
	});

	test('form calls the event handler it received as props with the right details when a new blog is created', async () => {});
});
