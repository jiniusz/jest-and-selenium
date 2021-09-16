import { createTask, getTasks, updateTask } from './index';

describe('#createTask', () => {
    it('must create tasks', async () => {
        fetch.mockResponseOnce(JSON.stringify({id: 1, label: 'Do this', completed: false}));

        const result = await createTask('Do this');

        expect(result).toEqual({id: 1, label: 'Do this', completed: false});
        expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/tasks/), {
            method: 'POST',
            body: JSON.stringify({label: 'Do this', completed: false}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    });
});

describe('#updateTask', () => {
    it('must update tasks', async () => {
        fetch.mockResponseOnce(JSON.stringify({id: 1, label: 'Do this', completed: true}));

        const result = await updateTask({id: 1, label: 'Do this', completed: true});

        expect(result).toEqual({id: 1, label: 'Do this', completed: true});
        expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/tasks\/1/), {
            method: 'PUT',
            body: JSON.stringify({id: 1, label: 'Do this', completed: true}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    });
});

describe('#getTasks', () => {
    it('must get tasks', async () => {
        fetch.mockResponseOnce(JSON.stringify([{id: 1, label: '1', completed: true}]));

        const result = await getTasks();

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual({id: 1, label: '1', completed: true});
        expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/tasks/));

        /* expect.stringMatching(regex) looks different from the regular expect(something).toBe(something else) pattern.
        This instruction is designed to be used in place of arguments to verify mocks.
        Another useful function is expect.anything(). It is used when you need to know that there was an argument,
        but do not care which one. */

    });
});
