import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

//components
import TaskInput from './TaskInput';


describe('<TaskInput />', () => {
    it('renders an input', () => {
        render(<TaskInput />);
        expect(screen.queryByPlaceholderText('Enter new task')).toBeInTheDocument();
    });

    it('fires onSubmit callback', async () => {
        const mockOnSubmit = jest.fn();
        render(<TaskInput onSubmit={mockOnSubmit} />);
        const inputNode = screen.getByPlaceholderText('Enter new task');
        fireEvent.change(inputNode, {target: {value: 'new task!'}});
        fireEvent.submit(inputNode);
        await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith('new task!'));
    })
});
